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
      let doctor = JSON.parse(response);
      totalFound = doctor.meta.total;
      count = 0;
      for (let i = 0; i < doctor.data.length; i++) {
        let website = doctor.data[i].practices[0].website;
        // if website value is undefined, print N/A
        if  (!website) {
          website = { name: "N/A", href: "#"};
        } else {
          website = { name: website, href: website};
        }
        if (doctor.data[i].practices[0].accepts_new_patients === true ) {
          $('.search').append(
            `<div class="card available"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently available</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        } else {
          $('.search').append(
            `<div class="card unavailable"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently Unavailable</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        }
        count++;
      }
      // Not found / Error handlers
      if (totalFound === 0){
        $('.totalFound').html(`<p>No doctor found meeting critieria</p>`);
      } else {
        $('.totalFound').html(`<p>Found ${totalFound} Doctors</p>` );
      }

      //If there are more then 10 searched items, enable page controllers.
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

      $('#relatedDoctor').click(function(){
        document.getElementById("symptom").value = "lung";
        $('#symptomSearch').submit();
      });

    }, function(error) {
      $('.search').text(error.message);
    });
  });

  // Search by Name
  $('#nameSearch').submit(function(event){
    event.preventDefault();
    $("#page-indices").show();
    $('.search').text("");

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
            `<div class="card available"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently available</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        } else {
          $('.search').append(
            `<div class="card unavailable"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently Unavailable</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        }
        count++;
      }
      if (totalFound === 0){
        $('.totalFound').html(`<p>No doctor found meeting critieria</p>`);
      } else {
        $('.totalFound').html(`<p>Found ${totalFound} Doctors</p>` );
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

      $('#relatedDoctor').click(function(){
        document.getElementById("name").value = "chan";
        $('#nameSearch').submit();
      });

    }, function(error) {
      $('.search').text(error.message);
    });
  });

  // Search by Location
  $('#locationSearch').submit(function(event){
    event.preventDefault();
    $("#page-indices").show();
    $('.search').text("");

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
            `<div class="card available"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently available</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        } else {
          $('.search').append(
            `<div class="card unavailable"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently Unavailable</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        }
        count++;
      }
      if (totalFound === 0){
        $('.totalFound').html(`<p>No doctor found meeting critieria</p>`);
      } else {
        $('.totalFound').html(`<p>Found ${totalFound} Doctors</p>` );
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

      $('#relatedDoctor').click(function(){
        document.getElementById("location").value = "seattle";
        $('#locationSearch').submit();
      });

    }, function(error) {
      $('.search').text(error.message);
    });
  });

  // Search by Specialty
  $('#specialtySearch').submit(function(event){
    event.preventDefault();
    $("#page-indices").show();
    $('.search').text("");

    let specialty = $('#specialtyCheck').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findDoctorBySpecialty(specialty,page);
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
            `<div class="card available"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently available</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        } else {
          $('.search').append(
            `<div class="card unavailable"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently Unavailable</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        }
        count++;
      }
      if (totalFound === 0){
        $('.totalFound').html(`<p>No doctor found meeting critieria</p>`);
      } else {
        $('.totalFound').html(`<p>Found ${totalFound} Doctors</p>` );
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

      $('#relatedDoctor').click(function(){
        document.getElementById("specialty").value = "oral-surgeon";
        $('#locationSearch').submit();
      });

    }, function(error) {
      $('.search').text(error.message);
    });

  });

  //ultimate multiple criteria search
  $('#ultimateSearch').submit(function(event){
    event.preventDefault();
    $("#page-indices").show();
    $('.search').text("");

    let symptom = $('#symptom-mult').val();
    let name = $('#name-mult').val();
    let location = $('#location-mult').val();
    let specialty = $('#specialtyCheck-mult').val();
    let doctorLookup = new DoctorLookup();
    let promise = doctorLookup.findUltimateDoctor(symptom, name, location, specialty, page);

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
            `<div class="card available"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently available</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        } else {
          $('.search').append(
            `<div class="card unavailable"><ul><img src="${doctor.data[i].profile.image_url}"><div class="card-body><li class ="doctorName">${doctor.data[i].profile.first_name}  ${doctor.data[i].profile.last_name}, ${doctor.data[i].profile.title}</li>
            <li>Currently Unavailable</li>
            <li>Gender: ${doctor.data[i].profile.gender}</li>
            <li>Address:  ${doctor.data[i].practices[0].visit_address.street}, ${doctor.data[i].practices[0].visit_address.city}</li>
            <li>Phone: ${doctor.data[i].practices[0].phones[0].number}</li>
            <li>Website:<a href="${website.href}">${website.name}</a></li>
            <li>Biography: ${doctor.data[i].profile.bio}</li></ul></div></div>`);
        }
        count++;
      }
      if (totalFound === 0){
        $('.totalFound').html(`<p>No doctor found meeting critieria</p>`);
      } else {
        $('.totalFound').html(`<p>Found ${totalFound} Doctors</p>` );
      }

      //If there are more then 10 searched items, enable page controllers.
      if(totalFound > 10) {

        $('#nextPage').click(function(){
          if(page < Math.ceil(totalFound/10)) {
            page += 1;
            $('#ultimateSearch').submit();
          } else {
            alert("Last Page");
          }
        });

        $('#previousPage').click(function(){
          if (page > 0) {
            page -= 1;
            $('#ultimateSearch').submit();
          } else {
            alert("First Page");
          }
        });
      }

      $('#relatedDoctor').click(function(){
        document.getElementById("location").value = "new york";
        $('#ultimateSearch').submit();
      });

    }, function(error) {
      $('.search').text(error.message);
    });
  });
});
