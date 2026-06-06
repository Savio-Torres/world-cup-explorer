import Flag from "./Flag";

function HostCountries({ hosts }) {
  return (
    <section className="sectionBlock">
      <div className="sectionHeader">
        <span className="sectionLabel">Países-sede</span>
        <h2>Três países, uma Copa gigante</h2>
        <p>
          A edição de 2026 será disputada na América do Norte, com jogos no
          Canadá, nos Estados Unidos e no México.
        </p>
      </div>

      <div className="hostGrid">
        {hosts.map((host) => (
          <article key={host.id} className="hostCard">
            <Flag
              countryId={host.id}
              countryName={host.name}
              className="hostFlagImage"
            />

            <h3>{host.name}</h3>
            <p>{host.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HostCountries;