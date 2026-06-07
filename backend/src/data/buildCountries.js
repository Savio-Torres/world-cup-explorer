// Versão adaptada para o backend - sem dependências de imagens locais

export function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function parsePlayerText(text) {
  const cleanedText = text.trim();
  const match = cleanedText.match(/^(.+?)\s*\((.+?)\)$/);

  if (!match) {
    return {
      name: cleanedText,
      club: "Clube não informado",
    };
  }

  return {
    name: match[1].trim(),
    club: match[2].trim(),
  };
}

function getPlayerPhoto(countryId, playerName) {
  // URL padrão para fotos de jogadores (placeholder)
  return `https://ui-avatars.com/api/?background=006847&color=fff&name=${encodeURIComponent(playerName)}&size=150`;
}

function getDeterministicRating(index, positionGroup) {
  const baseByPosition = {
    Goleiro: 76,
    Defensor: 74,
    "Meia/Atacante": 75,
  };

  const base = baseByPosition[positionGroup] || 72;
  const bonus = (index * 7) % 16;

  return Math.min(base + bonus, 92);
}

function createPlayer(playerText, positionGroup, countryId, index) {
  const parsedPlayer = parsePlayerText(playerText);

  return {
    id: slugify(parsedPlayer.name),
    name: parsedPlayer.name,
    club: parsedPlayer.club,
    positionGroup,
    number: index + 1,
    rating: getDeterministicRating(index, positionGroup),
    age: "-",
    height: "-",
    photo: getPlayerPhoto(countryId, parsedPlayer.name),
    description: `${parsedPlayer.name} faz parte da seleção nesta edição da Copa.`,
  };
}

export function createCountry(countryId, meta, roster) {
  const goalkeepers = roster?.goalkeepers || [];
  const defenders = roster?.defenders || [];
  const midfieldersForwards = roster?.midfieldersForwards || [];

  const players = [
    ...goalkeepers.map((player, index) =>
      createPlayer(player, "Goleiro", countryId, index)
    ),
    ...defenders.map((player, index) =>
      createPlayer(player, "Defensor", countryId, goalkeepers.length + index)
    ),
    ...midfieldersForwards.map((player, index) =>
      createPlayer(
        player,
        "Meia/Atacante",
        countryId,
        goalkeepers.length + defenders.length + index
      )
    ),
  ];

  return {
    id: countryId,
    ...meta,
    totalPlayers: players.length,
    players,
  };
}
