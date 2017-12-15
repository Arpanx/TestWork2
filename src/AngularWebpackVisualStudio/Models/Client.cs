using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "LastName is required")]
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumbers { get; set; }
        public string City { get; set; }
        public List<TaskClient> TaskClients { get; set; }
        public Client()
        {
            TaskClients = new List<TaskClient>();
        }
    }
}
