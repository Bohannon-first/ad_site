/* eslint-disable no-use-before-define */
import {isEscEvent, isOverlayClick} from './util.js';
import {adToFavorites, favouritesAdsList} from './favourites-ads.js';

const popupFullAd = document.querySelector('.popup');
const btnClosePopupFullAd = popupFullAd.querySelector('.popup__close');
const popupSeller = popupFullAd.querySelector('.popup__seller.seller');
const productFeaturesList = popupFullAd.querySelector('.popup__chars.chars');

const RATING_GOOD = 4.8;
const RATING_AVERAGE = 4;

// Вешаем класс в зависимости от рейтинга объявления
const checkRating = (rating) => {
  popupSeller.classList.remove('seller--good', 'seller--average', 'seller--bad');
  if (rating >= RATING_GOOD) {
    popupSeller.classList.add('seller--good');
  } else if (rating >= RATING_AVERAGE && rating < RATING_GOOD) {
    popupSeller.classList.add('seller--average');
  } else {
    popupSeller.classList.add('seller--bad');
  }
};

// Закрыть попап с полным объявлением по клику на крестик
const closePopupFullAdd = () => {
  popupFullAd.style.display = 'none';
  popupFullAd.querySelector('.fav-add').classList.remove('fav-add--active');

  // Удаление обработчиков
  btnClosePopupFullAd.removeEventListener('click', closePopupFullAdd);
  document.removeEventListener('keydown', onPopupFullAdEscKeydown);
  document.removeEventListener('click', onPopupFullAdOverlayClick);
  popupFullAd.removeEventListener('click', adToFavorites);
};

// Проверка на нажатую кнопку Esc и закрытие попапа с объявлением
const onPopupFullAdEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopupFullAdd();
  }
};

// Проверка по клику на оверлей и закрытие попапа с объявлением
const onPopupFullAdOverlayClick = (evt) => {
  if (isOverlayClick(evt)) {
    evt.preventDefault();
    closePopupFullAdd();
  }
};

// Функция отрисовки особенностей товара
const createFeaturesProductList = (itemAd) => {
  productFeaturesList.innerHTML = '';
  // console.log(itemAd.filters);
  let formattedKey = null;

  for (const key in itemAd.filters) {

    // Недвижимость (ключи)
    if (itemAd.category === 'Недвижимость') {
      switch(key) {
        case 'type':
          formattedKey = 'Тип помещения';
          break;
        case 'area':
          formattedKey = 'Площадь';
          break;
        case 'rooms-count':
          formattedKey = 'Количество комнат';
          break;
      }
    }

    // Автомобили
    if (itemAd.category === 'Автомобиль') {
      switch(key) {
        case 'body-type':
          formattedKey = 'Тип кузова';
          break;
        case 'production-year':
          formattedKey = 'Год выпуска';
          break;
        case 'transmission':
          formattedKey = 'Коробка передач';
          break;
      }
    }

    // Ноутбуки
    if (itemAd.category === 'Ноутбук') {
      switch(key) {
        case 'cpu-type':
          formattedKey = 'Модель процессора';
          break;
        case 'ram-value':
          formattedKey = 'Оперативная память';
          break;
        case 'screen-size':
          formattedKey = 'Диагональ экрана';
          break;
        case 'type':
          formattedKey = 'Тип';
          break;
      }
    }

    // Фотоаппараты
    if (itemAd.category === 'Фотоаппарат') {
      switch (key) {
        case 'matrix-resolution':
          formattedKey = 'Разрешение матрицы';
          break;
        case 'supporting':
          formattedKey = 'Поддержка';
          break;
        case 'type':
          formattedKey = 'Тип камеры';
          break;
      }
    }

    const getFeature = `<li class="chars__item">
                          <div class="chars__name">${formattedKey}</div>
                          <div class="chars__value">${itemAd.filters[key]}</div>
                        </li>`;

    productFeaturesList.insertAdjacentHTML('beforeend', getFeature);
  }

  const keyValueCollection = popupFullAd.querySelectorAll('.chars__value');
  // Проходим по всем элементам со значениями ключей
  keyValueCollection.forEach((value) => {
    // Удалить характеристику товара, если о ней нет информации
    if (value.textContent === '-') {
      value.parentElement.remove();
      // Недвижимость
      // Меняем текст с английского на русский в элементах .chars__value
    } else if (value.textContent === 'flat') {
      value.textContent = 'квартира';
    } else if (value.textContent === 'apartment') {
      value.textContent = 'апартаменты';
    } else if (value.textContent === 'house') {
      value.textContent = 'дом';
      // Автомобили
    } else if (value.textContent === 'sedan') {
      value.textContent = 'седан';
    } else if (value.textContent === 'universal') {
      value.textContent = 'универсал';
    } else if (value.textContent === 'hatchback') {
      value.textContent = 'хэтчбек';
    } else if (value.textContent === 'suv') {
      value.textContent = 'внедорожник';
    } else if (value.textContent === 'auto') {
      value.textContent = 'автоматическая';
    } else if (value.textContent === 'mechanic') {
      value.textContent = 'механическая';
      // Ноутбуки
    } else if (value.textContent === 'home') {
      value.textContent = 'для дома';
    } else if (value.textContent === 'ultrabook') {
      value.textContent = 'ультрабук';
      // Фотоаппараты
    } else if (value.textContent === 'full-hd') {
      value.textContent = 'Full HD';
    } else if (value.textContent === 'slr') {
      value.textContent = 'зеркальная';
    } else if (value.textContent === 'digital') {
      value.textContent = 'цифровая';
    }
  });

  // Добавление к значениям характеристик товара единиц измения
  const featuresProduct = popupFullAd.querySelectorAll('.chars__item');
  featuresProduct.forEach((feature) => {
    if (feature.querySelector('.chars__name').textContent === 'Площадь') {
      feature.querySelector('.chars__value').textContent += ' м²';
    } else if (feature.querySelector('.chars__name').textContent === 'Оперативная память') {
      feature.querySelector('.chars__value').textContent += ' ГБ';
    } else if (feature.querySelector('.chars__name').textContent === 'Диагональ экрана') {
      feature.querySelector('.chars__value').textContent += '"';
    } else if (feature.querySelector('.chars__name').textContent === 'Модель процессора') {
      feature.querySelector('.chars__value').textContent = `Intel Core ${feature.querySelector('.chars__value').textContent}`;
    }
  });
};

