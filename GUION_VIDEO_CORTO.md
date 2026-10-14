# 🎬 Guion de Video Explicativo: MINICORE Sistema de Comisiones MVC

> **Duración total:** 4 a 5 minutos  
> **Tema:** Ejecución local, demostración del CORE y explicación de arquitectura MVC  
> **Tecnologías:** Node.js, Express.js, TypeScript, EJS (Server-Side Rendering)

---

## ⏱️ Estructura del Video (Timeline)

| Minuto | Sección | Lo que muestras en pantalla |
|---|---|---|
| **0:00 - 0:30** | Bienvenida y Objetivo | Diapositiva o VS Code con el proyecto abierto |
| **0:30 - 1:20** | Cómo correr el proyecto | Terminal / PowerShell ejecutando los comandos |
| **1:20 - 2:50** | Demostración en el Navegador (El CORE) | Navegador en `http://localhost:3001` probando el filtro |
| **2:50 - 4:10** | Explicación Técnica y Arquitectura MVC | Código en VS Code (Carpetas, Controller, Strategy, Factory) |
| **4:10 - 4:50** | Despliegue en la Nube (Deploy) | Archivo `render.yaml` y pasos de despliegue |
| **4:50 - 5:00** | Cierre | Pantalla final / Despedida |

---

## 🎙️ Guion Paso a Paso

---

### 1. Introducción y Objetivo (0:00 - 0:30)

* **En pantalla:** VS Code con el proyecto abierto o carátula de presentación.
* **Lo que dices:**
> "Hola a todos. En este video voy a explicar la resolución del ejercicio **MINICORE: Sistema de Comisiones de Ventas**, correspondiente al taller formativo de MVC.
> 
> El objetivo de este proyecto es implementar una aplicación web bajo el patrón **MVC (Modelo-Vista-Controlador)** usando **Node.js, Express, TypeScript y EJS** para el renderizado del lado del servidor. El sistema calcula las comisiones mensuales de los vendedores aplicando patrones de diseño de software y principios SOLID."

---

### 2. Cómo correr el proyecto localmente (0:30 - 1:20)

* **En pantalla:** Terminal integrada de VS Code o PowerShell en la carpeta del proyecto.
* **Lo que dices:**
> "Veamos cómo poner a funcionar el proyecto desde cero en nuestra máquina local:
> 
> **Paso 1:** Abrimos la terminal en la carpeta del proyecto:
> ```bash
> # Instalar dependencias
> npm install
> ```
> *(Aquí se instalan Express, EJS, TypeScript y demás dependencias necesarias)*.
> 
> **Paso 2:** Compilamos el código TypeScript a JavaScript:
> ```bash
> npm run build
> ```
> *(Como vemos, compila limpiamente sin ningún error)*.
> 
> **Paso 3:** Iniciamos el servidor en modo desarrollo o producción:
> ```bash
> npm start
> # o para desarrollo con recarga automática:
> npm run dev
> ```
> En la consola vemos que el servidor está escuchando en el **puerto 3001** y nos muestra las rutas disponibles."

---

### 3. Demostración del Sistema en el Navegador (1:20 - 2:50)

* **En pantalla:** Abre el navegador en `http://localhost:3001`.
* **Lo que dices:**
> "Ahora abrimos nuestro navegador en `http://localhost:3001`.
> 
> * **Inicio (`/`):** Tenemos una interfaz limpia y minimalista que nos muestra las métricas generales: número de vendedores, ventas y reglas.
> * **Vendedores (`/vendedores`):** Aquí listamos los vendedores registrados: Carlos Mendoza, Andrea Torres, Luis Paredes y María Suárez, con su correo y estado activo.
> * **Reglas (`/reglas`):** Vemos las 4 reglas de negocio: Comisión Básica al 6%, Media al 8%, Alta al 10% y Premium al 15% para ventas mayores a $1,000.
> 
> **La Funcionalidad CORE (`/comisiones`):**
> Vamos al calculador. Aquí es donde se cumple el requerimiento principal:
> 1. Colocamos el rango de fechas, por ejemplo del **1 de junio de 2025** al **30 de junio de 2025**.
> 2. Dejamos seleccionado 'Todos los vendedores' y hacemos clic en **Calcular**.
> 3. El sistema nos genera de inmediato un resumen general con el total vendido y el total de comisiones a pagar.
> 4. Abajo vemos cada vendedor con su tarjeta: su total acumulado, la regla que se le aplicó, el porcentaje exacto y el botón para desplegar el detalle de cada factura o venta."

---

### 4. Arquitectura y Código: MVC + Patrones de Diseño (2:50 - 4:10)

* **En pantalla:** VS Code mostrando la estructura del proyecto en `src/`.
* **Lo que dices:**
> "Revisemos brevemente cómo está estructurado el código bajo el patrón MVC y buenas prácticas:
> 
> 1. **Controladores (`src/controllers`):** 
>    Tenemos controladores dedicados como `ComisionController.ts`, que recibe la petición HTTP, valida las fechas y llama al servicio correspondiente, retornando la vista EJS renderizada.
> 
> 2. **Vistas (`views`):** 
>    Las plantillas `.ejs` están separadas con parciales reutilizables (`header.ejs`, `footer.ejs`), logrando un front-end limpio y mantenible.
> 
> 3. **Modelos y Repositorio (`src/repositories`):** 
>    Implementamos el **Repository Pattern** con una interfaz `IVentaRepository`. Esto respeta el principio de **Inversión de Dependencias (DIP)** de SOLID, desacoplando la lógica de negocio de la fuente de datos.
> 
> 4. **Cálculo de Comisiones (Patrones Strategy y Factory):**
>    En `src/strategies` cada regla es una clase independiente (`ComisionBasica`, `ComisionMedia`, `ComisionAlta`, `ComisionPremium`) que implementa la interfaz `IComisionStrategy`. Y `ComisionFactory` se encarga de instanciar la estrategia adecuada según el monto acumulado del vendedor."

---

### 5. Despliegue en la Nube y Cierre (4:10 - 5:00)

* **En pantalla:** Muestra el archivo `render.yaml` o la guía de despliegue `DEPLOYMENT_GUIDE.md`.
* **Lo que dices:**
> "Para el despliegue en la nube, el proyecto está completamente preparado para plataformas PaaS como **Render**:
> 
> * Ya cuenta con el archivo `render.yaml` y su `Procfile` configurado para ejecutar `npm install --include=dev && npm run build` y arrancar con `npm start`.
> * Solo se necesita conectar el repositorio de GitHub en Render como Web Service y se desplegará de forma automática y gratuita.
> 
> En conclusión, hemos migrado y perfeccionado el ejercicio a una arquitectura MVC pura en Node.js, corrigiendo los errores previos de lógica y diseño. Muchas gracias por su atención."

---

## 💡 Consejos para la Grabación

1. **Resolución recomendada:** 1080p (Full HD).
2. **Tamaño de letra en VS Code:** Aumenta el zoom con `Ctrl + +` para que se lea con claridad.
3. **Pestañas preparadas:** Ten ya abiertas las pestañas de `http://localhost:3001` y `http://localhost:3001/comisiones`.
4. **Fechas para la prueba:** Usa siempre **2025-06-01** a **2025-06-30** para que coincida exactamente con las ventas de prueba registradas.
