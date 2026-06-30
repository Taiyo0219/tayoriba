(function () {
  function getStorageItem(key, defaultValue) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  function setStorageItem(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn('Unable to save to localStorage');
    }
  }

  function formatMethod(method) {
    const map = {
      phone: '電話',
      'face-to-face': '対面',
      online: 'オンライン',
      chat: 'チャット',
      email: 'メール',
      sns: 'LINEなどのSNS',
      written: '文字相談',
      undecided: 'まだ決められない',
    };
    return map[method] || method;
  }

  function formatCategory(category) {
    const map = {
      job: '仕事・就職',
      study: '学業・進路',
      money: 'お金・生活',
      housing: '住まい',
      family: '家族',
      relationship: '人間関係',
      mental: '心や体の不調',
      violence: 'DV・暴力・犯罪被害',
      other: 'その他',
      unknown: 'どれを選べばよいか分からない',
    };
    return map[category] || category;
  }

  function createTag(text) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = text;
    return tag;
  }

  function safeText(text) {
    return String(text || '');
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getQueryParams() {
    return new URLSearchParams(window.location.search);
  }

  function redirectToResults(params) {
    const searchParams = new URLSearchParams(params);
    window.location.href = `results.html?${searchParams.toString()}`;
  }

  window.Tayoriba = window.Tayoriba || {};
  window.Tayoriba.getStorageItem = getStorageItem;
  window.Tayoriba.setStorageItem = setStorageItem;
  window.Tayoriba.formatMethod = formatMethod;
  window.Tayoriba.formatCategory = formatCategory;
  window.Tayoriba.createTag = createTag;
  window.Tayoriba.safeText = safeText;
  window.Tayoriba.getQueryParam = getQueryParam;
  window.Tayoriba.getQueryParams = getQueryParams;
  window.Tayoriba.redirectToResults = redirectToResults;
})();
