const API_URL = 'http://localhost:3000/api';

export const api = {
  // Countries
  async getCountries() {
    const response = await fetch(`${API_URL}/countries`);
    return response.json();
  },
  
  async getCountryById(id) {
    const response = await fetch(`${API_URL}/countries/${id}`);
    return response.json();
  },
  
  async getCountryPlayers(id) {
    const response = await fetch(`${API_URL}/countries/${id}/players`);
    return response.json();
  },
  
  async getCountriesByContinent(continent) {
    const response = await fetch(`${API_URL}/countries?continent=${continent}`);
    return response.json();
  },
  
  async getHostCountries() {
    const response = await fetch(`${API_URL}/countries?type=hosts`);
    return response.json();
  },
  
  // Players
  async getPlayers() {
    const response = await fetch(`${API_URL}/players`);
    return response.json();
  },
  
  async getPlayerById(id) {
    const response = await fetch(`${API_URL}/players/${id}`);
    return response.json();
  },
  
  async getTopPlayers(limit = 20) {
    const response = await fetch(`${API_URL}/players/top?limit=${limit}`);
    return response.json();
  },
  
  async getPlayersByCountry(countryId) {
    const response = await fetch(`${API_URL}/players/country/${countryId}`);
    return response.json();
  },
  
  // Matches
  async getMatches() {
    const response = await fetch(`${API_URL}/matches`);
    return response.json();
  },
  
  async getUpcomingMatches() {
    const response = await fetch(`${API_URL}/matches/upcoming`);
    return response.json();
  },
  
  async getMatchesByCountry(countryId) {
    const response = await fetch(`${API_URL}/matches/country/${countryId}`);
    return response.json();
  },
  
  // World Cup Info
  async getWorldCupInfo() {
    const response = await fetch(`${API_URL}/worldcup`);
    return response.json();
  },
  
  async getWorldCupOverview() {
    const response = await fetch(`${API_URL}/worldcup/overview`);
    return response.json();
  },
  
  async getWorldCupStats() {
    const response = await fetch(`${API_URL}/worldcup/stats`);
    return response.json();
  },
  
  async getWorldCupHosts() {
    const response = await fetch(`${API_URL}/worldcup/hosts`);
    return response.json();
  },
  
  async getWorldCupSchedule() {
    const response = await fetch(`${API_URL}/worldcup/schedule`);
    return response.json();
  }
};

export default api;
