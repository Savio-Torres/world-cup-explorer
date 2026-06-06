import { useMemo, useState } from "react";
import { hostCountryIds } from "../data/countriesMeta";
import Flag from "./Flag";

const filters = [
  "Todos",
  "América do Norte",
  "América do Sul",
  "Europa",
  "África",
  "Ásia",
  "Oceania",
];

function normalizeText(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function CountryGrid({ countries, onSelectCountry }) {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const hostCountries = countries.filter((country) =>
    hostCountryIds.includes(country.id)
  );

  const regularCountries = countries.filter(
    (country) => !hostCountryIds.includes(country.id)
  );

  const filteredCountries = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return regularCountries.filter((country) => {
      const matchesSearch = normalizeText(country.name).includes(normalizedSearch);

      const matchesFilter =
        selectedFilter === "Todos" || country.continent === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [regularCountries, search, selectedFilter]);

  return (
    <section className="sectionBlock countriesSection" id="selecoes">
      <div className="sectionHeader countriesHeader">
        <div>
          <span className="sectionLabel">Seleções</span>
          <h2>Escolha uma seleção</h2>
          <p>
            Comece pelos países-sede ou explore todas as seleções classificadas.
          </p>
        </div>

        <div className="countrySearchBox">
          <span>🔎</span>
          <input
            type="text"
            placeholder="Buscar seleção..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="countryGroup">
        <div className="countryGroupTitle">
          <span>Países-sede</span>
        </div>

        <div className="countriesGrid hostsCountriesGrid">
          {hostCountries.map((country) => (
            <CountryButton
              key={country.id}
              country={country}
              onSelectCountry={onSelectCountry}
              isHost
            />
          ))}
        </div>
      </div>

      <div className="filtersRow">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filterButton ${selectedFilter === filter ? "active" : ""}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="countryGroup">
        <div className="countryGroupTitle">
          <span>Outras seleções • {filteredCountries.length} encontradas</span>
        </div>

        {filteredCountries.length > 0 ? (
          <div className="countriesGrid">
            {filteredCountries.map((country) => (
              <CountryButton
                key={country.id}
                country={country}
                onSelectCountry={onSelectCountry}
              />
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <strong>Nenhuma seleção encontrada</strong>
            <p>Tente buscar por outro nome ou trocar o filtro.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function CountryButton({ country, onSelectCountry, isHost = false }) {
  return (
    <button
      className={`countryCard ${isHost ? "hostCountryCard" : ""}`}
      onClick={() => onSelectCountry(country.id)}
      style={{
        "--country-primary": country.primaryColor,
        "--country-secondary": country.secondaryColor,
      }}
    >
      <div className="countryCardTop">
        <Flag
          countryId={country.id}
          countryName={country.name}
          className="countryFlagImage"
        />

        {isHost && <span className="hostBadge">SEDE</span>}
      </div>

      <strong>{country.name}</strong>
      <small>{country.continent}</small>

      <div className="countryCardFooter">
        <span>{country.totalPlayers} jogadores</span>
        <span>Ver elenco →</span>
      </div>
    </button>
  );
}

export default CountryGrid;