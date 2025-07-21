using System;
namespace JudeAPI.Models
{
    public class OrderDeliveryType
    {
        public int OrderDeliveryTypeID { get; set; }
        public string OrderDeliveryTypeName { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
