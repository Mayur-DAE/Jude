using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class OrderStatus
    {
        public int OrderStatusID { get; set; }
        public string OrderStatusDescription { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }

    public enum EOrderStatus
    {
        Delivered = 1,
        ReadyForPickup = 2,
        OnTheWay = 3,
        Cancelled = 4,
        Returned = 5,
        Rejected = 9,
        Placed = 2004,
        Confirmed = 2005,
        Initiated = 2006,
        PaymentSuccess = 2007,
        PaymentFailed = 2008
    }

}
