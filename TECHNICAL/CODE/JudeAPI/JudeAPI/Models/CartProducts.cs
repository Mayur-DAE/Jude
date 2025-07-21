using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class CartProducts
    {
        public int CartProductID { get; set; }
        public int CartID { get; set; }
        public int CompanyID { get; set; }
        public int ProductID { get; set; }
        public decimal ProductPrice { get; set; }
        public int Quantity { get; set; }

        public int LanguageID {  get; set; }

        //For Mobile api 
        public int UserID { get; set; } 
    }
}
