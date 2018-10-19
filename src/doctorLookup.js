/* eslint-disable no-unused-vars */
var Promise = require('es6-promise').Promise;

export class DoctorLookup{
  findDoctor(symptom, name, location, page){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${symptom}&location=or-portland&skip=${page}&limit=10&user_key=${process.env.exports.apiKey}`;


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
    return this.findDoctor(symptom,"","",page);
  }

  findDoctorByName(name,page) {
    return this.findDoctor("",name,"",page);
  }

  findDoctorByLocation(location,page) {
    return this.findDoctor("","",location,page);
  }
}
