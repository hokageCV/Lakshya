// Background script

// URL for the API you want to call
const API_URL = 'https://api.quotable.io/random';

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
