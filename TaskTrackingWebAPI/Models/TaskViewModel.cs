using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;


namespace TaskTrackingWebAPI.Models
{
    public class TaskViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime CreatedDate { get; set; }

        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime ModifiedDate { get; set; }

        public int State { get; set; }

        public string StateDesc {
            get
            {
                var retVal = "Active";
                switch (this.State)
                {
                    case 2:
                        retVal = "Completed";
                        break;
                    case 3:
                        retVal = "Archived";
                        break;

                }
                return retVal;
            }
        }
    }
}