// controllers/HomeController.ts
// MVC Controller - Maneja las vistas de la página principal

import { Request, Response } from 'express';
import { IVentaRepository } from '../interfaces/IVentaRepository';

export class HomeController {
  constructor(private ventaRepo: IVentaRepository) {}

  // GET / - Página principal
  index(req: Request, res: Response): void {
    const vendedores = this.ventaRepo.obtenerTodosLosVendedores();
    const ventas = this.ventaRepo.obtenerTodasLasVentas();
    const reglas = this.ventaRepo.obtenerTodasLasReglas();

    res.render('home', {
      title: 'MINICORE - Sistema de Comisiones',
      vendedores,
      totalVentas: ventas.length,
      totalVendedores: vendedores.length,
      totalReglas: reglas.length
    });
  }
}
