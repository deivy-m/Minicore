"use strict";
// routes/apiRoutes.ts
// Rutas API REST - Retornan JSON
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ComisionController_1 = require("../controllers/ComisionController");
const VendedorController_1 = require("../controllers/VendedorController");
const ReglaController_1 = require("../controllers/ReglaController");
const VentaRepository_1 = require("../repositories/VentaRepository");
const router = (0, express_1.Router)();
// Instancia compartida del Repository
const ventaRepo = new VentaRepository_1.VentaRepository();
// Controllers
const comisionController = new ComisionController_1.ComisionController(ventaRepo);
const vendedorController = new VendedorController_1.VendedorController(ventaRepo);
const reglaController = new ReglaController_1.ReglaController(ventaRepo);
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
exports.default = router;
//# sourceMappingURL=apiRoutes.js.map