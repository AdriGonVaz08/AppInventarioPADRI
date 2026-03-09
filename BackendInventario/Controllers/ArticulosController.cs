using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendInventario.Data;
using BackendInventario.Models;

namespace BackendInventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        private readonly InventarioContext _context;
        private readonly IWebHostEnvironment _env;

        // El constructor recibe la base de datos y el entorno (para saber dónde guardar fotos)
        public ArticulosController(InventarioContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // 1. GET: api/Articulos (Obtener todos)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Articulo>>> GetArticulos()
        {
            return await _context.Articulos.ToListAsync();
        }

        // 2. POST: api/Articulos (Crear nuevo con foto)
        [HttpPost]
        public async Task<ActionResult<Articulo>> PostArticulo([FromForm] string nombre, [FromForm] int stock, IFormFile imagen)
        {
            var articulo = new Articulo { Nombre = nombre, Stock = stock };

            // Lógica para guardar el archivo físico en la carpeta wwwroot/images
            if (imagen != null && imagen.Length > 0)
            {
                // Asegurarnos de que existe la carpeta wwwroot/images
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                Directory.CreateDirectory(uploadsFolder);

                // Crear un nombre único para que no se machaquen fotos con el mismo nombre
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + imagen.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Copiar el archivo al disco duro
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await imagen.CopyToAsync(fileStream);
                }

                // Guardar la ruta en la base de datos para que el frontend pueda mostrarla
                articulo.Imagen = "http://localhost:5000/images/" + uniqueFileName;
            }
            else
            {
                return BadRequest("La imagen es obligatoria.");
            }

            _context.Articulos.Add(articulo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetArticulos), new { id = articulo.Id }, articulo);
        }

        // 3. DELETE: api/Articulos/5 (Borrar)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticulo(int id)
        {
            var articulo = await _context.Articulos.FindAsync(id);
            if (articulo == null) return NotFound();

            _context.Articulos.Remove(articulo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}