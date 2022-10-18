import './server.js';
import './util.js';
import './available-ads.js';
import './sorting.js';
import './popup-full-ad.js';
import './favourites-ads.js';

import {getData} from './server.js';
import {getAvailableAds} from './available-ads.js';

getData(getAvailableAds);

// eslint-disable-next-line no-unused-vars, no-undef
const mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

export {mySlider};
