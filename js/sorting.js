import {listResults, getAvailableAds, objectWithAds} from './available-ads.js';
import {areThereFavoritesAds} from './favourites-ads.js';
import {productCategories} from './filters.js';

const sortingListButtons = document.querySelector('.sorting__order-list');
const sortingButtons = sortingListButtons.querySelectorAll('.sorting__order-tab');

// Поставить модификатор на кнопку сортировки при нажатии
const setActiveButtonSorting = (event) => {
  sortingButtons.forEach((button) => {
    button.classList.remove('sorting__order-tab--active');
  });
  event.target.parentElement.classList.add('sorting__order-tab--active');
  listResults.innerHTML = '';
};

// Сортировка по популярности
const sortByPopularity = () => {
  const adsCollection = listResults.querySelectorAll('.results__item.product');
  productCategories.forEach((option) => {
    if (option.textContent === 'Все' && option.selected) {
      return false;
    } else if (option.textContent === 'Недвижимость' && option.selected) {
      adsCollection.forEach((ad) => {
        if (ad.closest('[data-type=estate]')) {
          ad.style.display = 'flex';
        } else {
          ad.style.display = 'none';
        }
      });
    } else if (option.textContent === 'Ноутбуки' && option.selected) {
      adsCollection.forEach((ad) => {
        if (ad.closest('[data-type=laptop]')) {
          ad.style.display = 'flex';
        } else {
          ad.style.display = 'none';
        }
      });
    } else if (option.textContent === 'Фотоаппараты' && option.selected) {
      adsCollection.forEach((ad) => {
        if (ad.closest('[data-type=camera]')) {
          ad.style.display = 'flex';
        } else {
          ad.style.display = 'none';
        }
      });
    } else if (option.textContent === 'Автомобили' && option.selected) {
      adsCollection.forEach((ad) => {
        if (ad.closest('[data-type=car]')) {
          ad.style.display = 'flex';
        } else {
          ad.style.display = 'none';
        }
      });
    }
  });
};

// Сортировка объявлений
const sortingListButtonsClickHandler = (evt) => {
  evt.preventDefault();

  // Сортировка по популярности (по умолчанию)
  if (evt.target.getAttribute('for') === 'sort-popular') {
    setActiveButtonSorting(evt);
    getAvailableAds(objectWithAds);
    sortByPopularity();
    areThereFavoritesAds();

    // Сортировка по цене
  } else if (evt.target.getAttribute('for') === 'sort-cheap') {
    evt.preventDefault();
    const listResultsAll = Array.from(listResults.children);
    listResultsAll.sort((currentAd, nextAd) => +currentAd.querySelector('.product__price').textContent.replace(/[₽\s]/g, '').trim() - +nextAd.querySelector('.product__price').textContent.replace(/[₽\s]/g, '').trim());
    setActiveButtonSorting(evt);
    listResultsAll.forEach((item) => {
      listResults.appendChild(item);
    });

    // Сортировка по дате публикации
  } else if (evt.target.getAttribute('for') === 'sort-new') {
    evt.preventDefault();
    const listResultsAll = Array.from(listResults.children);
    listResultsAll.sort((currentAd, nextAd) => +nextAd.querySelector('.product__date').dataset.timestamp - +currentAd.querySelector('.product__date').dataset.timestamp);
    setActiveButtonSorting(evt);
    listResultsAll.forEach((item) => {
      listResults.appendChild(item);
    });
  }
};

sortingListButtons.addEventListener('click', sortingListButtonsClickHandler);
