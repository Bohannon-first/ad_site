// Карта
let myMap = null;
// Зум карты
const MAIN_ZOOM = 15;
// Главная метка
const MAIN_PIN = './img/icon-main-pin.png';
// Размеры главной метки
const MAIN_PIN_SIZE = {
  width: 32,
  height: 32,
};

const init = (coordinatesOnMap) => {
  // eslint-disable-next-line no-undef
  myMap = new ymaps.Map('popup__map', {
    center: [coordinatesOnMap[0], coordinatesOnMap[1]],
    zoom: MAIN_ZOOM,
    controls: ['zoomControl']
  });

  // eslint-disable-next-line no-undef
  const myPlacemark = new ymaps.Placemark([coordinatesOnMap[0], coordinatesOnMap[1]], {}, {
    iconLayout: 'default#image',
    iconImageHref: MAIN_PIN,
    iconImageSize: [MAIN_PIN_SIZE.width, MAIN_PIN_SIZE.height],
    iconImageOffset: [-16, -32]
  });

  myMap.geoObjects.add(myPlacemark);
};

export {init, myMap};
