using LicInsurance.Api.Helpers;
using LicInsurance.Api.Services;
using TFLInsurance.LicInsurance.Services.Interfaces;
using TFLInsurance.LicInsurance.Repositories.Interfaces;
using TFLInsurance.LicInsurance.Repositories;  
using TFLInsurance.LicInsurance.Services;
using LicInsurance.Api.Repositories.Connections;
using LicInsurance.Api.Repositories.Dapper;


var builder = WebApplication.CreateBuilder(args);

// Register Controllers
builder.Services.AddControllers();

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();
builder.Services.AddScoped<IDapperfactory, Dapperfactory>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IPolicyRepository, PolicyRepository>();
builder.Services.AddScoped<IPolicyService, PolicyService>();
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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();