import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Importar rutas
import viewRoutes from './routes/viewRoutes';
import apiRoutes from './routes/apiRoutes';

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// ========== CONFIGURACIÓN MVC ==========

// View Engine - EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, '..', 'public')));

// ========== MIDDLEWARES ==========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== RUTAS ==========

// Rutas MVC (renderizan vistas EJS)
app.use('/', viewRoutes);

// Rutas API REST (retornan JSON)
app.use('/api', apiRoutes);

// ========== MANEJO DE ERRORES ==========

// 404 - Página no encontrada
app.use((req: express.Request, res: express.Response) => {
  res.status(404).render('error', {
    title: 'Página no encontrada',
    message: 'La página que buscas no existe.',
    code: 404
  });
});

// 500 - Error interno del servidor
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Error del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor',
    code: 500
  });
});

// ========== INICIAR SERVIDOR ==========
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor MINICORE MVC ejecutándose en puerto ${PORT}`);
      console.log(`🏠 Aplicación: http://localhost:${PORT}`);
      console.log(`📡 API REST: http://localhost:${PORT}/api`);
      console.log(`⚡ Comisiones: http://localhost:${PORT}/comisiones`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;