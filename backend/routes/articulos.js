const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');

// 1 Obtener Todos (Para nuestra  Vista Principal)
router.get('/', async (req, res) => {
    try {
        const articulos = await Articulo.find();
        res.json(articulos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2 CREAR UNO (Para la Vista Añadir)
router.post('/', async (req, res) => {
    const articulo = new Articulo({
        nombre: req.body.nombre,
        stock: req.body.stock,
        imagen: req.body.imagen
    });

    try {
        const nuevoArticulo = await articulo.save();
        res.status(201).json(nuevoArticulo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3 EDITAR UNO (Para la Vista Editar)
router.put('/:id', async (req, res) => {
    try {
        // Busca por ID y actualiza con los datos nuevos
        const articuloActualizado = await Articulo.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true } // Devuelve el artículo ya cambiado
        );
        res.json(articuloActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4 BORRAR UNO (Para el botón Borrar)
router.delete('/:id', async (req, res) => {
    try {
        await Articulo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Artículo eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;