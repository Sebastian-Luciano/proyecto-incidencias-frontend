# Frontend - Proyecto de Gestión de Incidencias 🖥️

Este repositorio contiene la interfaz de usuario del sistema de gestión de incidencias, desarrollada como parte del programa Full Stack de FUNVAL.

## 🧱 Tecnologías Utilizadas

- **React**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **SweetAlert2**
- **Lucide React** (iconos)
- **JWT** (autenticación con token)
- **React Context + useReducer** (gestión de estado)

## ⚙️ Características del Proyecto

- Autenticación de usuarios (login con JWT)
- Panel de administración de incidencias
- Registro, edición y eliminación de incidencias
- Notificaciones visuales (alertas y mensajes)
- Filtro de incidencias por estado
- Estilo moderno y responsivo con Tailwind CSS
- Rutas protegidas para usuarios autenticados

## 📁 Estructura del Proyecto
```
├── src/
│ ├── components/
│ ├── context/
│ ├── hooks/
│ ├── pages/
│ ├── services/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .env
├── package.json
```

## 🚀 Instalación y Ejecución

1. Clona el repositorio:
git clone https://github.com/Sebastian-Luciano/proyecto-incidencias-frontend.git
cd proyecto-incidencias-frontend

2. Instala las dependencias:
npm install

3. Crea un archivo .env en la raíz del proyecto con la siguiente variable:
VITE_API_URL=http://localhost:3000/api

4. Ejecuta el proyecto:
npm run dev


## 🔐 Autenticación
Este frontend se conecta con el backend mediante JWT. Al iniciar sesión correctamente:
   - Se guarda el token en localStorage
   - Se protege el acceso a las rutas privadas
   - Se accede a los datos del usuario y sus incidencias


## 🧠 Autor
Sebastián Javier Luciano Marceliano  
🔗 [GitHub](https://github.com/Sebastian-Luciano)  
✉️ [sebastianperu7@gmail.com](mailto:sebastianperu7@gmail.com)

##📄 Licencia
```
Este proyecto fue desarrollado con fines educativos como parte del curso de Full Stack Developer en FUNVAL.
```