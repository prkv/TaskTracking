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
    public class UserService : IUserService
    {

        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void Delete(TT.User entity)
        {
            throw new NotImplementedException();
        }
                
        public TT.User Get(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TT.User> GetAll()
        {
            return _userRepository.GetAll();
        }

        public void Update(TT.User entity)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _userRepository.Dispose();
        }
    }
}
