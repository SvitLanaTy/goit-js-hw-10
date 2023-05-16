import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import refs from './js/refs.js';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener(
  `input`,
  debounce(onSearchCountry, DEBOUNCE_DELAY)
);

function onSearchCountry(e) {
  const currentValue = e.target.value.trim();
  fetchCountries(currentValue)
    .then(data => {
      const quantityCountries = data.length;
      if (quantityCountries > 10) {
        Notiflix.Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
        clearMarkup();
      } else {
        if (quantityCountries > 1 && quantityCountries <= 10) {
          createCountryList(data);
        } else {
          if (quantityCountries === 1) {
            createCountryInfo(data);
          }
        }
      }
    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      clearMarkup();
    });
}

function createCountryInfo(data) {
  const markup = data
    .map(({ flags, capital, languages, population, name }) => {
      const languagesList = Object.values(languages).join(', ');
      return `<div class = "country-title">
            <img src="${flags.svg}" width="40" height="auto" alt="${flags.alt}">

          <h2>${name.official}</h2></div>
          <p>Capital:<span>${capital}</span></p>
          <p>Population:<span>${population}</span></p>
          <p>Languages:<span>${languagesList}</span></p>
          `;
    })
    .join('');
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = markup;
}

function createCountryList(data) {
  let markup = '';
  let flag;
  let country;

  data.forEach(element => {
    country = element.name.official;
    flag = element.flags.svg;
    markup += `<li>          
          <img src="${flag}" width="40" height="auto" alt="${country}">
          <p>${country}</p></li>
          `;
  });
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = markup;
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
