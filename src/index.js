import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import refs from './scripts/refs.js';
import { fetchCountries } from './scripts/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
console.log(refs.searchBoxEl);
