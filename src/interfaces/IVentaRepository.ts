// interfaces/IVentaRepository.ts
// Interfaz Repository - Abstracción para acceso a datos (DIP)

import { Vendedor, Ventas, Reglas } from '../types';

export interface IVentaRepository {
  obtenerTodasLasVentas(): Ventas[];
  obtenerTodosLosVendedores(): Vendedor[];
  obtenerTodasLasReglas(): Reglas[];
  filtrarVentasPorFecha(fechaInicio: string, fechaFin: string): Ventas[];
  filtrarVentasPorVendedor(vendedorId: number): Ventas[];
  filtrarVentasPorFechaYVendedor(fechaInicio: string, fechaFin: string, vendedorId: number): Ventas[];
  buscarVendedorPorId(id: number): Vendedor | undefined;
  buscarReglaAplicable(monto: number): Reglas;
}