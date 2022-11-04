import './server.js';
import './util.js';
import './available-ads.js';
import './sorting.js';
import './popup-full-ad.js';
import './favourites-ads.js';
import './map.js';
import './filters.js';

import {getData} from './server.js';
import {getAvailableAds} from './available-ads.js';

getData(getAvailableAds);
