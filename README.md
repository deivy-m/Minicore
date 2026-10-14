# 🧾 MINICORE - Sistema de Comisiones de Ventas
link video: https://youtu.be/MsuRi2VNWmM

link deploy: https://minicore-90hj.onrender.com

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-lightgrey?logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![EJS](https://img.shields.io/badge/EJS-3.1.10-yellow)](https://ejs.co/)
[![Architecture](https://img.shields.io/badge/Architecture-MVC%20%2B%20SSR-orange)](#-arquitectura-mvc)
[![Deploy](https://img.shields.io/badge/Render-Ready-46E3B7?logo=render)](https://render.com/)

Aplicación web desarrollada bajo el patrón arquitectónico **MVC (Modelo-Vista-Controlador)** con **Node.js, Express, EJS** (Server-Side Rendering) y **TypeScript**. 

El sistema implementa patrones de diseño de software (**Strategy**, **Factory**, **Repository**) y principios **SOLID** para calcular de manera desacoplada y robusta las comisiones acumuladas de los vendedores en un período de tiempo determinado.

---

## 🎯 Funcionalidad CORE y Regla de Negocio

El sistema permite filtrar las ventas en un rango de fechas (`fecha_inicio` y `fecha_fin`) y calcular automáticamente la comisión correspondiente a cada vendedor.

> [!IMPORTANT]
> **Cálculo sobre Sumatoria Mensual Acumulada**:  
> La comisión **no** se calcula por venta individual. El sistema suma el total de ventas que cada vendedor realizó durante el rango de fechas seleccionado y, en base a esa sumatoria total acumulada, aplica la escala de comisión correspondiente.

### 📊 Escala de Comisiones Vigente:

| Rango de Ventas Totales | Porcentaje | Estrategia Aplicada |
|:---|:---:|:---|
| **\$0.00 – \$600.00** | **6.0%** | Comisión Básica |
| **\$601.00 – \$800.00** | **8.0%** | Comisión Media |
| **\$801.00 – \$1,000.00** | **10.0%** | Comisión Alta |
| **Más de \$1,000.00** | **15.0%** | Comisión Premium |

---

## 🏗️ Arquitectura MVC

El proyecto sigue una estricta separación de responsabilidades:

```
├── src/
│   ├── app.ts                  # Servidor Express, configuración EJS y middlewares
│   ├── controllers/            # Controladores MVC
│   │   ├── HomeController.ts       # GET / (Vista principal / Dashboard)
│   │   ├── ComisionController.ts   # GET/POST /comisiones, GET /api/ventas/comisiones
│   │   ├── VendedorController.ts   # GET /vendedores, GET /api/vendedores
│   │   └── ReglaController.ts      # GET /reglas, GET /api/reglas
│   ├── interfaces/             # Contratos para abstracción (DIP)
│   │   ├── IComisionStrategy.ts    # Contrato para cálculo y porcentajes
│   │   └── IVentaRepository.ts     # Contrato para acceso a datos
│   ├── strategies/             # Patrón Strategy (Cálculo individual por regla)
│   │   ├── ComisionBasica.ts       # 6.0% ($0 - $600)
│   │   ├── ComisionMedia.ts        # 8.0% ($601 - $800)
│   │   ├── ComisionAlta.ts         # 10.0% ($801 - $1,000)
│   │   └── ComisionPremium.ts      # 15.0% ($1,000+)
│   ├── factories/              # Patrón Factory
│   │   └── ComisionFactory.ts      # Instancia la estrategia adecuada según el monto
│   ├── repositories/           # Patrón Repository
│   │   └── VentaRepository.ts      # Implementación desacoplada de IVentaRepository
│   ├── services/               # Lógica de Negocio (SRP)
│   │   ├── ComisionService.ts      # Agrupación por vendedor y cálculo
│   │   └── ValidacionService.ts    # Validación de formato de fechas e IDs
│   ├── routes/                 # Enrutadores
│   │   ├── viewRoutes.ts           # Rutas MVC que devuelven vistas HTML (EJS)
│   │   └── apiRoutes.ts            # Rutas REST que retornan JSON
│   └── types/                  # Definiciones e interfaces TypeScript
├── views/                      # Vistas EJS (Server-Side Rendering)
│   ├── partials/
│   │   ├── header.ejs              # Navegación y encabezado
│   │   └── footer.ejs              # Pie de página
│   ├── home.ejs                    # Panel de bienvenida y estadísticas
│   ├── comisiones.ejs              # Interfaz CORE de filtrado y cálculo
│   ├── vendedores.ejs              # Tabla de vendedores registrados
│   ├── reglas.ejs                  # Catálogo de reglas de comisión
│   └── error.ejs                   # Vista de error amigable (404 / 500)
├── public/                     # Archivos estáticos
│   ├── css/styles.css              # Estilos limpios y responsivos
│   └── js/main.js                  # Navegación activa en cliente
├── render.yaml                 # Configuración de despliegue en Render
├── Procfile                    # Comando de inicio para plataformas PaaS
├── package.json
└── tsconfig.json
```

---

## 🛠️ Patrones de Diseño y Principios SOLID

1. **Model-View-Controller (MVC)**:
   - **Modelo**: Tipos fuertemente tipados, abstracciones y `VentaRepository`.
   - **Vista**: Plantillas EJS modulares con soporte para parciales reutilizables.
   - **Controlador**: Maneja la interacción entre el usuario, la lógica de negocio y las vistas.

2. **Patrón Strategy (`IComisionStrategy`)**:
   - Cada tipo de comisión es una clase independiente. Agregar una nueva regla no requiere modificar las clases existentes (Open/Closed Principle).

3. **Patrón Factory (`ComisionFactory`)**:
   - Centraliza la selección de la estrategia evaluando la sumatoria total de ventas del período.

4. **Patrón Repository & Dependency Inversion Principle (DIP)**:
   - La lógica de negocio (`ComisionService`) y los controladores interactúan únicamente con la interfaz `IVentaRepository`. Esto permite sustituir la fuente de datos (en memoria, PostgreSQL, SQL Server) sin tocar una sola línea de lógica de cálculo.

5. **Single Responsibility Principle (SRP)**:
   - `ValidacionService`: Encargado exclusivamente de verificar formatos de fecha (`YYYY-MM-DD`).
   - `ComisionService`: Encargado únicamente de la orquestación del cálculo.

---


## 💻 Instalación y Ejecución Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Git](https://git-scm.com/)

### Paso a Paso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/deivy-m/Minicore.git
   cd Minicore
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Compilar TypeScript**:
   ```bash
   npm run build
   ```

4. **Iniciar el servidor**:
   ```bash
   # Modo desarrollo (con recarga automática):
   npm run dev

   # O modo producción:
   npm start
   ```

5. **Abrir en el navegador**:
   - 🏠 **Panel Principal**: [http://localhost:3001](http://localhost:3001)
   - ⚡ **Calculador de Comisiones**: [http://localhost:3001/comisiones](http://localhost:3001/comisiones)
   - 👥 **Vendedores**: [http://localhost:3001/vendedores](http://localhost:3001/vendedores)
   - 📋 **Reglas de Negocio**: [http://localhost:3001/reglas](http://localhost:3001/reglas)
   - 📡 **Endpoint API REST**: [http://localhost:3001/api/ventas/comisiones?fecha_inicio=2025-06-01&fecha_fin=2025-06-30](http://localhost:3001/api/ventas/comisiones?fecha_inicio=2025-06-01&fecha_fin=2025-06-30)

> [!TIP]
> Para probar el cálculo con los datos precargados, ingresa el rango de fechas **2025-06-01** al **2025-06-30**.

---

## ☁️ Despliegue en la Nube (Render)

El proyecto cuenta con configuración lista para desplegar en **Render**:

1. Conecta tu repositorio de GitHub a [Render Dashboard](https://dashboard.render.com).
2. Crea un nuevo **Web Service**.
3. Parámetros de configuración:
   - **Environment:** `Node`
   - **Root Directory:** *(dejar completamente vacío)*
   - **Build Command:** `npm install --include=dev && npm run build`
   - **Start Command:** `npm start`
4. Haz clic en **Create Web Service**.

---
