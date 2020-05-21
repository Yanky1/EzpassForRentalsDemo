using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EzpassForRentals
{
    public class Customer

    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Plates { get; set; }
        public string CreditCard { get; set; }
        public string Exp { get; set; }
        public string Code { get; set; }
        public DateTime DateIn { get; set; }
        public DateTime DateOut { get; set; }
        public string ChargedAmount { get; set; }

    }
}
