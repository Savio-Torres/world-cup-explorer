import worldCupService from '../services/worldCupService.js';

export const getInfo = (req, res) => {
  try {
    const info = worldCupService.getInfo();
    
    res.json({
      success: true,
      data: info
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar informações',
      error: error.message
    });
  }
};

export const getOverview = (req, res) => {
  try {
    const overview = worldCupService.getFullOverview();
    
    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar visão geral',
      error: error.message
    });
  }
};

export const getStats = (req, res) => {
  try {
    const stats = worldCupService.getStats();
    
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

export const getHosts = (req, res) => {
  try {
    const hosts = worldCupService.getHosts();
    
    res.json({
      success: true,
      count: hosts.length,
      data: hosts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar países-sede',
      error: error.message
    });
  }
};

export const getSchedule = (req, res) => {
  try {
    const schedule = worldCupService.getSchedule();
    
    res.json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar programação',
      error: error.message
    });
  }
};

export const getTimeline = (req, res) => {
  try {
    const timeline = worldCupService.getTimeline();
    
    res.json({
      success: true,
      data: timeline
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar cronograma',
      error: error.message
    });
  }
};
