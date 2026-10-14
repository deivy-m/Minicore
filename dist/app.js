"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Importar rutas
const viewRoutes_1 = __importDefault(require("./routes/viewRoutes"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
// Configuración
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// ========== CONFIGURACIÓN MVC ==========
// View Engine - EJS
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '..', 'views'));
// Archivos estáticos (CSS, JS, imágenes)
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// ========== MIDDLEWARES ==========
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ========== RUTAS ==========
// Rutas MVC (renderizan vistas EJS)
app.use('/', viewRoutes_1.default);
// Rutas API REST (retornan JSON)
app.use('/api', apiRoutes_1.default);
// ========== MANEJO DE ERRORES ==========
// 404 - Página no encontrada
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Página no encontrada',
        message: 'La página que buscas no existe.',
        code: 404
    });
});
// 500 - Error interno del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Error del servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor',
        code: 500
    });
});
// ========== INICIAR SERVIDOR ==========
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor MINICORE MVC ejecutándose en puerto ${PORT}`);
            console.log(`🏠 Aplicación: http://localhost:${PORT}`);
            console.log(`📡 API REST: http://localhost:${PORT}/api`);
            console.log(`⚡ Comisiones: http://localhost:${PORT}/comisiones`);
        });
    }
    catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=app.js.map