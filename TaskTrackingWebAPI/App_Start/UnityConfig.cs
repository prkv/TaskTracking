using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;

using TT = TaskTrackingWebAPI.Core.Model;
using TaskTrackingWebAPI.Core.Repository;
using TaskTrackingWebAPI.Core.Services;
using TaskTrackingWebAPI.Domain.Services;
using TaskTrackingWebAPI.Repository.Repositories;

namespace TaskTrackingWebAPI
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<ITaskService, TaskService>();
            container.RegisterType<IUserService, UserService>();
            container.RegisterType<ITaskRepository, TaskRepository>();
            container.RegisterType<IUserRepository, UserRepository>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}