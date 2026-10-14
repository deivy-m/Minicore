"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = exports.getConnection = void 0;
const mssql_1 = __importDefault(require("mssql"));
// Configuración de la base de datos SQL Server
const dbConfig = {
    server: process.env.DB_SERVER || 'DESKTOP-HL8DA13\\SQLEXPRESS',
    database: process.env.DB_DATABASE || 'minicore_db',
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: true
    }
};
// Pool de conexiones
let pool = null;
// Función para obtener conexión
const getConnection = async () => {
    try {
        if (!pool) {
            pool = await mssql_1.default.connect(dbConfig);
            console.log('✅ Conexión a SQL Server establecida - MINICORE');
        }
        return pool;
    }
    catch (error) {
        console.error('❌ Error conectando a SQL Server:', error);
        throw error;
    }
};
exports.getConnection = getConnection;
// Función para ejecutar queries
const executeQuery = async (query, params = {}) => {
    try {
        const connection = await (0, exports.getConnection)();
        const request = connection.request();
        // Agregar parámetros si existen
        Object.keys(params).forEach(key => {
            request.input(key, params[key]);
        });
        const result = await request.query(query);
        return result.recordset;
    }
    catch (error) {
        console.error('❌ Error ejecutando query:', error);
        throw error;
    }
};
exports.executeQuery = executeQuery;
exports.default = pool;
//# sourceMappingURL=connection.js.map