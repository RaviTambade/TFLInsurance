using LicInsurance.Api.Helpers;
using LicInsurance.Api.Services;
using TFLInsurance.LicInsurance.Services.Interfaces;
using TFLInsurance.LicInsurance.Repositories.Interfaces;
using TFLInsurance.LicInsurance.Repositories;  
using LicInsurance.Api.Data.Dapper;
using TFLInsurance.LicInsurance.Services;
using LicInsurance.Api.Data.Connection;


var builder = WebApplication.CreateBuilder(args);

// Register Controllers
builder.Services.AddControllers();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IPolicyRepository, PolicyRepository>();
builder.Services.AddScoped<IPolicyService, PolicyService>();
builder.Services.AddScoped<IDbConnectionHelper, DbConnectionHelper>();
builder.Services.AddScoped<IDapperHelper, DapperHelper>();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseMiddleware<JwtMiddleware>();

app.UseAuthentication();
app.UseAuthorization();
// Map Controllers
app.MapControllers();

app.Run();

// my changes


