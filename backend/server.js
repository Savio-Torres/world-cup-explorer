import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Importar rotas
import countriesRoutes from './src/routes/countriesRoutes.js';
import matchesRoutes from './src/routes/matchesRoutes.js';
import playersRoutes from './src/routes/playersRoutes.js';
import worldCupRoutes from './src/routes/worldCupRoutes.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança e logging
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

// Configurar CORS
const corsOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging
app.use(morgan('dev'));

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api/countries', countriesRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/worldcup', worldCupRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    apiVersion: process.env.API_VERSION || 'v1'
  });
});

// Rota raiz da API
app.get('/', (req, res) => {
  res.json({
    name: 'World Cup API 2026',
    version: '1.0.0',
    description: 'API para consulta de dados da Copa do Mundo 2026',
    endpoints: {
      countries: {
        base: '/api/countries',
        endpoints: [
          'GET / - Listar todos os países',
          'GET /:id - Buscar país por ID',
          'GET /:id/players - Jogadores do país',
          'GET /:id/meta - Metadados do país',
          'GET /grouped - Países agrupados por continente',
          'GET /stats - Estatísticas dos países'
        ]
      },
      matches: {
        base: '/api/matches',
        endpoints: [
          'GET / - Listar todas as partidas',
          'GET /:id - Buscar partida por ID',
          'GET /group-stage - Fase de grupos',
          'GET /knockout - Mata-mata',
          'GET /final - Finais',
          'GET /country/:countryId - Partidas de um país',
          'GET /upcoming - Próximas partidas'
        ]
      },
      players: {
        base: '/api/players',
        endpoints: [
          'GET / - Listar todos os jogadores',
          'GET /:id - Buscar jogador por ID',
          'GET /top - Melhores jogadores',
          'GET /country/:countryId - Jogadores de um país'
        ]
      },
      worldcup: {
        base: '/api/worldcup',
        endpoints: [
          'GET / - Informações gerais',
          'GET /overview - Visão completa',
          'GET /stats - Estatísticas',
          'GET /hosts - Países-sede',
          'GET /schedule - Programação'
        ]
      }
    },
    docs: 'https://github.com/your-repo/world-cup-api'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota ${req.originalUrl} não encontrada`,
    tips: 'Acesse a rota raiz (/) para ver todos os endpoints disponíveis'
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('\n=================================');
  console.log('🏆 WORLD CUP API 2026');
  console.log('=================================');
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`��� Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS permitido: ${corsOrigins.join(', ')}`);
  console.log('\n📋 Endpoints disponíveis:');
  console.log(`   - GET  http://localhost:${PORT}/`);
  console.log(`   - GET  http://localhost:${PORT}/api/health`);
  console.log(`   - GET  http://localhost:${PORT}/api/countries`);
  console.log(`   - GET  http://localhost:${PORT}/api/matches`);
  console.log(`   - GET  http://localhost:${PORT}/api/players`);
  console.log(`   - GET  http://localhost:${PORT}/api/worldcup`);
  console.log('\n=================================\n');
});
