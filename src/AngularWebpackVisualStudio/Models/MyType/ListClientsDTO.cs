using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Models.MyType
{
    public class ListClientsDTO
    {
        public List<Client> ListClients { get; set; }
        public List<String> ListDistinctCity { get; set; }
        public int TotalCount { get; set; }
    }
}
