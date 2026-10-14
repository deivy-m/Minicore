"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionBasica = void 0;
class ComisionBasica {
    calcular(monto) {
        return monto * 0.06; // 6%
    }
    getTipo() {
        return 'Comisión Básica';
    }
    getRango() {
        return '$0 - $600';
    }
    getPorcentaje() {
        return 6.0;
    }
}
exports.ComisionBasica = ComisionBasica;
//# sourceMappingURL=ComisionBasica.js.map