import axios from 'axios';

///////////////////////
// Elements
///////////////////////
const countryContainer = document.getElementById('countries');

///////////////////////
// Constructors
///////////////////////

const countryFlag = (country) => {
    return`
    <img src="${country.flags.png}" alt="${country.name}"/>
    `
};

const countryTittle = (country) => {
    return `
    <h3 class="${continentColor(country)}">${country.name} ${countryFlag(country)}</h3>
    `
};

const countryPopulation = (country) => {
    return `
    <div>
    Has a population of <span class="population">${country.population}</span> people
    </div>
`
};

const countryListItem = (country) => {
    return `
        <li class="countryListItem">
        ${countryTittle(country)}
        ${countryPopulation(country)}
        </li>
    `;
};


///////////////////////
// Manipulation
///////////////////////

const sortOnPopulation = (countries) => {
    countries.sort((a,b)=> a.population - b.population)
};

const continentColor = (countries) => {
    switch (countries.region) {
        case "Antarctic Ocean":
            return "light-gray";
        case "Antarctic":
            return "light-blue";
        case "Americas":
            return "green";
        case "Oceania":
            return "purple";
        case "Africa":
            return "blue";
        case "Europe":
            return "yellow";
        case "Polar":
            return "black";
        case "Asia":
            return "red";
    }
};

///////////////////////
// API Calls
///////////////////////

const getCountries = async () => {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        // Log all data
        console.log(result);
        // Log one country
        console.log(result.data[1].name)

        sortOnPopulation(result.data);

        // Get all continents
        const allContinents = result.data.map((country) => {
            return `
            ${country.region}`
        });
        // Get unique continents
        const uniqueContinents = [...new Set(allContinents)];
        console.log(uniqueContinents)

        const countryItemList = result.data.map((country) => {
            return `
            ${countryListItem(country)}
            `
        });
        countryContainer.innerHTML = `${countryItemList.join('')}`;

    } catch (err) {
        console.error(err);
    }
};

getCountries()
