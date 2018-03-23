import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { search } from './doctor-who.js';

$(document).ready(function() {
  function searchDoctors(searchString) {
    let promise = search(searchString);
    promise.then(function(response) {
      response.data.forEach(function(doctor) {
        $('.showResults').append(`<div class="well"><img src="${doctor.profile.image_url}">${doctor.profile.first_name} <br> ${doctor.profile.last_name} ${doctor.profile.title}<br>${doctor.profile.bio}<br>${doctor.visit_address.city}</div>`);
        console.log()
      });
    }, handleErrors);
  }
  $('#symptom').submit(function(event) {
    event.preventDefault();
    let searchString = $('#inputSymptom').val();
    $('#inputSymptom').val("");
    searchDoctors(searchString);
    console.log(searchString)
  });
});

  function handleErrors(error) {
  console.log('something went horribly wrong: ' + error);
}
