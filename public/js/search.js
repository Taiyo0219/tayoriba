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
  { key: 'phone', label: '電話', description: '直接電話で相談する' },
  { key: 'face-to-face', label: '対面', description: '窓口や面談で相談する' },
  { key: 'online', label: 'オンライン通話', description: 'ビデオ通話や音声通話' },
  { key: 'chat', label: 'チャット', description: 'テキストチャットで相談' },
  { key: 'email', label: 'メール', description: 'メールで相談する' },
  { key: 'sns', label: 'LINEなどのSNS', description: 'SNSで相談する' },
];

const categoryGrid = document.getElementById('categoryGrid');
const methodList = document.getElementById('methodList');
const categoryError = document.getElementById('categoryError');
const searchButton = document.getElementById('searchButton');
const areaSelect = document.getElementById('areaSelect');
const freeCheckbox = document.getElementById('freeCheckbox');
const anonymousCheckbox = document.getElementById('anonymousCheckbox');

let selectedCategory = null;
let selectedMethods = [];

function renderCategories() {
  categoryGrid.innerHTML = '';
  categories.forEach((category) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'category-card';
    card.innerHTML = `<h3>${category.label}</h3><p>${category.description}</p>`;
    card.addEventListener('click', () => {
      selectedCategory = category.key;
      updateCategorySelection();
      categoryError.textContent = '';
    });
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectedCategory = category.key;
        updateCategorySelection();
        categoryError.textContent = '';
      }
    });
    card.dataset.key = category.key;
    card.setAttribute('role', 'option');
    card.setAttribute('aria-selected', 'false');
    categoryGrid.appendChild(card);
  });
}

function renderMethods() {
  methodList.innerHTML = '';
  methods.forEach((method) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'method-card';
    card.innerHTML = `<h3>${method.label}</h3><p>${method.description}</p>`;
    card.addEventListener('click', () => {
      const index = selectedMethods.indexOf(method.key);
      if (index === -1) {
        selectedMethods.push(method.key);
      } else {
        selectedMethods.splice(index, 1);
      }
      updateMethodSelection();
    });
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = selectedMethods.indexOf(method.key);
        if (index === -1) {
          selectedMethods.push(method.key);
        } else {
          selectedMethods.splice(index, 1);
        }
        updateMethodSelection();
      }
    });
    card.dataset.key = method.key;
    card.setAttribute('role', 'option');
    card.setAttribute('aria-selected', 'false');
    methodList.appendChild(card);
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
  document.querySelectorAll('.method-card').forEach((card) => {
    const isSelected = selectedMethods.includes(card.dataset.key);
    card.classList.toggle('selected', isSelected);
    card.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });
}

function loadSavedCriteria() {
  const saved = window.Tayoriba.getStorageItem('tayoriba-search-criteria', null);
  if (saved) {
    selectedCategory = saved.category || null;
    selectedMethods = Array.isArray(saved.methods) ? saved.methods : [];
    areaSelect.value = saved.area || 'tokyo+national';
    freeCheckbox.checked = saved.free || false;
    anonymousCheckbox.checked = saved.anonymous || false;
  }
}

function saveCriteria() {
  window.Tayoriba.setStorageItem('tayoriba-search-criteria', {
    category: selectedCategory,
    methods: selectedMethods,
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

  if (selectedMethods.length) {
    selectedMethods.forEach((method) => params.append('method', method));
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
