using JudeAPI.Models;
using DAE.DAL.SQL;
using DaeConfiguration;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace JudeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SouqpassController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IDaeConfigManager _configurationIG;
        ServiceProvider serviceProvider;

        private const string PaymentApiUrl = "https://souqpass.coopbankoromiasc.com/proxy/v1/payments/initialize";
        private const string SecretKey = "214d0755-f816-43c5-af62-e67d7e4410c9";
        private const string ApiKey = "f3cd6392-411f-4fa1-80b9-fb8343042db7";      

        public SouqpassController(IHttpClientFactory httpClientFactory, IDaeConfigManager configuration)
        {
            _httpClientFactory = httpClientFactory;
            this._configurationIG = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> ProcessPayment(Souqpass request)
        {
            if (request == null)
                return BadRequest("Invalid request payload.");

            var payload = new
            {
                secretKey= SecretKey,
                apiKey= ApiKey,
                amount = request.Amount,
                currency = request.Currency,
                paymentReason = "eCommerce Payment",
                orderId = request.OrderId,
                notifyUrl=request.NotifyUrl,
                redirectUrl = request.RedirectUrl
            };

            string jsonPayload = JsonConvert.SerializeObject(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();

            try
            {
                HttpResponseMessage response = await client.PostAsync(PaymentApiUrl, content);

                string responseJson = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    return Ok(responseJson);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, responseJson);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("PaymentNotify")]
        public async Task<IActionResult> PaymentNotify([FromBody] JObject requestBody)
        {
            DBUtility oDBUtility = new DBUtility(_configurationIG);

            string requestJson = requestBody.ToString();
            serviceProvider = new ServiceProvider(this._configurationIG);
            serviceProvider.APIRequestDateTime = DateTime.Now;
            serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.Souqpass;
            serviceProvider.RequestUserID = 0;
            serviceProvider.APIRequest = requestJson;
            serviceProvider.APIResponse = "";
            serviceProvider.APIResponseDateTime = DateTime.Now;
            serviceProvider.APIMethodName = ServiceProvider.APIMethods.SouqpassNoify.ToString();
            serviceProvider.AddAPILog();


            int orderId = requestBody["orderId"]?.ToObject<int>() ?? 0;
            string state = requestBody["state"]?.ToString().ToLower();
            string OrderPaymentReferenceNumber = requestBody["invoiceId"]?.ToString().ToLower();

            if (orderId != 0)
            {
                if(state == "success")
                {
                    oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderId);
                    oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, (int)EOrderStatus.PaymentSuccess);
                    oDBUtility.AddParameters("@OrderPaymentReferenceNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 100, OrderPaymentReferenceNumber);
                    DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_ORDER");
                }
                else if(state == "failed")
                {
                    oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderId);
                    oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, (int)EOrderStatus.PaymentFailed);
                    oDBUtility.AddParameters("@OrderPaymentReferenceNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 100, OrderPaymentReferenceNumber);
                    DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_ORDER");
                }
            }

            return Ok(200);

        }
    }
}
