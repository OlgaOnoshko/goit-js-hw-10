import fetchCountries from "./fetchCountries.js"
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
// import countryList from "./countryListTemplate.hbs"


const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-info');


searchBox.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
    e.preventDefault();
    
    
    const countryNameInput = searchBox.value.trim();
    console.log(countryNameInput);
    

    fetchCountries(countryNameInput).then(data => {
        console.log(data);
        
        
        if (data.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        } if (data.status === 404) {
            Notify.failure('Oops, there is no country with that name.');
            return;
        }
        if (data.length > 2 & data.length < 10) {
            addCountryList(data);
        };
        addCountry(data);
    })
   
}

  
function addCountry([{ flags, name, capital, population, languages }]) {
    const langList = languages.map(language => language.name);
      
    countryContainer.innerHTML = `<div class="country-markup">
  <div class="content">
  <img src="${flags.svg}" class="flag" alt="country-flag" width="30px" height="20px" />
  <p class="country-name">${name}</p>  
  </div>
    <ul class="country-info">
      <li>Capital: <span>${capital}</span></li>
      <li>Population: <span>${population}</span></li>
      <li>Languages: <span>${langList}</span></li>
    </ul>
</div>`
   
};

function addCountryList([{ flags, name }]) {
    console.log([{ flags, name }]);
    
};


// <div class="country-list-markup">
//   <img src="${flags.svg}" class="flag" alt="country-flag" width="30px" height="20px" />
//   <p class="country-name">${name}</p>
// </div>

// data.forEach([{ flags, name }] => {
//         countryContainer.innerHTML += '<div class="country-list-markup">
//     <img src="${flags.svg}" class="flag" alt="country-flag" width="30px" height="20px" />
//     <p class="country-name">${name}</p>
//     </div>`}
        
//     });