using AngularWebpackVisualStudio.Models;
using AngularWebpackVisualStudio.Models.MyType;
using AngularWebpackVisualStudio.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Services
{
    public class ClientService // : IClientService
    {
        private MyContext _dbContext;

        public ClientService(MyContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ListClientsDTO GetClientAll()
        {
            ListClientsDTO listClientsDTO = new ListClientsDTO();
            List<Client> listClient = _dbContext.Clients.ToList();
            List<String> listDistinctCity = _dbContext.Clients.Select(m => m.City).Distinct().ToList();
            listClientsDTO.ListClients = listClient;
            listClientsDTO.ListDistinctCity = listDistinctCity;
            listClientsDTO.TotalCount = _dbContext.Clients.Count();

            return listClientsDTO;
        }

        private bool CheckTableExists()
        {
            try
            {
                _dbContext.Clients.Count();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
