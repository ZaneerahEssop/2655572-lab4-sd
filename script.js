async function fetchCountryInfo() {
    const countryName = document.getElementById('countryInput').value.trim();
    if (!countryName) {
        alert('Please enter a country name.');
        return;
    }

    const countryInfoSection = document.getElementById('country-info');
    const borderingCountriesSection = document.getElementById('bordering-countries');
  
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) {
            throw new Error('Country not found.');
        }
        
        const data = await response.json();
        const country = data[0];
        const { capital, population, region, flags, borders } = country;
        
        countryInfoSection.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${region}</p>
            <img src="${flags.svg}" alt="Flag of ${country.name.common}" width="100">
        `;

        if (borders && borders.length > 0) {
            borderingCountriesSection.innerHTML = '<h3>Bordering Countries:</h3>';
            for (const border of borders) {
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                if (borderResponse.ok) {
                    const borderData = await borderResponse.json();
                    const borderCountry = borderData[0];
                    borderingCountriesSection.innerHTML += `
                        <section>
                            <p><strong>${borderCountry.name.common}</strong></p>
                            <img src="${borderCountry.flags.svg}" alt="Flag of ${borderCountry.name.common}">
                        </section>
                    `;
                }
            }
        } else {
            borderingCountriesSection.innerHTML = '<p>No bordering countries found.</p>';
        }
    } catch (error) {
        countryInfoSection.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
