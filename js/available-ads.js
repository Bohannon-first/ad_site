import {getDataPublicationAd} from './util.js';

const QUANTITY_ADS_SHOWN = 7;
const listResults = document.querySelector('.results__list');
const QUANTITY_PHOTOS_SHOWN_PAGINATION = 5;

// Тут хранится массив объявлений, поступиший с сервера
let arrayAds = null;
// Объект с данными(объявлениями), поступивший с сервера
let objectWithAds = null;

// Создание пагинации и индикатора активной фотографии в блоке с фотографиями
const createPaginationPhotoElements = (item) => {
  const resultsItem = listResults.querySelectorAll('.results__item.product');
  const paginationContainer = resultsItem[resultsItem.length - 1].querySelector('.product__image-navigation');
  for (let i = 0; i < item.photos.length; i++) {
    if (i > QUANTITY_PHOTOS_SHOWN_PAGINATION - 1) {
      break;
    }
    const tabItemPagination = '<span class="product__navigation-item"></span>';
    paginationContainer.insertAdjacentHTML('beforeend', tabItemPagination);
  }

  paginationContainer.firstChild.classList.add('product__navigation-item--active');
};

// Обработчик наведения на пагинацию фотографий в объявлении (для общего списка)
const paginationPhotosBlockClickHandler = (evt) => {
  if (evt.target.matches('.product__navigation-item')) {
    const activeItemPagination = evt.target.closest('.product__navigation-item');
    const itemAd = evt.target.closest('.results__item.product');
    const navigationItems = itemAd.querySelectorAll('.product__navigation-item');
    navigationItems.forEach((item) => {
      item.classList.remove('product__navigation-item--active');
    });
    activeItemPagination.classList.add('product__navigation-item--active');

    // Перелистывание фотографий при наведении на табы
    let currentPhotosArray = null;
    arrayAds.forEach((ad) => {
      if (ad.name === itemAd.querySelector('.product__title a').textContent) {
        currentPhotosArray = ad.photos;
      }
    });

    // Поменять фотографию при наведении на таб
    if (activeItemPagination === navigationItems[0]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[0];
    } else if (activeItemPagination === navigationItems[1]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[1];
    } else if (activeItemPagination === navigationItems[2]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[2];
    } else if (activeItemPagination === navigationItems[3]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[3];
    } else if (activeItemPagination === navigationItems[4]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[4];
    }
  }
};

// Обработчик наведения на пагинацию фотографий в объявлении (для списка избранное)
const paginationPhotosBlockClickHandlerFavorite = (evt) => {
  if (evt.target.matches('.product__navigation-item')) {
    const activeItemPagination = evt.target.closest('.product__navigation-item');
    const itemAd = evt.target.closest('.favourites__item.product');
    const navigationItems = itemAd.querySelectorAll('.product__navigation-item');
    navigationItems.forEach((item) => {
      item.classList.remove('product__navigation-item--active');
    });
    activeItemPagination.classList.add('product__navigation-item--active');

    // Перелистывание фотографий при наведении на табы
    let currentPhotosArray = null;
    arrayAds.forEach((ad) => {
      if (ad.name === itemAd.querySelector('.product__title a').textContent) {
        currentPhotosArray = ad.photos;
      }
    });

    // Поменять фотографию при наведении на таб
    if (activeItemPagination === navigationItems[0]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[0];
    } else if (activeItemPagination === navigationItems[1]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[1];
    } else if (activeItemPagination === navigationItems[2]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[2];
    } else if (activeItemPagination === navigationItems[3]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[3];
    } else if (activeItemPagination === navigationItems[4]) {
      itemAd.querySelector('.product__image img').src = currentPhotosArray[4];
    }
  }
};

// Получаем доступные объявления
const getAvailableAds = (adObject) => {
  arrayAds = adObject.products;
  objectWithAds = adObject;
  // console.log(objectWithAds);
  console.log(arrayAds);

  // Создаем разметку для доступных объявлений
  adObject.products.forEach((element) => {
    const getAd = `<li class="results__item product">
      <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное" title="Добавить в избранное">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z"
            stroke="white" stroke-width="2" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="product__image">
        <div class="product__image-more-photo hidden">+${element.photos.length} фото</div>
        <img src="${element.photos[0]}" width="318" height="220"
          alt="${element.name}">
        <div class="product__image-navigation"></div>
      </div>
      <div class="product__content">
        <h3 class="product__title">
          <a href="#">${element.name}</a>
        </h3>
        <div class="product__price">${element.price.toLocaleString('ru')} ₽</div>
        <div class="product__address">${`${`${element.address.city },`} ${ element.address.street}`}</div>
        <div class="product__date" data-timestamp="${element['publish-date']
}">${getDataPublicationAd(element['publish-date'])}</div>
      </div>
    </li>`;

    listResults.insertAdjacentHTML('beforeend', getAd);
    createPaginationPhotoElements(element);
  });

  // Отобразить только 7 объявлений
  const resultsItemCollection = document.querySelectorAll('.results__item');
  let adCounter = null;
  for (let i = 0; i < resultsItemCollection.length; i++) {
    adCounter++;
    if (adCounter > QUANTITY_ADS_SHOWN) {
      resultsItemCollection[i].style.display = 'none';
    }
  }
};

listResults.addEventListener('mouseover', paginationPhotosBlockClickHandler);

export {getAvailableAds, listResults, arrayAds, objectWithAds, paginationPhotosBlockClickHandlerFavorite};
