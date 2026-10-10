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
npm run dev
```

Se podrá ver de manera local.

## Alcance del laboratorio

Las pruebas de vulnerabilidades son simulaciones educativas ejecutadas en el
navegador. No proporcionan un backend real, no escanean sistemas externos ni
implementan controles de seguridad de producción para otras aplicaciones.

El workflow de GitHub Actions ejecuta análisis de código, auditoría de
dependencias y la compilación de producción en cada push y pull request a
`main` o `master`.
Por favor en caso de usar dar créditos al autor Roland-GC
