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
    public class UserRepository : IUserRepository
    {
        private TaskDBEntities _context;

        public UserRepository()
        {
            _context = new TaskDBEntities();
        }

        public void Delete(TT.User entity)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public TT.User Get(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TT.User> GetAll()
        {
            return _context.Users;
        }

        public void Update(TT.User entity)
        {
            throw new NotImplementedException();
        }
    }
}
