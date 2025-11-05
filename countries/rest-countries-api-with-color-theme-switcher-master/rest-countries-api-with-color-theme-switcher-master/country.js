document.addEventListener("DOMContentLoaded", () => {
  const countryName = new URLSearchParams(location.search).get("name");
  const flagImage = document.querySelector(".country-details img");
  const countryNameEl = document.querySelector(".country-details h1");
  const nativeNameP = document.querySelector(".nativename");
  const populationP = document.querySelector(".population");
  const regionP = document.querySelector(".region");
  const subregionP = document.querySelector(".subregion");
  const capitalP = document.querySelector(".capital");
  const domainP = document.querySelector(".Domain");
  const currenciesP = document.querySelector(".currencies");
  const languagesP = document.querySelector(".language");
  const bordersContainer = document.querySelector(".border-countries");

  if (!countryName) return;

  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
      flagImage.src = country.flags.svg;
      countryNameEl.textContent = country.name.common;

      const native = country.name.nativeName
        ? Object.values(country.name.nativeName)[0].common
        : country.name.common;

      nativeNameP.innerHTML = `<b>Native Name:</b> ${native}`;
      populationP.innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;
      regionP.innerHTML = `<b>Region:</b> ${country.region}`;
      subregionP.innerHTML = `<b>Sub Region:</b> ${country.subregion || "N/A"}`;
      capitalP.innerHTML = `<b>Capital:</b> ${country.capital?.[0] || "N/A"}`;
      domainP.innerHTML = `<b>Top Level Domain:</b> ${country.tld?.[0] || "N/A"}`;

      if (country.currencies) {
        const currencyNames = Object.values(country.currencies).map((c) => c.name);
        currenciesP.innerHTML = `<b>Currencies:</b> ${currencyNames.join(", ")}`;
      }

      if (country.languages) {
        const languages = Object.values(country.languages).join(", ");
        languagesP.innerHTML = `<b>Languages:</b> ${languages}`;
      }

      if (country.borders) {
        country.borders.forEach((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
              const tag = document.createElement("a");
              tag.href = `country.html?name=${borderCountry.name.common}`;
              tag.textContent = borderCountry.name.common;
              bordersContainer.append(tag);
            });
        });
      }
    })
    .catch((err) => console.error("Error fetching country:", err));
});
