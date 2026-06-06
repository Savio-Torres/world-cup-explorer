export const worldCupInfo = {
  name: "Copa do Mundo 2026",
  officialName: "FIFA World Cup 2026",
  subtitle: "A maior Copa da história, sediada por três países da América do Norte.",

  stats: [
    {
      id: "teams",
      value: "48",
      label: "Seleções",
    },
    {
      id: "matches",
      value: "104",
      label: "Partidas",
    },
    {
      id: "hosts",
      value: "3",
      label: "Países-sede",
    },
    {
      id: "groups",
      value: "12",
      label: "Grupos",
    },
  ],

  description:
    "A Copa do Mundo 2026 será disputada no Canadá, Estados Unidos e México, reunindo 48 seleções em um novo formato com 12 grupos de 4 equipes.",

  hosts: [
    {
      id: "canada",
      name: "Canadá",
      flag: "🇨🇦",
      description: "Um dos três países-sede da Copa de 2026.",
    },
    {
      id: "estados-unidos",
      name: "Estados Unidos",
      flag: "🇺🇸",
      description: "País que receberá grande parte dos jogos do torneio.",
    },
    {
      id: "mexico",
      name: "México",
      flag: "🇲🇽",
      description: "Sede da abertura e país histórico em Copas do Mundo.",
    },
  ],

  schedule: [
    {
      id: "opening",
      title: "Abertura",
      date: "11 de junho de 2026",
      description: "Início oficial da competição.",
      games: [
        {
          id: "opening-1",
          title: "Jogo de abertura",
          match: "México x Adversário a definir",
          stage: "Fase de grupos",
          date: "11 de junho de 2026",
          place: "Estádio a definir",
        },
      ],
    },

    {
      id: "groups",
      title: "Fase de grupos",
      date: "11 a 27 de junho de 2026",
      description: "As 48 seleções disputam 12 grupos com 4 equipes.",
      games: [
        {
          id: "groups-1",
          title: "Rodada 1",
          match: "Grupos A até L",
          stage: "Primeira rodada",
          date: "11 a 17 de junho de 2026",
          place: "Canadá, Estados Unidos e México",
        },
        {
          id: "groups-2",
          title: "Rodada 2",
          match: "Grupos A até L",
          stage: "Segunda rodada",
          date: "18 a 23 de junho de 2026",
          place: "Canadá, Estados Unidos e México",
        },
        {
          id: "groups-3",
          title: "Rodada 3",
          match: "Grupos A até L",
          stage: "Terceira rodada",
          date: "24 a 27 de junho de 2026",
          place: "Canadá, Estados Unidos e México",
        },
      ],
    },

    {
      id: "round32",
      title: "Mata-mata",
      date: "A partir de 28 de junho de 2026",
      description: "Começa a fase eliminatória com 32 seleções.",
      games: [
        {
          id: "round32-1",
          title: "16 avos de final",
          match: "32 seleções classificadas",
          stage: "Primeira fase eliminatória",
          date: "28 de junho a 3 de julho de 2026",
          place: "Estádios da Copa",
        },
        {
          id: "round16-1",
          title: "Oitavas de final",
          match: "16 seleções classificadas",
          stage: "Oitavas",
          date: "4 a 7 de julho de 2026",
          place: "Estádios da Copa",
        },
        {
          id: "quarter-1",
          title: "Quartas de final",
          match: "8 seleções classificadas",
          stage: "Quartas",
          date: "9 a 11 de julho de 2026",
          place: "Estádios da Copa",
        },
        {
          id: "semi-1",
          title: "Semifinais",
          match: "4 seleções classificadas",
          stage: "Semifinal",
          date: "14 e 15 de julho de 2026",
          place: "Estádios da Copa",
        },
      ],
    },

    {
      id: "final",
      title: "Final",
      date: "19 de julho de 2026",
      description: "A grande decisão da Copa do Mundo.",
      games: [
        {
          id: "third-place",
          title: "Disputa do 3º lugar",
          match: "Perdedor semifinal 1 x Perdedor semifinal 2",
          stage: "Terceiro lugar",
          date: "18 de julho de 2026",
          place: "Estádio a definir",
        },
        {
          id: "final-1",
          title: "Final da Copa",
          match: "Vencedor semifinal 1 x Vencedor semifinal 2",
          stage: "Final",
          date: "19 de julho de 2026",
          place: "New York/New Jersey",
        },
      ],
    },
  ],
};