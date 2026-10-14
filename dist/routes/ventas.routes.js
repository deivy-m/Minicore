"use strict";
// routes/ventas.routes.ts - Refactorizado con SOLID + Patrones
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ComisionService_1 = require("../services/ComisionService");
const ValidacionService_1 = require("../services/ValidacionService");
const VentaRepository_1 = require("../repositories/VentaRepository");
const router = (0, express_1.Router)();
// Dependency Injection - DIP aplicado
const ventaRepo = new VentaRepository_1.VentaRepository();
const comisionService = new ComisionService_1.ComisionService(ventaRepo);
const validacionService = new ValidacionService_1.ValidacionService();
// FUNCIONALIDAD CORE REFACTORIZADA: Filtrar y calcular comisiones
router.get('/comisiones', async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, vendedor_id } = req.query;
        // Validaciones usando ValidacionService (SRP)
        const validacionFechas = validacionService.validarParametrosComision(fecha_inicio, fecha_fin);
        if (!validacionFechas.valido) {
            return res.status(400).json({
                success: false,
                message: validacionFechas.mensaje,
                ejemplo: validacionFechas.ejemplo
            });
        }
        const validacionVendedor = validacionService.validarVendedorId(vendedor_id);
        if (!validacionVendedor.valido) {
            return res.status(400).json({
                success: false,
                message: validacionVendedor.mensaje
            });
        }
        console.log(`🔍 Calculando comisiones: ${fecha_inicio} a ${fecha_fin}${vendedor_id ? `, vendedor: ${vendedor_id}` : ''}`);
        // Calcular comisiones usando ComisionService (SRP + Strategy + Factory)
        const resultado = comisionService.calcularComisionesPorPeriodo(fecha_inicio, fecha_fin, vendedor_id);
        // Solo formatear respuesta
        res.json({
            success: true,
            message: 'Comisiones calculadas exitosamente',
            data: resultado.comisiones,
            resumen: resultado.resumen,
            nota: 'Sistema MINICORE - Aplicando SOLID + Strategy + Factory patterns'
        });
    }
    catch (error) {
        console.error('Error calculando comisiones:', error);
        res.status(500).json({
            success: false,
            message: 'Error calculando comisiones',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Ruta para listar todas las ventas
router.get('/', async (req, res) => {
    try {
        const ventas = ventaRepo.obtenerTodasLasVentas();
        res.json({
            success: true,
            message: 'Ventas obtenidas - MINICORE',
            data: ventas,
            total_ventas: ventas.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obteniendo ventas'
        });
    }
});
exports.default = router;
//# sourceMappingURL=ventas.routes.js.map