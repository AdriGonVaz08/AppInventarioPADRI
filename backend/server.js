const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json()); 

// URL para la conexion (esta parte costo un poco mas  por la version de Node y el driver del MongoDB)
const uri = "mongodb://admin:admin1234@ac-qnsadp1-shard-00-00.hdo8nki.mongodb.net:27017,ac-qnsadp1-shard-00-01.hdo8nki.mongodb.net:27017,ac-qnsadp1-shard-00-02.hdo8nki.mongodb.net:27017/InventarioApp?ssl=true&authSource=admin&retryWrites=true&w=majority";

// Hacer la conexión
mongoose.connect(uri)
  .then(() => {
    console.log('¡Conexión exitosa a MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

// Encender el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});