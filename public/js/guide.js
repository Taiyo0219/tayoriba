(function () {
  const guideForm = document.getElementById('guideForm');
  const guideResult = document.getElementById('guideResult');
  const guideResultList = document.getElementById('guideResultList');
  const resultSearchLink = document.getElementById('resultSearchLink');
  const restartGuideButton = document.getElementById('restartGuideButton');
  const guideProgressItems = document.querySelectorAll('.guide-progress__item');
  const guideProgressMessage = document.getElementById('guideProgressMessage');

  const categoryLabels = {
    job: '働くこと・就職',
    study: '学校や進路',
    money: 'お金や生活',
    relationship: '人間関係',
    mental: '心や体のこと',
  };

  const methodLabels = {
    phone: '電話',
    written: '文字相談',
    'face-to-face': '対面',
    online: 'オンライン',
  };

  let guideState = {
    category: null,
    method: null,
    area: 'tokyo',
    free: false,
    anonymous: false,
    includeNationwide: false,
    reservationFree: false,
  };

  function getCheckedValue(name) {
    const checked = guideForm.querySelector(`input[name="${name}"]:checked`);
    return checked && checked.value ? checked.value : null;
  }

  function hasCheckedValue(name) {
    return Boolean(guideForm.querySelector(`input[name="${name}"]:checked`));
  }

  function getCheckboxValue(name) {
    const checkbox = guideForm.querySelector(`input[name="${name}"]`);
    return Boolean(checkbox && checkbox.checked);
  }

  function updateOptionStyles() {
    guideForm.querySelectorAll('.guide-option').forEach((option) => {
      const input = option.querySelector('input');
      option.classList.toggle('is-selected', Boolean(input && input.checked));
    });
  }

  function setGuideProgressStep(stepName, state, statusText) {
    const item = Array.from(guideProgressItems).find((step) => step.dataset.step === stepName);
    if (!item) {
      return;
    }

    item.classList.remove('is-complete', 'is-current', 'is-pending', 'is-optional');
    item.classList.add(state);
    const status = item.querySelector('small');
    if (status) {
      status.textContent = statusText;
    }
  }

  function updateGuideProgress(resultShown) {
    const hasCategory = hasCheckedValue('category');
    const hasMethod = hasCheckedValue('method');
    const hasOptions =
      getCheckboxValue('free') ||
      getCheckboxValue('anonymous') ||
      getCheckboxValue('includeNationwide') ||
      getCheckboxValue('reservationFree');

    setGuideProgressStep('category', hasCategory ? 'is-complete' : 'is-current', hasCategory ? '完了' : '未選択');
    setGuideProgressStep(
      'method',
      hasMethod ? 'is-complete' : hasCategory ? 'is-current' : 'is-pending',
      hasMethod ? '完了' : '未選択'
    );
    setGuideProgressStep('options', hasOptions ? 'is-complete' : 'is-optional', hasOptions ? '選択済み' : '任意');
    setGuideProgressStep(
      'result',
      resultShown ? 'is-current' : hasCategory && hasMethod ? 'is-pending' : 'is-pending',
      resultShown ? '表示中' : '未到達'
    );

    if (!hasCategory) {
      guideProgressMessage.textContent = 'まず、今の状況に近いものを選んでください。';
    } else if (!hasMethod) {
      guideProgressMessage.textContent = '次に、相談方法の希望を選んでください。';
    } else if (resultShown) {
      guideProgressMessage.textContent = '整理した条件を確認できます。条件はあとから変更できます。';
    } else {
      guideProgressMessage.textContent = '必要な条件だけ選んで、探し方を整理できます。';
    }
  }

  function syncNoPreference(changedInput) {
    if (!changedInput || changedInput.type !== 'checkbox') {
      return;
    }

    const noPreference = guideForm.querySelector('input[name="noPreference"]');
    if (!noPreference) {
      return;
    }

    if (changedInput.name === 'noPreference' && changedInput.checked) {
      guideForm.querySelectorAll('.guide-options-checkboxes input[type="checkbox"]').forEach((checkbox) => {
        if (checkbox !== noPreference) {
          checkbox.checked = false;
        }
      });
    } else if (changedInput.checked) {
      noPreference.checked = false;
    }
  }

  function collectGuideState() {
    const includeNationwide = getCheckboxValue('includeNationwide');

    return {
      category: getCheckedValue('category'),
      method: getCheckedValue('method'),
      area: includeNationwide ? 'tokyo+national' : 'tokyo',
      free: getCheckboxValue('free'),
      anonymous: getCheckboxValue('anonymous'),
      includeNationwide,
      reservationFree: getCheckboxValue('reservationFree'),
    };
  }

  function buildResultsUrl(state) {
    const params = new URLSearchParams();

    if (state.category) {
      params.set('category', state.category);
    }
    if (state.method) {
      params.set('method', state.method);
    }
    if (state.area) {
      params.set('area', state.area);
    }
    if (state.free) {
      params.set('free', 'true');
    }
    if (state.anonymous) {
      params.set('anonymous', 'true');
    }

    return `results.html?${params.toString()}`;
  }

  function saveSearchCriteria(state) {
    if (!window.Tayoriba || !window.Tayoriba.setStorageItem) {
      return;
    }

    window.Tayoriba.setStorageItem('tayoriba-search-criteria', {
      category: state.category,
      method: state.method,
      area: state.area,
      free: state.free,
      anonymous: state.anonymous,
    });
  }

  function appendCondition(label, value) {
    const term = document.createElement('dt');
    term.textContent = label;

    const description = document.createElement('dd');
    description.textContent = value;

    guideResultList.append(term, description);
  }

  function renderResult(state) {
    guideResultList.innerHTML = '';

    appendCondition('困りごと', state.category ? categoryLabels[state.category] : '指定なし');
    appendCondition('相談方法', state.method ? methodLabels[state.method] : '指定なし');
    appendCondition('地域', state.includeNationwide ? '東京都＋全国対応' : '東京都');

    const preferences = [];
    if (state.free) preferences.push('無料');
    if (state.anonymous) preferences.push('匿名相談可');
    if (state.reservationFree) preferences.push('予約なしで相談したい');
    appendCondition('条件', preferences.length ? preferences.join('、') : '指定なし');

    resultSearchLink.href = buildResultsUrl(state);
    saveSearchCriteria(state);
    guideResult.classList.remove('hidden');
    updateGuideProgress(true);
    guideResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleSubmit(event) {
    event.preventDefault();
    guideState = collectGuideState();
    renderResult(guideState);
  }

  function restartGuide() {
    guideForm.reset();
    guideState = {
      category: null,
      method: null,
      area: 'tokyo',
      free: false,
      anonymous: false,
      includeNationwide: false,
      reservationFree: false,
    };
    updateOptionStyles();
    guideResult.classList.add('hidden');
    updateGuideProgress(false);
    guideForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  guideForm.addEventListener('change', (event) => {
    syncNoPreference(event.target);
    updateOptionStyles();
    updateGuideProgress(false);
  });

  guideForm.addEventListener('submit', handleSubmit);
  restartGuideButton.addEventListener('click', restartGuide);
  updateGuideProgress(false);
})();
