function PlayerModal({ player, country, onClose }) {
  return (
    <div className="modalBackdrop" onClick={onClose}>
      <section
        className="playerModal"
        onClick={(event) => event.stopPropagation()}
        style={{
          "--primary": country.primaryColor,
          "--secondary": country.secondaryColor,
          "--dark": country.darkColor,
        }}
      >
        <button className="modalClose" onClick={onClose}>
          Fechar
        </button>

        <div className="modalImageArea">
          <img src={player.photo} alt={player.name} />

          <div className="modalCountryBadge">
            <span>{country.flag}</span>
            <strong>{country.name}</strong>
          </div>
        </div>

        <div className="modalInfoArea">
          <span className="sectionLabel">{player.positionGroup}</span>

          <h2>{player.name}</h2>

          <p>{player.description}</p>

          <div className="modalInfoGrid">
            <div>
              <span>Clube</span>
              <strong>{player.club}</strong>
            </div>

            <div>
              <span>Camisa</span>
              <strong>{player.number}</strong>
            </div>

            <div>
              <span>Rating</span>
              <strong>{player.rating}</strong>
            </div>

            <div>
              <span>Seleção</span>
              <strong>{country.name}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayerModal;