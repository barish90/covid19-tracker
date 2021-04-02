const covidTracker = {};

covidTracker.showAll = (allCountries) => {
    allCountries.forEach((country) => {
        
        const allTable = `
        <tbody>
            <tr>
                <td>${country.location}</td>
                <td>${country.confirmed}</td>
                <td>${country.recovered}</td>
                <td>${country.active}</td>
                <td>${country.deaths}</td>
            </tr>
        </tbody>
        `;

        $(`.list`).append(allTable);

    });

}

covidTracker.showCountries = (countries) => {
        
        const countryTable = `
        <table>
            <thead>
                <tr>
                    <th>Country</th>
                     <th>Confirmed</th>
                    <th>Recovered</th>
                    <th>Active</th>
                    <th>Deaths</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${countries.location}</td>
                    <td>${countries.confirmed}</td>
                    <td>${countries.recovered}</td>
                    <td>${countries.active}</td>
                    <td>${countries.deaths}</td>
                </tr>
            </tbody>
      </table>
        `;

        $(`.cuntry-list`).append(countryTable);

}

covidTracker.deafultList = () => {
    $.ajax({
        url: `https://covid2019-api.herokuapp.com/v2/current`,
        
        method: `GET`,

        dataType: `json`,

    })
    .then((currentData) => {

        const covidArray = currentData.data;
        covidTracker.showAll(covidArray);
    });
console.log()
}
covidTracker.countrySearch = (searchTerm) => {
    $.ajax({
        url: `https://covid2019-api.herokuapp.com/v2/country/${searchTerm}`,
        
        method: `GET`,

        dataType: `json`,

        data: {

            location: searchTerm,
        }
    })
    .then((covidData) => {

        $('.cuntry-list').html('');

        const covidArray = covidData.data;
        covidTracker.showCountries(covidArray);
    });

}

covidTracker.init = () => {
    covidTracker.deafultList();

    $(`form`).on(`submit`, (event) => {


        event.preventDefault();

        const searchTerm = $(`#search-input`).val();

    covidTracker.countrySearch(searchTerm);
})
}

$(() => {

    covidTracker.init();
})
