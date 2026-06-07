import { worldCupInfo, hostCountryIds, countries } from '../data/index.js';
import countriesService from './countriesService.js';
import matchesService from './matchesService.js';
import playersService from './playersService.js';

class WorldCupService {
  getInfo() {
    return {
      ...worldCupInfo,
      version: '2026',
      status: 'upcoming'
    };
  }

  getFullOverview() {
    return {
      info: this.getInfo(),
      stats: this.getStats(),
      hosts: this.getHosts(),
      schedule: matchesService.getScheduleStructure(),
      countriesOverview: {
        totalCountries: countriesService.getCountriesStats().totalCountries,
        hostCountries: hostCountryIds,
        continents: countriesService.getCountriesStats().continents
      },
      playersOverview: playersService.getPlayersStats(),
      matchesOverview: matchesService.getMatchesStats()
    };
  }

  getStats() {
    const countriesStats = countriesService.getCountriesStats();
    const playersStats = playersService.getPlayersStats();
    const matchesStats = matchesService.getMatchesStats();
    
    return {
      edition: {
        year: 2026,
        name: "FIFA World Cup 2026",
        host: "Canadá, Estados Unidos e México"
      },
      countries: countriesStats,
      players: playersStats,
      matches: matchesStats,
      venues: {
        total: 16,
        cities: 16,
        countries: 3
      }
    };
  }

  getHosts() {
    const hostCountries = countriesService.getHostCountries();
    return hostCountries.map(host => ({
      id: host.id,
      name: host.name,
      flag: host.flag,
      continent: host.continent,
      primaryColor: host.primaryColor,
      secondaryColor: host.secondaryColor,
      venues: this.getVenuesForHost(host.id),
      description: `${host.name} é um dos países-sede da Copa do Mundo 2026`
    }));
  }

  getVenuesForHost(countryId) {
    // Mapeamento simplificado de estádios por país
    const venues = {
      'canada': [
        { name: 'BC Place', city: 'Vancouver', capacity: 54500 },
        { name: 'BMO Field', city: 'Toronto', capacity: 40000 }
      ],
      'estados-unidos': [
        { name: 'MetLife Stadium', city: 'New Jersey', capacity: 82500 },
        { name: 'Rose Bowl', city: 'Los Angeles', capacity: 88500 },
        { name: 'AT&T Stadium', city: 'Dallas', capacity: 80000 }
      ],
      'mexico': [
        { name: 'Estadio Azteca', city: 'Cidade do México', capacity: 87500 },
        { name: 'Estadio BBVA', city: 'Monterrey', capacity: 53500 }
      ]
    };
    
    return venues[countryId] || [];
  }

  getSchedule() {
    return matchesService.getScheduleStructure();
  }

  getTimeline() {
    return {
      startDate: "2026-06-11",
      endDate: "2026-07-19",
      duration: "39 dias",
      phases: [
        {
          name: "Fase de Grupos",
          startDate: "2026-06-11",
          endDate: "2026-06-27",
          matches: 72
        },
        {
          name: "Mata-mata",
          startDate: "2026-06-29",
          endDate: "2026-07-15",
          matches: 31
        },
        {
          name: "Final",
          startDate: "2026-07-19",
          endDate: "2026-07-19",
          matches: 1
        }
      ]
    };
  }
}

export default new WorldCupService();
