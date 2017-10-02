using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using TT = TaskTrackingWebAPI.Core.Model;
using TaskTrackingWebAPI.Core.Services;
using TaskTrackingWebAPI.Models;

namespace TaskTrackingWebAPI.Controllers
{
    [Authorize]
    public class UserAPIController : ApiController
    {
        private IUserService _userService;

        public UserAPIController(IUserService userService)
        {
            _userService = userService;
        }

        
        public HttpResponseMessage Get(string id)
        {
            try
            {
            //    var lstUsers = new List<DBUser> {
            //    new DBUser {Id=1, UserName = "user1", Password = "password1", FirstName = "FN1", LastName = "LN1" },
            //    new DBUser {Id=2,UserName = "user2", Password = "password2", FirstName = "FN2", LastName = "LN2" }
            //};

                var lstUsers = _userService.GetAll().ToList();
                var user = lstUsers.FirstOrDefault(e => e.UserName.ToLower() == id.ToLower());

                if (user != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, user);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User with UserName = " + id + " not found.");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            finally
            {
                _userService.Dispose();
            }

        }
    }
}
