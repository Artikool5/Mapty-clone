'use strict';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const map = L.map('map').setView([latitude, longitude], 13);
      let marker;
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      const maptyIcon = L.icon({
        iconUrl: './icon.png',
        iconSize: [38, 38],
        iconAnchor: [20, 40],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94],
      });

      map.on('click', event => {
        const { lat, lng } = event.latlng;
        if (marker) {
          marker.remove();
          marker = L.marker([lat, lng], { icon: maptyIcon }).addTo(map);
          return;
        }
        marker = L.marker([lat, lng], { icon: maptyIcon }).addTo(map);
      });
    },
    positionError => {
      console.log(positionError.message);
    }
  );
}
