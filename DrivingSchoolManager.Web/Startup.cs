using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DrivingSchoolManager.Data.Entities;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Implementations;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using DrivingSchoolManager.Domain.Scheduler;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DrivingSchoolManager.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<DrivingSchoolManagerContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("DrivingSchoolManagerContext")));

            services.AddScoped<ILoginRepository, LoginRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IDrivingSchoolRepository, DrivingSchoolRepository>();
            services.AddScoped<IGroupsRepository, GroupsRepository>();
            services.AddScoped<IDrivingSessionRepository, DrivingSessionRepository>();
            services.AddScoped<IReviewRepository, ReviewRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IDrivingSessionRepository, DrivingSessionRepository>();
            services.AddScoped<IFileUploadRepository, FileUploadRepository>();
            services.AddSingleton<JwtHelper>();
            services.AddSingleton<EmailHelper>();
            services.AddSingleton<PushNotificationHelper>();

            services.AddCors();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(cfg =>
                {
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = Configuration["JWT:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = Configuration["JWT:AudienceId"],
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:AudienceSecret"]))
                    };
                });

            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
                });

            services.AddOptions();
            services.Configure<BlobStorageConfig>(Configuration.GetSection("BlobStorageConfig"));

            var test = new PushNotificationHelper(Configuration);
            test.NotifyAsync("dYusDg2RNjxWKhOhmrJR46:APA91bFvD0_gByhb2yih3-SnYi9B0wfhC48UNcZKCVjukjOKHm0qhI9INPtl97zvMGI8JDq5XrTBJ9qWZuL8vAyL2x41rjXPDrZ-u4RC4FW4zBXAmuxHn2RzdfD68bZwpykrcwGquwJc", "TEST", "ttttt");

            TimerActions.SetConfigurationForAllTimers(Configuration);
            //TaskRunnerService.AddFirstTimeSetupTimer(TimerActions.SendRemindersForDrivingSessions, 1);
        }

        

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

             app.UseDefaultFiles(new DefaultFilesOptions { DefaultFileNames = new List<string> { "index.html" } });
        }
    }
}
