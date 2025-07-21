using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class DataSearch
    {
        public string Search { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public int LanguageID { get; set; }
    }
}
