function PlayerCard({ player, country, onClick }) {
  return (
    <button
      className="playerCard"
      onClick={onClick}
      style={{
        "--primary": country.primaryColor,
        "--secondary": country.secondaryColor,
      }}
    >
      <div className="playerImageBox">
        <img src={player.photo} alt={player.name} />

        <span className="playerPosition">{player.positionGroup}</span>
      </div>

      <div className="playerCardContent">
        <div>
          <h3>{player.name}</h3>

          {player.club && player.club.trim() !== "" && (
            <p>{player.club}</p>
          )}
        </div>

        {player.number && (
          <span
            className="playerNumber"
            style={{
              background: `linear-gradient(135deg, ${country.primaryColor}, ${country.secondaryColor})`,
            }}
          >
            {player.number}
          </span>
        )}
      </div>
    </button>
  );
}

export default PlayerCard;