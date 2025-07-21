namespace JudeAPI.Models
{
    public class Souqpass
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        //public string PaymentReason { get; set; }
        public string OrderId { get; set; }
        public string NotifyUrl { get; set; }
        public string RedirectUrl { get; set; }
    }
}
