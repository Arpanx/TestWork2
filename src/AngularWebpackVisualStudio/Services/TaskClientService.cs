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
    public class TaskClientService
    {
        private MyContext _dbContext;

        public TaskClientService(MyContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ListTaskClientsDTO GetTaskClientAll()
        {
            ListTaskClientsDTO listTaskClientsDTO = new ListTaskClientsDTO();
            
            List<TaskClientDTO> listTaskClients = _dbContext.TaskClients.Include(x => x.Client)
                .Select(c => new TaskClientDTO
                {
                    Id = c.Id,
                    TaskName = c.TaskName,
                    Description = c.Description,
                    StartTime = c.StartTime,
                    EndTime = c.EndTime,
                    Address = c.Client.Address
                }).ToList();

            listTaskClientsDTO.ListTaskClients = listTaskClients;
            listTaskClientsDTO.TotalCount = _dbContext.TaskClients.Count();

            return listTaskClientsDTO;
        }

        public ListTaskClientsDTO GetTaskClientById(int Id)
        {
            ListTaskClientsDTO listTaskClientsDTO = new ListTaskClientsDTO();

            List<TaskClientDTO> listTaskClients = _dbContext.TaskClients.Include(x => x.Client)
                .Select(c => new TaskClientDTO
                {
                    Id = c.Id,
                    TaskName = c.TaskName,
                    Description = c.Description,
                    StartTime = c.StartTime,
                    EndTime = c.EndTime,
                    Address = c.Client.Address,
                    ClientId = c.ClientId,
                }).Where(x => x.ClientId == Id)
                .ToList();

            listTaskClientsDTO.ListTaskClients = listTaskClients;
            listTaskClientsDTO.TotalCount = _dbContext.TaskClients.Where(x => x.ClientId == Id).Count();

            return listTaskClientsDTO;
        }

        public void DeleteById(int id)
        {
            TaskClient deptDelete = _dbContext.TaskClients.Find(id);
            _dbContext.Entry(deptDelete).State = EntityState.Deleted;
            _dbContext.SaveChanges();            
        }
    }
}
