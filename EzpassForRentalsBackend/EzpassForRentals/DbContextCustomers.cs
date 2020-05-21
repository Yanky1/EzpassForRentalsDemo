using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace EzpassForRentals 
{
    public class DbContextCustomers : DbContext
    {
        public DbContextCustomers(DbContextOptions<DbContextCustomers> options)
    : base(options)
        { }

        public DbSet<Customer> Customers { get; set; }
    }
}
