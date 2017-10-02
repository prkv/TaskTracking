using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskTrackingWebAPI.Core.Repository
{
    public interface IRepository<T> : IDisposable
    {
        IQueryable<T> GetAll();
        T Get(int id);
        void Update(T entity);
        void Delete(T entity);
    }
}
