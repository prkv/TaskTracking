using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using TaskTrackingWebAPI.Models;
using System.Collections.Generic;

using TT = TaskTrackingWebAPI.Core.Model;
using TaskTrackingWebAPI.Domain.Services;
using TaskTrackingWebAPI.Repository.Repositories;

namespace TaskTrackingWebAPI.Identity
{
    public class CustomOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            //var lstUsers = new List<DBUser> {
            //    new DBUser {Id=1, UserName = "user1", Password = "password1", FirstName = "FN1", LastName = "LN1" },
            //    new DBUser {Id=2,UserName = "user2", Password = "password2", FirstName = "FN2", LastName = "LN2" }
            //};
            var _userRepo = new UserRepository();
            var _userService = new UserService(_userRepo);

            var lstUsers = _userService.GetAll().ToList();


            var user = lstUsers.FirstOrDefault(u => u.UserName.ToLower() == context.UserName.ToLower());
            if(user == null)
            {
                context.SetError("The user name or password is incorrect", "The user name or password is incorrect");
                context.Rejected();
                return Task.FromResult<object>(null);
            }
            if (user.Password.ToLower() != context.Password.ToLower())
            {
                context.SetError("The user name or password is incorrect", "The user name or password is incorrect");
                context.Rejected();
                return Task.FromResult<object>(null);
            }

            var ticket = new AuthenticationTicket(SetClaimsIdentity(context), new AuthenticationProperties());
            context.Validated(ticket);

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        private static ClaimsIdentity SetClaimsIdentity(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity("JWT");
            identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
            identity.AddClaim(new Claim("sub", context.UserName));

            //var userRoles = "Admin";
            //foreach (var role in userRoles)
            //{
            //    identity.AddClaim(new Claim(ClaimTypes.Role, role));
            //}

            return identity;
        }
    }
}