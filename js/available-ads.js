import {getDataPublicationAd} from './util.js';

const QUANTITY_ADS_SHOWN = 7;
const listResults = document.querySelector('.results__list');

// Тут хранится массив объявлений, поступиший с сервера
let arrayAds = null;
// Объект с данными(объявлениями), поступивший с сервера
let objectWithAds = null;

// Получаем доступные объявления
const getAvailableAds = (adObject) => {
  arrayAds = adObject.products;
  objectWithAds = adObject;
  // console.log(objectWithAds);
  // console.log(arrayAds);

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
        <img src="${element.photos[0]}" srcset="${element.photos[0]} 2x" width="318" height="220"
          alt="">
        <div class="product__image-navigation">
          <span class="product__navigation-item product__navigation-item--active"></span>
          <span class="product__navigation-item"></span>
          <span class="product__navigation-item"></span>
          <span class="product__navigation-item"></span>
          <span class="product__navigation-item"></span>
        </div>
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

export {getAvailableAds, listResults, arrayAds, objectWithAds};
