using BackendInventario.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. CONEXIÓN A LA BASE DE DATOS SQLITE
builder.Services.AddDbContext<InventarioContext>(options =>
    options.UseSqlite("Data Source=inventario.db"));

// 2. CONFIGURAR CORS
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

// --- EL ORDEN AQUÍ ES VITAL ---

// 1. Activar archivos estáticos PRIMERO
app.UseStaticFiles(); 

// 2. Configurar Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 3. Activar CORS
app.UseCors("PermitirTodo");

app.UseAuthorization();
app.MapControllers();

app.Run();