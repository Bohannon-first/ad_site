import {arrayAds, listResults} from './available-ads.js';

const choosingProductCategory = document.querySelector('#categories');
const productCategories = document.querySelectorAll('#categories option');
const filterEstate = document.querySelector('.filter__estate');
const filterCamera = document.querySelector('.filter__camera');
const filterLaptop = document.querySelector('.filter__laptop');
const filterCar = document.querySelector('.filter__car');
const myFilters = document.querySelectorAll('.filter__item');
const filterButton = document.querySelector('.button.filter__button');
const filterForm = document.querySelector('.filter__form');
let mySlider = null;

const PROPERTY_TYPE = {
  'house': 'house',
  'flat': 'flat',
  'apartment': 'apartment'
};

const QUANTITY_ROOMS = {
  'any': 'any',
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'fivemore': 5
};

const LAPTOP_TYPE = {
  'ultrabook': 'ultrabook',
  'home': 'home',
  'gaming': 'gaming'
};

const AMOUNT_RAM = {
  'any': 'any',
  '4gb': 4,
  '8gb': 8,
  '16gb': 16
};

const DIAGONAL_SCREEN = {
  'any': 'any',
  '13in': 13,
  '14in': 14,
  '15in': 15.6,
  '17in': 17
};

const TYPE_PROCESSOR = {
  'i3': 'i3',
  'i5': 'i5',
  'i7': 'i7'
};

const TYPE_CAMERA = {
  'mirror': 'slr',
  'digital': 'digital',
  'mirrorless': 'mirrorless'
};

const MATRIX_RESOLUTION = {
  'any': 'any',
  '1mp': 1,
  '3mp': 3,
  '5mp': 5,
  '7mp': 7,
  '10mp': 10
};

const VIDEO_RESOLUTION = {
  'any': 'any',
  'HD': 'hd',
  'Full_HD': 'full-hd',
  '4K': '4K',
  '5K': '5K'
};

const CAR_BODY_TYPE = {
  'sedan': 'sedan',
  'universal': 'universal',
  'hatchback': 'hatchback',
  'jeep': 'suv',
  'cupe': 'cupe'
};

const YEAR_RELEASE_CAR = {
  'any': 'any',
  '2000': 2000,
  '2016': 2016,
  '2017': 2017,
  '2018': 2018,
  '2019': 2019
};

const TRANSMISSION_CAR = {
  'any': 'any',
  'mechanic': 'mechanic',
  'auto': 'auto'
};

// eslint-disable-next-line no-undef
mySlider = new rSlider({
  target: '#sampleSlider',
  values: {min: 9000, max: 30000000},
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 80000
});

// Шаг слайдера
const SLIDER_STEP_PRODUCT = {
  ALL: 80000,
  ESTATE: 80000,
  LAPTOP: 2000,
  CAMERA: 2000,
  CAR: 25000
};

// Сбросить все фильтры
const resetAllFilters = () => {
  // Убрать все чекбоксы
  const allCheckboxes = filterForm.querySelectorAll('.filter__checkboxes-item input');
  allCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });
  // Очистить поле ввода "Минимальная площадь"
  const minSquareInput = filterForm.querySelector('.filter__min-square input');
  if (minSquareInput.value) {
    minSquareInput.value = '';
  }
  // Очистить все радиокнопки
  const allRadiobuttons = filterForm.querySelectorAll('.filter__radiobuttons-item input');
  allRadiobuttons.forEach((button) => {
    if (button.value === 'any') {
      button.checked = true;
    }
  });
  // Очистить все селекты с опшинами
  const allSelects = filterForm.querySelectorAll('.filter__select option');
  allSelects.forEach((option) => {
    if (option.value === 'any') {
      option.selected = true;
    }
  });
};

