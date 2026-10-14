"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionMedia = void 0;
class ComisionMedia {
    calcular(monto) {
        return monto * 0.08; // 8%
    }
    getTipo() {
        return 'Comisión Media';
    }
    getRango() {
        return '$601 - $800';
    }
    getPorcentaje() {
        return 8.0;
    }
}
exports.ComisionMedia = ComisionMedia;
//# sourceMappingURL=ComisionMedia.js.map