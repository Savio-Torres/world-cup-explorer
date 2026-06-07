import playerPlaceholder from "../assets/images/player-placeholder.jpg";
import { playerDetails } from "./playerDetails";

const playerImages = import.meta.glob(
  [
    "../assets/players/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    "../assets/images/players/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  ],
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

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

function normalizeName(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/[^a-zA-Z0-9]/g, "")
    .trim()
    .toLowerCase();
}

function getFileNameWithoutExtension(path) {
  const fileName = path.split("/").pop() || "";
  return fileName.replace(/\.(jpg|jpeg|png|webp)$/i, "");
}

function getFolderName(path) {
  const parts = path.split("/");
  return parts[parts.length - 2] || "";
}

function parsePlayerText(text) {
  const cleanedText = text.trim();
  const match = cleanedText.match(/^(.+?)\s*\((.+?)\)$/);

  if (!match) {
    return {
      name: cleanedText,
      club: "",
    };
  }

  return {
    name: match[1].trim(),
    club: match[2].trim(),
  };
}

function getPlayerPhoto(countryId, playerName) {
  const normalizedCountryId = normalizeName(countryId);
  const normalizedPlayerName = normalizeName(playerName);

  const foundEntry = Object.entries(playerImages).find(([path]) => {
    const folderName = getFolderName(path);
    const fileNameWithoutExtension = getFileNameWithoutExtension(path);

    const normalizedFolder = normalizeName(folderName);
    const normalizedFileName = normalizeName(fileNameWithoutExtension);

    return (
      normalizedFolder === normalizedCountryId &&
      normalizedFileName === normalizedPlayerName
    );
  });

  if (!foundEntry) {
    console.warn(`Foto não encontrada: ${playerName} | pasta: ${countryId}`);
    return playerPlaceholder;
  }

  return foundEntry[1];
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

function getDefaultPositionDetail(positionGroup) {
  if (positionGroup === "Goleiro") return "Goleiro";
  if (positionGroup === "Defensor") return "Defensor";
  if (positionGroup === "Meia/Atacante") return "Meia/Atacante";

  return positionGroup || "Jogador";
}

function createPlayer(playerText, positionGroup, countryId, index) {
  const parsedPlayer = parsePlayerText(playerText);
  const playerSlug = slugify(parsedPlayer.name);

  const details = playerDetails?.[countryId]?.[playerSlug] || {};

  const nationalNumber = details.nationalNumber || index + 1;
  const rating = details.rating || getDeterministicRating(index, positionGroup);
  const positionDetail =
    details.positionDetail || getDefaultPositionDetail(positionGroup);

  const importantInfo =
    details.importantInfo ||
    `${parsedPlayer.name} faz parte da seleção nesta edição da Copa.`;

  return {
    id: `${countryId}-${playerSlug}`,
    slug: playerSlug,

    name: parsedPlayer.name,
    club: parsedPlayer.club,

    positionGroup,
    positionDetail,

    number: nationalNumber,
    nationalNumber,

    rating,

    age: details.age || "Não informado",
    height: details.height || "Não informado",
    preferredFoot: details.preferredFoot || "Não informado",
    birthPlace: details.birthPlace || "Não informado",
    importantInfo,

    photo: getPlayerPhoto(countryId, parsedPlayer.name),

    description: importantInfo,
  };
}

export function createCountry(countryId, meta, roster) {
  const goalkeepers = roster.goalkeepers || [];
  const defenders = roster.defenders || [];
  const midfieldersForwards = roster.midfieldersForwards || [];

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