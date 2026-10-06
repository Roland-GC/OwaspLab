# OWASP Security Playground

Laboratorio web interactivo para aprender sobre vulnerabilidades OWASP. Es una
aplicación estática de React y Vite; no necesita servidor de aplicaciones ni
variables de entorno.

## Requisitos

- Node.js 22.12 o superior
- npm (incluido con Node.js)

## Compilar y comprobar localmente

```sh
npm ci
npm run build
npm run preview
```

Vite genera la versión de producción en `dist/`. `npm run preview` permite
comprobar localmente esa misma versión antes de publicarla.

## Despliegue

Configura el proveedor de hosting estático con estos valores:

- Comando de instalación: `npm ci`
- Comando de build: `npm run build`
- Directorio de publicación: `dist`
- Versión de Node.js: `22.12` o superior

También puedes compilar localmente y publicar el contenido de `dist/`. La
configuración de Vite usa rutas relativas, compatible con hosting en la raíz o
bajo una subruta. No publiques `node_modules/`.

Activa HTTPS en el proveedor. Las cabeceras HTTP de seguridad se configuran en
el hosting o CDN; no se definen desde esta aplicación estática.

## Alcance del laboratorio

Las pruebas de vulnerabilidades son simulaciones educativas ejecutadas en el
navegador. No proporcionan un backend real, no escanean sistemas externos ni
implementan controles de seguridad de producción para otras aplicaciones.

El workflow de GitHub Actions ejecuta análisis de código, auditoría de
dependencias y la compilación de producción en cada push y pull request a
`main` o `master`.