// Показать фильтр исходя из выбранной категории товара
const showSelectedFilter = (filters, optionChoice) => {
  if (optionChoice.textContent === 'Все') {
    filters.forEach((filter) => {
      filter.style.display = 'none';
    });
  } else if (optionChoice.textContent === 'Недвижимость') {
    filters.forEach((filter) => {
      if (filter === filterEstate) {
        filter.style.display = 'block';
      } else {
        filter.style.display = 'none';
      }
    });
  } else if (optionChoice.textContent === 'Ноутбуки') {
    filters.forEach((filter) => {
      if (filter === filterLaptop) {
        filter.style.display = 'block';
      } else {
        filter.style.display = 'none';
      }
    });
  } else if (optionChoice.textContent === 'Фотоаппараты') {
    filters.forEach((filter) => {
      if (filter === filterCamera) {
        filter.style.display = 'block';
      } else {
        filter.style.display = 'none';
      }
    });
  } else if (optionChoice.textContent === 'Автомобили') {
    filters.forEach((filter) => {
      if (filter === filterCar) {
        filter.style.display = 'block';
      } else {
        filter.style.display = 'none';
      }
    });
  }
};

// Установка шага для слайдера, учитывая категорию товара
const setSliderStep = (option) => {
  switch (option) {
    case 'Все':
    case 'Недвижимость':
      return SLIDER_STEP_PRODUCT.ALL;
    case 'Ноутбуки':
    case 'Фотоаппараты':
      return SLIDER_STEP_PRODUCT.LAPTOP;
    case 'Автомобили':
      return SLIDER_STEP_PRODUCT.CAR;
  }
};

// Установление диапазона цен для фильтров
const setPriceRangeFilter = (ads, optionChoice) => {
  const arrayPrices = [];
  if (optionChoice.textContent === 'Все') {
    ads.forEach((ad) => {
      arrayPrices.push(ad.price);
    });
  } else if (optionChoice.textContent === 'Недвижимость') {
    ads.forEach((ad) => {
      if (ad.category === 'Недвижимость') {
        arrayPrices.push(ad.price);
      }
    });
  } else if (optionChoice.textContent === 'Ноутбуки') {
    ads.forEach((ad) => {
      if (ad.category === 'Ноутбук') {
        arrayPrices.push(ad.price);
      }
    });
  } else if (optionChoice.textContent === 'Фотоаппараты') {
    ads.forEach((ad) => {
      if (ad.category === 'Фотоаппарат') {
        arrayPrices.push(ad.price);
      }
    });
  } else if (optionChoice.textContent === 'Автомобили') {
    ads.forEach((ad) => {
      if (ad.category === 'Автомобиль') {
        arrayPrices.push(ad.price);
      }
    });
  }

  // Сортировка цен по возрастанию и установление минимальной и максимальной в ренджах
  arrayPrices.sort((a, b) => a - b);
  const minPriceProductCategory = arrayPrices[0];
  const maxPriceProductCategory = arrayPrices[arrayPrices.length - 1];

  // Удалить слайдер при переключении категорий товара
  if (mySlider) {
    mySlider.destroy();
  }

  // eslint-disable-next-line no-undef
  mySlider = new rSlider({
    target: '#sampleSlider',
    values: {min: minPriceProductCategory, max: maxPriceProductCategory},
    range: true,
    tooltip: true,
    scale: true,
    labels: false,
    step: setSliderStep(optionChoice.textContent)
  });

  const filterRange = document.querySelectorAll('.rs-tooltip');
  filterRange[0].textContent = `от ${minPriceProductCategory}`;
  filterRange[1].textContent = `до ${maxPriceProductCategory}`;
};

// Фильтрация объявлений по типу
const filterAdsType = (optionChoice) => {
  const allAds = document.querySelectorAll('.results__item.product');
  if (optionChoice.textContent === 'Все') {
    allAds.forEach((ad) => {
      ad.style.display = 'flex';
    });
  } else if (optionChoice.textContent === 'Недвижимость') {
    allAds.forEach((ad) => {
      if (ad.dataset.type === 'estate') {
        ad.style.display = 'flex';
      } else {
        ad.style.display = 'none';
      }
    });
  } else if (optionChoice.textContent === 'Ноутбуки') {
    allAds.forEach((ad) => {
      if (ad.dataset.type === 'laptop') {
        ad.style.display = 'flex';
      } else {
        ad.style.display = 'none';
      }
    });
  } else if (optionChoice.textContent === 'Фотоаппараты') {
    allAds.forEach((ad) => {
      if (ad.dataset.type === 'camera') {
        ad.style.display = 'flex';
      } else {
        ad.style.display = 'none';
      }
    });
  } else if (optionChoice.textContent === 'Автомобили') {
    allAds.forEach((ad) => {
      if (ad.dataset.type === 'car') {
        ad.style.display = 'flex';
      } else {
        ad.style.display = 'none';
      }
    });
  }
};

