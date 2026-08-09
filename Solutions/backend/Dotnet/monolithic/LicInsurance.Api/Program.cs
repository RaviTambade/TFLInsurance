using LicInsurance.Api.Helpers;
using LicInsurance.Api.Middlewares;
using LicInsurance.Api.Repositories;
using LicInsurance.Api.Repositories.Connections;
using LicInsurance.Api.Repositories.Dapper;
<<<<<<< HEAD
using TFLInsurance.Licinsruance.Repositories.Interfaces;
using TFLInsurance.Licinsruance.Repositories;
using TFLInsurance.Licinsruance.Services.Interfaces;
using TFLInsurance.Licinsruance.Services;
=======
using LicInsurance.Api.Repositories.Interfaces;
using LicInsurance.Api.Services;
using Serilog;
using TFLInsurance.LicInsurance.Repositories;  
using TFLInsurance.LicInsurance.Repositories.Interfaces;
using TFLInsurance.LicInsurance.Services;
using TFLInsurance.LicInsurance.Services.Interfaces;
>>>>>>> ab69a6d2ec2481f9aaa53357773ece14596eef8b


var builder = WebApplication.CreateBuilder(args);


Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .WriteTo.File(
        path: "Logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 30,
        outputTemplate:
        "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level}] {Message}{NewLine}{Exception}")
    .CreateLogger();



builder.Host.UseSerilog();

// Register Controllers

builder.Services.AddControllers();


builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();
builder.Services.AddScoped<IDapperfactory, Dapperfactory>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IPolicyRepository, PolicyRepository>();
builder.Services.AddScoped<IPolicyService, PolicyService>();

<<<<<<< HEAD
builder.Services.AddScoped<IClaimRepository, ClaimRepository>();
builder.Services.AddScoped<IClaimService, ClaimService>();
=======
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
>>>>>>> ab69a6d2ec2481f9aaa53357773ece14596eef8b

builder.Services.AddSwaggerGen();


builder.Services.AddOpenApi();

var app = builder.Build();


// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "DapperDemo API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseMiddleware<JwtMiddleware>();
app.UseMiddleware<RequestLoggingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();