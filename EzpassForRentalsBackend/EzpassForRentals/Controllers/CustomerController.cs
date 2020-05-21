using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EzpassForRentals.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
       private readonly DbContextCustomers db;

        public CustomerController( DbContextCustomers db )
        {
            this.db = db;
        }

        [HttpGet]
        public  List<Customer> GetList()
        {
            var query = db.Customers.ToList();
            return query;
        }

        
        [HttpPost]
        public IActionResult PostName(Customer customer)
        {

                db.Customers.Add(customer);
                db.SaveChanges();

            return Ok();
        }
       

        [HttpPut]
        public IActionResult Put(Customer customer)
        {
            if (!ModelState.IsValid) {
                return BadRequest("Not a valid model");
               }
               

                var custToEdit = db.Customers.Where(s => s.Id == customer.Id)
                                                        .FirstOrDefault<Customer>();

            if (custToEdit != null && customer != null)
                {
                    db.Entry(custToEdit).CurrentValues.SetValues(customer);
                    db.SaveChanges();
                }
            else
                {
                    return NotFound();
                }
            

            return Ok(customer);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("No id");
            }
          
                var customer = db.Customers
                    .Where(s => s.Id == id)
                    .FirstOrDefault();

                db.Customers.Remove(customer);
                db.SaveChanges();
           
            return Ok();
        }
    }
}