// Обработчик клика при выборе категории товара
const choosingProductCategoryClickHandler = () => {
  resetAllFilters();
  productCategories.forEach((option) => {
    if (option.textContent === 'Все' && option.selected) {
      showSelectedFilter(myFilters, option);
      setPriceRangeFilter(arrayAds, option);
      filterAdsType(option);
    } else if (option.textContent === 'Недвижимость' && option.selected) {
      showSelectedFilter(myFilters, option);
      setPriceRangeFilter(arrayAds, option);
      filterAdsType(option);
    } else if (option.textContent === 'Ноутбуки' && option.selected) {
      showSelectedFilter(myFilters, option);
      setPriceRangeFilter(arrayAds, option);
      filterAdsType(option);
    } else if (option.textContent === 'Фотоаппараты' && option.selected) {
      showSelectedFilter(myFilters, option);
      setPriceRangeFilter(arrayAds, option);
      filterAdsType(option);
    } else if (option.textContent === 'Автомобили' && option.selected) {
      showSelectedFilter(myFilters, option);
      setPriceRangeFilter(arrayAds, option);
      filterAdsType(option);
    }
  });
};

choosingProductCategory.addEventListener('change', choosingProductCategoryClickHandler);

// Проверка есть ли в Результатах после фильтрации объявление
// Если есть, то скрыть описательный текст внутри блока с результатами
const showDescriptiveTextAvailable = () => {
  let adCounter = 0;
  listResults.querySelectorAll('.results__item.product').forEach((item) => {
    if (item.getAttribute('style') === 'display: none;') {
      adCounter += 1;
    }
    if (listResults.querySelectorAll('.results__item.product').length === adCounter) {
      document.querySelector('.results__info.results__description').classList.remove('hidden');
    } else {
      document.querySelector('.results__info.results__description').classList.add('hidden');
    }
  });
};

