"use strict";
// services/VentaService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaService = void 0;
class VentaService {
    // Solo se encarga de filtrar ventas
    filtrarPorFecha(ventas, fechaInicio, fechaFin) {
        return ventas.filter(venta => {
            const fechaVenta = new Date(venta.fecha);
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);
            return fechaVenta >= inicio && fechaVenta <= fin;
        });
    }
    filtrarPorVendedor(ventas, vendedorId) {
        return ventas.filter(venta => venta.vendedor_id === vendedorId);
    }
}
exports.VentaService = VentaService;
//# sourceMappingURL=VentaService.js.map