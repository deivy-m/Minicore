// controllers/ComisionController.ts
// MVC Controller - Maneja vistas y API de comisiones

import { Request, Response } from 'express';
import { ComisionService } from '../services/ComisionService';
import { ValidacionService } from '../services/ValidacionService';
import { IVentaRepository } from '../interfaces/IVentaRepository';

export class ComisionController {
  private comisionService: ComisionService;
  private validacionService: ValidacionService;

  constructor(private ventaRepo: IVentaRepository) {
    this.comisionService = new ComisionService(ventaRepo);
    this.validacionService = new ValidacionService();
  }

  // GET /comisiones - Vista EJS del calculador de comisiones
  mostrarCalculador(req: Request, res: Response): void {
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
  calcularComisiones(req: Request, res: Response): void {
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
      const resultado = this.comisionService.calcularComisionesPorPeriodo(
        fecha_inicio, fecha_fin, vendedor_id || undefined
      );

      res.render('comisiones', {
        title: 'Cálculo de Comisiones',
        vendedores,
        reglas,
        resultado,
        error: null,
        filtros: { fecha_inicio, fecha_fin, vendedor_id }
      });
    } catch (error) {
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
  apiCalcularComisiones(req: Request, res: Response): void {
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
      const resultado = this.comisionService.calcularComisionesPorPeriodo(
        fecha_inicio as string,
        fecha_fin as string,
        vendedor_id as string
      );

      res.json({
        success: true,
        message: 'Comisiones calculadas exitosamente',
        data: resultado.comisiones,
        resumen: resultado.resumen
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error calculando comisiones',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}
