using AngularWebpackVisualStudio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebpackVisualStudio.Repositories
{
    public class DbInitializer
    {
        public static void Initialize(MyContext context)
        {
            context.Database.EnsureCreated();//if db is not exist, it will create database .but ,do nothing .

            if (!context.Clients.Any())
            {
                context.Clients.AddRange(
                      new List<Client> {
                            new Client { Id = 1, FirstName = "Aleksand1", LastName = "Pisetskij", Address = "Klovskiy Uzviz Street 01021 Kiev, Ukraine", PhoneNumbers = "732-634-1517, 1-800-288-9949, 1-973-572-6522", City = "Kiev"},
                            new Client { Id = 2, FirstName = "Genin", LastName = "SMITH", Address = "Klovskiy Uzviz Street 01021 Sidney, Ukraine", PhoneNumbers = "1-973-572-6522, 1-800-288-9949, 732-634-1517", City = "Sidney"},
                            new Client { Id = 3, FirstName = "Viel", LastName = "JONES", Address = "Klovskiy Uzviz Street 01021 Sidney, Ukraine", PhoneNumbers = "1-973-572-6522, 732-634-1517, 4554554", City = "Sidney"},
                            new Client { Id = 4, FirstName = "Abrams", LastName = "BROWN", Address = "Klovskiy Uzviz Street 01021 Kiev, Ukraine", PhoneNumbers = "1-973-572-6522, 1-800-288-9949, 732-634-1517", City = "Kiev"},
                            new Client { Id = 5, FirstName = "Philpott", LastName = "JOHNSON", Address = "Klovskiy Uzviz Street 01021 NY, Ukraine", PhoneNumbers = "1-973-572-6522, 1-800-288-9949, 1-973-572-6522", City = "NY"},
                            new Client { Id = 6, FirstName = "Stoppa", LastName = "WILLIAMS", Address = "Klovskiy Uzviz Street 01021 NY, Ukraine", PhoneNumbers = "732-634-1517, 1-973-572-6522, 4554554", City = "NY"},
                            new Client { Id = 7, FirstName = "Guerrini", LastName = "MILLER", Address = "Klovskiy Uzviz Street 01021 Avdeevka, Ukraine", PhoneNumbers = "1-800-288-9949, 732-634-1517, 1-973-572-6522", City = "Avdeevka"},
                            new Client { Id = 8, FirstName = "Chakkalath", LastName = "TAYLOR", Address = "Klovskiy Uzviz Street 01021 Avdeevka, Ukraine", PhoneNumbers = "1-973-572-6522, 45454545454, 4554554", City = "Avdeevka"},
                            new Client { Id = 9, FirstName = "Deponte", LastName = "WILSON", Address = "Klovskiy Uzviz Street 01021 Kharkiv, Ukraine", PhoneNumbers = "732-634-1517, 1-800-288-9949, 732-634-1517", City = "Kharkiv"},
                            new Client { Id = 10, FirstName = "Isserman", LastName = "DAVIS", Address = "Klovskiy Uzviz Street 01021 Kharkiv, Ukraine", PhoneNumbers = "732-634-1517, 1-973-572-6522, 1-800-288-9949", City = "Kharkiv"},
                      }
                );
                context.SaveChanges();
            }
            if (!context.TaskClients.Any())
            {
                context.TaskClients.AddRange(
                      new List<TaskClient> {
                            new TaskClient { Id = 1, ClientId = 1, TaskName = "Task1", Description = "BigTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 2, ClientId = 1, TaskName = "Task2", Description = "SmallTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 3, ClientId = 2, TaskName = "Task3", Description = "BigTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 4, ClientId = 2, TaskName = "Task4", Description = "SmallTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 5, ClientId = 3, TaskName = "Task5", Description = "BigTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 6, ClientId = 3, TaskName = "Task6", Description = "SmallTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 7, ClientId = 4, TaskName = "Task7", Description = "BigTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 8, ClientId = 4, TaskName = "Task8", Description = "SmallTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 9, ClientId = 5, TaskName = "Task9", Description = "BigTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 10, ClientId = 5, TaskName = "Task10", Description = "SmallTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 11, ClientId = 5, TaskName = "Task11", Description = "BigTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                            new TaskClient { Id = 12, ClientId = 6, TaskName = "Task12", Description = "SmallTask", StartTime = new DateTime(), EndTime = new DateTime().AddHours(2)},
                      }
                );
                context.SaveChanges();
            }
        }
    }
}
