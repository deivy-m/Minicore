// routes/apiRoutes.ts
// Rutas API REST - Retornan JSON

import { Router } from 'express';
import { ComisionController } from '../controllers/ComisionController';
import { VendedorController } from '../controllers/VendedorController';
import { ReglaController } from '../controllers/ReglaController';
import { VentaRepository } from '../repositories/VentaRepository';

const router = Router();

// Instancia compartida del Repository
const ventaRepo = new VentaRepository();

// Controllers
const comisionController = new ComisionController(ventaRepo);
const vendedorController = new VendedorController(ventaRepo);
const reglaController = new ReglaController(ventaRepo);

// API endpoints
router.get('/vendedores', (req, res) => vendedorController.apiListarVendedores(req, res));
router.get('/ventas/comisiones', (req, res) => comisionController.apiCalcularComisiones(req, res));
router.get('/reglas', (req, res) => reglaController.apiListarReglas(req, res));

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor MINICORE MVC funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

export default router;
