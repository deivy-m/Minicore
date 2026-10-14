"use strict";
// controllers/VendedorController.ts
// MVC Controller - Maneja vistas y API de vendedores
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorController = void 0;
class VendedorController {
    constructor(ventaRepo) {
        this.ventaRepo = ventaRepo;
    }
    // GET /vendedores - Vista EJS con lista de vendedores
    listarVendedores(req, res) {
        const vendedores = this.ventaRepo.obtenerTodosLosVendedores();
        res.render('vendedores', {
            title: 'Vendedores',
            vendedores
        });
    }
    // GET /api/vendedores - API REST
    apiListarVendedores(req, res) {
        const vendedores = this.ventaRepo.obtenerTodosLosVendedores();
        res.json({
            success: true,
            message: 'Vendedores obtenidos',
            data: vendedores,
            total: vendedores.length
        });
    }
}
exports.VendedorController = VendedorController;
//# sourceMappingURL=VendedorController.js.map