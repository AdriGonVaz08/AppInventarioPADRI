using BackendInventario.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. CONEXIÓN A LA BASE DE DATOS SQLITE
// Esto le dice que cree un archivo físico llamado 'inventario.db' en tu carpeta
builder.Services.AddDbContext<InventarioContext>(options =>
    options.UseSqlite("Data Source=inventario.db"));

// 2. CONFIGURAR CORS (Vital para que el frontend no dé error de seguridad)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurar el entorno web
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Activar CORS
app.UseCors("PermitirTodo");

// Activar la carpeta pública (¡MUY IMPORTANTE PARA LAS IMÁGENES LUEGO!)
app.UseStaticFiles();

app.UseAuthorization();
app.MapControllers();

app.Run();