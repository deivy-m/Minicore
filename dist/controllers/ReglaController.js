"use strict";
// controllers/ReglaController.ts
// MVC Controller - Maneja vistas y API de reglas de comisión
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReglaController = void 0;
class ReglaController {
    constructor(ventaRepo) {
        this.ventaRepo = ventaRepo;
    }
    // GET /reglas - Vista EJS con reglas de comisión
    listarReglas(req, res) {
        const reglas = this.ventaRepo.obtenerTodasLasReglas();
        res.render('reglas', {
            title: 'Reglas de Comisión',
            reglas
        });
    }
    // GET /api/reglas - API REST
    apiListarReglas(req, res) {
        const reglas = this.ventaRepo.obtenerTodasLasReglas();
        res.json({
            success: true,
            message: 'Reglas de comisión obtenidas',
            data: reglas,
            total: reglas.length
        });
    }
}
exports.ReglaController = ReglaController;
//# sourceMappingURL=ReglaController.js.map