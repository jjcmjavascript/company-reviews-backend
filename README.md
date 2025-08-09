# Report Company Backend

Backend para la aplicación Report Company, construido con NestJS, Prisma y PostgreSQL.

---

## 📜 Tabla de Contenidos

- [✨ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [🚀 Instalación](#-instalación)
  - [🐳 Docker](#-docker)
  - [💻 Local](#-local)
- [▶️ Uso](#️-uso)
- [⚙️ Comandos Adicionales](#️-comandos-adicionales)
- [📞 Contacto](#-contacto)

---

## ✨ Características

- 🔐 Autenticación de usuarios
- 🏢 Gestión de empresas
- 📝 Creación y gestión de reportes
- ⭐ Sistema de calificación
- 💬 Comentarios en los reportes

---

## 🛠️ Tecnologías

- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
- **Contenedores:** [Docker](https://www.docker.com/)

---

## 🚀 Instalación

### Configuración Inicial (Para ambas instalaciones)

1.  **Crear archivo `.env`:**
    ```bash
    cp example.env .env
    ```
2.  **Configurar variables de entorno:**
    - Los valores se encuentran en [Trello](https://trello.com/c/qxPbMVZX/8-env-backend).
    - Edita el archivo `.env` con tu editor preferido:
      ```bash
      nano .env
      ```

### 🐳 Docker

#### Requisitos

- Docker v22.10.0+

#### Pasos

1.  **Permisos de ejecución para `dev-entry.sh`:**

    ```bash
    chmod +x dev-entry.sh
    ```

    > **Nota:** Si no puedes dar permisos, descomenta la sección `command` en `docker-compose.yml` y comenta la línea `command: ['./dev-entry.sh']`.

2.  **Injectar seeds (opcional):**
    - Para poblar la base de datos con datos iniciales, asegúrate de que el archivo `seed.json` esté en la raíz del proyecto.

3.  **Levantar los contenedores:**

    ```bash
    docker-compose up --build
    ```

    - Para ejecutar en segundo plano:
      ```bash
      docker-compose up --build -d
      ```

### 💻 Local

#### Requisitos

- Node.js v20.0.0+
- PostgreSQL v16.0.0+

#### Pasos

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Instalar `dotenv-cli` globalmente:**
    ```bash
    npm install -g dotenv-cli
    ```
3.  **Crear la base de datos:**
    ```bash
    npm run db:create
    ```
4.  **Correr migraciones:**
    ```bash
    npx prisma migrate deploy
    ```

---

## ▶️ Uso

- **Iniciar la aplicación en modo desarrollo:**
  ```bash
  npm run dev
  ```

---

## ⚙️ Comandos Adicionales

- **Crear una migración:**
  ```bash
  npx prisma migrate dev --name <nombre-de-la-migracion> && npx prisma generate
  ```
- **Correr tests:**
  - **Dentro de Docker:**
    ```bash
    docker exec -it backend-nest sh
    npm run test
    ```
  - **Localmente:**
    ```bash
    npm run test
    ```

---

## 📞 Contacto

- **Desarrollador:** jjcmjavascript
- **Correo:** jjcmjavascript@gmail.com
- **LinkedIn:** [jjcmjavascript](https://www.linkedin.com/in/jjcmjavascript/)

### Limpiar docker

docker system df
docker system prune -a --volumes #incluye volúmenes
docker compose down --volumes --rmi local --remove-orphans # usando compose
docker builder prune --all

#### Prune específico

docker container prune # contenedores detenidos
docker image prune # imágenes dangling
docker image prune -a # TODAS las imágenes no usadas
docker network prune # redes sin contenedores
docker volume prune # volúmenes sin referencia (podrías perder datos)
