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
const searchButton = document.getElementById('searchButton');
const areaSelect = document.getElementById('areaSelect');
const freeCheckbox = document.getElementById('freeCheckbox');
const anonymousCheckbox = document.getElementById('anonymousCheckbox');

let selectedCategory = null;
let selectedMethod = null;

function renderCategories() {
  categoryOptions.innerHTML = '';
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-card';
    button.innerHTML = `<strong>${category.label}</strong><span>${category.description}</span>`;
    button.addEventListener('click', () => {
      selectedCategory = category.key;
      updateCategorySelection();
      categoryError.textContent = '';
    });
    button.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectedCategory = category.key;
        updateCategorySelection();
        categoryError.textContent = '';
      }
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
    row.className = 'method-option';
    row.innerHTML = `
      <input type="radio" name="method" value="${method.key}" />
      <div>
        <span>${method.label}</span>
        <p>${method.description}</p>
      </div>
    `;
    const input = row.querySelector('input');
    input.addEventListener('change', () => {
      selectedMethod = method.key;
      updateMethodSelection();
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
    return;
  }

  const params = new URLSearchParams();
  params.set('category', selectedCategory);
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
  searchButton.addEventListener('click', handleSearch);
});
