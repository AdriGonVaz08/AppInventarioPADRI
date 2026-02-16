const URL_API = 'http://localhost:3000/api/articulos';
let articulosLocales = [];

// Elementos del DOM
const contenedor = document.getElementById('contenedor-articulos');
const buscador = document.getElementById('buscador');
const selectorOrden = document.getElementById('ordenar');
const vistaPrincipal = document.getElementById('vista-principal');
const vistaFormulario = document.getElementById('vista-formulario');
const formArticulo = document.getElementById('form-articulo');

// --- 1. CARGAR DATOS DEL BACKEND ---
async function obtenerArticulos() {
    try {
        const res = await fetch(URL_API);
        articulosLocales = await res.json();
        filtrarYOrdenar(); // Renderiza la lista inicial
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

// --- 2. RENDERIZAR ARTÍCULOS ---
function renderizar(lista) {
    contenedor.innerHTML = '';
    lista.forEach(art => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${art.imagen}" alt="${art.nombre}">
            <h3>${art.nombre}</h3>
            <p>Stock: <strong>${art.stock}</strong></p>
            <div class="acciones">
                <button onclick="prepararEdicion('${art._id}')" class="btn-edit">Editar</button>
                <button onclick="eliminarArticulo('${art._id}')" class="btn-delete">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// --- 3. BUSCADOR Y ORDENAMIENTO ---
function filtrarYOrdenar() {
    const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const texto = normalize(buscador.value);
    
    let filtrados = articulosLocales.filter(art => normalize(art.nombre).includes(texto));

    const orden = selectorOrden.value;
    filtrados.sort((a, b) => {
    return orden === 'asc' 
        ? a.nombre.localeCompare(b.nombre, undefined, { numeric: true }) 
        : b.nombre.localeCompare(a.nombre, undefined, { numeric: true });
});

    renderizar(filtrados);
}

// --- 4. GESTIÓN DE VISTAS ---
function mostrarFormulario(editar = false) {
    vistaPrincipal.classList.add('oculto');
    vistaFormulario.classList.remove('oculto');
    if (!editar) {
        document.getElementById('titulo-formulario').innerText = "Añadir Nuevo Artículo";
        formArticulo.reset();
        document.getElementById('articulo-id').value = '';
    }
}

function volverPrincipal() {
    vistaFormulario.classList.add('oculto');
    vistaPrincipal.classList.remove('oculto');
}

// --- 5. CREAR O EDITAR (POST / PUT) ---
formArticulo.onsubmit = async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('articulo-id').value;
    const datos = {
        nombre: document.getElementById('input-nombre').value,
        stock: Number(document.getElementById('input-stock').value),
        imagen: document.getElementById('input-imagen').value
    };

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${URL_API}/${id}` : URL_API;

    try {
        await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        volverPrincipal();
        obtenerArticulos(); // Recargar lista
    } catch (error) {
        alert("Error al guardar el artículo");
    }
};

// --- 6. PREPARAR EDICIÓN ---
function prepararEdicion(id) {
    const art = articulosLocales.find(a => a._id === id);
    document.getElementById('articulo-id').value = art._id;
    document.getElementById('input-nombre').value = art.nombre;
    document.getElementById('input-stock').value = art.stock;
    document.getElementById('input-imagen').value = art.imagen;
    
    document.getElementById('titulo-formulario').innerText = "Editar Artículo";
    mostrarFormulario(true);
}

// --- 7. ELIMINAR  ---
async function eliminarArticulo(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
        try {
            await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
            obtenerArticulos();
        } catch (error) {
            alert("Error al eliminar");
        }
    }
}

// --- EVENTOS ---
document.getElementById('btn-abrir-crear').onclick = () => mostrarFormulario();
document.getElementById('btn-cancelar').onclick = volverPrincipal;
buscador.oninput = filtrarYOrdenar;
selectorOrden.onchange = filtrarYOrdenar;

// Inicio
document.addEventListener('DOMContentLoaded', obtenerArticulos);