import { 
  countries, 
  countriesMeta, 
  hostCountryIds,
  processedData 
} from '../data/index.js';

class CountriesService {
  getAllCountries() {
    return processedData.getCountriesWithPlayers();
  }

  getCountryById(id) {
    const country = countries.find(c => c.id === id);
    if (!country) return null;
    
    // Adicionar metadados e partidas do país
    const metadata = countriesMeta[id];
    const matches = this.getCountryMatches(id);
    
    return {
      ...country,
      metadata: metadata || null,
      matches: matches,
      totalPlayers: country.players?.length || 0
    };
  }

  getCountryMatches(countryId) {
    const allMatches = processedData.getAllMatches();
    return allMatches.filter(match => 
      (match.home && match.home.countryId === countryId) || 
      (match.away && match.away.countryId === countryId)
    );
  }

  getCountriesByContinent(continent) {
    return countries.filter(country => 
      country.continent && country.continent.toLowerCase() === continent.toLowerCase()
    );
  }

  getHostCountries() {
    const hosts = countries.filter(country => hostCountryIds.includes(country.id));
    return hosts.map(host => ({
      ...host,
      isHost: true,
      metadata: countriesMeta[host.id]
    }));
  }

  getNonHostCountries() {
    return countries.filter(country => !hostCountryIds.includes(country.id));
  }

  getCountryMeta(id) {
    return countriesMeta[id] || null;
  }

  searchCountries(query) {
    const searchLower = query.toLowerCase();
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchLower) ||
      (country.continent && country.continent.toLowerCase().includes(searchLower))
    );
  }

  getCountriesGroupedByContinent() {
    const grouped = {};
    countries.forEach(country => {
      const continent = country.continent || 'Outros';
      if (!grouped[continent]) grouped[continent] = [];
      grouped[continent].push({
        ...country,
        totalPlayers: country.players?.length || 0
      });
    });
    return grouped;
  }

  getCountriesStats() {
    const totalPlayers = countries.reduce((sum, country) => 
      sum + (country.players?.length || 0), 0
    );
    
    const continents = [...new Set(countries.map(c => c.continent).filter(Boolean))];
    
    return {
      totalCountries: countries.length,
      totalHosts: hostCountryIds.length,
      totalPlayers: totalPlayers,
      continents: continents,
      continentCount: continents.length,
      countriesByContinent: continents.map(continent => ({
        continent,
        count: countries.filter(c => c.continent === continent).length
      }))
    };
  }

  getCountryPlayers(id) {
    const country = countries.find(c => c.id === id);
    if (!country) return [];
    
    const players = country.players || [];
    
    // Agrupar por posição
    const grouped = {
      goalkeepers: players.filter(p => p.positionGroup === 'Goleiro'),
      defenders: players.filter(p => p.positionGroup === 'Defensor'),
      attackers: players.filter(p => p.positionGroup === 'Meia/Atacante')
    };
    
    return {
      total: players.length,
      grouped,
      players
    };
  }
}

export default new CountriesService();
