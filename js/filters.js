import {arrayAds, listResults} from './available-ads.js';

const choosingProductCategory = document.querySelector('#categories');
const productCategories = document.querySelectorAll('#categories option');
const filterEstate = document.querySelector('.filter__estate');
const filterCamera = document.querySelector('.filter__camera');
const filterLaptop = document.querySelector('.filter__laptop');
const filterCar = document.querySelector('.filter__car');
const myFilters = document.querySelectorAll('.filter__item');
const filterButton = document.querySelector('.button.filter__button');
const hiddenInputSlider = document.querySelector('#sampleSlider');
let mySlider = null;

// eslint-disable-next-line no-undef
const defaultSlider = new rSlider({
  target: '#sampleSlider',
  values: {min: 9000, max: 30000000},
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 100000
});

// Шаг слайдера
const SLIDER_STEP_PRODUCT = {
  ALL: 80000,
  ESTATE: 80000,
  LAPTOP: 2000,
  CAMERA: 2000,
  CAR: 25000
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
  if (defaultSlider) {
    defaultSlider.destroy();
  } if (mySlider) {
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

// Запуск через сеттаймаут, чтобы успел сформироваться массив с объявлениями(arrayAds)
setTimeout(() => {
  choosingProductCategoryClickHandler();
}, 1200);

choosingProductCategory.addEventListener('change', choosingProductCategoryClickHandler);

const filterButtonClickHandler = (evt) => {
  evt.preventDefault();
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
  const minPriceFormatted = Number(minPriceDefault);
  // Разбиваю строку на массив, переворачиваю массив в обратном порядке, объединяю массив в строку
  const maxPriceFormatted = Number(maxPriceDefault.split('').reverse().join(''));

  // Создание коллекции из выбранных товаров
  let adsCollectionSelectedCategory = null;
  productCategories.forEach((option) => {
    if (option.textContent === 'Все' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('.results__item.product');
    } else if (option.textContent === 'Недвижимость' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('[data-type=estate]');
    } else if (option.textContent === 'Ноутбуки' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('[data-type=laptop]');
    } else if (option.textContent === 'Фотоаппараты' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('[data-type=camera]');
    } else if (option.textContent === 'Автомобили' && option.selected) {
      adsCollectionSelectedCategory = listResults.querySelectorAll('[data-type=car]');
    }
  });

  // Проверка находятся ли объявления в выбранном диапазоне цен
  adsCollectionSelectedCategory.forEach((ad) => {
    const productPrice = Number(ad.querySelector('.product__price').textContent.replace(/[₽\s]/g, '').trim());
    if (productPrice >= minPriceFormatted && productPrice <= maxPriceFormatted ) {
      ad.style.display = 'flex';
    } else {
      ad.style.display = 'none';
    }
  });
};

filterButton.addEventListener('click', filterButtonClickHandler);

export {mySlider, productCategories};
