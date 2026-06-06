import { useState } from "react";
import Flag from "./Flag";
import {
  finalMatches,
  groupStageMatches,
  knockoutMatches,
  openingMatches,
} from "../data/matches";

const stageTabs = [
  {
    id: "opening",
    label: "Abertura",
    description: "Primeiro jogo da Copa do Mundo 2026.",
    matchDays: openingMatches,
  },
  {
    id: "groups",
    label: "Fase de grupos",
    description: "Jogos confirmados da primeira fase.",
    matchDays: groupStageMatches,
  },
  {
    id: "knockout",
    label: "Mata-mata",
    description: "16 avos, oitavas, quartas e semifinais.",
    matchDays: knockoutMatches,
  },
  {
    id: "final",
    label: "Final",
    description: "Disputa do terceiro lugar e grande final.",
    matchDays: finalMatches,
  },
];

function SchedulePreview() {
  const [openedStageId, setOpenedStageId] = useState(null);

  function handleToggleStage(stageId) {
    setOpenedStageId((currentStageId) =>
      currentStageId === stageId ? null : stageId
    );
  }

  return (
    <section className="sectionBlock scheduleSection" id="programacao">
      <div className="sectionHeader">
        <span className="sectionLabel">Programação</span>
        <h2>Jogos da Copa</h2>
        <p>
          Clique em uma fase para abrir a lista de jogos. As fases ainda não
          definidas aparecem como “A definir”.
        </p>
      </div>

      <div className="scheduleAccordion">
        {stageTabs.map((stage) => {
          const isOpen = openedStageId === stage.id;

          return (
            <article
              key={stage.id}
              className={`scheduleAccordionItem ${isOpen ? "active" : ""}`}
            >
              <button
                type="button"
                className="scheduleAccordionHeader"
                onClick={() => handleToggleStage(stage.id)}
              >
                <div>
                  <span className="sectionLabel">{stage.label}</span>
                  <h3>{stage.description}</h3>
                </div>

                <strong>{isOpen ? "Fechar" : "Ver jogos"}</strong>
              </button>

              {isOpen && (
                <div className="matchesBoard accordionMatchesBoard">
                  <div className="matchDaysList">
                    {stage.matchDays.map((day) => (
                      <section key={day.dateLabel} className="matchDayBlock">
                        <div className="matchDayTitle">
                          <strong>{stage.label}</strong>
                          <span>• {day.dateLabel}</span>
                        </div>

                        <div className="matchDayGrid">
                          {day.matches.map((match) => (
                            <MatchCard key={match.id} match={match} />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MatchCard({ match }) {
  return (
    <article className="matchCard">
      <div className="matchGroup">{match.group}</div>

      <div className="matchCardContent">
        <div className="teamsList">
          <TeamLine team={match.home} />
          <TeamLine team={match.away} />
        </div>

        <div className="matchInfo">
          <strong>{match.date}</strong>
          <span>{match.time}</span>
        </div>
      </div>
    </article>
  );
}

function TeamLine({ team }) {
  return (
    <div className="teamLine">
      {team.countryId ? (
        <Flag
          countryId={team.countryId}
          countryName={team.name}
          className="matchFlag"
        />
      ) : (
        <span className="matchFlagPlaceholder">?</span>
      )}

      <span>{team.name}</span>
    </div>
  );
}

export default SchedulePreview;