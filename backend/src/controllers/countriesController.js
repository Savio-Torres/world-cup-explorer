import countriesService from '../services/countriesService.js';

export const getAllCountries = (req, res) => {
  const { continent, search, type } = req.query;
  
  try {
    let result;
    
    if (type === 'hosts') {
      result = countriesService.getHostCountries();
    } else if (type === 'non-hosts') {
      result = countriesService.getNonHostCountries();
    } else if (continent) {
      result = countriesService.getCountriesByContinent(continent);
    } else if (search) {
      result = countriesService.searchCountries(search);
    } else {
      result = countriesService.getAllCountries();
    }
    
    res.json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar países',
      error: error.message
    });
  }
};

export const getCountryById = (req, res) => {
  const { id } = req.params;
  
  try {
    const country = countriesService.getCountryById(id);
    
    if (!country) {
      return res.status(404).json({
        success: false,
        message: `País com id "${id}" não encontrado`
      });
    }
    
    res.json({
      success: true,
      data: country
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar país',
      error: error.message
    });
  }
};

export const getCountryMeta = (req, res) => {
  const { id } = req.params;
  
  try {
    const meta = countriesService.getCountryMeta(id);
    
    if (!meta) {
      return res.status(404).json({
        success: false,
        message: `Metadados do país "${id}" não encontrados`
      });
    }
    
    res.json({
      success: true,
      data: meta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar metadados',
      error: error.message
    });
  }
};

export const getCountriesGrouped = (req, res) => {
  try {
    const grouped = countriesService.getCountriesGroupedByContinent();
    
    res.json({
      success: true,
      data: grouped
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao agrupar países',
      error: error.message
    });
  }
};

export const getCountriesStats = (req, res) => {
  try {
    const stats = countriesService.getCountriesStats();
    
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

export const getCountryPlayers = (req, res) => {
  const { id } = req.params;
  
  try {
    const country = countriesService.getCountryById(id);
    
    if (!country) {
      return res.status(404).json({
        success: false,
        message: `País com id "${id}" não encontrado`
      });
    }
    
    const players = countriesService.getCountryPlayers(id);
    
    res.json({
      success: true,
      count: players.total,
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
