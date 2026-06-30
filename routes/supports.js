const express = require('express');
const { getSupportsCollection } = require('../db/mongo');

const router = express.Router();

function buildQuery(params) {
  const query = { isPublished: true };
  const andFilters = [];

  if (params.category) {
    andFilters.push({ categories: params.category });
  }

  if (params.area) {
    if (params.area === 'tokyo' || params.area === 'tokyo+national') {
      andFilters.push({ $or: [{ areas: 'tokyo' }, { nationwide: true }] });
    } else if (params.area === 'nationwide') {
      andFilters.push({ nationwide: true });
    }
  }

  if (params.method) {
    const requestedMethods = Array.isArray(params.method) ? params.method : [params.method];
    const methodFilters = [];

    requestedMethods.forEach((method) => {
      if (method === 'written') {
        methodFilters.push({ methods: { $in: ['email', 'chat', 'sns'] } });
      } else if (method === 'undecided' || method === 'any') {
        return;
      } else {
        methodFilters.push({ methods: method });
      }
    });

    if (methodFilters.length === 1) {
      andFilters.push(methodFilters[0]);
    } else if (methodFilters.length > 1) {
      andFilters.push({ $or: methodFilters });
    }
  }

  if (params.free === 'true') {
    andFilters.push({ free: true });
  }

  if (params.anonymous === 'true') {
    andFilters.push({ anonymous: true });
  }

  if (andFilters.length === 1) {
    Object.assign(query, andFilters[0]);
  } else if (andFilters.length > 1) {
    query.$and = andFilters;
  }

  return query;
}

router.get('/', async (req, res) => {
  try {
    const collection = getSupportsCollection();
    const query = buildQuery(req.query);
    const supports = await collection.find(query).sort({ name: 1 }).toArray();
    res.json(supports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch supports' });
  }
});

router.get('/:supportId', async (req, res) => {
  try {
    const collection = getSupportsCollection();
    const support = await collection.findOne({ supportId: req.params.supportId, isPublished: true });
    if (!support) {
      return res.status(404).json({ error: 'Support not found' });
    }
    res.json(support);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch support detail' });
  }
});

module.exports = router;
