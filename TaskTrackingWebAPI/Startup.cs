using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TaskTrackingWebAPI.Startup))]
namespace TaskTrackingWebAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureOAuth(app);
        }
    }
}
