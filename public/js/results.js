const { getStorageItem, setStorageItem, createTag, formatCategory, formatMethod, safeText } = window.Tayoriba;

const summaryCard = document.getElementById('summaryCard');
const resultsCount = document.getElementById('resultsCount');
const resultsList = document.getElementById('resultsList');
const emptyState = document.getElementById('emptyState');

function getFavoriteIds() {
  return getStorageItem('tayoriba-favorites', []);
}

function isFavorite(supportId) {
  return getFavoriteIds().includes(supportId);
}

function toggleFavorite(supportId) {
  const favorites = getFavoriteIds();
  const index = favorites.indexOf(supportId);
  if (index === -1) {
    favorites.push(supportId);
  } else {
    favorites.splice(index, 1);
  }
  setStorageItem('tayoriba-favorites', favorites);
}

function renderSupportCard(support) {
  const wrapper = document.createElement('div');
  wrapper.className = 'results-item';

  const link = document.createElement('a');
  link.className = 'support-card-link';
  link.href = `detail.html?id=${encodeURIComponent(support.supportId)}`;
  link.setAttribute('aria-label', `${support.name}の詳細を見る`);

  const card = document.createElement('article');
  card.className = 'results-card';

  const header = document.createElement('div');
  header.innerHTML = `<h3>${safeText(support.name)}</h3><p>${safeText(support.summary)}</p>`;

  const meta = document.createElement('div');
  meta.className = 'support-tags';
  support.categories.slice(0, 3).forEach((category) => meta.appendChild(createTag(formatCategory(category))));
  if (support.nationwide) {
    meta.appendChild(createTag('全国対応'));
  } else if (support.areas.length) {
    meta.appendChild(createTag(support.areas.join('、')));
  }
  support.methods.slice(0, 3).forEach((method) => meta.appendChild(createTag(formatMethod(method))));
  if (support.free) {
    meta.appendChild(createTag('無料'));
  }
  if (support.anonymous) {
    meta.appendChild(createTag('匿名相談可'));
  }

  const details = document.createElement('p');
  details.textContent = `受付時間: ${support.openingHours || '未設定'}`;

  const cardActions = document.createElement('div');
  cardActions.className = 'actions';

  const detailButton = document.createElement('span');
  detailButton.className = 'button detail-button';
  detailButton.textContent = '詳細を見る';

  cardActions.append(detailButton);
  card.append(header, meta, details, cardActions);
  link.appendChild(card);

  const favoriteButton = document.createElement('button');
  favoriteButton.type = 'button';
  favoriteButton.className = 'button';
  favoriteButton.textContent = isFavorite(support.supportId) ? 'お気に入り解除' : 'お気に入り';
  favoriteButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFavorite(support.supportId);
    favoriteButton.textContent = isFavorite(support.supportId) ? 'お気に入り解除' : 'お気に入り';
  });

  wrapper.append(link, favoriteButton);
  return wrapper;
}

function renderResults(supports) {
  resultsList.innerHTML = '';
  if (!supports.length) {
    emptyState.classList.remove('hidden');
    resultsCount.textContent = '0件の相談先が見つかりました。';
    return;
  }
  emptyState.classList.add('hidden');
  resultsCount.textContent = `${supports.length}件の相談先が見つかりました。`;
  supports.forEach((support) => resultsList.appendChild(renderSupportCard(support)));
}

function renderSummary(params) {
  const conditions = [];
  if (params.category) {
    conditions.push(`困りごと: ${formatCategory(params.category)}`);
  }
  if (params.area) {
    if (params.area === 'tokyo') {
      conditions.push('地域: 東京都のみ');
    } else if (params.area === 'nationwide') {
      conditions.push('地域: 全国対応');
    } else {
      conditions.push('地域: 東京都＋全国対応');
    }
  }
  if (params.method) {
    const values = Array.isArray(params.method) ? params.method : [params.method];
    conditions.push(`相談方法: ${values.map(formatMethod).join('、')}`);
  }
  if (params.free === 'true') {
    conditions.push('無料');
  }
  if (params.anonymous === 'true') {
    conditions.push('匿名相談可');
  }

  summaryCard.innerHTML = `<p>${conditions.length ? conditions.join(' / ') : '条件なし'}</p>`;
}

function buildQueryString(params) {
  const searchParams = new URLSearchParams();
  if (params.category) {
    searchParams.set('category', params.category);
  }
  if (params.area) {
    searchParams.set('area', params.area);
  }
  if (params.method) {
    const values = Array.isArray(params.method) ? params.method : [params.method];
    values.forEach((value) => searchParams.append('method', value));
  }
  if (params.free) {
    searchParams.set('free', params.free);
  }
  if (params.anonymous) {
    searchParams.set('anonymous', params.anonymous);
  }
  return searchParams.toString();
}

async function loadSupports() {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {
    category: searchParams.get('category'),
    area: searchParams.get('area'),
    method: searchParams.getAll('method'),
    free: searchParams.get('free'),
    anonymous: searchParams.get('anonymous'),
    all: searchParams.get('all'),
  };

  if (params.method.length === 0) {
    delete params.method;
  }

  renderSummary(params);

  const query = params.all === 'true' ? '' : buildQueryString(params);
  const url = `/api/supports${query ? `?${query}` : ''}`;

  resultsList.innerHTML = '<p>読み込み中...</p>';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('検索結果の取得に失敗しました。');
    }
    const supports = await response.json();
    renderResults(supports);
  } catch (error) {
    resultsList.innerHTML = `<p class="error-message">${safeText(error.message)}</p>`;
  }
}

window.addEventListener('DOMContentLoaded', loadSupports);
