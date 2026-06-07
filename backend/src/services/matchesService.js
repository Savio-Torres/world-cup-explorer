import { 
  openingMatches, 
  groupStageMatches, 
  knockoutMatches, 
  finalMatches,
  processedData 
} from '../data/index.js';

class MatchesService {
  getAllMatches() {
    return {
      opening: openingMatches || [],
      groupStage: groupStageMatches || [],
      knockout: knockoutMatches || [],
      final: finalMatches || []
    };
  }

  getMatchById(id) {
    const allMatches = processedData.getAllMatches();
    const match = allMatches.find(m => m.id === id);
    
    if (!match) return null;
    
    // Adicionar informações adicionais se necessário
    return {
      ...match,
      hasDetails: !!(match.home && match.away)
    };
  }

  getGroupStageMatches(group = null) {
    if (!group) return groupStageMatches || [];
    
    const matches = [];
    (groupStageMatches || []).forEach(day => {
      day.matches?.forEach(match => {
        if (match.group && match.group.toLowerCase() === group.toLowerCase()) {
          matches.push(match);
        }
      });
    });
    
    return {
      group: group.toUpperCase(),
      matches: matches
    };
  }

  getKnockoutMatches() {
    return knockoutMatches || [];
  }

  getFinalMatches() {
    return finalMatches || [];
  }

  getMatchesByCountry(countryId) {
    const allMatches = processedData.getAllMatches();
    const countryMatches = allMatches.filter(match => 
      (match.home && match.home.countryId === countryId) || 
      (match.away && match.away.countryId === countryId)
    );
    
    return {
      total: countryMatches.length,
      matches: countryMatches
    };
  }

  getMatchesByDate(date) {
    const matches = [];
    const search = (matchList) => {
      (matchList || []).forEach(day => {
        if (day.date === date || day.dateLabel === date) {
          day.matches?.forEach(match => matches.push(match));
        }
      });
    };
    
    search(openingMatches);
    search(groupStageMatches);
    search(knockoutMatches);
    search(finalMatches);
    
    return matches;
  }

  getUpcomingMatches(limit = 10) {
    const allMatches = processedData.getAllMatches();
    // Simular próximas partidas (você pode ordenar por data real)
    const upcoming = allMatches.slice(0, limit);
    
    return {
      total: upcoming.length,
      matches: upcoming
    };
  }

  getScheduleStructure() {
    return {
      opening: {
        label: 'Jogo de Abertura',
        days: (openingMatches || []).map(d => ({
          date: d.dateLabel,
          matches: d.matches?.length || 0
        }))
      },
      groupStage: {
        label: 'Fase de Grupos',
        totalDays: (groupStageMatches || []).length,
        totalMatches: (groupStageMatches || []).reduce((sum, day) => sum + (day.matches?.length || 0), 0),
        days: (groupStageMatches || []).map(d => ({
          date: d.dateLabel,
          matches: d.matches?.length || 0
        }))
      },
      knockout: {
        label: 'Mata-mata',
        totalRounds: (knockoutMatches || []).length,
        rounds: (knockoutMatches || []).map(d => ({
          round: d.dateLabel,
          matches: d.matches?.length || 0
        }))
      },
      final: {
        label: 'Finais',
        days: (finalMatches || []).map(d => ({
          date: d.dateLabel,
          matches: d.matches?.length || 0
        }))
      }
    };
  }

  getMatchesStats() {
    const allMatches = processedData.getAllMatches();
    
    return {
      totalMatches: allMatches.length,
      groupStageMatches: (groupStageMatches || []).reduce((sum, day) => sum + (day.matches?.length || 0), 0),
      knockoutMatches: (knockoutMatches || []).reduce((sum, round) => sum + (round.matches?.length || 0), 0),
      finalMatches: (finalMatches || []).reduce((sum, final) => sum + (final.matches?.length || 0), 0),
      totalGroups: 12,
      totalKnockoutRounds: (knockoutMatches || []).length
    };
  }
}

export default new MatchesService();
