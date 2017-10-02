using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TT = TaskTrackingWebAPI.Core.Model;
using TaskTrackingWebAPI.Core.Repository;
using TaskTrackingWebAPI.Core.Services;

namespace TaskTrackingWebAPI.Domain.Services
{
    public class TaskService : ITaskService
    {
        private ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public void Delete(TT.Task entity)
        {
            _taskRepository.Delete(entity);
        }

        public void Dispose()
        {
            _taskRepository.Dispose();
        }

        public TT.Task Get(int id)
        {
            return _taskRepository.Get(id);
        }

        public IQueryable<TT.Task> GetAll()
        {
            return _taskRepository.GetAll();
        }

        public IQueryable<TT.Task> GetByUserId(int userId)
        {
            return _taskRepository.GetByUserId(userId);
        }

        public void Update(TT.Task entity)
        {
            _taskRepository.Update(entity);
        }
    }
}
