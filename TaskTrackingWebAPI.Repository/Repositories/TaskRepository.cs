using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TT = TaskTrackingWebAPI.Core.Model;
using TaskTrackingWebAPI.Core.Repository;
using TaskTrackingWebAPI.Repository.Data;
using System.Data.Entity;

namespace TaskTrackingWebAPI.Repository.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private TaskDBEntities _context;

        public TaskRepository()
        {
            _context = new TaskDBEntities();
        }

        public void Delete(TT.Task entity)
        {
            _context.Tasks.Remove(entity);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public TT.Task Get(int id)
        {
            return _context.Tasks.FirstOrDefault(e => e.Id == id);
        }

        public IQueryable<TT.Task> GetAll()
        {
            return _context.Tasks;
        }

        public IQueryable<TT.Task> GetByUserId(int userId)
        {
            throw new NotImplementedException();
        }

        public void Update(TT.Task entity)
        {
            if (entity.Id == 0)
            {
                _context.Tasks.Add(entity);
            }
            else
            {
                _context.Tasks.Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
                
            }
            _context.SaveChanges();
        }
    }
}
