// controllers/ReglaController.ts
// MVC Controller - Maneja vistas y API de reglas de comisión

import { Request, Response } from 'express';
import { IVentaRepository } from '../interfaces/IVentaRepository';

export class ReglaController {
  constructor(private ventaRepo: IVentaRepository) {}

  // GET /reglas - Vista EJS con reglas de comisión
  listarReglas(req: Request, res: Response): void {
    const reglas = this.ventaRepo.obtenerTodasLasReglas();
    res.render('reglas', {
      title: 'Reglas de Comisión',
      reglas
    });
  }

  // GET /api/reglas - API REST
  apiListarReglas(req: Request, res: Response): void {
    const reglas = this.ventaRepo.obtenerTodasLasReglas();
    res.json({
      success: true,
      message: 'Reglas de comisión obtenidas',
      data: reglas,
      total: reglas.length
    });
  }
}
