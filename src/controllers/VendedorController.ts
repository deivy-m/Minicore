// controllers/VendedorController.ts
// MVC Controller - Maneja vistas y API de vendedores

import { Request, Response } from 'express';
import { IVentaRepository } from '../interfaces/IVentaRepository';

export class VendedorController {
  constructor(private ventaRepo: IVentaRepository) {}

  // GET /vendedores - Vista EJS con lista de vendedores
  listarVendedores(req: Request, res: Response): void {
    const vendedores = this.ventaRepo.obtenerTodosLosVendedores();
    res.render('vendedores', {
      title: 'Vendedores',
      vendedores
    });
  }

  // GET /api/vendedores - API REST
  apiListarVendedores(req: Request, res: Response): void {
    const vendedores = this.ventaRepo.obtenerTodosLosVendedores();
    res.json({
      success: true,
      message: 'Vendedores obtenidos',
      data: vendedores,
      total: vendedores.length
    });
  }
}