// ФУНКЦИИ С ФИЛЬТРАМИ
// Проверка находятся ли объявления в выбранном диапазоне цен, если да, то показать,  остальные скрыть (Фильтр по слайдеру)
const sliderChoicePrice = (minPrice, maxPrice) => {
  listResults.querySelectorAll('[style="display: flex;"]').forEach((item) => {
    const productPrice = Number(item.querySelector('.product__price').textContent.replace(/[₽\s]/g, '').trim());
    if (productPrice >= minPrice && productPrice <= maxPrice) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

// Фильтр по чекбоксам, если группа с чекбоксами одна
const checkboxFilter = (adsCategory, collectionCheckboxes, key, checkboxesOptions) => {
  for (let i = 0; i < adsCategory.length; i++) {
    arrayAds.forEach((ad) => {
      if (ad.name === adsCategory[i].querySelector('.product__title a').textContent) {
        // Записываем объект каждого объявления
        const adForFiltering = ad;
        // Проверка по чекбоксам
        for (let j = 0; j < collectionCheckboxes.length; j++) {
          if (collectionCheckboxes[j].checked) {
            if (adForFiltering.filters[key] === checkboxesOptions[collectionCheckboxes[j].value]) {
              adsCategory[i].style.display = 'flex';
              showDescriptiveTextAvailable();
              break;
            } else if (adForFiltering.filters[key] !== checkboxesOptions[collectionCheckboxes[j].value]) {
              adsCategory[i].style.display = 'none';
              showDescriptiveTextAvailable();
            }
          } else {
            let countCheckbox = 0;
            collectionCheckboxes.forEach((item) => {
              if (item.checked) {
                countCheckbox += 1;
              }
            });
            if (countCheckbox === 0) {
              adsCategory.forEach((item) => {
                item.style.display = 'flex';
                showDescriptiveTextAvailable();
              });
            }
          }
        }
      }
    });
  }
};

// Фильтр по чекбоксам, если группа с чекбоксами не одна
const checkboxFilterMoreOne = (collectionCheckboxes, key, checkboxesOptions) => {
  listResults.querySelectorAll('[style="display: flex;"]').forEach((item) => {
    arrayAds.forEach((ad) => {
      if (ad.name === item.querySelector('.product__title a').textContent) {
        // Записываем объект каждого объявления
        const adForFiltering = ad;
        // Проверка по чекбоксам
        for (let j = 0; j < collectionCheckboxes.length; j++) {
          if (collectionCheckboxes[j].checked) {
            if (adForFiltering.filters[key] === checkboxesOptions[collectionCheckboxes[j].value]) {
              item.style.display = 'flex';
              showDescriptiveTextAvailable();
              break;
            } else if (adForFiltering.filters[key] !== checkboxesOptions[collectionCheckboxes[j].value]) {
              item.style.display = 'none';
              showDescriptiveTextAvailable();
            }
          } else {
            let countCheckbox = 0;
            collectionCheckboxes.forEach((elem) => {
              if (elem.checked) {
                countCheckbox += 1;
              }
            });
            if (countCheckbox === 0) {
              listResults.querySelectorAll('[style="display: flex;"]').forEach((elem) => {
                elem.style.display = 'flex';
                showDescriptiveTextAvailable();
              });
            }
          }
        }
      }
    });
  });
};

// Фильтр по полю ввода (минимальная площадь кв.м.)
const minSquare = (key, minSquareRoom) => {
  listResults.querySelectorAll('[style="display: flex;"]').forEach((item) => {
    arrayAds.forEach((elem) => {
      if (elem.name === item.querySelector('.product__title a').textContent) {
        // Записываем объект каждого объявления
        const adForFiltering = elem;
        if (adForFiltering.filters[key] >= +minSquareRoom) {
          item.style.display = 'flex';
          showDescriptiveTextAvailable();
        } else {
          item.style.display = 'none';
          showDescriptiveTextAvailable();
        }
      }
    });
  });
};

// Фильтр по радиокнопкам
const radiobuttonFilter = (collectionRadiobuttons, key, selectionOptions) => {
  listResults.querySelectorAll('[style="display: flex;"]').forEach((item) => {
    arrayAds.forEach((elem) => {
      if (elem.name === item.querySelector('.product__title a').textContent) {
        // Записываем объект каждого объявления
        const adForFiltering = elem;
        for (let i = 0; i < collectionRadiobuttons.length; i++) {
          if (collectionRadiobuttons[i].checked) {

            if (adForFiltering.filters[key] === selectionOptions[collectionRadiobuttons[i].value]) {
              item.style.display = 'flex';
              showDescriptiveTextAvailable();
            } else if (collectionRadiobuttons[i].value === selectionOptions['any']) {
              listResults.querySelectorAll('[style="display: flex;"]').forEach((el) => {
                el.style.display = 'flex';
                showDescriptiveTextAvailable();
              });
            } else {
              item.style.display = 'none';
              showDescriptiveTextAvailable();
            }
          }
        }
      }
    });
  });
};

// Фильтр по селектам, когда значения ключей больше значений option
const selectFilter = (options, key, selectOptions) => {
  listResults.querySelectorAll(('[style="display: flex;"]')).forEach((item) => {
    arrayAds.forEach((ad) => {
      if (ad.name === item.querySelector('.product__title a').textContent) {
        // Записываем объект каждого объявления
        const adForFiltering = ad;
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            if (adForFiltering.filters[key] >= selectOptions[options[i].value]) {
              item.style.display = 'flex';
              showDescriptiveTextAvailable();
            } else if (options[i].value === selectOptions['any']) {
              listResults.querySelectorAll('[style="display: flex;"]').forEach((el) => {
                el.style.display = 'flex';
                showDescriptiveTextAvailable();
              });
            } else {
              item.style.display = 'none';
              showDescriptiveTextAvailable();
            }
          }
        }
      }
    });
  });
};

// Фильтр по селектам, когда значения ключей равны значениям option
const selectFilterAlternative = (options, key, selectOptions) => {
  listResults.querySelectorAll(('[style="display: flex;"]')).forEach((item) => {
    arrayAds.forEach((ad) => {
      if (ad.name === item.querySelector('.product__title a').textContent) {
        // Записываем объект каждого объявления
        const adForFiltering = ad;
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            if (adForFiltering.filters[key] === selectOptions[options[i].value]) {
              item.style.display = 'flex';
              showDescriptiveTextAvailable();
            } else if (options[i].value === selectOptions['any']) {
              listResults.querySelectorAll('[style="display: flex;"]').forEach((el) => {
                el.style.display = 'flex';
                showDescriptiveTextAvailable();
              });
            } else {
              item.style.display = 'none';
              showDescriptiveTextAvailable();
            }
          }
        }
      }
    });
  });
};

