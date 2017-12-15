using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AngularWebpackVisualStudio.Services;
using AngularWebpackVisualStudio.Models;
using AngularWebpackVisualStudio.Repositories;
using Microsoft.EntityFrameworkCore;
using AngularWebpackVisualStudio.Models.MyType;

namespace AngularWebpackVisualStudio.Controllers
{
    [Route("api/[controller]")]
    public class TaskClientController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly TaskClientService _taskClientService;

        public TaskClientController(TaskClientService taskClientService)
        {
            _taskClientService = taskClientService;
        }

        // GET: api/taskclient
        [HttpGet]
        public IActionResult Get()
        {
            ListTaskClientsDTO listTaskClientsDTO = _taskClientService.GetTaskClientAll();           

            return Json(Ok(listTaskClientsDTO));
        }

        // GET api/taskclient/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {   if (id == 0)
            {
                id = 1;
            }
            ListTaskClientsDTO listTaskClientsDTO = _taskClientService.GetTaskClientById(id);

            return Json(Ok(listTaskClientsDTO));
        }

        //// POST api/taskclient
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/taskclient/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/taskclient/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _taskClientService.DeleteById(id);
        }
    }
}
