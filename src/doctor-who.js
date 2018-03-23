import $ from 'jquery';

function doctorPromise(url) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.onload = function() {
      if (this.status === 200) {
        let response = JSON.parse(request.response);
        resolve(response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}

function search(symptom) {
   return doctorPromise(`https://api.betterdoctor.com/2016-03-01/doctors?query="${symptom}"&skip=0&limit=10&user_key=9e1947e14c6bebd693df05cce93cf411`);
}



export { search }
