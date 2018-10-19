/* eslint-disable no-unused-vars */
var Promise = require('es6-promise').Promise;

export class Geocode{
  findLngLat(placeName){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url =
      `http://api.geonames.org/postalCodeSearchJSON?placename=${placeName}&maxRows=1&username=goenchan`

      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
