/* eslint-disable no-unused-vars */
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorLookup } from './../src/doctorLookup.js';

$(document).ready(function(){
  $("#page-indices").hide();
  let totalFound;
  let count;
  let page=0;
  let userPage;

  $('#symptomSearch').submit(function(event){
    event.preventDefault();
    $("#page-indices").show();
    $('.search').text("");
    userPage = page+1;
    let symptom = $('#symptom').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findDoctorBySymptom(symptom,page);

    promise.then(function(response){
      let doctor = JSON.parse(response);
      totalFound = doctor.meta.total;
      count = 0;
      for (let i = 0; i < doctor.data.length; i++) {
        let website = doctor.data[i].practices[0].website;
        if  (!website) {
          website = { name: "N/A", href: "#"};
        } else {
          website = { name: website, href: website};
        }
        if (doctor.data[i].practices[0].accepts_new_patients === true ) {
          $('.search').append(
            `<div class="card available"><ul><img src="${doctor.data[i].profile.image_url}"><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently available</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div>`);
        } else {
          $('.search').append(
            `<div class="card unavailable"><ul><img src="${doctor.data[i].profile.image_url}"><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently Unavailable</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div>`);
        }
        count++;
      }
      if (totalFound === 0){
        $('.showCounter').text("No doctor found meeting critieria");
      } else {
        $('.showCounter').text("Found "+totalFound+" doctors" );
      }
      if(totalFound > 10) {

        $('#nextPage').click(function(){
          if(page < Math.ceil(totalFound/10)) {
            page += 1;
            $('#symptomSearch').submit();
          } else {
            alert("Last Page");
          }
        });

        $('#previousPage').click(function(){
          if (page > 0) {
            page -= 1;
            $('#symptomSearch').submit();
          } else {
            alert("First Page");
          }
        });
      }
    }, function(error) {
      $('.search').text(error.message);
    });
  });

  $('#nameSearch').submit(function(event){
    event.preventDefault();
    $("#page-indices").show();
    $('.search').text("");
    userPage = page+1;
    let name = $('#name').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findDoctorByName(name,page);

    promise.then(function(response){
      let doctor = JSON.parse(response);
      totalFound = doctor.meta.total;
      count = 0;
      for (let i = 0; i < doctor.data.length; i++) {
        let website = doctor.data[i].practices[0].website;
        if  (!website) {
          website = { name: "N/A", href: "#"};
        } else {
          website = { name: website, href: website};
        }
        if (doctor.data[i].practices[0].accepts_new_patients === true ) {
          $('.search').append(
            `<div class="card available"><ul><img src="${doctor.data[i].profile.image_url}"><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently available</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div>`);
        } else {
          $('.search').append(
            `<div class="card unavailable"><ul><img src="${doctor.data[i].profile.image_url}"><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently Unavailable</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div>`);
        }
        count++;
      }
      if (totalFound === 0){
        $('.showCounter').text("No doctor found meeting critieria");
      } else {
        $('.showCounter').text("Found "+totalFound+" doctors" );
      }
      if(totalFound > 10) {

        $('#nextPage').click(function(){
          if(page < Math.ceil(totalFound/10)) {
            page += 1;
            $('#nameSearch').submit();
          } else {
            alert("Last Page");
          }
        });

        $('#previousPage').click(function(){
          if (page > 0) {
            page -= 1;
            $('#nameSearch').submit();
          } else {
            alert("First Page");
          }
        });
      }
    }, function(error) {
      $('.search').text(error.message);
    });
  });

  $('#locationSearch').submit(function(event){
    event.preventDefault();
    $("#page-indices").show();
    $('.search').text("");
    userPage = page+1;
    let location = $('#location').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findDoctorByLocation(location,page);

    promise.then(function(response){
      let doctor = JSON.parse(response);
      totalFound = doctor.meta.total;
      count = 0;
      for (let i = 0; i < doctor.data.length; i++) {
        let website = doctor.data[i].practices[0].website;
        if  (!website) {
          website = { name: "N/A", href: "#"};
        } else {
          website = { name: website, href: website};
        }
        if (doctor.data[i].practices[0].accepts_new_patients === true ) {
          $('.search').append(
            `<div class="card available"><ul><img src="${doctor.data[i].profile.image_url}"><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently available</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div>`);
        } else {
          $('.search').append(
            `<div class="card unavailable"><ul><img src="${doctor.data[i].profile.image_url}"><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently Unavailable</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div>`);
        }
        count++;
      }
      if (totalFound === 0){
        $('.showCounter').text("No doctor found meeting critieria");
      } else {
        $('.showCounter').text("Found "+totalFound+" doctors" );
      }
      if(totalFound > 10) {

        $('#nextPage').click(function(){
          if(page < Math.ceil(totalFound/10)) {
            page += 1;
            $('#locationSearch').submit();
          } else {
            alert("Last Page");
          }
        });

        $('#previousPage').click(function(){
          if (page > 0) {
            page -= 1;
            $('#locationSearch').submit();
          } else {
            alert("First Page");
          }
        });
      }
    }, function(error) {
      $('.search').text(error.message);
    });
  });
});
