# UNAHUR Anti-Social Net

## Descripción del proyecto

UNAHUR Anti-Social Net es una red social desarrollada como trabajo práctico para la materia Construcción de Interfaces de Usuario.

La aplicación permite a los usuarios registrarse, iniciar sesión y acceder a una plataforma donde pueden interactuar mediante publicaciones, comentarios y otras funcionalidades propias de una red social.

El proyecto fue desarrollado utilizando React, TypeScript y React Bootstrap para el frontend, consumiendo una API REST para la gestión de usuarios y publicaciones.

---

## Instrucciones para correr el proyecto en local

### Requisitos

- Node.js
- npm

### Instalación

Clonar el repositorio:

```bash
git clone https://github.com/x-Madao/CIU-TP-2---Anti-Social.git
```

Ingresar al proyecto:

```bash
cd CIU\ TP\ 2/
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

> **Importante:** para que la aplicación funcione correctamente también debe estar ejecutándose la API del backend.

---

## Repositorio del Backend

```
https://github.com/EP-UnaHur-2026C1/anti-social-documental-tp-nnr.git
```

## API utilizada

La aplicación consume la siguiente API REST:

```
http://localhost:3000/api
```

Principales recursos utilizados:

- `/usuarios`
- `/posts`
- `/tags`

---

## Tecnologías utilizadas

- React
- TypeScript
- React Router
- React Bootstrap
- Bootstrap
- Fetch API