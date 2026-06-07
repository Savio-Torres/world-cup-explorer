import { useEffect } from "react";
import Flag from "./Flag";

function PlayerModal({ player, country, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!player || !country) return null;

  const playerClub =
    player.club && player.club.trim() !== "" ? player.club : "Não informado";

  const infoItems = [
    {
      label: "Seleção",
      value: country.name,
    },
    {
      label: "Posição",
      value: player.positionDetail || player.positionGroup || "Não informado",
    },
    {
      label: "Clube",
      value: playerClub,
    },
    {
      label: "Camisa na seleção",
      value: player.nationalNumber || player.number || "—",
    },
    {
      label: "Idade",
      value: player.age || "Não informado",
    },
    {
      label: "Altura",
      value: player.height || "Não informado",
    },
    {
      label: "Pé dominante",
      value: player.preferredFoot || "Não informado",
    },
    {
      label: "Rating",
      value: player.rating || "—",
    },
  ];

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div
        className="playerModalModern"
        onClick={(event) => event.stopPropagation()}
        style={{
          "--primary": country.primaryColor,
          "--secondary": country.secondaryColor,
          "--dark": country.darkColor,
        }}
      >
        <button
          type="button"
          className="modalCloseModern"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>

        <div className="playerModalVisual">
          <div className="playerModalVisualGlow" />

          <div className="playerModalNumberBadge">
            <span>#{player.nationalNumber || player.number || "—"}</span>
          </div>

          <div className="playerModalImageWrap">
            <img src={player.photo} alt={player.name} />
          </div>

          <div className="playerModalCountryBadge">
            <Flag
              countryId={country.id}
              countryName={country.name}
              className="playerModalCountryFlag"
            />

            <span>{country.name}</span>
          </div>
        </div>

        <div className="playerModalContent">
          <div className="playerModalTop">
            <span className="playerModalPosition">
              {player.positionGroup}
            </span>

            <h2>{player.name}</h2>

            <p>
              {player.importantInfo ||
                player.description ||
                `${player.name} faz parte da seleção ${country.name} nesta edição da Copa do Mundo.`}
            </p>
          </div>

          <div className="playerModalInfoGrid cleanModalGrid">
            {infoItems.map((item) => (
              <div className="playerModalInfoCard" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerModal;