using System.ComponentModel.DataAnnotations;

namespace BackendInventario.Models
{
    public class Articulo
    {
        [Key] // Asi estableceremos la clave primaria
        public int Id { get; set; }

        [Required] // Haremos que el campo sea obligatorio (como tu required: true)
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public int Stock { get; set; }

        // Aquí ya no guardaremos una URL de internet, sino la ruta física 
        // de la foto en nuestro servidor (ej: "/images/monitor.png")
        public string Imagen { get; set; } = string.Empty;
    }
}