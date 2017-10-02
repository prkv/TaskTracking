using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TT = TaskTrackingWebAPI.Core.Model;


namespace TaskTrackingWebAPI.Core.Services
{
    public interface ITaskService:IDisposable
    {
        IQueryable<TT.Task> GetAll();

        TT.Task Get(int id);

        IQueryable<TT.Task> GetByUserId(int userId);

        void Update(TT.Task entity);

        void Delete(TT.Task entity);

    }
}
