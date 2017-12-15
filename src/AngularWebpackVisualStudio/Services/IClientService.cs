using AngularWebpackVisualStudio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Services
{
    public interface IClientService
    {
        List<Client> GetClientAll();
        void SeedDb();
    }
}
