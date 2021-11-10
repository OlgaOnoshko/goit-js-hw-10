export default function fetchCountries (countryNameInput) {
    return fetch(`https://restcountries.com/v2/name/${countryNameInput}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

