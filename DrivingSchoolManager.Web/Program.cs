using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace DrivingSchoolManager.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //throw new System.ArgumentException("Parameter cannot be null", "original");
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                    .UseSetting("detailedErrors", "true")
                    .UseStartup<Startup>();
                });
    }
}
