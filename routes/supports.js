const express = require('express');
const { getSupportsCollection } = require('../db/mongo');

const router = express.Router();

function buildQuery(params) {
  const query = { isPublished: true };

  if (params.category) {
    query.categories = params.category;
  }

  if (params.area) {
    if (params.area === 'tokyo') {
      query.$or = [{ areas: 'tokyo' }, { nationwide: true }];
    } else if (params.area === 'nationwide') {
      query.nationwide = true;
    } else if (params.area === 'tokyo+national') {
      query.$or = [{ areas: 'tokyo' }, { nationwide: true }];
    }
  }

  if (params.method) {
    if (Array.isArray(params.method) && params.method.length > 0) {
      query.methods = { $in: params.method };
    } else {
      query.methods = params.method;
    }
  }

  if (params.free === 'true') {
    query.free = true;
  }

  if (params.anonymous === 'true') {
    query.anonymous = true;
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
