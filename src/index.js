import fetchCountries from "./fetchCountries.js"
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-info');

searchBox.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
    e.preventDefault();
        
    const countryNameInput = searchBox.value.trim();
    console.log(countryNameInput);
    
    fetchCountries(countryNameInput).then(data => {
        countryContainer.innerHTML = ""
        console.log(data);
                
        if (data.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            inputReset();
        } if (data.status === 404) {
            Notify.failure('Oops, there is no country with that name.');
            inputReset();
        }
        if (data.length > 2 && data.length < 10) {
            addCountryList(data);
            inputReset();
        }
        if (data.length === 1) {
            addCountry(data);
            inputReset();
        };
    })
}
  
function addCountry([{ flags, name, capital, population, languages }]) {
    const langList = languages.map(language => language.name).join(", ");
    countryContainer.innerHTML = `<div class="country-markup">
  <div class="content">
  <div class="country-name"><img src="${flags.svg}" class="flag" alt="country-flag" width="30px" height="20px" />
  <p class="country-name">${name}</p>
  </div>
  </div>
    <ul class="country-info">
      <li><span class="title">Capital: </span><span>${capital}</span></li>
      <li><span class="title">Population: </span><span>${population}</span></li>
      <li><span class="title">Languages: </span><span>${langList}</span></li>
    </ul>
</div>`
};
    
function addCountryList(countries) {
    for (const country of countries) {
        const { flags, name } = country;
        const markup = `<div class="country-name">
  <img src="${flags.svg}" class="flag" alt="country-flag" width="30px" height="20px" />
  <p class="country-name">${name}</p>
</div>`;
        countryContainer.innerHTML += markup;
    }
};

function inputReset() {
    searchBox.value = "";
}
    
