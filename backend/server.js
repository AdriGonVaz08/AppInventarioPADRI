const express = require('express'); //Express es el framework que usaremos para crear nuestro servidor
const mongoose = require('mongoose');
const cors = require('cors'); //cors se usara para permitir que nuestro frontend (que corre en otro puerto) pueda comunicarse con el backend sin problemas de seguridad
const Articulo = require('./models/Articulo'); // Importamos el modelo

const app = express();
app.use(cors());
app.use(express.json()); // Esto es para que el servidor pueda entender los datos que le enviamos en formato JSON desde el frontend

// ---Establecemos nuestra conexion con MongoDB ---
const uri = "mongodb://admin:admin1234@ac-qnsadp1-shard-00-00.hdo8nki.mongodb.net:27017,ac-qnsadp1-shard-00-01.hdo8nki.mongodb.net:27017,ac-qnsadp1-shard-00-02.hdo8nki.mongodb.net:27017/InventarioApp?ssl=true&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(async () => {
    console.log('¡Conexión exitosa a MongoDB Atlas!');
    // Insertar 30 artículos si no existen
    await inicializarDatos();
  })
  .catch((error) => console.error('Error al conectar:', error));

// --- RUTAS ---
// Esto conecta las funciones que creamos en el paso 2
const articulosRouter = require('./routes/articulos');
app.use('/api/articulos', articulosRouter);

// --- Funcion  para crear 30 Articulos automaticamente en caso de que la base de datos este vacia---
async function inicializarDatos() {
    const cuenta = await Articulo.countDocuments();
    if (cuenta === 0) {
        console.log("Base de datos vacía. Creando 30 artículos de prueba...");
        const datosIniciales = [];
        for (let i = 1; i <= 30; i++) {
            datosIniciales.push({
                nombre: `Producto de Ejemplo ${i}`,
                stock: Math.floor(Math.random() * 100), // Stock aleatorio
                imagen: "https://via.placeholder.com/150" // Imagen genérica
            });
        }
        await Articulo.insertMany(datosIniciales);
        console.log("¡30 artículos insertados correctamente!");
    } else {
        console.log(`Ya tienes ${cuenta} artículos en la base de datos.`);
    }
}
//Finalmente, iniciamos el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});