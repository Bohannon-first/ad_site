import {popupFullAd} from './popup-full-ad.js';

const ALERT_SHOW_TIME = 3000;

// Блок с возможной ошибкой запроса данных с сервера
const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.bottom = '400px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '100px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Ошибка загрузки данных. Что-то пошло  не так!';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция перевода из таймстамп с сервера даты публикации объявления
const getDataPublicationAd = (timestamp) => {
  const datePublish = new Date(+timestamp);
  const yearPublish = datePublish.getFullYear();
  let monthPublish = datePublish.getMonth();
  const dayPublish = datePublish.getDate();
  switch (monthPublish) {
    case 0:
      monthPublish = 'января';
      break;
    case 1:
      monthPublish = 'февраля';
      break;
    case 2:
      monthPublish = 'марта';
      break;
    case 3:
      monthPublish = 'апреля';
      break;
    case 4:
      monthPublish = 'мая';
      break;
    case 5:
      monthPublish = 'июня';
      break;
    case 6:
      monthPublish = 'июля';
      break;
    case 7:
      monthPublish = 'августа';
      break;
    case 8:
      monthPublish = 'сентября';
      break;
    case 9:
      monthPublish = 'октября';
      break;
    case 10:
      monthPublish = 'ноября';
      break;
    case 11:
      monthPublish = 'декабря';
      break;
  }
  const fullDatePublishAd = `${dayPublish} ${ monthPublish} ${ yearPublish} года`;
  return fullDatePublishAd;
};

// Проверка на нажатую кнопку Esc и клик по оверлею
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isOverlayClick = (evt) => evt.target === popupFullAd;

export {showAlert, getDataPublicationAd, isEscEvent, isOverlayClick};
