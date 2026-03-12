using Microsoft.EntityFrameworkCore;
using BackendInventario.Models;

namespace BackendInventario.Data
{
    public class InventarioContext : DbContext
    {
        public InventarioContext(DbContextOptions<InventarioContext> options) : base(options) { }

        public DbSet<Articulo> Articulos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Articulo>().HasData(
                new Articulo { Id = 1, Nombre = "Monitor Xiaomi A27Ui 4K", Stock = 12, Imagen = "https://loremflickr.com/300/200/monitor" },
                new Articulo { Id = 2, Nombre = "Teclado Mecánico Logitech G Pro", Stock = 8, Imagen = "https://loremflickr.com/300/200/keyboard" },
                new Articulo { Id = 3, Nombre = "Ratón Inalámbrico Razer Viper", Stock = 15, Imagen = "https://loremflickr.com/300/200/computermouse" },
                new Articulo { Id = 4, Nombre = "Auriculares HyperX Cloud II", Stock = 20, Imagen = "https://loremflickr.com/300/200/headphones" },
                new Articulo { Id = 5, Nombre = "Alfombrilla Gaming XL", Stock = 50, Imagen = "https://loremflickr.com/300/200/mousepad" },
                new Articulo { Id = 6, Nombre = "Webcam Logitech C920", Stock = 10, Imagen = "https://loremflickr.com/300/200/webcam" },
                new Articulo { Id = 7, Nombre = "Soporte para Monitor Doble", Stock = 5, Imagen = "https://loremflickr.com/300/200/desk,setup" },
                new Articulo { Id = 8, Nombre = "Micrófono Blue Yeti", Stock = 7, Imagen = "https://loremflickr.com/300/200/microphone" },
                new Articulo { Id = 9, Nombre = "Disco Duro Externo 2TB", Stock = 25, Imagen = "https://loremflickr.com/300/200/harddrive" },
                new Articulo { Id = 10, Nombre = "Memoria RAM 16GB DDR4", Stock = 30, Imagen = "https://loremflickr.com/300/200/ram,computer" },
                new Articulo { Id = 11, Nombre = "Tarjeta Gráfica RTX 4060", Stock = 4, Imagen = "https://loremflickr.com/300/200/gpu,nvidia" },
                new Articulo { Id = 12, Nombre = "Procesador Intel i7-13700K", Stock = 6, Imagen = "https://loremflickr.com/300/200/cpu,intel" },
                new Articulo { Id = 13, Nombre = "Placa Base ASUS ROG Strix", Stock = 3, Imagen = "https://loremflickr.com/300/200/motherboard" },
                new Articulo { Id = 14, Nombre = "Fuente de Alimentación 750W", Stock = 12, Imagen = "https://loremflickr.com/300/200/powersupply" },
                new Articulo { Id = 15, Nombre = "Caja PC Cooler Master", Stock = 8, Imagen = "https://loremflickr.com/300/200/pccase" },
                new Articulo { Id = 16, Nombre = "Ventilador CPU Noctua", Stock = 15, Imagen = "https://loremflickr.com/300/200/cpucooler" },
                new Articulo { Id = 17, Nombre = "SSD NVMe 1TB Samsung", Stock = 40, Imagen = "https://loremflickr.com/300/200/ssd" },
                new Articulo { Id = 18, Nombre = "Hub USB-C 7 en 1", Stock = 22, Imagen = "https://loremflickr.com/300/200/usbhub" },
                new Articulo { Id = 19, Nombre = "Altavoces Creative 2.1", Stock = 11, Imagen = "https://loremflickr.com/300/200/speakers" },
                new Articulo { Id = 20, Nombre = "Mando Xbox Carbon Black", Stock = 18, Imagen = "https://loremflickr.com/300/200/xbox,controller" },
                new Articulo { Id = 21, Nombre = "Silla Gaming Ergonómica", Stock = 5, Imagen = "https://loremflickr.com/300/200/gamingchair" },
                new Articulo { Id = 22, Nombre = "Monitor Curvo 34 Pulgadas", Stock = 2, Imagen = "https://loremflickr.com/300/200/curvedmonitor" },
                new Articulo { Id = 23, Nombre = "Kit de Limpieza Pantallas", Stock = 100, Imagen = "https://loremflickr.com/300/200/cleaning" },
                new Articulo { Id = 24, Nombre = "Luz de Anillo LED 10\"", Stock = 35, Imagen = "https://loremflickr.com/300/200/ringlight" },
                new Articulo { Id = 25, Nombre = "Adaptador Bluetooth 5.0", Stock = 60, Imagen = "https://loremflickr.com/300/200/bluetooth,usb" },
                new Articulo { Id = 26, Nombre = "Cargador Rápido 65W", Stock = 45, Imagen = "https://loremflickr.com/300/200/charger" },
                new Articulo { Id = 27, Nombre = "Portátil Workstation 16\"", Stock = 4, Imagen = "https://loremflickr.com/300/200/laptop" },
                new Articulo { Id = 28, Nombre = "Tableta Digitalizadora", Stock = 9, Imagen = "https://loremflickr.com/300/200/drawingtablet" },
                new Articulo { Id = 29, Nombre = "Router WiFi 6 Pro", Stock = 14, Imagen = "https://loremflickr.com/300/200/router,wifi" },
                new Articulo { Id = 30, Nombre = "Stream Deck MK.2", Stock = 6, Imagen = "https://loremflickr.com/300/200/streaming,setup" }
            );
        }
    }
}