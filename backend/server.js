const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path'); // <--- AÑADIDO: Necesario para manejar rutas de carpetas
const Articulo = require('./models/Articulo'); 

const app = express();
app.use(cors());
app.use(express.json()); 

// <--- AÑADIDO: Esta línea conecta tu carpeta frontend con el servidor
// Como server.js está en /backend, usamos '../frontend' para subir un nivel y encontrar tu web
app.use(express.static(path.join(__dirname, '../frontend')));

// ---Establecemos nuestra conexion con MongoDB ---
const uri = "mongodb://admin:admin1234@ac-qnsadp1-shard-00-00.hdo8nki.mongodb.net:27017,ac-qnsadp1-shard-00-01.hdo8nki.mongodb.net:27017,ac-qnsadp1-shard-00-02.hdo8nki.mongodb.net:27017/InventarioApp?ssl=true&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(async () => {
    console.log('¡Conexión exitosa a MongoDB Atlas!');
    await inicializarDatos();
  })
  .catch((error) => console.error('Error al conectar:', error));

// --- RUTAS ---
const articulosRouter = require('./routes/articulos');
app.use('/api/articulos', articulosRouter);

// --- Función para crear 30 Artículos automáticamente ---
async function inicializarDatos() {
    const cuenta = await Articulo.countDocuments();
    if (cuenta === 0) {
        console.log("Base de datos vacía. Creando 30 artículos de prueba...");
        const datosIniciales = [];
        for (let i = 1; i <= 30; i++) {
            datosIniciales.push({
                nombre: `Producto de Ejemplo ${i}`,
                stock: Math.floor(Math.random() * 100),
                imagen: "https://via.placeholder.com/150" 
            });
        }
        await Articulo.insertMany(datosIniciales);
        console.log("¡30 artículos insertados correctamente!");
    } else {
        console.log(`Ya tienes ${cuenta} artículos en la base de datos.`);
    }
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});