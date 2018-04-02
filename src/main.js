import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { search, searchName } from './doctor-who.js';

$(document).ready(function() {
  function searchDoctors(searchString, searchLocation) {
    let promise = search(searchString, searchLocation);
    promise.then(function(response) {
      if (response.data.length == 0){
        $('.showError').text('Im sorry there are no doctors available!');
      }
      response.data.forEach(function(doctor) {
        $('.doctors').text(`There are ${response.meta.total} doctor(s) that match your request`);
          $('.showResults').append(`<div class="col-md-6 center"><h3>${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}</h3><h5>${doctor.practices[0].visit_address.street}, ${doctor.practices[0].visit_address.city} ${doctor.practices[0].visit_address.state}</h5><p>Phone: ${doctor.practices[0].phones[0].number}</p><p>${doctor.practices[0].website}</p><p>${doctor.profile.bio}</p><p>Accepts New Patients: ${doctor.practices[0].accepts_new_patients}</p><hr></div>`);
        });
    }, handleErrors);
  }



  function searchByName(name) {
    let promise = searchName(name);
    promise.then(function(response) {
      if (response.data.length == 0){
        $('.showError').text('Im sorry there are no doctors available!');
      }
      response.data.forEach(function(doctor) {
        $('.showResults').append(`<div class="col-md-6 center"><h3>${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}</h3><h5>${doctor.practices[0].visit_address.street}, ${doctor.practices[0].visit_address.city} ${doctor.practices[0].visit_address.state}</h5><p>Phone: ${doctor.practices[0].phones[0].number}</p><p>${doctor.practices[0].website}</p><p>${doctor.profile.bio}</p><p>Accepts New Patients: ${doctor.practices[0].accepts_new_patients}</p><hr></div>`);
      }, handleErrors);
    });
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
    $('#searchName').val("");
    $(".showResults").empty();
    $(".doctors").empty();
    $(".showError").empty();
    searchDoctors(searchString, searchLocation);
  });

  $('#searchName').submit(function(event) {
    event.preventDefault();
    let searchName = $('#searchbar').val();
    $('#searchBar').val("");
    $(".showResults").empty();
    $(".doctors").empty();
    $(".showError").empty();
    searchByName(searchName);
  });
});
