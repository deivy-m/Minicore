"use strict";
// routes/vendedor.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VentaRepository_1 = require("../repositories/VentaRepository");
const router = (0, express_1.Router)();
const ventaRepo = new VentaRepository_1.VentaRepository();
router.get('/', async (req, res) => {
    try {
        const vendedores = ventaRepo.obtenerTodosLosVendedores();
        res.json({
            success: true,
            message: 'Vendedores obtenidos',
            data: vendedores,
            total: vendedores.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obteniendo vendedores'
        });
    }
});
exports.default = router;
//# sourceMappingURL=vendedor.routes.js.map