// Функция отрисовки контента в полном объявлении
const createContentForFullAdd = (ads, currentAd, popup) => {
  ads.forEach((ad) => {
    if (ad.name === currentAd.querySelector('.product__title a').textContent) {
      const foundAd = ad;
      popup.querySelector('.popup__date').textContent = currentAd.querySelector('.product__date').textContent;
      popup.querySelector('.popup__title').textContent = foundAd.name;
      popup.querySelector('.popup__price').textContent = currentAd.querySelector('.product__price').textContent;
      popup.querySelector('.gallery__main-pic img').src = foundAd.photos[0];
      popup.querySelector('.gallery__main-pic img').srcset = '';
      popup.querySelector('.gallery__main-pic img').alt = foundAd.name;
      popup.querySelector('.seller__name').textContent = foundAd.seller.fullname;
      popup.querySelector('.seller__rating span').textContent = foundAd.seller.rating;
      checkRating(foundAd.seller.rating);
      popup.querySelector('.popup__description p').textContent = foundAd.description;
      popup.querySelector('.popup__address').textContent = `${`${`${foundAd.address.city },`} ${ foundAd.address.street} ${ foundAd.address.building}`}`;

      // Создаем разметку куда вставляем фотографии, полученные с сервера
      const galleryList = popup.querySelector('.gallery__list');
      galleryList.innerHTML = '';
      for (let i = 0; i < foundAd.photos.length; i++) {
        const getPhotoItem = `<li class="gallery__item">
        <img src="${foundAd.photos[i]}" srcset="" alt="${foundAd.name}" width="124" height="80">
      </li>`;
        galleryList.insertAdjacentHTML('beforeend', getPhotoItem);
      }
      galleryList.firstChild.classList.add('gallery__item--active');

      // Ловим клики на галерее с фотографиями, меняем контент большой фотки на миниатюру
      galleryList.addEventListener('click', (evt) => {
        const itemsGallery = galleryList.querySelectorAll('.gallery__item');
        itemsGallery.forEach((item) => {
          item.classList.remove('gallery__item--active');
        });
        if (evt.target.closest('.gallery__item')) {
          const clickedPhoto = evt.target.closest('.gallery__item');
          popup.querySelector('.gallery__main-pic img').src = clickedPhoto.querySelector('img').src;
          clickedPhoto.classList.add('gallery__item--active');
        }
      });

      // Сформировать список особенностей объявления
      createFeaturesProductList(ad);

      // Проверить является ли объявление в избранном
      if (currentAd.querySelector('.fav-add--active')) {
        popup.querySelector('.fav-add').classList.add('fav-add--active');
      }

      popup.style.display = 'block';
    }
  });

  // Обработчики закрытия попапа с объявлением
  btnClosePopupFullAd.addEventListener('click', closePopupFullAdd);
  document.addEventListener('keydown', onPopupFullAdEscKeydown);
  document.addEventListener('click', onPopupFullAdOverlayClick);
  // Обработчик клика по кнопке "Добавить в избранное"(сердечко)
  popup.addEventListener('click', adToFavorites);
};

// Открыть попап с полным объявлением
const openPopupFullAdd = (arrayAds) => {
  const adsCollection = document.querySelectorAll('.results__item.product');
  adsCollection.forEach((ad) => {
    ad.addEventListener('click', (evt) => {
      if (evt.target.matches('img') || evt.target.matches('.product__title a')) {
        const clickedAd = evt.target.closest('.results__item.product');
        createContentForFullAdd(arrayAds, clickedAd, popupFullAd);
      }
    });
  });
};

// Открыть попап с полным объявлением из раздела с избранным
const openPopupFullAddFromFavorites = (arrayAds) => {
  if (favouritesAdsList.children.length > 0) {
    const adsCollectionFromFavorites = document.querySelectorAll('.favourites__item.product');
    adsCollectionFromFavorites.forEach((favoriteAd) => {
      favoriteAd.addEventListener('click', (evt) => {
        if (evt.target.matches('img') || evt.target.matches('.product__title a')) {
          const clickedFavoriteAd = evt.target.closest('.favourites__item.product');
          createContentForFullAdd(arrayAds, clickedFavoriteAd, popupFullAd);
        }
      });
    });
  }
};

export {openPopupFullAdd, popupFullAd, openPopupFullAddFromFavorites};
