// services/ComisionService.ts
// SRP: Solo se encarga de calcular comisiones

import { ComisionFactory } from '../factories/ComisionFactory';
import { IVentaRepository } from '../interfaces/IVentaRepository';
import { Ventas } from '../types';

export interface ComisionResultado {
  vendedor: { id: number; nombre: string; email: string };
  ventas: Ventas[];
  total_ventas: number;
  comision_total: number;
  regla_aplicada: {
    nombre: string;
    rango: string;
    porcentaje_comision: number;
  };
  fecha_inicio: string;
  fecha_fin: string;
  nota_calculo: string;
}

export interface ResumenComisiones {
  filtros: { fecha_inicio: string; fecha_fin: string; vendedor_id?: string };
  total_vendedores: number;
  total_ventas_periodo: number;
  total_comision_general: number;
  ventas_encontradas: number;
  sistema_calculo: string;
}

export class ComisionService {
  // DIP: Depende de la abstracción IVentaRepository, no del tipo concreto
  constructor(private ventaRepo: IVentaRepository) {}

  // Calcula comisiones por sumatoria mensual de ventas
  calcularComisionesPorPeriodo(fechaInicio: string, fechaFin: string, vendedorId?: string): {
    comisiones: ComisionResultado[];
    resumen: ResumenComisiones;
  } {
    // Obtener ventas filtradas del periodo
    let ventasFiltradas: Ventas[];
    if (vendedorId) {
      ventasFiltradas = this.ventaRepo.filtrarVentasPorFechaYVendedor(
        fechaInicio, fechaFin, parseInt(vendedorId)
      );
    } else {
      ventasFiltradas = this.ventaRepo.filtrarVentasPorFecha(fechaInicio, fechaFin);
    }

    // Agrupar ventas por vendedor y sumar por periodo
    const vendedoresMap = new Map<number, {
      vendedor: { id: number; nombre: string; email: string };
      ventas: Ventas[];
      total_ventas_periodo: number;
    }>();

    ventasFiltradas.forEach(venta => {
      const vendedor = this.ventaRepo.buscarVendedorPorId(venta.vendedor_id);
      if (!vendedor) return;

      if (!vendedoresMap.has(venta.vendedor_id)) {
        vendedoresMap.set(venta.vendedor_id, {
          vendedor: { id: vendedor.id, nombre: vendedor.nombre, email: vendedor.email },
          ventas: [],
          total_ventas_periodo: 0
        });
      }

      const data = vendedoresMap.get(venta.vendedor_id)!;
      data.ventas.push(venta);
      data.total_ventas_periodo += venta.monto;
    });

    // Calcular comisiones usando Strategy + Factory Pattern
    const comisiones: ComisionResultado[] = Array.from(vendedoresMap.values()).map(vendedorData => {
      const totalVentasPeriodo = vendedorData.total_ventas_periodo;

      // Factory decide estrategia según TOTAL del periodo
      const strategy = ComisionFactory.crearEstrategia(totalVentasPeriodo);
      const comisionTotal = strategy.calcular(totalVentasPeriodo);

      return {
        vendedor: vendedorData.vendedor,
        ventas: vendedorData.ventas,
        total_ventas: totalVentasPeriodo,
        comision_total: Math.round(comisionTotal * 100) / 100,
        regla_aplicada: {
          nombre: strategy.getTipo(),
          rango: strategy.getRango(),
          porcentaje_comision: strategy.getPorcentaje() // CORREGIDO: usa método directo en vez de deducir por string
        },
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        nota_calculo: `Comisión calculada sobre sumatoria total del periodo: $${totalVentasPeriodo.toFixed(2)}`
      };
    });

    return {
      comisiones,
      resumen: this.generarResumen(comisiones, ventasFiltradas, fechaInicio, fechaFin, vendedorId)
    };
  }

  // Genera resumen ejecutivo
  private generarResumen(
    comisiones: ComisionResultado[],
    ventasFiltradas: Ventas[],
    fechaInicio: string,
    fechaFin: string,
    vendedorId?: string
  ): ResumenComisiones {
    const totalComisionGeneral = comisiones.reduce((sum, c) => sum + c.comision_total, 0);
    const totalVentasPeriodo = comisiones.reduce((sum, c) => sum + c.total_ventas, 0);

    return {
      filtros: { fecha_inicio: fechaInicio, fecha_fin: fechaFin, vendedor_id: vendedorId },
      total_vendedores: comisiones.length,
      total_ventas_periodo: totalVentasPeriodo,
      total_comision_general: Math.round(totalComisionGeneral * 100) / 100,
      ventas_encontradas: ventasFiltradas.length,
      sistema_calculo: 'Comisiones calculadas sobre sumatoria mensual de ventas del período'
    };
  }
}