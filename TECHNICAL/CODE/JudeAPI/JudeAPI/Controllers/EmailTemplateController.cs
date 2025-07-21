using JudeAPI.Models;
using DAE.DAL.SQL;
using DaeConfiguration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Net.Mail;

namespace JudeAPI.Controllers
{
    [ApiController]
    public class EmailTemplateController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}
        private readonly IDaeConfigManager _configurationIG;

        //private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;
        public EmailTemplateController(IDaeConfigManager configuration)
        {
            _configurationIG = configuration;
        }

        //[Route("orderemail/send")]
        //[HttpPost]

        //public IActionResult SendMail(EmailTemplates mailRequest)
        //{
        //    try
        //    {
        //        var email = mailRequest.Email ?? "";
        //        var CustomerName = mailRequest.CustomerName ?? "";
        //        var OrderID = mailRequest.OrderID;
        //        var PaymentMethod = mailRequest.PaymentMethod ?? "";
        //        var Currency = mailRequest.Currency ?? "";
        //            var OrderAmount = mailRequest.OrderAmount ;
        //        var ShippingAddress = mailRequest.ShippingAddress ?? "";
        //        var OrderDate = mailRequest.OrderDate?.ToString("yyyy-MM-dd") ?? "";
        //        var OrderStatus = mailRequest.OrderStatus ?? "";

        //        DBUtility oDBUtility = new DBUtility(_configurationIG);
        //        if (mailRequest.TemplateID != 0 && mailRequest.TemplateID != null)
        //        {
        //            oDBUtility.AddParameters("@TemplateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, mailRequest.TemplateID);
        //        }

        //        DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_EMAIL_TEMPLATES");

        //        if (ds.Tables[0].Rows.Count == 0)
        //        {
        //            return Ok(new { Status = 300, Message = "Email template not found." });
        //        }

        //        foreach (DataRow templateRow in ds.Tables[0].Rows)
        //        {
        //            if (templateRow["TemplateName"].ToString() == "Order Confirmed")
        //            {
        //                string subject = templateRow["Subject"].ToString();
        //                string body = templateRow["Body"].ToString();

        //                // Replace placeholders with actual values
        //                string finalEmailBody = body
        //                    .Replace("{CustomerName}", CustomerName)
        //                    .Replace("{OrderID}", OrderID)
        //                    .Replace("{OrderDate}", OrderDate)
        //                     .Replace("{TotalAmount}", OrderAmount)
        //                     .Replace("{Currency}", Currency)

        //                    .Replace("{ShippingAddress}", ShippingAddress)
        //                    .Replace("{PaymentMethod}", PaymentMethod);

        //                MailMessage message = new MailMessage
        //                {
        //                    From = new MailAddress("nss@grcautomate.com", "Jude"),
        //                    Subject = subject,
        //                    Body = finalEmailBody,
        //                    IsBodyHtml = true
        //                };

        //                message.To.Add(email);

        //                SmtpClient smtpClient = new SmtpClient("smtp.stackmail.com", 587)
        //                {
        //                    Credentials = new System.Net.NetworkCredential("nss@grcautomate.com", "Bp37aaca8"),
        //                    EnableSsl = true
        //                };

        //                smtpClient.Send(message);
        //            }
        //        }

        //        return Ok(new { Status = 200, Message = "Email sent successfully." });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { Status = 500, Message = "Error sending email.", Error = ex.Message });
        //    }
        //}



        //        [Route("orderemail/send")]
        //        [HttpPost]
        //        public IActionResult SendMail(EmailTemplates mailRequest)
        //        {
        //            try
        //            {
        //                var email = mailRequest.Email ?? "";
        //                var CustomerName = mailRequest.CustomerName ?? "";
        //                var OrderID = mailRequest.OrderID;
        //                var PaymentMethod = mailRequest.PaymentMethod ?? "";
        //                var Currency = mailRequest.Currency ?? "";
        //                var OrderAmount = mailRequest.OrderAmount;
        //                var ShippingAddress = mailRequest.ShippingAddress ?? "";
        //                var OrderDate = mailRequest.OrderDate?.ToString("yyyy-MM-dd") ?? "";
        //                var OrderStatus = mailRequest.OrderStatus ?? "";

        //                DBUtility oDBUtility = new DBUtility(_configurationIG);

        //                if (mailRequest.TemplateID != 0 && mailRequest.TemplateID != null)
        //                {
        //                    oDBUtility.AddParameters("@TemplateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, mailRequest.TemplateID);
        //                }

        //                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_EMAIL_TEMPLATES");

        //                if (ds.Tables[0].Rows.Count == 0)
        //                {
        //                    return Ok(new { Status = 300, Message = "Email template not found." });
        //                }

        //                foreach (DataRow templateRow in ds.Tables[0].Rows)
        //                {
        //                    if (templateRow["TemplateName"].ToString() == "Order Confirmed")
        //                    {
        //                        string subject = templateRow["Subject"].ToString();

        //                        string finalEmailBody = $@"
        //<html>
        //<head>
        //  <style>
        //    body {{
        //        font-family: Arial, sans-serif;
        //        background-color: #f9f9f9;
        //        padding: 20px;
        //        color: #333;
        //    }}
        //    .container {{
        //        max-width: 600px;
        //        margin: auto;
        //        background-color: #ffffff;
        //        padding: 20px;
        //        border: 1px solid #ddd;
        //        border-radius: 8px;
        //    }}
        //    .header {{
        //        text-align: center;
        //        padding-bottom: 20px;
        //    }}
        //    .details-table {{
        //        width: 100%;
        //        border-collapse: collapse;
        //    }}
        //    .details-table td {{
        //        padding: 8px;
        //        border-bottom: 1px solid #eee;
        //    }}
        //    .footer {{
        //        margin-top: 20px;
        //        font-size: 13px;
        //        color: #777;
        //        text-align: center;
        //    }}
        //  </style>
        //</head>
        //<body>
        //  <div class='container'>
        //    <div class='header'>
        //      <h2>Order Confirmation</h2>
        //      <p>Thank you for your order, <strong>{CustomerName}</strong>!</p>
        //    </div>

        //    <table class='details-table'>
        //      <tr>
        //        <td><strong>Order ID:</strong></td>
        //        <td>{OrderID}</td>
        //      </tr>
        //      <tr>
        //        <td><strong>Order Date:</strong></td>
        //        <td>{OrderDate}</td>
        //      </tr>
        //      <tr>
        //        <td><strong>Order Status:</strong></td>
        //        <td>{OrderStatus}</td>
        //      </tr>
        //      <tr>
        //        <td><strong>Payment Method:</strong></td>
        //        <td>{PaymentMethod}</td>
        //      </tr>
        //      <tr>
        //        <td><strong>Total Amount:</strong></td>
        //        <td>{Currency} {OrderAmount}</td>
        //      </tr>
        //      <tr>
        //        <td><strong>Shipping Address:</strong></td>
        //        <td>{ShippingAddress}</td>
        //      </tr>
        //    </table>

        //    <div class='footer'>
        //      <p>This is a system-generated email. Please do not reply to this message.</p>
        //    </div>
        //  </div>
        //</body>
        //</html>";

        //                        MailMessage message = new MailMessage
        //                        {
        //                            From = new MailAddress("nss@grcautomate.com", "Jude"),
        //                            Subject = subject,
        //                            Body = finalEmailBody,
        //                            IsBodyHtml = true
        //                        };

        //                        message.To.Add(email);

        //                        SmtpClient smtpClient = new SmtpClient("smtp.stackmail.com", 587)
        //                        {
        //                            Credentials = new System.Net.NetworkCredential("nss@grcautomate.com", "Bp37aaca8"),
        //                            EnableSsl = true
        //                        };

        //                        smtpClient.Send(message);
        //                    }
        //                }

        //                return Ok(new { Status = 200, Message = "Email sent successfully." });
        //            }
        //            catch (Exception ex)
        //            {
        //                return StatusCode(500, new { Status = 500, Message = "Error sending email.", Error = ex.Message });
        //            }
        //        }


        [Route("orderemail/send")]
        [HttpPost]
        public IActionResult SendMail(EmailTemplates mailRequest)
        {
            try
            {
                var email = mailRequest.Email ?? "";
                var CustomerName = mailRequest.CustomerName ?? "";
                var OrderID = mailRequest.OrderID;
                var PaymentMethod = mailRequest.PaymentMethod ?? "";
                var Currency = mailRequest.Currency ?? "";
                var OrderAmount = mailRequest.OrderAmount;
                var ShippingAddress = mailRequest.ShippingAddress ?? "";
                var OrderDate = mailRequest.OrderDate?.ToString("yyyy-MM-dd") ?? "";
                var OrderStatus = mailRequest.OrderStatus ?? "";

                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (mailRequest.TemplateID != 0 && mailRequest.TemplateID != null)
                {
                    oDBUtility.AddParameters("@TemplateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, mailRequest.TemplateID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_EMAIL_TEMPLATES");

                if (ds.Tables[0].Rows.Count == 0)
                {
                    return Ok(new { Status = 300, Message = "Email template not found." });
                }

                DataRow templateRow = ds.Tables[0].Rows[0];

                string subject = templateRow["Subject"].ToString();
                string bodyTemplate = templateRow["Body"].ToString();

                // Replace placeholders in the template with actual values
                string finalEmailBody = bodyTemplate
       .Replace("{CustomerName}", CustomerName)
       .Replace("{OrderID}", OrderID)
       .Replace("{OrderDate}", OrderDate)
       .Replace("{OrderStatus}", OrderStatus)
       .Replace("{PaymentMethod}", PaymentMethod)
       .Replace("{Currency}", Currency)
       .Replace("{TotalAmount}", OrderAmount)
       .Replace("{ShippingAddress}", ShippingAddress);


                MailMessage message = new MailMessage
                {
                    From = new MailAddress("nss@grcautomate.com", "Jude"),
                    Subject = subject,
                    Body = finalEmailBody,
                    IsBodyHtml = true
                };

                message.To.Add(email);

                SmtpClient smtpClient = new SmtpClient("smtp.stackmail.com", 587)
                {
                    Credentials = new System.Net.NetworkCredential("nss@grcautomate.com", "Bp37aaca8"),
                    EnableSsl = true
                };

                smtpClient.Send(message);

                return Ok(new { Status = 200, Message = "Email sent successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = 500, Message = "Error sending email.", Error = ex.Message });
            }
        }


    }

}

