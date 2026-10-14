"use strict";
// services/ValidacionService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacionService = void 0;
class ValidacionService {
    // Solo se encarga de validaciones
    validarParametrosComision(fechaInicio, fechaFin) {
        if (!fechaInicio || !fechaFin) {
            return {
                valido: false,
                mensaje: 'Se requieren fecha_inicio y fecha_fin',
                ejemplo: '/api/ventas/comisiones?fecha_inicio=2024-06-01&fecha_fin=2024-06-30'
            };
        }
        // Validar formato de fechas
        const fechaInicioValida = !isNaN(Date.parse(fechaInicio));
        const fechaFinValida = !isNaN(Date.parse(fechaFin));
        if (!fechaInicioValida || !fechaFinValida) {
            return {
                valido: false,
                mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD'
            };
        }
        return { valido: true };
    }
    validarVendedorId(vendedorId) {
        if (vendedorId && isNaN(parseInt(vendedorId))) {
            return {
                valido: false,
                mensaje: 'vendor_id debe ser un número válido'
            };
        }
        return { valido: true };
    }
}
exports.ValidacionService = ValidacionService;
//# sourceMappingURL=ValidacionService.js.map