const { getStorageItem, setStorageItem, safeText } = window.Tayoriba;

const form = document.getElementById('memoForm');
const fields = [
  { id: 'currentIssue', label: '今困っていること' },
  { id: 'sinceWhen', label: 'いつ頃から困っているか' },
  { id: 'mainConcern', label: '特に相談したいこと' },
  { id: 'messageToSupport', label: '相談先に伝えておきたいこと' },
  { id: 'desiredSupport', label: '希望する対応' },
];
const saveButton = document.getElementById('saveMemoButton');
const clearButton = document.getElementById('clearMemoButton');

function updateCounts() {
  fields.forEach(({ id }) => {
    const textarea = document.getElementById(id);
    const count = document.getElementById(`${id}Count`);
    count.textContent = `${textarea.value.length}文字`;
  });
}

function loadMemo() {
  const memo = getStorageItem('tayoriba-memo', {});
  fields.forEach(({ id }) => {
    const textarea = document.getElementById(id);
    textarea.value = memo[id] || '';
  });
  updateCounts();
}

function saveMemo() {
  const memo = {};
  fields.forEach(({ id }) => {
    const textarea = document.getElementById(id);
    memo[id] = textarea.value;
  });
  setStorageItem('tayoriba-memo', memo);
  window.alert('メモを保存しました。');
}

function clearMemo() {
  if (!window.confirm('メモを削除してもよろしいですか？')) {
    return;
  }
  setStorageItem('tayoriba-memo', {});
  fields.forEach(({ id }) => {
    document.getElementById(id).value = '';
  });
  updateCounts();
}

window.addEventListener('DOMContentLoaded', () => {
  loadMemo();
  fields.forEach(({ id }) => {
    document.getElementById(id).addEventListener('input', updateCounts);
  });
  saveButton.addEventListener('click', saveMemo);
  clearButton.addEventListener('click', clearMemo);
});
