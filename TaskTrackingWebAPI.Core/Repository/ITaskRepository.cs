using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TT = TaskTrackingWebAPI.Core.Model;

namespace TaskTrackingWebAPI.Core.Repository
{
    public interface ITaskRepository : IRepository<TT.Task>
    {
        IQueryable<TT.Task> GetByUserId(int userId);
    }
}
