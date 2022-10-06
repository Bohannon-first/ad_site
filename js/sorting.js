import {listResults, arrayAds} from './available-ads.js';

const sortingListButtons = document.querySelector('.sorting__order-list');
const sortingButtons = sortingListButtons.querySelectorAll('.sorting__order-tab');

// Сортировка объявлений
const sortingListButtonsClickHandler = (evt) => {
  evt.preventDefault();

  sortingButtons.forEach((button) => {
    button.classList.remove('sorting__order-tab--active');
  });
  evt.target.parentElement.classList.add('sorting__order-tab--active');
  // Сортировка по популярности (по умолчанию)
  if (evt.target.getAttribute('for') === 'sort-popular') {
    listResults.innerHTML = '';
    Array.from(arrayAds).forEach((ad) => {
      listResults.appendChild(ad);
    });

    // Сортировка по цене
  } else if (evt.target.getAttribute('for') === 'sort-cheap') {
    evt.preventDefault();

    sortingButtons.forEach((button) => {
      button.classList.remove('sorting__order-tab--active');
    });
    evt.target.parentElement.classList.add('sorting__order-tab--active');
    const listResultsAll = Array.from(listResults.children);
    listResults.innerHTML = '';
    listResultsAll.sort((currentAd, nextAd) => +currentAd.querySelector('.product__price').textContent.replace('₽', '').trim() - +nextAd.querySelector('.product__price').textContent.replace('₽', '').trim());
    listResultsAll.forEach((item) => {
      listResults.appendChild(item);
    });


    // Сортировка по дате публикации
  } else if (evt.target.getAttribute('for') === 'sort-new') {
    evt.preventDefault();

    sortingButtons.forEach((button) => {
      button.classList.remove('sorting__order-tab--active');
    });
    evt.target.parentElement.classList.add('sorting__order-tab--active');
    const listResultsAll = Array.from(listResults.children);
    listResults.innerHTML = '';
    listResultsAll.sort((currentAd, nextAd) => +nextAd.querySelector('.product__date').dataset.timestamp - +currentAd.querySelector('.product__date').dataset.timestamp);

    listResultsAll.forEach((item) => {
      listResults.appendChild(item);
    });
  }
};

sortingListButtons.addEventListener('click', sortingListButtonsClickHandler);
