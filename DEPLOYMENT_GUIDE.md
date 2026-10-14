# ☁️ Guía de Implementación y Despliegue en la Nube (Cloud Deployment)

Esta guía detalla los pasos para desplegar la aplicación **MINICORE - Sistema de Comisiones MVC (Node.js + Express + EJS)** en las principales plataformas de nube: **Render**, **Railway**, **AWS**, **Azure** y **Netlify/Vercel**.

---

## 🚀 Opción 1: Render (Recomendada - Despliegue en 2 minutos)

Render es ideal para aplicaciones Node.js con Server-Side Rendering (EJS).

### Archivos ya incluidos en el proyecto:
- `backend/render.yaml`
- `backend/Procfile`
- `backend/package.json` (con scripts `build` y `start`)

### Pasos:
1. Sube tu repositorio a **GitHub**.
2. Ingresa a [Render.com](https://render.com) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **New +** y selecciona **Web Service**.
4. Conecta tu repositorio `MINICORE-Sistema-Comisiones`.
5. Configura los siguientes parámetros:
   - **Name**: `minicore-comisiones-mvc`
   - **Root Directory**: `backend` (o raíz si moviste los archivos)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
6. En **Environment Variables**, añade:
   - `NODE_ENV` = `production`
   - `PORT` = `3001` (o deja que Render asigne el puerto por defecto mediante `process.env.PORT`)
7. Haz clic en **Create Web Service**.
8. Render compilará el TypeScript (`npx tsc`) y levantará el servidor Node con EJS. Te proporcionará una URL pública tipo `https://minicore-comisiones-mvc.onrender.com`.

---

## 🚂 Opción 2: Railway

1. Ingresa a [Railway.app](https://railway.app).
2. Haz clic en **New Project** > **Deploy from GitHub repo**.
3. Selecciona tu repositorio.
4. En **Settings** del servicio:
   - **Root Directory**: `/backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Railway detecta automáticamente el `Procfile` y asigna un dominio público HTTPS.

---

## ⚡ Opción 3: Netlify / Vercel (Serverless Function)

Dado que Netlify y Vercel están optimizados para sitios estáticos o arquitecturas Jamstack/Serverless, para desplegar una app Express + EJS en Netlify se utiliza **Netlify Functions** o **serverless-http**:

### Configuración para Netlify:
1. Instalar `serverless-http`:
   ```bash
   npm install serverless-http
   ```
2. Crear archivo `netlify/functions/server.js`:
   ```javascript
   const serverless = require('serverless-http');
   const app = require('../../dist/app').default;
   module.exports.handler = serverless(app);
   ```
3. Crear `netlify.toml` en la raíz:
   ```toml
   [build]
     command = "cd backend && npm install && npm run build"
     publish = "backend/public"

   [[redirects]]
     from = "/*"
     to = "/.netlify/functions/server"
     status = 200
   ```

---

## ☁️ Opción 4: AWS (AWS App Runner o Elastic Beanstalk)

### Mediante AWS App Runner (La opción más moderna y rápida de AWS):
1. Entra a la consola de **AWS** > **App Runner**.
2. Selecciona **Source code repository** y conecta tu GitHub.
3. Especifica el branch principal y directorio `/backend`.
4. Configuración de runtime:
   - **Runtime**: `Node.js 18` o `20`
   - **Build command**: `npm install && npm run build`
   - **Start command**: `npm start`
   - **Port**: `3001`
5. Haz clic en **Deploy**. AWS aprovisionará un balanceador de carga, certificado SSL y contenedor automático.

### Mediante AWS Elastic Beanstalk:
1. Empaqueta el backend en un archivo `.zip` incluyendo `package.json`, `dist/`, `views/`, `public/` y `Procfile`.
2. En Elastic Beanstalk, crea una nueva aplicación seleccionando la plataforma **Node.js**.
3. Sube el `.zip` y despliega.

---

## 🔷 Opción 5: Microsoft Azure (App Service)

1. En el portal de Azure, crea un recurso **Web App** (App Service).
2. Configuración:
   - **Publish**: Code
   - **Runtime stack**: Node 20 LTS
   - **Operating System**: Linux
3. En **Deployment Center**, vincula tu repositorio de GitHub.
4. En **Configuration** > **Application Settings**:
   - `SCM_DO_BUILD_DURING_DEPLOYMENT` = `true`
   - `NODE_ENV` = `production`
5. En **Startup Command**: `node dist/app.js`.

---

## ✅ Verificación Post-Deploy
Una vez desplegado en cualquiera de las plataformas:
- Accede a `/` para ver el Dashboard MVC.
- Accede a `/comisiones` para probar el formulario interactivo.
- Accede a `/api/health` para comprobar el status JSON (`{"status": "OK", "version": "2.0.0"}`).
