/* eslint-disable no-unused-vars */
import $ from 'jquery';
import { DoctorLookup } from './../src/doctorLookup.js';

let totalFound;
let count;
let page;

export function parsePromise (response, searchCriteria) {
  let body = JSON.parse(response);
  totalFound = body.meta.total;
  count = 0;
  for (let i = 0; i < body.data.length; i++) {
    let website = body.data[i].practices[0].website;
    // if website value is undefined, print N/A
    if  (!website) {
      website = { name: "N/A", href: "#"};
    } else {
      website = { name: website, href: website};
    }
    if (body.data[i].practices[0].accepts_new_patients === true ) {
      $('.search').append(
        `<div class="card available"><ul><img src="${body.data[i].profile.image_url}"><div class="card-body><li class ="bodyName">${body.data[i].profile.first_name}  ${body.data[i].profile.last_name}, ${body.data[i].profile.title}</li>
        <li>Currently available</li>
        <li>Gender: ${body.data[i].profile.gender}</li>
        <li>Address:  ${body.data[i].practices[0].visit_address.street}, ${body.data[i].practices[0].visit_address.city}</li>
        <li>Phone: ${body.data[i].practices[0].phones[0].number}</li>
        <li>Website:<a href="${website.href}">${website.name}</a></li>
        <li>Biography: ${body.data[i].profile.bio}</li></ul></div></div>`);
    } else {
      $('.search').append(
        `<div class="card unavailable"><ul><img src="${body.data[i].profile.image_url}"><div class="card-body><li class ="bodyName">${body.data[i].profile.first_name}  ${body.data[i].profile.last_name}, ${body.data[i].profile.title}</li>
        <li>Currently Unavailable</li>
        <li>Gender: ${body.data[i].profile.gender}</li>
        <li>Address:  ${body.data[i].practices[0].visit_address.street}, ${body.data[i].practices[0].visit_address.city}</li>
        <li>Phone: ${body.data[i].practices[0].phones[0].number}</li>
        <li>Website:<a href="${website.href}">${website.name}</a></li>
        <li>Biography: ${body.data[i].profile.bio}</li></ul></div></div>`);
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
        $('#${searchCriteria}Search').submit();
      } else {
        alert("Last Page");
      }
    });

    $('#previousPage').click(function(){
      if (page > 0) {
        page -= 1;
        $(`#${searchCriteria}Search`).submit();
      } else {
        alert("First Page");
      }
    });
  }

  $(`#relatedDoctor`).click(function(){
    document.getElementById(`${searchCriteria}`).value = "lung";
    $(`#${searchCriteria}Search`).submit();
  });
}
