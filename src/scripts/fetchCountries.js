import Notiflix from 'notiflix';
const URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'flags,name,capital,population,languages';

export function fetchCountries(name) {
  return fetch(`${URL}${name}?fields=${FIELDS}`).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    } else if (response.status === 404) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
