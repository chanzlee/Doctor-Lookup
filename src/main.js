/* eslint-disable no-unused-vars */
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorLookup } from './../src/doctorLookup.js';
import { parsePromise, page, totalFound, count } from './../src/parsePromise.js';

$(document).ready(function(){

  $("#page-indices").hide();

  // list of specialty to specialty form fields
  let specialtyLookup = new DoctorLookup();
  let specialtyPromise = specialtyLookup.getSpecialties();
  specialtyPromise.then(function(response){
    let specialty = JSON.parse(response);
    for (let i = 0; i < specialty.data.length; i++) {
      $("#specialtyCheck").append(
        `<option value="${specialty.data[i].uid}">${specialty.data[i].uid}</option>`
      );
      $("#specialtyCheck-mult").append(
        `<option value="${specialty.data[i].uid}">${specialty.data[i].uid}</option>`
      );
    }
  });

  //search by symptom
  $('#symptomSearch').submit(function(event){
    event.preventDefault();
    $("#page-indices").show();
    $('.search').text("");

    let symptom = $('#symptom').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findDoctorBySymptom(symptom,page);

    promise.then(function(response){

      parsePromise(response, "symptom");
    }, function(error) {
      $('.search').text(error.message);
    });
  });

  // Search by Name
  $('#nameSearch').submit(function(event){
    event.preventDefault();
    window.location.href='#auto-focus';
    $("#page-indices").show();
    $('.search').text("");

    let name = $('#name').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findDoctorByName(name,page);

    promise.then(function(response){
      parsePromise(response, "name");
    }, function(error) {
      $('.search').text(error.message);
    });
  });

  // Search by Location
  $('#locationSearch').submit(function(event){
    event.preventDefault();
    window.location.href='#auto-focus';
    $("#page-indices").show();
    $('.search').text("");

    let location = $('#location').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findDoctorByLocation(location,page);
    promise.then(function(response){
      parsePromise(response, "location");
    }, function(error) {
      $('.search').text(error.message);
    });
  });

  // Search by Specialty
  $('#specialtySearch').submit(function(event){
    event.preventDefault();
    window.location.href='#auto-focus';
    $("#page-indices").show();
    $('.search').text("");

    let specialty = $('#specialtyCheck').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findDoctorBySpecialty(specialty,page);
    promise.then(function(response){
      parsePromise(response, "specialty");
    }, function(error) {
      $('.search').text(error.message);
    });

  });

  //ultimate multiple criteria search
  $('#ultimateSearch').submit(function(event){
    event.preventDefault();
    window.location.href='#auto-focus';
    $("#page-indices").show();
    $('.search').text("");

    let symptom = $('#symptom-mult').val();
    let name = $('#name-mult').val();
    let location = $('#location-mult').val();
    let specialty = $('#specialtyCheck-mult').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findUltimateDoctor(symptom, name, location, specialty, page);

    promise.then(function(response){
      parsePromise(response, "ultimate");
    }, function(error) {
      $('.search').text(error.message);
    });
  });
});
