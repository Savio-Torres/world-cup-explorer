import { countries } from '../data/index.js';

class PlayersService {
  getAllPlayers(filters = {}) {
    let allPlayers = [];
    
    countries.forEach(country => {
      const players = country.players || [];
      players.forEach(player => {
        allPlayers.push({
          ...player,
          countryId: country.id,
          countryName: country.name,
          countryFlag: country.flag,
          countryPrimaryColor: country.primaryColor,
          countrySecondaryColor: country.secondaryColor,
          countryDarkColor: country.darkColor
        });
      });
    });
    
    // Aplicar filtros
    if (filters.position) {
      allPlayers = allPlayers.filter(p => p.positionGroup === filters.position);
    }
    
    if (filters.country) {
      allPlayers = allPlayers.filter(p => p.countryId === filters.country);
    }
    
    if (filters.minRating) {
      allPlayers = allPlayers.filter(p => (p.rating || 0) >= parseInt(filters.minRating));
    }
    
    if (filters.maxRating) {
      allPlayers = allPlayers.filter(p => (p.rating || 0) <= parseInt(filters.maxRating));
    }
    
    // Ordenar por rating
    allPlayers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return allPlayers;
  }

  getPlayerById(id) {
    for (const country of countries) {
      const player = country.players?.find(p => p.id === id);
      if (player) {
        return {
          ...player,
          countryId: country.id,
          countryName: country.name,
          countryFlag: country.flag,
          countryInfo: {
            primaryColor: country.primaryColor,
            secondaryColor: country.secondaryColor,
            darkColor: country.darkColor,
            continent: country.continent
          }
        };
      }
    }
    return null;
  }

  getPlayersByCountry(countryId) {
    const country = countries.find(c => c.id === countryId);
    if (!country) return { total: 0, players: [] };
    
    const players = country.players || [];
    
    // Agrupar por posição
    const grouped = {
      goalkeepers: players.filter(p => p.positionGroup === 'Goleiro'),
      defenders: players.filter(p => p.positionGroup === 'Defensor'),
      midfielders: players.filter(p => p.positionGroup === 'Meia'),
      forwards: players.filter(p => p.positionGroup === 'Atacante'),
      midfieldersForwards: players.filter(p => p.positionGroup === 'Meia/Atacante')
    };
    
    return {
      total: players.length,
      grouped,
      players,
      countryInfo: {
        id: country.id,
        name: country.name,
        flag: country.flag,
        colors: {
          primary: country.primaryColor,
          secondary: country.secondaryColor
        }
      }
    };
  }

  getPlayersByPosition(positionGroup) {
    const players = [];
    countries.forEach(country => {
      country.players?.forEach(player => {
        if (player.positionGroup === positionGroup) {
          players.push({
            ...player,
            countryId: country.id,
            countryName: country.name,
            countryFlag: country.flag
          });
        }
      });
    });
    
    // Ordenar por rating
    players.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return players;
  }

  getTopPlayers(limit = 20, position = null) {
    let allPlayers = [];
    
    countries.forEach(country => {
      country.players?.forEach(player => {
        if (!position || player.positionGroup === position) {
          allPlayers.push({
            ...player,
            countryId: country.id,
            countryName: country.name,
            countryFlag: country.flag
          });
        }
      });
    });
    
    // Ordenar por rating e pegar os top N
    allPlayers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    const topPlayers = allPlayers.slice(0, limit);
    
    return {
      limit,
      position: position || 'all',
      total: topPlayers.length,
      players: topPlayers
    };
  }

  getPlayersStats() {
    let totalPlayers = 0;
    let positions = {};
    let totalRating = 0;
    let ratedPlayers = 0;
    
    countries.forEach(country => {
      country.players?.forEach(player => {
        totalPlayers++;
        
        const pos = player.positionGroup || 'unknown';
        positions[pos] = (positions[pos] || 0) + 1;
        
        if (player.rating) {
          totalRating += player.rating;
          ratedPlayers++;
        }
      });
    });
    
    return {
      totalPlayers,
      averageRating: ratedPlayers > 0 ? (totalRating / ratedPlayers).toFixed(1) : 0,
      positions,
      countriesWithPlayers: countries.filter(c => c.players && c.players.length > 0).length
    };
  }
}

export default new PlayersService();
