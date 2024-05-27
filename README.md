## Descripción

Teslo shop es un ecommerce de articulos de indumentaria.

## Correr en dev

1. Clonar el directorio
2. Crear una copia del archivo `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Limpiar el LocalStorage del navegador.
8. Correr el proyecto `npm run dev`

## Instalaciones de prisma

1. Correr `npm install prisma --save-dev`
2. Correr `npx prisma init --datasource-provider PostgreSQL`

## Correr en producción
