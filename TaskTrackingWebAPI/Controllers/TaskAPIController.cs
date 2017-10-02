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
    public class TaskAPIController : ApiController
    {
        private ITaskService _taskService;
        private IUserService _userService;

        public TaskAPIController(ITaskService taskService,IUserService userService)
        {
            _taskService = taskService;
            _userService = userService;
        }

        // GET: api/Task
        public HttpResponseMessage Get()
        {
            try
            {
            
            var lstTasks = _taskService.GetAll().Select(e => new TaskViewModel() { Id = e.Id,Title=e.Title,Description=e.Description, State=e.State,CreatedDate=e.CreatedDate,ModifiedDate=e.ModifiedDate }).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, lstTasks);
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            finally
            {
                _taskService.Dispose();
                _userService.Dispose();
            }
        }

        [Route("api/TaskAPI/GetUserTasks")]
        public HttpResponseMessage GetUserTasks(string userName)
        {
            try
            {
                var loggedInUserName = RequestContext.Principal.Identity.Name;
                var user = _userService.GetAll().FirstOrDefault(e => e.UserName.ToLower() == userName.ToLower());

                if (user == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid User");
                }

                var lstTasks = _taskService.GetAll().Where(e=> e.UserId == user.Id).Select(e => new TaskViewModel() { Id = e.Id, Title = e.Title, Description = e.Description, State = e.State, CreatedDate = e.CreatedDate, ModifiedDate = e.ModifiedDate }).ToList();

                return Request.CreateResponse(HttpStatusCode.OK, lstTasks);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            finally
            {
                _taskService.Dispose();
                _userService.Dispose();
            }
        }

        // GET: api/Task/5
        public HttpResponseMessage Get(int id)
        {
            try
            {
                var task = _taskService.Get(id);

                if (task != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new TaskViewModel() { Id = task.Id, Title = task.Title, Description = task.Description, State = task.State, CreatedDate = task.CreatedDate, ModifiedDate = task.ModifiedDate });
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Task with Id = " + id.ToString() + " not found.");
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            finally
            {
                _taskService.Dispose();
                _userService.Dispose();
            }
        }

        // POST: api/Task
        public HttpResponseMessage Post([FromUri]string username,[FromBody]TaskViewModel task)
        {
            try
            {
                var user = _userService.GetAll().FirstOrDefault(e => e.UserName.ToLower() == username.ToLower());

                if (user == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid User");
                }
                var newTask = new TT.Task() { Id = task.Id, UserId =user.Id, Title = task.Title, Description = task.Description, CreatedDate =task.CreatedDate, State=task.State, ModifiedDate=task.ModifiedDate};
                _taskService.Update(newTask);
                task.Id = newTask.Id;
                var resMsg = Request.CreateResponse(HttpStatusCode.Created, task);
                resMsg.Headers.Location = new Uri(Request.RequestUri + task.Id.ToString());

                return resMsg;
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            finally
            {
                _taskService.Dispose();
                _userService.Dispose();
            }
        }

        // PUT: api/Task/5
        public HttpResponseMessage Put(int id,[FromBody]TaskViewModel task)
        {
            try
            {
                var entity = _taskService.Get(id);

                if (entity != null)
                {
                    entity.Title = task.Title;
                    entity.Description = task.Description;
                    entity.State = task.State;
                    entity.CreatedDate = task.CreatedDate;
                    entity.ModifiedDate = task.ModifiedDate;

                    _taskService.Update(entity);
                    return Request.CreateResponse(HttpStatusCode.OK, task);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Task with Id = " + id.ToString() + " not found.");
                }

                
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            finally
            {
                _taskService.Dispose();
                _userService.Dispose();
            }
        }

        // DELETE: api/Task/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                var task = _taskService.Get(id);

                if (task != null)
                {
                    _taskService.Delete(task);
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Task with Id = " + id.ToString() + " not found.");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            finally
            {
                _taskService.Dispose();
                _userService.Dispose();
            }
        }
    }
}
