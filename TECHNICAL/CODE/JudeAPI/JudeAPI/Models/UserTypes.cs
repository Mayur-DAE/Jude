using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class UserTypes
    {
        public int UserTypeID { get; set; }
        public string UserType { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public bool? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}

