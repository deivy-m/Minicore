"use strict";
// routes/viewRoutes.ts
// Rutas MVC - Renderizan vistas EJS
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HomeController_1 = require("../controllers/HomeController");
const ComisionController_1 = require("../controllers/ComisionController");
const VendedorController_1 = require("../controllers/VendedorController");
const ReglaController_1 = require("../controllers/ReglaController");
const VentaRepository_1 = require("../repositories/VentaRepository");
const router = (0, express_1.Router)();
// Instancia compartida del Repository (evita múltiples instancias)
const ventaRepo = new VentaRepository_1.VentaRepository();
// Controllers
const homeController = new HomeController_1.HomeController(ventaRepo);
const comisionController = new ComisionController_1.ComisionController(ventaRepo);
const vendedorController = new VendedorController_1.VendedorController(ventaRepo);
const reglaController = new ReglaController_1.ReglaController(ventaRepo);
// Rutas de vistas (MVC)
router.get('/', (req, res) => homeController.index(req, res));
router.get('/comisiones', (req, res) => comisionController.mostrarCalculador(req, res));
router.post('/comisiones', (req, res) => comisionController.calcularComisiones(req, res));
router.get('/vendedores', (req, res) => vendedorController.listarVendedores(req, res));
router.get('/reglas', (req, res) => reglaController.listarReglas(req, res));
exports.default = router;
//# sourceMappingURL=viewRoutes.js.map