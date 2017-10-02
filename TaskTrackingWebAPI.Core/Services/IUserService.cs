using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TT = TaskTrackingWebAPI.Core.Model;

namespace TaskTrackingWebAPI.Core.Services
{
    public interface IUserService:IDisposable
    {
        IQueryable<TT.User> GetAll();

        TT.User Get(int id);

        void Update(TT.User entity);

        void Delete(TT.User entity);
    }
}
