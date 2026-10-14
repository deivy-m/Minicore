"use strict";
// controllers/ComisionController.ts
// MVC Controller - Maneja vistas y API de comisiones
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionController = void 0;
const ComisionService_1 = require("../services/ComisionService");
const ValidacionService_1 = require("../services/ValidacionService");
class ComisionController {
    constructor(ventaRepo) {
        this.ventaRepo = ventaRepo;
        this.comisionService = new ComisionService_1.ComisionService(ventaRepo);
        this.validacionService = new ValidacionService_1.ValidacionService();
    }
    // GET /comisiones - Vista EJS del calculador de comisiones
    mostrarCalculador(req, res) {
        const vendedores = this.ventaRepo.obtenerTodosLosVendedores();
        const reglas = this.ventaRepo.obtenerTodasLasReglas();
        res.render('comisiones', {
            title: 'Cálculo de Comisiones',
            vendedores,
            reglas,
            resultado: null,
            error: null,
            filtros: {
                fecha_inicio: '2025-06-01',
                fecha_fin: '2025-06-30',
                vendedor_id: ''
            }
        });
    }
    // POST /comisiones - Procesa el formulario y muestra resultados
    calcularComisiones(req, res) {
        const { fecha_inicio, fecha_fin, vendedor_id } = req.body;
        const vendedores = this.ventaRepo.obtenerTodosLosVendedores();
        const reglas = this.ventaRepo.obtenerTodasLasReglas();
        // Validaciones
        const validacionFechas = this.validacionService.validarParametrosComision(fecha_inicio, fecha_fin);
        if (!validacionFechas.valido) {
            res.render('comisiones', {
                title: 'Cálculo de Comisiones',
                vendedores,
                reglas,
                resultado: null,
                error: validacionFechas.mensaje,
                filtros: { fecha_inicio, fecha_fin, vendedor_id }
            });
            return;
        }
        if (vendedor_id) {
            const validacionVendedor = this.validacionService.validarVendedorId(vendedor_id);
            if (!validacionVendedor.valido) {
                res.render('comisiones', {
                    title: 'Cálculo de Comisiones',
                    vendedores,
                    reglas,
                    resultado: null,
                    error: validacionVendedor.mensaje,
                    filtros: { fecha_inicio, fecha_fin, vendedor_id }
                });
                return;
            }
        }
        try {
            const resultado = this.comisionService.calcularComisionesPorPeriodo(fecha_inicio, fecha_fin, vendedor_id || undefined);
            res.render('comisiones', {
                title: 'Cálculo de Comisiones',
                vendedores,
                reglas,
                resultado,
                error: null,
                filtros: { fecha_inicio, fecha_fin, vendedor_id }
            });
        }
        catch (error) {
            res.render('comisiones', {
                title: 'Cálculo de Comisiones',
                vendedores,
                reglas,
                resultado: null,
                error: 'Error calculando comisiones. Intente nuevamente.',
                filtros: { fecha_inicio, fecha_fin, vendedor_id }
            });
        }
    }
    // GET /api/ventas/comisiones - API REST (mantener compatibilidad)
    apiCalcularComisiones(req, res) {
        const { fecha_inicio, fecha_fin, vendedor_id } = req.query;
        const validacionFechas = this.validacionService.validarParametrosComision(fecha_inicio, fecha_fin);
        if (!validacionFechas.valido) {
            res.status(400).json({
                success: false,
                message: validacionFechas.mensaje,
                ejemplo: validacionFechas.ejemplo
            });
            return;
        }
        const validacionVendedor = this.validacionService.validarVendedorId(vendedor_id);
        if (!validacionVendedor.valido) {
            res.status(400).json({
                success: false,
                message: validacionVendedor.mensaje
            });
            return;
        }
        try {
            const resultado = this.comisionService.calcularComisionesPorPeriodo(fecha_inicio, fecha_fin, vendedor_id);
            res.json({
                success: true,
                message: 'Comisiones calculadas exitosamente',
                data: resultado.comisiones,
                resumen: resultado.resumen
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error calculando comisiones',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
}
exports.ComisionController = ComisionController;
//# sourceMappingURL=ComisionController.js.map