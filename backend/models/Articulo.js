const mongoose = require('mongoose');

// El esquema define la estructura de cada documento en la base de datos
const ArticuloSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true //"Todos los campos serán obligatorios"
    },
    stock: { 
        type: Number, 
        required: true 
    },
    imagen: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Articulo', ArticuloSchema);