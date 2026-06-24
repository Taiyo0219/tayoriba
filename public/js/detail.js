const { getStorageItem, setStorageItem, createTag, formatCategory, formatMethod, safeText } = window.Tayoriba;

const supportName = document.getElementById('supportName');
const detailCard = document.getElementById('detailCard');
const favoriteButton = document.getElementById('favoriteButton');
const websiteButton = document.getElementById('websiteButton');

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

function createDetailRow(label, value) {
  const dt = document.createElement('dt');
  dt.textContent = label;
  const dd = document.createElement('dd');
  dd.textContent = value || 'ー';
  return [dt, dd];
}

function renderSupport(support) {
  supportName.textContent = safeText(support.name);
  detailCard.innerHTML = '';

  const list = document.createElement('dl');
  list.append(...createDetailRow('運営組織', support.organization));
  list.append(...createDetailRow('対象者', safeText(support.targetAges)));
  list.append(...createDetailRow('対応する相談内容', support.categories.map(formatCategory).join('、')));
  list.append(...createDetailRow('相談方法', support.methods.map(formatMethod).join('、')));
  list.append(...createDetailRow('電話番号', safeText(support.phone)));
  list.append(...createDetailRow('受付時間', safeText(support.openingHours)));
  list.append(...createDetailRow('対応地域', support.nationwide ? '全国対応' : support.areas.join('、')));
  list.append(...createDetailRow('費用', support.free ? '無料' : '有料'));
  list.append(...createDetailRow('匿名相談', support.anonymous ? '可' : '不可'));
  list.append(...createDetailRow('注意事項', safeText(support.notes)));
  list.append(...createDetailRow('情報の最終確認日', safeText(support.verifiedAt)));

  detailCard.appendChild(list);
  detailCard.appendChild(createNotice());

  favoriteButton.textContent = isFavorite(support.supportId) ? 'お気に入り解除' : 'お気に入りに追加';
  favoriteButton.addEventListener('click', () => {
    toggleFavorite(support.supportId);
    favoriteButton.textContent = isFavorite(support.supportId) ? 'お気に入り解除' : 'お気に入りに追加';
  });

  websiteButton.href = support.websiteUrl || '#';
}

function createNotice() {
  const notice = document.createElement('div');
  notice.className = 'notice-card';
  notice.innerHTML = '<p>掲載内容が変更されている可能性があります。利用前に必ず相談機関の公式サイトをご確認ください。</p>';
  return notice;
}

async function loadSupport() {
  const params = new URLSearchParams(window.location.search);
  const supportId = params.get('id');
  if (!supportId) {
    detailCard.innerHTML = '<p class="error-message">相談先が見つかりませんでした。</p>';
    return;
  }

  detailCard.innerHTML = '<p>読み込み中...</p>';
  try {
    const response = await fetch(`/api/supports/${encodeURIComponent(supportId)}`);
    if (!response.ok) {
      throw new Error('相談先の詳細を取得できませんでした。');
    }
    const support = await response.json();
    renderSupport(support);
  } catch (error) {
    detailCard.innerHTML = `<p class="error-message">${safeText(error.message)}</p>`;
  }
}

window.addEventListener('DOMContentLoaded', loadSupport);
