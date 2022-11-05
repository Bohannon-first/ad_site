import {listResults, arrayAds, paginationPhotosBlockClickHandlerFavorite} from './available-ads.js';
import {mySlider} from './filters.js';
import {popupFullAd, openPopupFullAddFromFavorites, openPopupFullAdd} from './popup-full-ad.js';

const favouritesAdsBtn = document.querySelector('.sorting__favourites');
const favouritesAdsContainer = document.querySelector('.results__info.favourites');
const filterFieldset = document.querySelector('.filter__fieldset');
const sortingFieldset = document.querySelector('.sorting__order');
const favouritesAdsList = favouritesAdsContainer.querySelector('.favourites__list');
const DURATION_ANIMATION_DELETION_AD = 500;

// Обработчик клика на кнопку "Показать избранные"
const favouritesAdsBtnClickHandler = (evt) => {
  evt.preventDefault();

  favouritesAdsContainer.classList.toggle('hidden');
  listResults.classList.toggle('hidden');
  // При нажатии на кнопку "Показать избранные" блокируются фильтры и сортировка
  if (listResults.classList.contains('hidden')) {
    filterFieldset.setAttribute('disabled', 'disabled');
    sortingFieldset.setAttribute('disabled', 'disabled');
    mySlider.conf.disabled = true;
    document.querySelector('.rs-container').classList.add('disabled');
    // При выходе из избранного блокировка с фильтров и сортировки снимается
  } else {
    filterFieldset.removeAttribute('disabled');
    sortingFieldset.removeAttribute('disabled');
    mySlider.conf.disabled = false;
    document.querySelector('.rs-container').classList.remove('disabled');
  }

  // Открываем попап объявления из избранного
  openPopupFullAddFromFavorites(arrayAds);
};

favouritesAdsBtn.addEventListener('click', favouritesAdsBtnClickHandler);

