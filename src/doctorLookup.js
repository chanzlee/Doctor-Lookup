/* eslint-disable no-unused-vars */
var Promise = require('es6-promise').Promise;
import {Geocode} from './geocode.js';

export class DoctorLookup{
  findDoctor(symptom, name, location, specialty, page){
    location = location || "or-portland";
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${symptom}&location=${location}&skip=${page}&limit=10&user_key=${process.env.exports.apiKey}&specialty_uid=${specialty}`;


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

  findDoctorBySymptom(symptom,page) {
    return this.findDoctor(symptom,"","","",page);
  }

  findDoctorByName(name,page) {
    return this.findDoctor("",name,"","",page);
  }

  findDoctorByLocation(location,page) {
    let self = this;
    let newGeocode = new Geocode();
    let geoPromise = newGeocode.findLngLat(location);
    let locationKey = "";
    return geoPromise.then(function(response){
      let geoBody = JSON.parse(response);
      let lng = geoBody.postalCodes[0].lng.toString();
      let lat = geoBody.postalCodes[0].lat.toString();
      locationKey = lat+","+lng+","+10;

      let docPromise = self.findDoctor("","",locationKey,"",page);
      return docPromise;
    });
  }

  findDoctorBySpecialty (specialty,page) {
    return this.findDoctor("","","wa-seattle",specialty,page);
  }

  findUltimateDoctor (symptom, name, location, specialty, page) {
    location = location || "or-portland";
    let self = this;
    let newGeocode = new Geocode();
    let geoPromise = newGeocode.findLngLat(location);
    let locationKey = "";
    return geoPromise.then(function(response){
      let geoBody = JSON.parse(response);
      let lng = (geoBody.postalCodes[0].lng).toString();
      let lat = (geoBody.postalCodes[0].lat).toString();
      locationKey = lat+","+lng+","+10;
      let docPromise = self.findDoctor(symptom, name, locationKey, specialty, page);
      return docPromise;
    });
  }


  getSpecialties() {
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `   https://api.betterdoctor.com/2016-03-01/specialties?skip=0&user_key=${process.env.exports.apiKey}`;

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
