"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionAlta = void 0;
class ComisionAlta {
    calcular(monto) {
        return monto * 0.10; // 10%
    }
    getTipo() {
        return 'Comisión Alta';
    }
    getRango() {
        return '$801 - $1,000';
    }
    getPorcentaje() {
        return 10.0;
    }
}
exports.ComisionAlta = ComisionAlta;
//# sourceMappingURL=ComisionAlta.js.map