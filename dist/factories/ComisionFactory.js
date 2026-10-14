"use strict";
// factories/ComisionFactory.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionFactory = void 0;
const ComisionBasica_1 = require("../strategies/ComisionBasica");
const ComisionMedia_1 = require("../strategies/ComisionMedia");
const ComisionAlta_1 = require("../strategies/ComisionAlta");
const ComisionPremium_1 = require("../strategies/ComisionPremium");
class ComisionFactory {
    // Crea estrategia segun sumatoria mensual de ventas
    static crearEstrategia(montoTotal) {
        if (montoTotal <= 600) {
            return new ComisionBasica_1.ComisionBasica();
        }
        else if (montoTotal <= 800) {
            return new ComisionMedia_1.ComisionMedia();
        }
        else if (montoTotal <= 1000) {
            return new ComisionAlta_1.ComisionAlta();
        }
        else {
            return new ComisionPremium_1.ComisionPremium();
        }
    }
}
exports.ComisionFactory = ComisionFactory;
//# sourceMappingURL=ComisionFactory.js.map