// Добавить объявление в избранное
const adToFavorites = (evt) => {
  evt.preventDefault();
  // Клики по кнопке-сердца и окрашивание его в красный
  if (evt.target.closest('.fav-add')) {
    const clickedBtnFavourites = evt.target.closest('.fav-add');
    clickedBtnFavourites.classList.toggle('fav-add--active');
  }

  const ads = document.querySelectorAll('.results__item.product');
  // Клики в попапе и окрашивание кнопки-сердца в красный
  if (evt.target.closest('.popup') && popupFullAd.querySelector('.fav-add--active')) {
    ads.forEach((ad) => {
      if (popupFullAd.querySelector('.popup__title').textContent === ad.querySelector('.product__title a').textContent) {
        ad.querySelector('.fav-add').classList.add('fav-add--active');
      }
    });
  } else if (evt.target.closest('.popup') && !popupFullAd.querySelector('.fav-add--active')) {
    ads.forEach((ad) => {
      if (popupFullAd.querySelector('.popup__title').textContent === ad.querySelector('.product__title a').textContent) {
        ad.querySelector('.fav-add').classList.remove('fav-add--active');
      }
    });
  }

  // Добавление в избранное при клике по карточке объявления
  if (evt.target.closest('.fav-add--active') && evt.target.closest('.results__item.product')) {
    const favoriteAd = evt.target.closest('.results__item.product');
    const cloneFavoriteAd = favoriteAd.cloneNode(true);
    cloneFavoriteAd.setAttribute('class', 'favourites__item product');
    favouritesAdsList.appendChild(cloneFavoriteAd);
    // Удаление из избранного при клике по карточке объявления
  } else if (!evt.target.closest('.fav-add--active') && evt.target.closest('.results__item.product')) {
    const favoriteAdSCollection = favouritesAdsList.querySelectorAll('.favourites__item.product');
    favoriteAdSCollection.forEach((ad) => {
      if (evt.target.closest('.fav-add')) {
        if (evt.target.closest('.results__item.product').querySelector('.product__title a').textContent === ad.querySelector('.product__title a').textContent) {
          ad.remove();
        }
      }
    });
  }

  // Добавление в избранное при клике по попапу
  if (evt.target.closest('.fav-add--active') && evt.target.closest('.popup') && evt.target.closest('.fav-add')) {
    const popup = evt.target.closest('.popup');
    ads.forEach((ad) => {
      if (ad.querySelector('.product__title a').textContent === popup.querySelector('.popup__title').textContent) {
        const favoriteAd = ad;
        const cloneFavoriteAd = favoriteAd.cloneNode(true);
        cloneFavoriteAd.setAttribute('class', 'favourites__item product');
        favouritesAdsList.appendChild(cloneFavoriteAd);
      }
    });

    // Удаление из избранного при клике по попапу
  } else if (!evt.target.closest('.fav-add--active') && evt.target.closest('.popup') && evt.target.closest('.fav-add')) {
    const popup = evt.target.closest('.popup');
    const favoriteAdSCollection = favouritesAdsList.querySelectorAll('.favourites__item.product');
    favoriteAdSCollection.forEach((favoriteAd) => {
      if (favoriteAd.querySelector('.product__title a').textContent === popup.querySelector('.popup__title').textContent) {
        favoriteAd.style.animation = 'removeFavoriteAd 0.5s ease 0s 1 normal forwards';
        setTimeout(() => {
          favoriteAd.remove();
        }, DURATION_ANIMATION_DELETION_AD);
      }
    });
  }

  // Удаление объявлений из избранного
  if (evt.target.closest('.favourites__list') && evt.target.closest('.fav-add') && !evt.target.closest('.fav-add--active')) {
    // Анимация удаления
    evt.target.closest('.favourites__item.product').style.animation = 'removeFavoriteAd 0.5s ease 0s 1 normal forwards';
    setTimeout(() => {
      evt.target.closest('.favourites__item.product').remove();
    }, DURATION_ANIMATION_DELETION_AD);
    ads.forEach((ad) => {
      if (ad.querySelector('.product__title a').textContent === evt.target.closest('.favourites__item.product').querySelector('.product__title a').textContent) {
        ad.querySelector('.product__favourite.fav-add').classList.remove('fav-add--active');
      }
    });
  }

  // Проверка есть ли в избранном объявление
  // Если есть, то скрыть описательный текст внутри избранного
  if (favouritesAdsList.children.length > 0) {
    document.querySelector('.favourites__empty-message').classList.add('hidden');
    document.querySelector('.favourites__notion').classList.add('hidden');
  } else {
    document.querySelector('.favourites__empty-message').classList.remove('hidden');
    document.querySelector('.favourites__notion').classList.remove('hidden');
  }

  // Изменение значения атрибута title кнопки "Добавить в избранное"
  const addToFavoritesButtons = document.querySelectorAll('.fav-add');
  addToFavoritesButtons.forEach((button) => {
    if (button.classList.contains('fav-add--active')) {
      button.setAttribute('title', 'Удалить из избранного');
    } else {
      button.setAttribute('title', 'Добавить в избранное');
    }
  });
};

listResults.addEventListener('click', adToFavorites);
favouritesAdsList.addEventListener('click', adToFavorites);
favouritesAdsList.addEventListener('mouseover', paginationPhotosBlockClickHandlerFavorite);

// Проверка добавлены ли в "Избранное" объявления
const areThereFavoritesAds = () => {
  const allAdsCollection = listResults.querySelectorAll('.results__item.product');
  openPopupFullAdd(arrayAds);
  if (favouritesAdsList.children.length > 0) {
    Array.from(favouritesAdsList.children).forEach((child) => {
      allAdsCollection.forEach((ad) => {
        if (child.querySelector('.product__title a').textContent === ad.querySelector('.product__title a').textContent) {
          ad.querySelector('.fav-add').classList.add('fav-add--active');
        }
      });
    });
  }
};


export {adToFavorites, favouritesAdsList, areThereFavoritesAds, DURATION_ANIMATION_DELETION_AD};
