using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendInventario.Migrations
{
    /// <inheritdoc />
    public partial class CreacionInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Articulos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nombre = table.Column<string>(type: "TEXT", nullable: false),
                    Stock = table.Column<int>(type: "INTEGER", nullable: false),
                    Imagen = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articulos", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Articulos",
                columns: new[] { "Id", "Imagen", "Nombre", "Stock" },
                values: new object[,]
                {
                    { 1, "https://loremflickr.com/300/200/monitor", "Monitor Xiaomi A27Ui 4K", 12 },
                    { 2, "https://loremflickr.com/300/200/keyboard", "Teclado Mecánico Logitech G Pro", 8 },
                    { 3, "https://loremflickr.com/300/200/computermouse", "Ratón Inalámbrico Razer Viper", 15 },
                    { 4, "https://loremflickr.com/300/200/headphones", "Auriculares HyperX Cloud II", 20 },
                    { 5, "https://loremflickr.com/300/200/mousepad", "Alfombrilla Gaming XL", 50 },
                    { 6, "https://loremflickr.com/300/200/webcam", "Webcam Logitech C920", 10 },
                    { 7, "https://loremflickr.com/300/200/desk,setup", "Soporte para Monitor Doble", 5 },
                    { 8, "https://loremflickr.com/300/200/microphone", "Micrófono Blue Yeti", 7 },
                    { 9, "https://loremflickr.com/300/200/harddrive", "Disco Duro Externo 2TB", 25 },
                    { 10, "https://loremflickr.com/300/200/ram,computer", "Memoria RAM 16GB DDR4", 30 },
                    { 11, "https://loremflickr.com/300/200/gpu,nvidia", "Tarjeta Gráfica RTX 4060", 4 },
                    { 12, "https://loremflickr.com/300/200/cpu,intel", "Procesador Intel i7-13700K", 6 },
                    { 13, "https://loremflickr.com/300/200/motherboard", "Placa Base ASUS ROG Strix", 3 },
                    { 14, "https://loremflickr.com/300/200/powersupply", "Fuente de Alimentación 750W", 12 },
                    { 15, "https://loremflickr.com/300/200/pccase", "Caja PC Cooler Master", 8 },
                    { 16, "https://loremflickr.com/300/200/cpucooler", "Ventilador CPU Noctua", 15 },
                    { 17, "https://loremflickr.com/300/200/ssd", "SSD NVMe 1TB Samsung", 40 },
                    { 18, "https://loremflickr.com/300/200/usbhub", "Hub USB-C 7 en 1", 22 },
                    { 19, "https://loremflickr.com/300/200/speakers", "Altavoces Creative 2.1", 11 },
                    { 20, "https://loremflickr.com/300/200/xbox,controller", "Mando Xbox Carbon Black", 18 },
                    { 21, "https://loremflickr.com/300/200/gamingchair", "Silla Gaming Ergonómica", 5 },
                    { 22, "https://loremflickr.com/300/200/curvedmonitor", "Monitor Curvo 34 Pulgadas", 2 },
                    { 23, "https://loremflickr.com/300/200/cleaning", "Kit de Limpieza Pantallas", 100 },
                    { 24, "https://loremflickr.com/300/200/ringlight", "Luz de Anillo LED 10\"", 35 },
                    { 25, "https://loremflickr.com/300/200/bluetooth,usb", "Adaptador Bluetooth 5.0", 60 },
                    { 26, "https://loremflickr.com/300/200/charger", "Cargador Rápido 65W", 45 },
                    { 27, "https://loremflickr.com/300/200/laptop", "Portátil Workstation 16\"", 4 },
                    { 28, "https://loremflickr.com/300/200/drawingtablet", "Tableta Digitalizadora", 9 },
                    { 29, "https://loremflickr.com/300/200/router,wifi", "Router WiFi 6 Pro", 14 },
                    { 30, "https://loremflickr.com/300/200/streaming,setup", "Stream Deck MK.2", 6 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Articulos");
        }
    }
}
