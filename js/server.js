import {showAlert} from './util.js';
import {openPopupFullAdd} from './popup-full-ad.js';

const getData = (onSuccess) => {

  fetch('https://main-shop-fake-server.herokuapp.com/db')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((jsonAds) => {
      onSuccess(jsonAds);
      openPopupFullAdd(jsonAds.products);
    })
    .catch((err) => showAlert(err));
};

export {getData};
