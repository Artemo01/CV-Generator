using CVGeneratorService.Services;
using CVGeneratorService.Services.API;
using QuestPDF.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

QuestPDF.Settings.License = LicenseType.Community;

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("AllowAny",
    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddScoped<IPdfService, PdfService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowAny");
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
