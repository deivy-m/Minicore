"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionPremium = void 0;
class ComisionPremium {
    calcular(monto) {
        return monto * 0.15; // 15%
    }
    getTipo() {
        return 'Comisión Premium';
    }
    getRango() {
        return '$1,000+';
    }
    getPorcentaje() {
        return 15.0;
    }
}
exports.ComisionPremium = ComisionPremium;
//# sourceMappingURL=ComisionPremium.js.map