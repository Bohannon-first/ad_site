import {showAlert} from './util.js';

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
      // console.log(jsonAds);
    })
    .catch((err) => showAlert(err));
};

export {getData};
