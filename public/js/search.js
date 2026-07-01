const categories = [
  { key: 'job', label: '仕事・就職', description: '就職活動や職場の悩みなど' },
  { key: 'study', label: '学業・進路', description: '学校生活や進路について' },
  { key: 'money', label: 'お金・生活', description: '生活費や経済的な不安' },
  { key: 'housing', label: '住まい', description: '住居や住まいの相談' },
  { key: 'family', label: '家族', description: '家族との関係や問題' },
  { key: 'relationship', label: '人間関係', description: '友人や職場の人間関係' },
  { key: 'mental', label: '心や体の不調', description: '心身の不調について' },
  { key: 'violence', label: 'DV・暴力・犯罪被害', description: '暴力や被害に関する相談' },
  { key: 'other', label: 'その他', description: 'その他の悩み' },
  { key: 'unknown', label: 'どれを選べばよいか分からない', description: '何を選べばよいか迷っている' },
];

const methods = [
  { key: 'phone', label: '電話で相談できる', description: '直接電話で相談する' },
  { key: 'written', label: '文字で相談したい', description: 'メール・チャット・LINEなど文字で相談する' },
  { key: 'face-to-face', label: '対面で話したい', description: '窓口や面談で相談する' },
  { key: 'online', label: 'オンラインで相談したい', description: 'ビデオ通話や音声通話で相談する' },
  { key: 'undecided', label: 'まだ決められない', description: '相談方法はあとから変更できます' },
];

const categoryOptions = document.getElementById('categoryOptions');
const methodOptions = document.getElementById('methodOptions');
const categoryError = document.getElementById('categoryError');
const methodError = document.getElementById('methodError');
const searchButton = document.getElementById('searchButton');
const areaSelect = document.getElementById('areaSelect');
const freeCheckbox = document.getElementById('freeCheckbox');
const anonymousCheckbox = document.getElementById('anonymousCheckbox');
const progressItems = document.querySelectorAll('.search-progress__item');
const progressMessage = document.getElementById('searchProgressMessage');

let selectedCategory = null;
let selectedMethod = null;

function renderCategories() {
  categoryOptions.innerHTML = '';
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-card option-button';
    button.innerHTML = `
      <span class="option-marker" aria-hidden="true"></span>
      <span class="option-text">
        <span class="option-title">${category.label}</span>
        <span class="option-description">${category.description}</span>
      </span>
    `;
    button.addEventListener('click', () => {
      selectedCategory = category.key;
      updateCategorySelection();
      categoryError.textContent = '';
      updateSearchProgress();
    });
    button.dataset.key = category.key;
    button.setAttribute('aria-selected', 'false');
    categoryOptions.appendChild(button);
  });
}

function renderMethods() {
  methodOptions.innerHTML = '';
  methods.forEach((method) => {
    const row = document.createElement('label');
    row.className = 'method-option option-button';
    row.innerHTML = `
      <input type="radio" name="method" value="${method.key}" />
      <span class="option-text">
        <span class="option-title">${method.label}</span>
        <span class="option-description">${method.description}</span>
      </span>
    `;
    const input = row.querySelector('input');
    input.addEventListener('change', () => {
      selectedMethod = method.key;
      updateMethodSelection();
      methodError.textContent = '';
      updateSearchProgress();
    });
    row.dataset.key = method.key;
    methodOptions.appendChild(row);
  });
}

function updateCategorySelection() {
  document.querySelectorAll('.category-card').forEach((card) => {
    const isSelected = card.dataset.key === selectedCategory;
    card.classList.toggle('selected', isSelected);
    card.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });
}

function updateMethodSelection() {
  document.querySelectorAll('.method-option').forEach((row) => {
    const isSelected = row.dataset.key === selectedMethod;
    row.classList.toggle('selected', isSelected);
    const radio = row.querySelector('input');
    if (radio) {
      radio.checked = isSelected;
    }
  });
}

