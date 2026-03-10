# Asistente Inteligente de Pendientes y Pagos

Aplicación multiplataforma para la gestión de pagos, cuentas y recordatorios, con evolución progresiva hacia un sistema inteligente basado en datos.

El proyecto busca centralizar la administración de pagos y pendientes personales, integrando recordatorios inteligentes, análisis de datos y automatización de tareas financieras.

---

# Tecnologías

### Frontend

* Ionic
* Angular

### Backend

* Node.js
* NestJS
* Prisma ORM

### Base de Datos

* PostgreSQL

### Infraestructura

* Docker
* Docker Compose

### Autenticación (planificado)

* Google OAuth
* JWT

### Cloud (planificado)

* Google Cloud
* Firebase

---

# Estado del Proyecto

🚧 En desarrollo
Actualmente en fase de **modelado de dominio y configuración de arquitectura base del backend**.

---

# Arquitectura del Proyecto

```
asistente-pagos
│
├── backend
│   ├── prisma
│   │   ├── migrations
│   │   └── schema.prisma
│   │
│   ├── src
│   │   ├── modules
│   │   ├── config
│   │   └── main.ts
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   └── (Ionic + Angular)
│
└── docker-compose.yml
```

---

# Requisitos para Desarrollo

Instalar previamente:

* Node.js >= 20
* Docker
* Docker Compose
* Git

Verificar instalación:

```
node -v
npm -v
docker -v
docker compose version
```

---

# Instalación del Proyecto

## 1. Clonar el repositorio

```
git clone https://github.com/MilkoMedel/asistente-pagos.git
cd asistente-pagos
```

---

# 2. Instalar dependencias del backend

Entrar a la carpeta backend:

```
cd backend
```

Instalar dependencias:

```
npm install
```

---

# 3. Configurar variables de entorno

Crear archivo:

```
backend/.env
```

Contenido:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/asistente_pagos?schema=public"
```

---

# 4. Levantar base de datos con Docker

Desde la **carpeta raíz del proyecto**:

```
docker-compose up -d
```

Verificar que el contenedor esté activo:

```
docker ps
```

Debería aparecer el contenedor:

```
asistente-postgres
```

---

# 5. Ejecutar migraciones de base de datos

Entrar nuevamente al backend:

```
cd backend
```

Ejecutar migraciones:

```
npx prisma migrate dev --name init
```

Esto realizará:

* creación de tablas
* sincronización del esquema
* generación del cliente Prisma

---

# 6. Generar cliente de Prisma

```
npx prisma generate
```

---

# 7. Iniciar el servidor backend

```
npm run start:dev
```

El servidor iniciará en:

```
http://localhost:3000
```

---

# Herramientas útiles

## Prisma Studio

Permite visualizar y editar datos de la base de datos desde una interfaz web.

```
npx prisma studio
```

---

# Base de Datos

Base de datos PostgreSQL ejecutándose en Docker.

Configuración por defecto:

| Parámetro     | Valor           |
| ------------- | --------------- |
| Usuario       | postgres        |
| Password      | postgres        |
| Puerto        | 5432            |
| Base de datos | asistente_pagos |

---

# Roadmap del Proyecto

Fases planificadas del desarrollo:

1. Modelado de dominio
2. Configuración del backend con NestJS
3. Sistema de autenticación OAuth
4. Gestión de cuentas y pagos
5. Sistema de recordatorios
6. Análisis de datos financieros
7. Integración de inteligencia artificial

---

# Autor

Milko Medel
Desarrollador Full Stack
