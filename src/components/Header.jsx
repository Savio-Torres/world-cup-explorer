import Flag from "./Flag";

function Header({ selectedCountry, onGoHome }) {
  return (
    <header className="header">
      <button className="headerLogo" onClick={onGoHome}>
        <span className="headerLogoIcon">🏆</span>

        <span>
          <strong>World Cup Explorer</strong>
          <small>Copa do Mundo 2026</small>
        </span>
      </button>

      <nav className="headerNav">
        {selectedCountry && (
          <div className="currentCountryMini">
            <Flag
              countryId={selectedCountry.id}
              countryName={selectedCountry.name}
              className="currentCountryFlag"
            />
            <strong>{selectedCountry.name}</strong>
          </div>
        )}

        <button className="headerButton" onClick={onGoHome}>
          Início
        </button>
      </nav>
    </header>
  );
}

export default Header;