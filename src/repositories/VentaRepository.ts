// repositories/VentaRepository.ts
// Repository Pattern - Implementa IVentaRepository (DIP)

import { IVentaRepository } from '../interfaces/IVentaRepository';
import { Vendedor, Ventas, Reglas } from '../types';

export class VentaRepository implements IVentaRepository {
  // Datos simulados - vendedores
  private vendedores: Vendedor[] = [
    { id: 1, nombre: 'Carlos Mendoza', email: 'carlos.mendoza@empresa.com', activo: true, fecha_ingreso: new Date('2024-01-15') },
    { id: 2, nombre: 'Andrea Torres', email: 'andrea.torres@empresa.com', activo: true, fecha_ingreso: new Date('2024-03-20') },
    { id: 3, nombre: 'Luis Paredes', email: 'luis.paredes@empresa.com', activo: true, fecha_ingreso: new Date('2024-05-10') },
    { id: 4, nombre: 'María Suárez', email: 'maria.suarez@empresa.com', activo: true, fecha_ingreso: new Date('2024-07-01') }
  ];

  // Datos simulados - ventas (Mayo-Junio 2025)
  private ventas: Ventas[] = [
    { id: 1, vendedor_id: 1, monto: 400.00, fecha_venta: new Date('2025-05-21'), producto: 'Laptop Lenovo IdeaPad', cliente: 'TechSolutions S.A.' },
    { id: 2, vendedor_id: 2, monto: 600.00, fecha_venta: new Date('2025-05-29'), producto: 'Monitor Samsung 27"', cliente: 'Grupo Empresarial Norte' },
    { id: 3, vendedor_id: 2, monto: 200.00, fecha_venta: new Date('2025-06-03'), producto: 'Teclado Mecánico Logitech', cliente: 'Distribuidora El Centro' },
    { id: 4, vendedor_id: 1, monto: 300.00, fecha_venta: new Date('2025-06-09'), producto: 'Mouse Inalámbrico HP', cliente: 'Papelería Universal' },
    { id: 5, vendedor_id: 3, monto: 900.00, fecha_venta: new Date('2025-06-11'), producto: 'Impresora Epson EcoTank', cliente: 'Constructora Andina' },
    { id: 6, vendedor_id: 1, monto: 500.00, fecha_venta: new Date('2025-06-24'), producto: 'Tablet Samsung Galaxy', cliente: 'Clínica San Rafael' },
    { id: 7, vendedor_id: 4, monto: 300.00, fecha_venta: new Date('2025-06-26'), producto: 'Auriculares Sony WH-1000', cliente: 'Academia de Idiomas' },
    { id: 8, vendedor_id: 4, monto: 600.00, fecha_venta: new Date('2025-06-30'), producto: 'Proyector Epson PowerLite', cliente: 'Colegio San Andrés' }
  ];

  // Reglas de comisión - CORREGIDO: regla #4 ahora dice "Comisión Premium"
  private reglas: Reglas[] = [
    { id: 1, nombre: 'Comisión Básica', monto_min: 0, monto_max: 600, porcentaje_comision: 6.0, activo: true },
    { id: 2, nombre: 'Comisión Media', monto_min: 601, monto_max: 800, porcentaje_comision: 8.0, activo: true },
    { id: 3, nombre: 'Comisión Alta', monto_min: 801, monto_max: 1000, porcentaje_comision: 10.0, activo: true },
    { id: 4, nombre: 'Comisión Premium', monto_min: 1001, monto_max: undefined, porcentaje_comision: 15.0, activo: true }
  ];

  obtenerTodasLasVentas(): Ventas[] {
    return this.ventas;
  }

  obtenerTodosLosVendedores(): Vendedor[] {
    return this.vendedores;
  }

  obtenerTodasLasReglas(): Reglas[] {
    return this.reglas;
  }

  filtrarVentasPorFecha(fechaInicio: string, fechaFin: string): Ventas[] {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return this.ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha_venta);
      return fechaVenta >= inicio && fechaVenta <= fin;
    });
  }

  filtrarVentasPorVendedor(vendedorId: number): Ventas[] {
    return this.ventas.filter(venta => venta.vendedor_id === vendedorId);
  }

  filtrarVentasPorFechaYVendedor(fechaInicio: string, fechaFin: string, vendedorId: number): Ventas[] {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return this.ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha_venta);
      return fechaVenta >= inicio && fechaVenta <= fin && venta.vendedor_id === vendedorId;
    });
  }

  buscarVendedorPorId(id: number): Vendedor | undefined {
    return this.vendedores.find(v => v.id === id);
  }

  buscarReglaAplicable(monto: number): Reglas {
    return this.reglas.find(regla =>
      monto >= regla.monto_min && (regla.monto_max === undefined || monto <= regla.monto_max)
    ) || this.reglas[0];
  }
}