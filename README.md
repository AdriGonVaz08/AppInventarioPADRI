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

### 2. Configurar el Backend (Servidor en C#)
El servidor está construido con ASP.NET Core y requiere crear la base de datos local antes de arrancar.

1.  Abre **Visual Studio (la version que tengas)**.
2.  Haz clic en **"Abrir un proyecto o una solución"** y selecciona el archivo del proyecto dentro de la carpeta `BackendInventario`.
3.  **Generar la Base de Datos:** Ve al menú superior y selecciona **Herramientas > Administrador de paquetes NuGet > Consola del Administrador de paquetes**.
4.  En la consola que se abre abajo, escribe el siguiente comando y pulsa Enter:
    ```powershell
    Update-Database
    ```
    *(Esto creará físicamente el archivo `inventario.db` usando Entity Framework).*
5.  **Arrancar el servidor:** Pulsa el botón de **"Iniciar"** (el icono de Play verde en la barra superior) o presiona `F5`.
    *Se abrirá automáticamente una pestaña en tu navegador con Swagger confirmando que la API está activa.*

### 3. Abrir el Frontend (Cliente)
1.  Sin cerrar Visual Studio (dejando el servidor corriendo de fondo), ve a la carpeta `frontend`.
2.  Abre el archivo `index.html` en tu navegador (Chrome, Edge, Firefox, etc.).

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** C#, ASP.NET Core Web API.
* **Base de Datos:** SQLite (Local), Entity Framework Core (ORM).
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Arquitectura:** API REST.

## ✨ Funcionalidades Principales

1.  **Vista Principal:**
    * Listado automático de productos con imagen, nombre y stock.
    * **Buscador** en tiempo real (filtra por nombre).
    * **Ordenación** alfabética (A-Z y Z-A).
2.  **Gestión de Artículos (Subida de Archivos Real):**
    * **Crear:** Formulario para añadir nuevos productos enviando los datos mediante `FormData`.
    * **Imágenes Físicas:** Uso de `<input type="file">` para subir imágenes que se guardan físicamente en el directorio `wwwroot/images` del servidor.
    * **Borrar:** Eliminación con confirmación de seguridad.
    * Todos los cambios se guardan localmente en el archivo `inventario.db` generado automáticamente por el contexto de Entity Framework.

---

## 📸 Capturas de Pantalla

Aquí puedes ver cómo luce la aplicación:

| Vista Principal | Formulario de Edición |
|:---:|:---:|
| ![Vista Principal](screenshots/vista-principal.png) | ![Formulario](screenshots/formulario.png) |
