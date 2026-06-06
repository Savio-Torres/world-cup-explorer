const flagCodes = {
  "canada": "ca",
  "estados-unidos": "us",
  "mexico": "mx",
  "africa-do-sul": "za",
  "alemanha": "de",
  "arabia-saudita": "sa",
  "argelia": "dz",
  "argentina": "ar",
  "australia": "au",
  "austria": "at",
  "belgica": "be",
  "bosnia": "ba",
  "brasil": "br",
  "cabo-verde": "cv",
  "catar": "qa",
  "colombia": "co",
  "coreia-do-sul": "kr",
  "costa-do-marfim": "ci",
  "croacia": "hr",
  "curacao": "cw",
  "egito": "eg",
  "equador": "ec",
  "escocia": "gb-sct",
  "espanha": "es",
  "franca": "fr",
  "gana": "gh",
  "haiti": "ht",
  "holanda": "nl",
  "inglaterra": "gb-eng",
  "ira": "ir",
  "iraque": "iq",
  "japao": "jp",
  "jordania": "jo",
  "marrocos": "ma",
  "noruega": "no",
  "nova-zelandia": "nz",
  "panama": "pa",
  "paraguai": "py",
  "portugal": "pt",
  "rd-congo": "cd",
  "republica-tcheca": "cz",
  "senegal": "sn",
  "suecia": "se",
  "suica": "ch",
  "tunisia": "tn",
  "turquia": "tr",
  "uruguai": "uy",
  "uzbequistao": "uz",
};

function Flag({ countryId, countryName, className = "" }) {
  const code = flagCodes[countryId];

  if (!code) {
    return (
      <span className={`flagFallback ${className}`}>
        🏳️
      </span>
    );
  }

  return (
    <img
      className={`flagImage ${className}`}
      src={`https://flagcdn.com/w160/${code}.png`}
      alt={`Bandeira de ${countryName}`}
      loading="lazy"
    />
  );
}

export default Flag;