// strategies/ComisionMedia.ts
import { IComisionStrategy } from '../interfaces/IComisionStrategy';

export class ComisionMedia implements IComisionStrategy {
  calcular(monto: number): number {
    return monto * 0.08; // 8%
  }

  getTipo(): string {
    return 'Comisión Media';
  }

  getRango(): string {
    return '$601 - $800';
  }

  getPorcentaje(): number {
    return 8.0;
  }
}