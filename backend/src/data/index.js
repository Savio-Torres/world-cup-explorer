import { countries } from './countries.js';
import { 
  openingMatches, 
  groupStageMatches, 
  knockoutMatches, 
  finalMatches 
} from './matches.js';
import { worldCupInfo } from './worldCupInfo.js';

// Criar os dados derivados manualmente
const countriesMeta = {};
const hostCountryIds = [];

if (countries && Array.isArray(countries)) {
  countries.forEach(country => {
    countriesMeta[country.id] = {
      name: country.name,
      flag: country.flag,
      continent: country.continent,
      isHost: country.isHost || false,
      primaryColor: country.primaryColor,
      secondaryColor: country.secondaryColor,
      darkColor: country.darkColor
    };
    
    if (country.isHost) {
      hostCountryIds.push(country.id);
    }
  });
}

const countryIds = countries?.map(c => c.id) || [];

console.log('📦 Dados carregados com sucesso!');
console.log(`   - ${countries?.length || 0} países`);
console.log(`   - ${hostCountryIds.length} países-sede`);
console.log(`   - ${Object.keys(countriesMeta).length} metadados`);

// Exportar tudo
export {
  countries,
  countryIds,
  countriesMeta,
  hostCountryIds,
  openingMatches,
  groupStageMatches,
  knockoutMatches,
  finalMatches,
  worldCupInfo
};

// Dados processados para os serviços
export const processedData = {
  getAllMatches: () => {
    const allMatches = [];
    const matchLists = [openingMatches, groupStageMatches, knockoutMatches, finalMatches];
    matchLists.forEach(list => {
      if (list && Array.isArray(list)) {
        list.forEach(day => {
          if (day?.matches && Array.isArray(day.matches)) {
            allMatches.push(...day.matches);
          }
        });
      }
    });
    return allMatches;
  },
  
  getCountriesWithPlayers: () => {
    return countries?.map(country => ({
      ...country,
      totalPlayers: country.players?.length || 0,
      players: country.players || []
    })) || [];
  }
};