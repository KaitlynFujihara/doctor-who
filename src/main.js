import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { search, searchName } from './doctor-who.js';

$(document).ready(function() {
  function searchDoctors(searchString, searchLocation) {
    let promise = search(searchString, searchLocation);
    promise.then(function(response) {
      response.data.forEach(function(doctor) {
        $('.showresults').text('');
        $('.showResults').append(`<div class="well">${doctor.profile.first_name} <br> ${doctor.profile.last_name} ${doctor.profile.title}<br>${doctor.profile.bio}<br>${doctor.practices.accepts_new_patients}</div>`);
      });
    }, handleErrors);
  }

  function searchByName(name) {
    let promise = searchName(name);
    promise.then(function(response) {
      response.data.forEach(function(doctor) {
        $('.showresults').text('');
        $('.showResults').append(`<div class="well">${doctor.profile.first_name} ${doctor.profile.last_name} ${doctor.profile.title}<br>${doctor.profile.bio}<br></div>`);
      });
    }, handleErrors);
  }

  function handleErrors(error) {
  $(".showError").text("I'm sorry there was an error! " + error);
  }

  $('#symptom').submit(function(event) {
    event.preventDefault();
    let searchString = $('#inputSymptom').val();
    let searchLocation = $('#inputLocation').val();
    $('#inputSymptom').val("");
    $('#inputLocation').val("");
    $(".showResults").empty();
    searchDoctors(searchString, searchLocation);
  });

  $('#searchName').submit(function(event) {
    event.preventDefault();
    let searchName = $('#searchbar').val();
    $('#searchBar').val("");
    $(".showResults").empty();
    searchByName(searchName);
  });
});
