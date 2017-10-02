using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

using System.Threading;
using System.Globalization;

namespace TaskTrackingWebAPI
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            UnityConfig.RegisterComponents();

            HttpConfiguration config = GlobalConfiguration.Configuration;
            config.Formatters.JsonFormatter.SerializerSettings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
            config.Formatters.JsonFormatter.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
        }
        protected void Application_BeginRequest()
        {
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-GB");
            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-GB");
        }
    }

    
}
