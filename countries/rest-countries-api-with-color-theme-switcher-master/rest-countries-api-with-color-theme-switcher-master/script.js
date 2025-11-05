const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-region");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");

let allCountriesData = [];

fetch("https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    renderCountries(data);
  });

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country");
    countryCard.href = `country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />
      <div class="card-content">
        <h3>${country.name.common}</h3>
        <p><b>Population:</b> ${country.population.toLocaleString("en-IN")}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital?.[0] || "N/A"}</p>
      </div>
    `;
    countriesContainer.append(countryCard);
  });
}

filterByRegion.addEventListener("change", (e) => {
  const region = e.target.value;
  const filtered =
    region === "" ? allCountriesData : allCountriesData.filter((c) => c.region === region);
  renderCountries(filtered);
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = allCountriesData.filter((c) =>
    c.name.common.toLowerCase().includes(value)
  );
  renderCountries(filtered);
});

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
