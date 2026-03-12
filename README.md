# 📦 AppInventarioPADRI - Sistema de Gestión de Inventario

Aplicación web Full Stack para la gestión de stock de productos. Permite crear, leer, actualizar y eliminar artículos (CRUD completo) conectándose a una base de datos local (SQLite) mediante enfoque Code First.

## 👥 Autores
* **Pablo** - Backend & Database
* **Adri** - Frontend & UI

---

## Guía de Instalación y Ejecución

Sigue estos pasos para probar la aplicación en tu entorno local:

### 1. Extraer el proyecto
Descarga el código fuente y descomprime el archivo `.zip`.

### 2. Configurar el Backend (Servidor en ASP.NET Core)
El servidor está construido con ASP.NET Core y requiere crear la base de datos local antes de arrancar.

1.  Abre **Visual Studio** (2022 recomendado).
2.  Haz clic en **"Abrir un proyecto o una solución"** y selecciona el archivo de la solución `.sln` (o el `.csproj` dentro de la carpeta `BackendInventario`).
3.  **Generar la Base de Datos:** Ve al menú superior y selecciona **Herramientas > Administrador de paquetes NuGet > Consola del Administrador de paquetes**.
4.  En la consola que se abre en la parte inferior, escribe el siguiente comando y pulsa Enter:
    ```powershell
    Update-Database
    ```
5.  **Arrancar el servidor:** Pulsa el botón de **"Iniciar"** (el icono de Play verde en la barra superior) o presiona `F5`.
    *Se abrirá automáticamente una pestaña en tu navegador confirmando que la API está activa y escuchando peticiones.*

### 3. Abrir el Frontend (Cliente)
1.  Sin cerrar Visual Studio (dejando el servidor corriendo de fondo), ve a la carpeta `frontend`.
2.  Abre el archivo `index.html` en tu navegador (Chrome, Edge, Firefox, etc.). ¡Ya puedes interactuar con el inventario completo!

---

##  Tecnologías Utilizadas

* **Backend:** C#, ASP.NET Core Web API.
* **Base de Datos:** SQLite (Local), Entity Framework Core (ORM) con aproximación Code First y Data Seeding.
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Arquitectura:** API REST separada del cliente.

##  Funcionalidades Principales

1.  **Vista Principal:**
    * Listado automático de productos con imagen, nombre y stock (30 artículos pre-cargados).
    * **Buscador** en tiempo real (filtra por nombre ignorando mayúsculas y tildes).
    * **Ordenación** alfabética (A-Z y Z-A).
2.  **Gestión de Artículos (Subida de Archivos Real):**
    * **Crear:** Formulario para añadir nuevos productos enviando los datos mediante `FormData`.
    * **Imágenes Físicas:** Uso de `<input type="file">` para subir imágenes que se guardan físicamente en el directorio `wwwroot/images` del servidor.
    * **Editar/Actualizar:** Reutilización de vistas con gestión inteligente de imágenes (mantiene la anterior si no se sube una nueva).
    * **Borrar:** Eliminación con ventana de confirmación de seguridad.

---

##  Capturas de Pantalla

Aquí puedes ver cómo luce la aplicación:

| Vista Principal | Formulario de Edición |
|:---:|:---:|
| ![Vista Principal](screenshots/vista-principal.png) | ![Formulario](screenshots/formulario.png) |