function setProgressStep(stepName, state, statusText) {
  const item = Array.from(progressItems).find((step) => step.dataset.step === stepName);
  if (!item) {
    return;
  }

  item.classList.remove('is-complete', 'is-current', 'is-pending', 'is-optional');
  item.classList.add(state);
  const status = item.querySelector('.search-progress__status');
  if (status) {
    status.textContent = statusText;
  }
}

function updateSearchProgress() {
  const hasCategory = Boolean(selectedCategory);
  const hasMethod = Boolean(selectedMethod);
  const hasArea = Boolean(areaSelect.value);
  const hasOptions = freeCheckbox.checked || anonymousCheckbox.checked;
  const canSearch = hasCategory && hasMethod && hasArea;

  setProgressStep('category', hasCategory ? 'is-complete' : 'is-current', hasCategory ? '完了' : '未選択');
  setProgressStep(
    'method',
    hasMethod ? 'is-complete' : hasCategory ? 'is-current' : 'is-pending',
    hasMethod ? '完了' : '未選択'
  );
  setProgressStep(
    'area',
    hasArea ? 'is-complete' : hasCategory && hasMethod ? 'is-current' : 'is-pending',
    hasArea ? '完了' : '未選択'
  );
  setProgressStep('options', hasOptions ? 'is-complete' : 'is-optional', hasOptions ? '選択済み' : '任意');
  setProgressStep('submit', canSearch ? 'is-current' : 'is-pending', canSearch ? '検索できます' : '未到達');

  if (!hasCategory) {
    progressMessage.textContent = '困りごとを選んでください。';
  } else if (!hasMethod) {
    progressMessage.textContent = '相談方法を選んでください。「まだ決められない」でも大丈夫です。';
  } else if (!hasArea) {
    progressMessage.textContent = '地域を選ぶと検索へ進めます。';
  } else {
    progressMessage.textContent = '検索へ進めます。条件は必要なものだけ選んでください。';
  }

  searchButton.disabled = !canSearch;
}

function loadSavedCriteria() {
  const saved = window.Tayoriba.getStorageItem('tayoriba-search-criteria', null);
  if (saved) {
    selectedCategory = saved.category || null;
    selectedMethod = saved.method || null;
    areaSelect.value = saved.area || 'tokyo+national';
    freeCheckbox.checked = saved.free || false;
    anonymousCheckbox.checked = saved.anonymous || false;
  }
}

function saveCriteria() {
  window.Tayoriba.setStorageItem('tayoriba-search-criteria', {
    category: selectedCategory,
    method: selectedMethod,
    area: areaSelect.value,
    free: freeCheckbox.checked,
    anonymous: anonymousCheckbox.checked,
  });
}

function handleSearch() {
  if (!selectedCategory) {
    categoryError.textContent = '困りごとのカテゴリを選んでください。';
    updateSearchProgress();
    return;
  }

  if (!selectedMethod) {
    methodError.textContent = '相談方法を選んでください。迷う場合は「まだ決められない」を選んでください。';
    updateSearchProgress();
    return;
  }

  const params = new URLSearchParams();
  if (selectedCategory !== 'unknown') {
    params.set('category', selectedCategory);
  }
  if (selectedMethod && selectedMethod !== 'undecided') {
    params.set('method', selectedMethod);
  }

  const areaValue = areaSelect.value;
  if (areaValue) {
    params.set('area', areaValue);
  }

  if (freeCheckbox.checked) {
    params.set('free', 'true');
  }

  if (anonymousCheckbox.checked) {
    params.set('anonymous', 'true');
  }

  saveCriteria();
  window.location.href = `results.html?${params.toString()}`;
}

window.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderMethods();
  loadSavedCriteria();
  updateCategorySelection();
  updateMethodSelection();
  updateSearchProgress();
  areaSelect.addEventListener('change', updateSearchProgress);
  freeCheckbox.addEventListener('change', updateSearchProgress);
  anonymousCheckbox.addEventListener('change', updateSearchProgress);
  searchButton.addEventListener('click', handleSearch);
});
