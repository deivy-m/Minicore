"use strict";
// controllers/HomeController.ts
// MVC Controller - Maneja las vistas de la página principal
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
class HomeController {
    constructor(ventaRepo) {
        this.ventaRepo = ventaRepo;
    }
    // GET / - Página principal
    index(req, res) {
        const vendedores = this.ventaRepo.obtenerTodosLosVendedores();
        const ventas = this.ventaRepo.obtenerTodasLasVentas();
        const reglas = this.ventaRepo.obtenerTodasLasReglas();
        res.render('home', {
            title: 'MINICORE - Sistema de Comisiones',
            vendedores,
            totalVentas: ventas.length,
            totalVendedores: vendedores.length,
            totalReglas: reglas.length
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map