const applyFilterToAd = (selectedAds, filterType) => {
  // Определяем тип фильтра
  if (filterType.classList.contains('filter__estate')) {
    // Фильтрация по чекбоксам (По типу недвижимости)
    const filterCheckboxesItems = filterType.querySelectorAll('[name="estate-type"]');
    const filterKeyType = 'type';
    checkboxFilter(selectedAds, filterCheckboxesItems, filterKeyType, PROPERTY_TYPE);

    // Фильтрация по полю ввода (Минимальная площадь кв.м.)
    const roomArea = document.querySelector('#square').value;
    const filterKeyArea = 'area';
    minSquare(filterKeyArea, roomArea);

    // Фильтрация по радиокнопкам (Количество комнат)
    const filterRadiobuttonsItems = filterType.querySelectorAll('[name="rooms"]');
    const filterKeyRoomsCount = 'rooms-count';
    radiobuttonFilter(filterRadiobuttonsItems, filterKeyRoomsCount, QUANTITY_ROOMS);
    // eslint-disable-next-line no-use-before-define
    sliderChoicePrice(minPriceFormatted, maxPriceFormatted);
  } else if (filterType.classList.contains('filter__laptop')) {
    // Фильтрация по чекбоксам (По типу ноутбука)
    const filterCheckboxesItems = filterType.querySelectorAll('[name="laptop-type"]');
    const filterKeyType = 'type';
    checkboxFilter(selectedAds, filterCheckboxesItems, filterKeyType, LAPTOP_TYPE);

    // Фильтрация по чекбоксам (По типу процессора)
    const filterCheckboxesItemsTypeProcessor = filterType.querySelectorAll('[name="laptop-processor"]');
    const filterKeyCpuType = 'cpu-type';
    checkboxFilterMoreOne(filterCheckboxesItemsTypeProcessor, filterKeyCpuType, TYPE_PROCESSOR);

    // Фильтрация по радиокнопкам (По объему оперативной памяти)
    const filterRadiobuttonsAmountRam = filterType.querySelectorAll('[name="ram"]');
    const filterKeyRamValue = 'ram-value';
    radiobuttonFilter(filterRadiobuttonsAmountRam, filterKeyRamValue, AMOUNT_RAM);

    // Фильтрация по радиокнопкам (По диагонали экрана)
    const filterRadiobuttonsScreenDiagonal = filterType.querySelectorAll('[name="diagonal"]');
    const filterKeyScreenSize = 'screen-size';
    radiobuttonFilter(filterRadiobuttonsScreenDiagonal, filterKeyScreenSize, DIAGONAL_SCREEN);
    // eslint-disable-next-line no-use-before-define
    sliderChoicePrice(minPriceFormatted, maxPriceFormatted);
  } else if (filterType.classList.contains('filter__camera')) {
    // Фильтрация по чекбоксам (По типу фотоаппарата)
    const filterCheckboxesItems = filterType.querySelectorAll('[name="camera-type"]');
    const filterKeyType = 'type';
    checkboxFilter(selectedAds, filterCheckboxesItems, filterKeyType, TYPE_CAMERA);

    // Фильтрация по селектам (По минимальному разрешению матрицы)
    const choosingMatrixResolution = document.querySelectorAll('#resolution-matrix option');
    const filterKeyMatrixResolution = 'matrix-resolution';
    selectFilter(choosingMatrixResolution, filterKeyMatrixResolution, MATRIX_RESOLUTION);

    // Фильтрация по селектам (По минимальному разрешению видео)
    const choosingVideoResolution = document.querySelectorAll('#resolution-video option');
    const filterKeySupporting = 'supporting';
    selectFilterAlternative(choosingVideoResolution, filterKeySupporting, VIDEO_RESOLUTION);
    // eslint-disable-next-line no-use-before-define
    sliderChoicePrice(minPriceFormatted, maxPriceFormatted);
  } else if (filterType.classList.contains('filter__car')) {
    // Фильтрация по чекбоксам (По типу кузова)
    const filterCheckboxesItems = filterType.querySelectorAll('[name="car-body"]');
    const filterKeyBodyType = 'body-type';
    checkboxFilter(selectedAds, filterCheckboxesItems, filterKeyBodyType, CAR_BODY_TYPE);

    // Фильтрация по селектам (Минимальный год выпуска)
    const choosingMinYearRelease = filterType.querySelectorAll('[name="car_year"] option');
    const filterKeyProductionYear = 'production-year';
    selectFilter(choosingMinYearRelease, filterKeyProductionYear, YEAR_RELEASE_CAR);

    // Фильтрация по радиокнопкам (По коробке передач)
    const filterRadiobuttonsItems = filterType.querySelectorAll('[name="transmission"]');
    const filterKeyTransmission = 'transmission';
    radiobuttonFilter(filterRadiobuttonsItems, filterKeyTransmission, TRANSMISSION_CAR);
    // eslint-disable-next-line no-use-before-define
    sliderChoicePrice(minPriceFormatted, maxPriceFormatted);
  }
};

