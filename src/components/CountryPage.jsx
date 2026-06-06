import Flag from "./Flag";
import PlayerCard from "./PlayerCard";

function CountryPage({ country, onBack, onSelectPlayer }) {
  const goalkeepers = country.players.filter(
    (player) => player.positionGroup === "Goleiro"
  );

  const defenders = country.players.filter(
    (player) => player.positionGroup === "Defensor"
  );

  const midfieldersForwards = country.players.filter(
    (player) => player.positionGroup === "Meia/Atacante"
  );

  return (
    <section
      className="countryPage"
      style={{
        "--primary": country.primaryColor,
        "--secondary": country.secondaryColor,
        "--dark": country.darkColor,
      }}
    >
      <div className="countryHeroNew">
        <div className="countryHeroBackground" />

        <div className="countryHeroLeft">
          <button className="backButton" onClick={onBack}>
            ← Seleções
          </button>

          <div className="countryHeroBadge">
            <Flag
              countryId={country.id}
              countryName={country.name}
              className="countryHeroBadgeFlag"
            />

            <span>{country.continent}</span>
          </div>

          <h1>{country.name}</h1>

          <p>
            Conheça os jogadores convocados para a seleção {country.name}. Veja
            o elenco separado por posição e clique em cada atleta para conferir
            mais detalhes.
          </p>

          <div className="countryStatsNew">
            <div>
              <strong>{country.totalPlayers}</strong>
              <span>Jogadores</span>
            </div>

            <div>
              <strong>{goalkeepers.length}</strong>
              <span>Goleiros</span>
            </div>

            <div>
              <strong>{defenders.length}</strong>
              <span>Defensores</span>
            </div>

            <div>
              <strong>{midfieldersForwards.length}</strong>
              <span>Meias/Atacantes</span>
            </div>
          </div>

          <a href="#elenco" className="countryHeroButton">
            Ver elenco completo
          </a>
        </div>

        <div className="countryHeroRight">
          <div className="countryFlagShowcase">
            <div className="countryFlagTop">
              <span>Seleção nacional</span>
              <strong>{country.name}</strong>
            </div>

            <Flag
              countryId={country.id}
              countryName={country.name}
              className="countryFlagShowcaseImage"
            />

            <div className="countryFlagBottom">
              <div>
                <span>Continente</span>
                <strong>{country.continent}</strong>
              </div>

              <div>
                <span>Elenco</span>
                <strong>{country.totalPlayers} atletas</strong>
              </div>

              <div>
                <span>Categoria</span>
                <strong>Seleção principal</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="elenco" className="playersAnchor" />

      <PlayerSection
        title="Goleiros"
        players={goalkeepers}
        country={country}
        onSelectPlayer={onSelectPlayer}
      />

      <PlayerSection
        title="Defensores"
        players={defenders}
        country={country}
        onSelectPlayer={onSelectPlayer}
      />

      <PlayerSection
        title="Meias e atacantes"
        players={midfieldersForwards}
        country={country}
        onSelectPlayer={onSelectPlayer}
      />
    </section>
  );
}

function PlayerSection({ title, players, country, onSelectPlayer }) {
  return (
    <section className="playersBlock">
      <div className="playersBlockHeader">
        <h2>{title}</h2>
        <span>{players.length} jogadores</span>
      </div>

      <div className="playersGrid">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            country={country}
            onClick={() => onSelectPlayer(player)}
          />
        ))}
      </div>
    </section>
  );
}

export default CountryPage;