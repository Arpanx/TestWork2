using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularWebpackVisualStudio.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;

namespace AngularWebpackVisualStudio.Repositories
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions options)
           : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "MyDb.db" };
            var connectionString = connectionStringBuilder.ToString();
            var connection = new SqliteConnection(connectionString);

            optionsBuilder.UseSqlite(connection);
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<TaskClient> TaskClients { get; set; }
    }
}
