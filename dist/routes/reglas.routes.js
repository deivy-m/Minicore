"use strict";
// routes/reglas.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VentaRepository_1 = require("../repositories/VentaRepository");
const router = (0, express_1.Router)();
const ventaRepo = new VentaRepository_1.VentaRepository();
router.get('/', async (req, res) => {
    try {
        const reglas = ventaRepo.obtenerTodasLasReglas();
        res.json({
            success: true,
            message: 'Reglas de comisión obtenidas',
            data: reglas,
            total: reglas.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obteniendo reglas'
        });
    }
});
exports.default = router;
//# sourceMappingURL=reglas.routes.js.map