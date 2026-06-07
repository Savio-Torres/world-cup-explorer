import matchesService from '../services/matchesService.js';

export const getAllMatches = (req, res) => {
  try {
    const matches = matchesService.getAllMatches();
    
    res.json({
      success: true,
      data: matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar partidas',
      error: error.message
    });
  }
};

export const getMatchById = (req, res) => {
  const { id } = req.params;
  
  try {
    const match = matchesService.getMatchById(id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: `Partida com id "${id}" não encontrada`
      });
    }
    
    res.json({
      success: true,
      data: match
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar partida',
      error: error.message
    });
  }
};

export const getGroupStageMatches = (req, res) => {
  const { group } = req.query;
  
  try {
    const matches = matchesService.getGroupStageMatches(group);
    
    res.json({
      success: true,
      count: group ? matches.matches?.length || 0 : matches.length,
      data: matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar partidas da fase de grupos',
      error: error.message
    });
  }
};

export const getKnockoutMatches = (req, res) => {
  try {
    const matches = matchesService.getKnockoutMatches();
    
    res.json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar partidas do mata-mata',
      error: error.message
    });
  }
};

export const getFinalMatches = (req, res) => {
  try {
    const matches = matchesService.getFinalMatches();
    
    res.json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar finais',
      error: error.message
    });
  }
};

export const getMatchesByCountry = (req, res) => {
  const { countryId } = req.params;
  
  try {
    const matches = matchesService.getMatchesByCountry(countryId);
    
    res.json({
      success: true,
      count: matches.total,
      data: matches.matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar partidas do país',
      error: error.message
    });
  }
};

export const getUpcomingMatches = (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  
  try {
    const matches = matchesService.getUpcomingMatches(limit);
    
    res.json({
      success: true,
      count: matches.total,
      data: matches.matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar próximas partidas',
      error: error.message
    });
  }
};

export const getMatchesStats = (req, res) => {
  try {
    const stats = matchesService.getMatchesStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas',
      error: error.message
    });
  }
};
