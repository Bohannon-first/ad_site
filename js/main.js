import './server.js';
import './util.js';
import './available-ads.js';
import {getData} from './server.js';
import {getAvailableAds} from './available-ads.js';

// const items = document.querySelectorAll('.filter__radiobuttons-item');
// console.log(items);
// items.forEach((item) => {
//   item.addEventListener(('click'), (evt) => {
//     evt.preventDefault();
//     console.log('Клик');
//   })
// });

getData(getAvailableAds);

// eslint-disable-next-line no-unused-vars
const mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});
