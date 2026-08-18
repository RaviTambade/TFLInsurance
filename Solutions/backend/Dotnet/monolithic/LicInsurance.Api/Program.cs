using Hangfire;
using Hangfire.MySql;
using LicInsurance.Api.Hangfire;
using LicInsurance.Api.Helpers;
using LicInsurance.Api.Middlewares;
using LicInsurance.Api.Repositories;
using LicInsurance.Api.Repositories.Connections;
using LicInsurance.Api.Repositories.Dapper;
using LicInsurance.Api.Repositories.Interfaces;
using LicInsurance.Api.Services;
using LicInsurance.Api.Services.Interfaces;
using Serilog;
using TFLInsurance.Licinsruance.Repositories;
using TFLInsurance.Licinsruance.Repositories.Interfaces;
using TFLInsurance.Licinsruance.Services;
using TFLInsurance.Licinsruance.Services.Interfaces;
using TFLInsurance.LicInsurance.Repositories;  
using TFLInsurance.LicInsurance.Repositories.Interfaces;
using TFLInsurance.LicInsurance.Services;
using TFLInsurance.LicInsurance.Services.Interfaces;

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

builder.Services.AddScoped<IPolicyMasterRepository, PolicyMasterRepository>();
builder.Services.AddScoped<IPolicyMasterService, PolicyMasterService>();


builder.Services.AddScoped<IAgentsService, AgentsService>();
builder.Services.AddScoped<IAgentsRepository, AgentsRepository>();


builder.Services.AddScoped<IClaimRepository, ClaimRepository>();
builder.Services.AddScoped<IClaimService, ClaimService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IClaimRepository, ClaimRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IClaimProcessingJob, ClaimProcessingJob>();

builder.Services.AddSwaggerGen();


builder.Services.AddOpenApi();



// ---------------------------------------------------------
// Hangfire Configuration
// ---------------------------------------------------------

var hangfireConnectionString =
    builder.Configuration.GetConnectionString("HangfireConnection");

builder.Services.AddHangfire(configuration =>
{
    configuration
        .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
        .UseSimpleAssemblyNameTypeSerializer()
        .UseRecommendedSerializerSettings()
        .UseStorage(new MySqlStorage(
            hangfireConnectionString,
            new MySqlStorageOptions
            {
                TablesPrefix = "Hangfire"
            }));
});


// ---------------------------------------------------------
// Hangfire Background Job Server
// ---------------------------------------------------------

builder.Services.AddHangfireServer();








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


// ---------------------------------------------------------
// Hangfire Dashboard
// ---------------------------------------------------------

app.UseHangfireDashboard("/hangfire");

app.MapControllers();
app.Run();