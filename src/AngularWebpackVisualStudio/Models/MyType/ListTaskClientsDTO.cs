using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Models.MyType
{
    public class ListTaskClientsDTO
    {
        public List<TaskClientDTO> ListTaskClients { get; set; }
        public int TotalCount { get; set; }
    }
}
