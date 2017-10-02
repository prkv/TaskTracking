using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskTrackingWebAPI.Models;

namespace TaskTrackingWebAPI.Controllers
{
    public class MovieAPIController : ApiController
    {
        public HttpResponseMessage Get()
        {
            try
            {
                var lstMovies = new List<Movie>
            {
                new Movie {Title = "Title 1", Released = DateTime.Now, Director = "Director 1"},
                new Movie {Title = "Title 2", Released = DateTime.Now, Director = "Director 2"},
                new Movie {Title = "Title 3", Released = DateTime.Now, Director = "Director 3"},
                new Movie {Title = "Title 4", Released = DateTime.Now, Director = "Director 4"},
                new Movie {Title = "Title 5", Released = DateTime.Now, Director = "Director 5"},
                new Movie {Title = "Title 6", Released = DateTime.Now, Director = "Director 6"},
                new Movie {Title = "Title 7", Released = DateTime.Now, Director = "Director 7"},
                new Movie {Title = "Title 8", Released = DateTime.Now, Director = "Director 8"},
                new Movie {Title = "Title 9", Released = DateTime.Now, Director = "Director 9"},
                new Movie {Title = "Title 10", Released = DateTime.Now, Director = "Director 10"},
                new Movie {Title = "Title 11", Released = DateTime.Now, Director = "Director 11"},
                new Movie {Title = "Title 12", Released = DateTime.Now, Director = "Director 12"},
            };

                return Request.CreateResponse(HttpStatusCode.OK, lstMovies);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
