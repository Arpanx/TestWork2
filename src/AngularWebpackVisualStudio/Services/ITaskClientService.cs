using AngularWebpackVisualStudio.Models.MyType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Services
{
    public interface ITaskClientService
    {
        ListTaskClientsDTO GetTaskClientAll();
        ListTaskClientsDTO GetTaskClientById(int Id);
        void DeleteById(int id);
    }
}
