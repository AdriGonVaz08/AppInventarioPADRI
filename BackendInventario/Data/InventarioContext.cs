using Microsoft.EntityFrameworkCore;
using BackendInventario.Models;

namespace BackendInventario.Data
{
    // Heredar de DbContext le da los superpoderes de base de datos a esta clase
    public class InventarioContext : DbContext
    {
        public InventarioContext(DbContextOptions<InventarioContext> options) : base(options) { }

        // Esta línea es crucial: representa la "tabla" de artículos en SQLite
        public DbSet<Articulo> Articulos { get; set; }
    }
}