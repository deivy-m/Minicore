// interfaces/IComisionStrategy.ts
// Interfaz Strategy - Define contrato para todas las estrategias de comisión

export interface IComisionStrategy {
  calcular(monto: number): number;
  getTipo(): string;
  getRango(): string;
  getPorcentaje(): number; // NUEVO: retorna el porcentaje directamente
}