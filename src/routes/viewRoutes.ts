// routes/viewRoutes.ts
// Rutas MVC - Renderizan vistas EJS

import { Router } from 'express';
import { HomeController } from '../controllers/HomeController';
import { ComisionController } from '../controllers/ComisionController';
import { VendedorController } from '../controllers/VendedorController';
import { ReglaController } from '../controllers/ReglaController';
import { VentaRepository } from '../repositories/VentaRepository';

const router = Router();

// Instancia compartida del Repository (evita múltiples instancias)
const ventaRepo = new VentaRepository();

// Controllers
const homeController = new HomeController(ventaRepo);
const comisionController = new ComisionController(ventaRepo);
const vendedorController = new VendedorController(ventaRepo);
const reglaController = new ReglaController(ventaRepo);

// Rutas de vistas (MVC)
router.get('/', (req, res) => homeController.index(req, res));
router.get('/comisiones', (req, res) => comisionController.mostrarCalculador(req, res));
router.post('/comisiones', (req, res) => comisionController.calcularComisiones(req, res));
router.get('/vendedores', (req, res) => vendedorController.listarVendedores(req, res));
router.get('/reglas', (req, res) => reglaController.listarReglas(req, res));

export default router;
