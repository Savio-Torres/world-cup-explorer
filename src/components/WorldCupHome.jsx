import { worldCupInfo } from "../data/worldCupInfo";
import HostCountries from "./HostCountries";
import SchedulePreview from "./SchedulePreview";
import CountryGrid from "./CountryGrid";

import trophyImage from "../assets/images/trophy.png";

function WorldCupHome({ countries, onSelectCountry }) {
  return (
    <>
      <section className="homeHero">
        <div className="homeHeroOverlay" />

        <div className="homeHeroContent">
          <div className="homeHeroText">
            <span className="sectionLabel">FIFA World Cup 2026</span>

            <h1>
              A maior Copa
              <span> da história</span>
            </h1>

            <p>{worldCupInfo.description}</p>

            <div className="heroActions">
              <a href="#selecoes" className="primaryButton">
                Explorar seleções
              </a>

              <a href="#programacao" className="secondaryButton">
                Ver programação
              </a>
            </div>

            <div className="heroMiniInfo">
              <div>
                <strong>Canadá</strong>
                <span>País-sede</span>
              </div>

              <div>
                <strong>Estados Unidos</strong>
                <span>País-sede</span>
              </div>

              <div>
                <strong>México</strong>
                <span>País-sede</span>
              </div>
            </div>
          </div>

          <div className="homeHeroVisual">
            <div className="heroTrophyGlow" />

            <div className="homeHeroCard">
              <div className="trophyCircle">
                <img src={trophyImage} alt="Troféu da Copa do Mundo" />
              </div>

              <div className="homeHeroCardInfo">
                <span>2026</span>
                <strong>Canadá • Estados Unidos • México</strong>
                <p>48 seleções disputando a maior edição da história.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="statsSection">
        {worldCupInfo.stats.map((stat) => (
          <article key={stat.id} className="statCard">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <HostCountries hosts={worldCupInfo.hosts} />

      <SchedulePreview />

      <CountryGrid countries={countries} onSelectCountry={onSelectCountry} />
    </>
  );
}

export default WorldCupHome;