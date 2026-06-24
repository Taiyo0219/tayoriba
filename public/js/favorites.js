const { getStorageItem, setStorageItem, createTag, formatCategory, formatMethod, safeText } = window.Tayoriba;

const favoritesList = document.getElementById('favoritesList');
const favoritesEmpty = document.getElementById('favoritesEmpty');

function getFavoriteIds() {
  return getStorageItem('tayoriba-favorites', []);
}

function removeFavorite(supportId) {
  const favorites = getFavoriteIds().filter((id) => id !== supportId);
  setStorageItem('tayoriba-favorites', favorites);
}

function createSupportCard(support) {
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

  const buttons = document.createElement('div');
  buttons.className = 'actions';

  const detailLink = document.createElement('a');
  detailLink.className = 'button';
  detailLink.href = `detail.html?supportId=${encodeURIComponent(support.supportId)}`;
  detailLink.textContent = '詳細を見る';

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'button';
  removeButton.textContent = 'お気に入り解除';
  removeButton.addEventListener('click', async () => {
    removeFavorite(support.supportId);
    card.remove();
    if (!getFavoriteIds().length) {
      favoritesEmpty.classList.remove('hidden');
    }
  });

  buttons.append(detailLink, removeButton);
  card.append(header, meta, buttons);
  return card;
}

async function loadFavorites() {
  const favoriteIds = getFavoriteIds();
  if (!favoriteIds.length) {
    favoritesEmpty.classList.remove('hidden');
    return;
  }

  favoritesEmpty.classList.add('hidden');
  favoritesList.innerHTML = '<p>読み込み中...</p>';

  const details = await Promise.all(
    favoriteIds.map(async (supportId) => {
      try {
        const response = await fetch(`/api/supports/${encodeURIComponent(supportId)}`);
        if (!response.ok) {
          return null;
        }
        return response.json();
      } catch {
        return null;
      }
    })
  );

  favoritesList.innerHTML = '';
  details.filter(Boolean).forEach((support) => favoritesList.appendChild(createSupportCard(support)));

  if (!favoritesList.children.length) {
    favoritesEmpty.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', loadFavorites);
