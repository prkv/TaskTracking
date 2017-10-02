using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskTrackingWebAPI.Models
{
    public class Movie
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime Released { get; set; }

        public string Director { get; set; }
    }
}