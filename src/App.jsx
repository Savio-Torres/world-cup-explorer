import { useMemo, useState } from "react";
import { countries } from "./data/countries";
import Header from "./components/Header";
import WorldCupHome from "./components/WorldCupHome";
import CountryPage from "./components/CountryPage";
import PlayerModal from "./components/PlayerModal";
import "./index.css";

function App() {
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const selectedCountry = useMemo(() => {
    return countries.find((country) => country.id === selectedCountryId) || null;
  }, [selectedCountryId]);

  function handleSelectCountry(countryId) {
    setSelectedCountryId(countryId);
    setSelectedPlayer(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleGoHome() {
    setSelectedCountryId(null);
    setSelectedPlayer(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="app">
      <Header
        selectedCountry={selectedCountry}
        onGoHome={handleGoHome}
      />

      {!selectedCountry ? (
        <WorldCupHome
          countries={countries}
          onSelectCountry={handleSelectCountry}
        />
      ) : (
        <CountryPage
          country={selectedCountry}
          onBack={handleGoHome}
          onSelectPlayer={setSelectedPlayer}
        />
      )}

      {selectedPlayer && selectedCountry && (
        <PlayerModal
          player={selectedPlayer}
          country={selectedCountry}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </main>
  );
}

export default App;