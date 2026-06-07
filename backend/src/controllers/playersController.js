import playersService from '../services/playersService.js';

export const getAllPlayers = (req, res) => {
  const { position, country, minRating, maxRating, limit } = req.query;
  
  try {
    const filters = { position, country, minRating, maxRating };
    let players = playersService.getAllPlayers(filters);
    
    if (limit) {
      players = players.slice(0, parseInt(limit));
    }
    
    res.json({
      success: true,
      count: players.length,
      data: players
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar jogadores',
      error: error.message
    });
  }
};

export const getPlayerById = (req, res) => {
  const { id } = req.params;
  
  try {
    const player = playersService.getPlayerById(id);
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: `Jogador com id "${id}" não encontrado`
      });
    }
    
    res.json({
      success: true,
      data: player
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar jogador',
      error: error.message
    });
  }
};

export const getTopPlayers = (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const position = req.query.position || null;
  
  try {
    const topPlayers = playersService.getTopPlayers(limit, position);
    
    res.json({
      success: true,
      ...topPlayers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar melhores jogadores',
      error: error.message
    });
  }
};

export const getPlayersByCountry = (req, res) => {
  const { countryId } = req.params;
  
  try {
    const players = playersService.getPlayersByCountry(countryId);
    
    res.json({
      success: true,
      count: players.total,
      data: players
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar jogadores do país',
      error: error.message
    });
  }
};

export const getPlayersStats = (req, res) => {
  try {
    const stats = playersService.getPlayersStats();
    
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
