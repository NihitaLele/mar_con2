document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  getImageOfTheDay(currentDate);
  updateDateHeading(currentDate); 
}

function getImageOfTheDay(date) {
  fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=rUy1JN21DUEfor02Uhr4PPbWa4tTP4RSDemcrJ1e`)
    .then(response => response.json())
    .then(data => {
      displayImage(data);
      saveSearch(date);
      addSearchToHistory(); 
    })
    .catch(error => console.error('Error fetching image:', error));
}

function displayImage(data) {
  const imageContainer = document.getElementById('current-image-container');
  imageContainer.innerHTML = `
    <h2 id="image-title" class="white-text">${data.title}</h2>
    <img src="${data.url}" id="current-image" alt="${data.title}">
    <p id="image-description" class="white-text">${data.explanation}</p>
  `;
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
  const searchHistory = document.getElementById('search-history');
  searchHistory.innerHTML = '';

  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.forEach(search => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = search;
    link.href = '#'; 
    link.classList.add('search-link');
    link.addEventListener('click', () => {
      getImageOfTheDay(search);
      toggleImageVisibility(true); 
      updateDateHeading(search); 
    });
    listItem.appendChild(link);
    searchHistory.appendChild(listItem);
  });
}

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const date = document.getElementById('search-input').value;
  getImageOfTheDay(date);
  updateDateHeading(date); 
  toggleImageVisibility(true); 
});

function updateDateHeading(date) {
  const dateHeading = document.getElementById('current-date-heading');
  dateHeading.textContent = `Picture on ${date}`;
}

function toggleImageVisibility(show) {
  const imageContainer = document.getElementById('current-image-container');
  if (show) {
    imageContainer.style.display = 'block';
  } else {
    imageContainer.style.display = 'none';
  }
}
