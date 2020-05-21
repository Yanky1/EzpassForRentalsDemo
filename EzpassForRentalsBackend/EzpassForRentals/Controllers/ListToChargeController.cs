using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EzpassForRentals.Controllers
{
    [Route("[controller]/{file}")]
    [ApiController]
    public class ListToChargeController : ControllerBase
    {
        private readonly DbContextCustomers db;

        IConfiguration configuration;
        

        public ListToChargeController(DbContextCustomers db, IConfiguration iconfiguration)
        {
            this.db = db;
            configuration = iconfiguration;
        }

        [HttpGet]
        public async Task<List<Customer>> GetChargeList(string file)
        {

            //var pathToFile = Path.Combine(
            //                 Directory.GetCurrentDirectory(),
            //                 "Resources/csv", file);


            CustomerController customerController = new CustomerController(db);
            List<Customer> customerList = customerController.GetList();

            CsvReader fileReader = new CsvReader(configuration);
            try
            {
                List<Transaction> transactionList = await fileReader.TransactionList(file);
                List<Customer> selectedCustomers = new List<Customer>();

                foreach (var charge in transactionList)
                {
                    if (charge != null)
                    {
                        Customer custToCharge = customerList.Where(x => x.Plates == charge.TAGPLATENUMBER && x.DateIn.Date <= charge.TRANSACTIONDATE.Date && x.DateOut >= charge.TRANSACTIONDATE).FirstOrDefault();

                        if (custToCharge != null)
                        {
                            custToCharge.ChargedAmount = charge.AMOUNT;
                            selectedCustomers.Add(custToCharge);
                        }

                    }

                }
                return selectedCustomers;


            }
            catch (System.Exception)
            {

                throw ;
            }



        }
    }
}