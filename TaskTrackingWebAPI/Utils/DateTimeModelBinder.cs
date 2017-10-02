using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using Newtonsoft.Json.Converters;

namespace TaskTrackingWebAPI
{
    public class CustomDateTimeConverter : IsoDateTimeConverter
    {
        public CustomDateTimeConverter()
        {
            base.DateTimeFormat = "dd/MM/yyyy";
        }
    }
}