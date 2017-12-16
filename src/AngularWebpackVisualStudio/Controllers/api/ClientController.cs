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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Angular2WebpackVisualStudio.Controller
{
    [Route("api/[controller]")]
    public class ClientController : Microsoft.AspNetCore.Mvc.Controller
    {        
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

       
        // GET: api/client
        [HttpGet]
        public IActionResult Get()
        {   
            ListClientsDTO listClientsDTO = _clientService.GetClientAll();
            
            return Json(Ok(listClientsDTO));
                        
        }

        // GET api/client/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {   
            // Need add GetClientByPageNumber
            ListClientsDTO listClientsDTO = _clientService.GetClientAll();

            return Json(Ok(listClientsDTO));
        }

        //// POST api/client
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/client/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/client/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
