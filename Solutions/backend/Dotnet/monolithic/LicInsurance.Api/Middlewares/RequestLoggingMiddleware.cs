using Serilog;

namespace LicInsurance.Api.Middlewares
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate next;

        public RequestLoggingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            Log.Information("Incoming Request {Method} {Path}",
                            context.Request.Method,
                            context.Request.Path);

            await next(context);

            Log.Information("Response Status Code : {StatusCode}",
                context.Response.StatusCode);
        }
    }
}