// Сюда будут записываться минимальная и максимальная цена из слайдера
let minPriceFormatted = null;
let maxPriceFormatted = null;

const filterButtonClickHandler = (evt) => {
  evt.preventDefault();
  // ФИЛЬТРАЦИЯ ПО ЦЕНЕ В СЛАЙДЕРЕ
  const currentValue = mySlider.getValue();
  let minPriceDefault = '';
  let maxPriceDefault = '';

  // Записываю минимальную цену слайдера
  for (let i = 0; i < currentValue.length; i++) {
    if (currentValue[i] === ',') {
      break;
    } else {
      minPriceDefault += currentValue[i];
    }
  }

  // Записываю максимальную цену слайдера
  for (let i = currentValue.length - 1; i > 0; i--) {
    if (currentValue[i] === ',') {
      break;
    } else {
      maxPriceDefault += currentValue[i];
    }
  }

  // Делаю из строки число
  minPriceFormatted = Number(minPriceDefault);
  // Разбиваю строку на массив, переворачиваю массив в обратном порядке, объединяю массив в строку
  maxPriceFormatted = Number(maxPriceDefault.split('').reverse().join(''));

  // Создание коллекции из выбранных товаров
  let adsCollectionSelectedCategory = null;
  productCategories.forEach((option) => {
    if (option.textContent === 'Все' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('.results__item.product');
      // Проверка находятся ли объявления в выбранном диапазоне цен, если да, то показать,  остальные скрыть
      adsCollectionSelectedCategory.forEach((ad) => {
        const productPrice = Number(ad.querySelector('.product__price').textContent.replace(/[₽\s]/g, '').trim());
        if (productPrice >= minPriceFormatted && productPrice <= maxPriceFormatted ) {
          ad.style.display = 'flex';
        } else {
          ad.style.display = 'none';
        }
      });
    } else if (option.textContent === 'Недвижимость' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('[data-type=estate]');
      applyFilterToAd(adsCollectionSelectedCategory, filterEstate);
    } else if (option.textContent === 'Ноутбуки' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('[data-type=laptop]');
      applyFilterToAd(adsCollectionSelectedCategory, filterLaptop);
    } else if (option.textContent === 'Фотоаппараты' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('[data-type=camera]');
      applyFilterToAd(adsCollectionSelectedCategory, filterCamera);
    } else if (option.textContent === 'Автомобили' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('[data-type=car]');
      applyFilterToAd(adsCollectionSelectedCategory, filterCar);
    }
  });
};

filterButton.addEventListener('click', filterButtonClickHandler);

export {mySlider, productCategories, showDescriptiveTextAvailable};
