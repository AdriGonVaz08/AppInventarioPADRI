const URL_API = 'http://localhost:5216/api/articulos';
let articulosLocales = [];

// Elementos del DOM
const contenedor = document.getElementById('contenedor-articulos');
const buscador = document.getElementById('buscador');
const selectorOrden = document.getElementById('ordenar');
const vistaPrincipal = document.getElementById('vista-principal');
const vistaFormulario = document.getElementById('vista-formulario');
const formArticulo = document.getElementById('form-articulo');

// --- 1. CARGAR DATOS ---
async function obtenerArticulos() {
    try {
        const res = await fetch(URL_API);
        articulosLocales = await res.json();
        filtrarYOrdenar();
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

        // LIMPIEZA DE URL: Cambiamos cualquier puerto (5000, etc) por el 5216
        // y nos aseguramos de usar art.imagen (que es como viene en tu JSON)
        const urlImagenCorrecta = art.imagen.replace(/localhost:\d+/, 'localhost:5216');

        card.innerHTML = `
            <img src="${urlImagenCorrecta}" alt="${art.nombre}" onerror="this.src='https://via.placeholder.com/150?text=Error+Imagen'">
            <h3>${art.nombre}</h3>
            <p>Stock: <strong>${art.stock}</strong></p>
            <div class="acciones">
                <button onclick="prepararEdicion(${art.id})" class="btn-edit">Editar</button>
                <button onclick="eliminarArticulo(${art.id})" class="btn-delete">Eliminar</button>
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

// --- 5. GUARDAR (POST / PUT) ---
formArticulo.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('articulo-id').value;
    const inputImagen = document.getElementById('input-imagen');

    const formData = new FormData();
    formData.append('nombre', document.getElementById('input-nombre').value);
    formData.append('stock', document.getElementById('input-stock').value);

    if (inputImagen.files[0]) {
        formData.append('imagen', inputImagen.files[0]);
    }

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${URL_API}/${id}` : URL_API;

    try {
        const res = await fetch(url, { method: metodo, body: formData });
        if (res.ok) {
            volverPrincipal();
            obtenerArticulos();
        } else {
            // ¡LA TRAMPA DESCUBIERTA! 
            // Si el servidor rechaza los datos, leemos el porqué y lo mostramos
            const errorDelServidor = await res.text();
            console.error("💥 El servidor C# dice:", errorDelServidor);
            alert("Error al guardar. Abre la consola (F12) para ver los detalles.");
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Error crítico al conectar con el servidor C#.");
    }
};

// --- 6. PREPARAR EDICIÓN ---
function prepararEdicion(id) {
    const art = articulosLocales.find(a => a.id == id);
    if (art) {
        document.getElementById('articulo-id').value = art.id;
        document.getElementById('input-nombre').value = art.nombre;
        document.getElementById('input-stock').value = art.stock;
        document.getElementById('titulo-formulario').innerText = "Editar Artículo";
        mostrarFormulario(true);
    }
}

// --- 7. ELIMINAR ---
async function eliminarArticulo(id) {
    if (confirm("¿Estás seguro?")) {
        try {
            const res = await fetch(`${URL_API}/${id}`, { method: 'DELETE' });
            if (res.ok) obtenerArticulos();
        } catch (error) {
            alert("Error al eliminar");
        }
    }
}

// Eventos
document.getElementById('btn-abrir-crear').onclick = () => mostrarFormulario();
document.getElementById('btn-cancelar').onclick = volverPrincipal;
buscador.oninput = filtrarYOrdenar;
selectorOrden.onchange = filtrarYOrdenar;
document.addEventListener('DOMContentLoaded', obtenerArticulos);