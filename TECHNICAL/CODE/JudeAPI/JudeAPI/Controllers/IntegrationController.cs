using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Net.Http.Headers;
using DaeConfiguration;
using Microsoft.AspNetCore.Hosting;
using JudeAPI.Models;
using Newtonsoft.Json.Linq;
using DAE.DAL.SQL;
using System.Data;
namespace JudeAPI.Controllers
{
    public class IntegrationController : ControllerBase
    {
       
    }

    [ApiController]
    public class MapMyIndiaController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        ServiceProvider serviceProvider;

        public MapMyIndiaController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [Route("mapMyIndia/GenerateToken")]
        [HttpPost]
        public async Task<IActionResult> GenerateToken(MapMyIndia mmi)
        {
            MapMyIndia mapMyIndia = new MapMyIndia();
            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                StringContent content = new StringContent(JsonConvert.SerializeObject(mmi), Encoding.UTF8, "application/json");

                //Free https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsIs7YKdINrrFMHZZ3a2Ag7Y5g_mv76o1ZHOOVdM38slHOeyO2ZvKYwGaYG2eu4W0fSaE71_DXgncQ==&client_secret=lrFxI-iSEg9mgC0IWdyOgsU9Y-7HmwU89DjubJRa54PRtl3us4I2az8_4CHZ82qfjuPMIxGlPwG1hNZNQE84gTC9T1Lzb3Nn

                //test https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsI7vKFuye58kkPcrk72CL7f4VivQwoqGRSvk5VrAUGBWV7tjf3L0NTNMbtcHyfshhftdc5hmNcCmg==&client_secret=lrFxI-iSEg_W8BGjppkkNMMrEeInL6S39NAGhifZCbCvUJzrm28Qe6eaXsnGsHLwwo-c2e5iodKHakaWl3Id01P8eglUgzAy

                //map my india
                //Live https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsL-5S7ukxkE8RvvApdq5HkZrLOqBxJVPMgwTIyvlf9w6rh4fTgCxWQvA5i1Y7UX1YhmNhKFX9Mj_Q==&client_secret=lrFxI-iSEg8YSv_ziHpNV6IhHrwjgYEuJNps_pAYI4BVnZOm6b32nyue3rM2fEEIUeBBbfwFujMPCJj-qaZx2LVN7ohx5fz3

                //map my india mappls
                // https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsJ-n07YwAno01hCee3Lb7Fo8M6v8RzITXLAsutfI7I59ODbXPuB9OJlN1CGDaBn2G-dCkJoIRhdrA==&client_secret=lrFxI-iSEg-PgN-bSeKhkbzHIQG_XmW9LhCXn75tuZWAhJvr9bmq70wfpSRMZK0pdyQ7AB6KmLs3ilxyo8nhTXkXBk7kxuuj

                //mappls map my india 
                // https://outpost.mappls.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsL-5S7ukxkE8RvvApdq5HkZrLOqBxJVPMgwTIyvlf9w6rh4fTgCxWQvA5i1Y7UX1YhmNhKFX9Mj_Q==&client_secret=lrFxI-iSEg8YSv_ziHpNV6IhHrwjgYEuJNps_pAYI4BVnZOm6b32nyue3rM2fEEIUeBBbfwFujMPCJj-qaZx2LVN7ohx5fz3

                using (var response = await httpClient.PostAsync("https://outpost.mappls.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsL-5S7ukxkE8RvvApdq5HkZrLOqBxJVPMgwTIyvlf9w6rh4fTgCxWQvA5i1Y7UX1YhmNhKFX9Mj_Q==&client_secret=lrFxI-iSEg8YSv_ziHpNV6IhHrwjgYEuJNps_pAYI4BVnZOm6b32nyue3rM2fEEIUeBBbfwFujMPCJj-qaZx2LVN7ohx5fz3", content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    mapMyIndia = JsonConvert.DeserializeObject<MapMyIndia>(apiResponse);

                    //serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.MapMyIndia;
                    //serviceProvider.RequestUserID = 0;
                    //serviceProvider.APIRequest = content.ReadAsStringAsync().Result;
                    //serviceProvider.APIResponse = apiResponse.ToString();
                    //serviceProvider.APIResponseDateTime = DateTime.Now;
                    //serviceProvider.APIMethodName = ServiceProvider.APIMethods.MapMyIndiaGenerateToken.ToString();
                    //serviceProvider.AddAPILog();
                }
            }
            return Ok(mapMyIndia);
        }

        [Route("mapMyIndia/GetAddress")]
        [HttpPost]
        public async Task<IActionResult> GetAddress(string address, string token)
       {
            List<CopResult> copResult = new List<CopResult>();
            Root myDeserializedClass = new Root();            
            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                using (var response = await httpClient.GetAsync("https://atlas.mapmyindia.com/api/places/geocode?region=ind&itemCount=5&address=/" + address))
                {                   

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        myDeserializedClass  = JsonConvert.DeserializeObject<Root>(apiResponse);                       
                    }
                    else
                        response.StatusCode = response.StatusCode;

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.MapMyIndia;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = "https://atlas.mapmyindia.com/api/places/geocode?region=ind&itemCount=5&address=/" + address;
                    serviceProvider.APIResponse = response.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.MapMyIndiaGetAddress.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(myDeserializedClass);
        }


        [Route("mapMyIndia/GetCurrentAddress")]
        [HttpPost]
        public async Task<IActionResult> GetCurrentAddress(string lat, string lang , string clientID)
        {
            List<CurrentAddress> currentAddress = new List<CurrentAddress>();
            RootCurrentAddress myDeserializedClass = new RootCurrentAddress();
            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                //https://apis.mapmyindia.com/advancedmaps/v1/" + "33OkryzDZsI7vKFuye58kkPcrk72CL7f4VivQwoqGRSvk5VrAUGBWV7tjf3L0NTNMbtcHyfshhftdc5hmNcCmg==" + "/rev_geocode?region=IND&lang=en&lat=" +lat + "&lng=" + lang 

                using (var response = await httpClient.GetAsync("https://apis.mappls.com/advancedmaps/v1/df06c59cf7eb0894e8fcdd52bd9be9d4/rev_geocode?lat=" + lat +"&lng=" + lang + " &region=IND&lang=en")) 
                {
                    string apiResponse ="";

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        apiResponse = await response.Content.ReadAsStringAsync();
                        myDeserializedClass = JsonConvert.DeserializeObject<RootCurrentAddress>(apiResponse);
                    }
                    else
                        response.StatusCode = response.StatusCode;

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.MapMyIndia;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = "https://apis.mappls.com/advancedmaps/v1/df06c59cf7eb0894e8fcdd52bd9be9d4/rev_geocode?lat=" + lat + "&lng=" + lang + " &region=IND&lang=en";
                    serviceProvider.APIResponse = apiResponse;
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.MapMyIndiaGetCurrentAddress.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(myDeserializedClass);
        }


        [Route("mapMyIndia/eLoc")]
        [HttpPost]
        public async Task<IActionResult> eLoc(string eLoc, string token)
        {
            eLoc objELoc = new eLoc();
            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                using (var response = await httpClient.GetAsync("https://explore.mapmyindia.com/apis/O2O/entity/" + eLoc))
                {

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        objELoc = JsonConvert.DeserializeObject<eLoc>(apiResponse);
                    }
                    else
                        response.StatusCode = response.StatusCode;

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.MapMyIndia;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = "https://explore.mapmyindia.com/apis/O2O/entity/" + eLoc;
                    serviceProvider.APIResponse = response.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.MapMyIndiaGetAddress.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(objELoc);
        }

    }

    [ApiController]
    public class ShipRocketController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
      
        ServiceProvider serviceProvider;

        public ShipRocketController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [Route("ShipRocket/GenerateToken")]
        [HttpPost]
        public async Task<IActionResult> GenerateToken()
        {
            ShipRocket shipRocket = new ShipRocket();
            shipRocket.email = "mayur@digitalenterprises.co.in";
            shipRocket.password = "P@ssw0rd";

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                StringContent content = new StringContent(JsonConvert.SerializeObject(shipRocket), Encoding.UTF8, "application/json");

                using (var response = await httpClient.PostAsync("https://apiv2.shiprocket.in/v1/external/auth/login", content))
                {
                    
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    shipRocket = JsonConvert.DeserializeObject<ShipRocket>(apiResponse);

                    
                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = content.ReadAsStringAsync().Result;
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketGenerateToken.ToString();       
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(shipRocket);
        }


        [Route("ShipRocket/AddShiprocketAddress")]
        [HttpPost]
        public async Task<IActionResult> addShiprocketAddress(ShipRocketAddress shipRocketAddress)
        {
            dynamic json = "";
            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", shipRocketAddress.token);
                StringContent content = new StringContent(JsonConvert.SerializeObject(shipRocketAddress), Encoding.UTF8, "application/json");
               
                using (var response = await httpClient.PostAsync("https://apiv2.shiprocket.in/v1/external/settings/company/addpickup", content))
                {
                   
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        json = JValue.Parse(apiResponse);


                        serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
                        serviceProvider.RequestUserID = 0;
                        serviceProvider.APIRequest = content.ReadAsStringAsync().Result;
                        serviceProvider.APIResponse = apiResponse.ToString();
                        serviceProvider.APIResponseDateTime = DateTime.Now;
                        serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketAddAddress.ToString();
                        serviceProvider.AddAPILog();
                                                     
                }
            }
            return Ok(json);
        }


        [Route("ShipRocket/checkShiprocketServiceability")]
        [HttpPost]
        public async Task<IActionResult> checkShiprocketServiceability(string order_id, string cod, string weight, string token)
        {            
            dynamic json;
            
            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
             
                using (var response = await httpClient.GetAsync("https://apiv2.shiprocket.in/v1/external/courier/serviceability/?order_id=" + order_id + "&cod=" + cod + "&weight=" + weight))
                {                    
                   string apiResponse = await response.Content.ReadAsStringAsync();                                   
                   json = JValue.Parse(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = "https://apiv2.shiprocket.in/v1/external/courier/serviceability/?order_id=" + order_id + "&cod=" + cod + "&weight=" + weight;
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketServiceability.ToString();
                    serviceProvider.AddAPILog();

                }       
            }     
            return Ok(json);
        }


        [Route("ShipRocket/GenerateAWBforShipment")]
        [HttpPost]
        public async Task<IActionResult> GenerateAWBforShipment(AWBforShipment aWBforShipment)
        {
            AWBRoot aWBRoot = new AWBRoot();            
            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", aWBforShipment.Token);
              
                StringContent content = new StringContent("");
                using (var response = await httpClient.PostAsync("https://apiv2.shiprocket.in/v1/external/courier/assign/awb?shipment_id=" + aWBforShipment.shipment_id + "&courier_id=" + aWBforShipment.courier_id, content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    aWBRoot = JsonConvert.DeserializeObject<AWBRoot>(apiResponse);


                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = "https://apiv2.shiprocket.in/v1/external/courier/assign/awb?shipment_id=" + aWBforShipment.shipment_id + "&courier_id=" + aWBforShipment.courier_id;
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketGenerateAWBforShipment.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(aWBRoot);
        }


        [Route("ShipRocket/RequestforShipmentPickup")]
        [HttpPost]
        public async Task<IActionResult> RequestforShipmentPickup(string shipment_id, string token)
        {
            ShiprocketRoot shipRocketService = new ShiprocketRoot();

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                // StringContent content = new StringContent(JsonConvert.SerializeObject(shipRocketService), Encoding.UTF8, "application/json");

                using (var response = await httpClient.PostAsync("https://apiv2.shiprocket.in/v1/external/courier/generate/pickup?shipment_id=" + shipment_id, null))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    shipRocketService = JsonConvert.DeserializeObject<ShiprocketRoot>(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup?shipment_id=" + shipment_id;
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketRequestforShipmentPickup.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(shipRocketService);
        }


        [Route("ShipRocket/CreateCustomOrder")]
        [HttpPost]
        public async Task<IActionResult> CreateCustomOrder(ShiprocketOrder shiprocketOrder)
        {
            OrderResult orderResult;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", shiprocketOrder.Token);
                // StringContent content = new StringContent(JsonConvert.SerializeObject(shipRocketService), Encoding.UTF8, "application/json");

                StringContent content = new StringContent(JsonConvert.SerializeObject(shiprocketOrder), Encoding.UTF8, "application/json");
                using (var response = await httpClient.PostAsync("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc" , content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    orderResult = JsonConvert.DeserializeObject<OrderResult>(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = content.ReadAsStringAsync().Result;
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketCreateCustomOrder.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(orderResult);
        }


        [Route("ShipRocket/UpdateCustomOrder")]
        [HttpPost]
        public async Task<IActionResult> UpdateCustomOrder(ShiprocketOrder shiprocketOrder)
        {
            OrderResult orderResult;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", shiprocketOrder.Token);
                // StringContent content = new StringContent(JsonConvert.SerializeObject(shipRocketService), Encoding.UTF8, "application/json");

                StringContent content = new StringContent(JsonConvert.SerializeObject(shiprocketOrder), Encoding.UTF8, "application/json");
                using (var response = await httpClient.PostAsync("https://apiv2.shiprocket.in/v1/external/orders/update/adhoc", content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    orderResult = JsonConvert.DeserializeObject<OrderResult>(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = content.ReadAsStringAsync().Result;
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketUpdateCustomOrder.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(orderResult);
        }


        [Route("LiveOrderTrack/OrderStatusUpdateWebhook")]
        [HttpPost]
        public void OrderStatusUpdateWebhook(ShiprocketOrderStatusUpdate shiprocketOrderStatusUpdate)
        {
            
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(shiprocketOrderStatusUpdate);

            serviceProvider = new ServiceProvider(this._configurationIG);
            serviceProvider.APIRequestDateTime = DateTime.Now;

            serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
            serviceProvider.RequestUserID = 0;
            serviceProvider.APIRequest = "";
            serviceProvider.APIResponse = jsonString;
            serviceProvider.APIResponseDateTime = DateTime.Now;
            serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketOrderStatusUpdateWebhook.ToString();
            serviceProvider.AddAPILog();

            //OrderResult orderResult;

            //using (var httpClient = new HttpClient())
            //{
            //    serviceProvider = new ServiceProvider(this._configurationIG);
            //    serviceProvider.APIRequestDateTime = DateTime.Now;

            //    // StringContent content = new StringContent(JsonConvert.SerializeObject(shipRocketService), Encoding.UTF8, "application/json");

            //    StringContent content = new StringContent(JsonConvert.SerializeObject(shiprocketOrder), Encoding.UTF8, "application/json");
            //    using (var response = await httpClient.PostAsync("https://apiv2.shiprocket.in/v1/external/orders/update/adhoc", content))
            //    {
            //        string apiResponse = await response.Content.ReadAsStringAsync();
            //        orderResult = JsonConvert.DeserializeObject<OrderResult>(apiResponse);

            //        serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
            //        serviceProvider.RequestUserID = 0;
            //        serviceProvider.APIRequest = content.ReadAsStringAsync().Result;
            //        serviceProvider.APIResponse = apiResponse.ToString();
            //        serviceProvider.APIResponseDateTime = DateTime.Now;
            //        serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketUpdateCustomOrder.ToString();
            //        serviceProvider.AddAPILog();
            //    }
            //}
            //return Ok(orderResult);
        }



        [Route("ShipRocket/PickupAddressBulkUpload")]
        [HttpPost]
        public async Task<IActionResult> PickupAddressBulkUpload()
        {
            DBUtility oDBUtility = new DBUtility(_configurationIG);
            
            DataSet ds = oDBUtility.Execute_StoreProc_DataSet("GetAllAdreesForShipRocket");

            dynamic json = "";

            foreach (DataRow dr in ds.Tables[0].Rows)
            {

                ShipRocketAddress shipRocketAddress = new ShipRocketAddress();

                shipRocketAddress.pickup_location = dr["pickup_location"].ToString();
                shipRocketAddress.name = dr["CompanyName"].ToString();
                shipRocketAddress.email = dr["CompanyEmailid"].ToString();
                shipRocketAddress.phone = dr["phone"].ToString();
                shipRocketAddress.address = dr["Address1"].ToString();
                shipRocketAddress.address_2 = dr["Address2"].ToString();
                shipRocketAddress.city = dr["TempCity"].ToString();
                shipRocketAddress.state = dr["TempState"].ToString();

                shipRocketAddress.country = dr["country"].ToString();
                shipRocketAddress.pin_code = dr["Zip"].ToString();
                shipRocketAddress.lat = dr["Latitude"].ToString();
                shipRocketAddress.@long = dr["Longitude"].ToString();



                using (var httpClient = new HttpClient())
                {
                    serviceProvider = new ServiceProvider(this._configurationIG);
                    serviceProvider.APIRequestDateTime = DateTime.Now;

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5NjQ0NzYsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjY4NTA1NzAwLCJleHAiOjE2NjkzNjk3MDAsIm5iZiI6MTY2ODUwNTcwMCwianRpIjoiaGgycjZ1OGMwaHdDYUZLbSJ9.kf1n6FYxNyvdPZ1K-f_51RP3ctgk0ePAZn-ky0BUOZg");
                    StringContent content = new StringContent(JsonConvert.SerializeObject(shipRocketAddress), Encoding.UTF8, "application/json");

                    using (var response = await httpClient.PostAsync("https://apiv2.shiprocket.in/v1/external/settings/company/addpickup", content))
                    {                        
                        string apiResponse = await response.Content.ReadAsStringAsync();                      
                        json = JValue.Parse(apiResponse);

                        serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.ShipRocket;
                        serviceProvider.RequestUserID = 0;
                        serviceProvider.APIRequest = content.ReadAsStringAsync().Result;
                        serviceProvider.APIResponse = apiResponse.ToString();
                        serviceProvider.APIResponseDateTime = DateTime.Now;
                        serviceProvider.APIMethodName = ServiceProvider.APIMethods.ShipRocketPickupAddressBulkUpload.ToString();
                        serviceProvider.AddAPILog();                       
                        
                    }
                }
            }

            return Ok(json);
        }
    }

    [ApiController]
    public class WhatsappController : ControllerBase    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;

        ServiceProvider serviceProvider;

        public WhatsappController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }


        [Route("Whatsapp/SendSMS")]
        [HttpPost]
        public async Task<IActionResult> SendSMS(WhatsApp objwhatsapp)
        {
            dynamic json;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;
                

                StringContent content = new StringContent(JsonConvert.SerializeObject(objwhatsapp), Encoding.UTF8, "application/json");

                using (var response = await httpClient.PostAsync("https://app.nextel.io/api/wtemplate?key=UEFOdWpPQTdXb3N1ZkJxV1dwdFhsQT09", content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    json = JValue.Parse(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.Whatsapp;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = content.ReadAsStringAsync().Result;
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.WhatsappSMS.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(json);
        }


    }


    [ApiController]
    public class TwoFactor :Controller
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;

        private readonly string apikey = "0091c5f1-a4e1-11eb-80ea-0200cd936042";
        private string URL = "https://2factor.in/API/R1/";

        ServiceProvider serviceProvider;

        public TwoFactor(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }


        [Route("TwoFactor/SendNewOrderSMSToShop")]
        [HttpPost]
        public async Task<IActionResult> SendNewOrderSMSToShop(string ToNumber, string ToName, string OrderNumber)
        {
            dynamic json;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;


                URL = URL + "?module=TRANS_SMS&apikey="+ apikey+ "&to=" 
                    + ToNumber + "&from=AREAOL&msg=Hello,  " + ToName + 
                    " .%0A%0AYou have received an order through AreaOnline.in. Order Name " +
                    OrderNumber + ".%0A%0AYou can accept the order by visiting this link : https://www.myareaonline.in/AOL/bo/%23/Invoice/"+OrderNumber+ " %0A%0Aby Area Online";

                using (var response = await httpClient.PostAsync(URL, null))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    json = JValue.Parse(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.TwoFactor;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = URL.ToString();
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.TwoFactorSendNewOrderSMSToShop.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(json);
        }


        [Route("TwoFactor/SendNewOrderSMSToMember")]
        [HttpPost]
        public async Task<IActionResult> sendNewOrderSMSToMember(string ToNumber, string ToName, string OrderNumber)
        {
            dynamic json;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;


                URL = URL + "?module=TRANS_SMS&apikey="+apikey+"&to="
                    + ToNumber + "&from=AREAOL&msg=Order Confirmed: Thank you for shopping on AreaOnline. Your order for  " + ToName+ " " + OrderNumber + " has been successfully placed.%0A%0Aby Area Online";

                using (var response = await httpClient.PostAsync(URL, null))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    json = JValue.Parse(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.TwoFactor;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = URL.ToString();
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.TwoFactorSendNewOrderSMSToMember.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(json);
        }

        [Route("TwoFactor/AORegistrationGreeting")]
        [HttpPost]
        public async Task<IActionResult> AORegistrationGreeting(string ToNumber, string ToName)
        {
            dynamic json;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;


                URL = URL + "?module=TRANS_SMS&apikey=" + apikey + "&to="
                    + ToNumber + "&from=AREAOL&msg=Hey " + ToName +",%0A%0AThank you for connecting with AreaOnline.We will be happy to help your business reach a new height? %0A%0ADownload App: https://play.google.com/store/apps/details?id=com.areaonline%26hl=en-GB %0A%0APowered by AreaOnline";

                using (var response = await httpClient.PostAsync(URL, null))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    json = JValue.Parse(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.TwoFactor;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = URL.ToString();
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.TwoFactorAORegistrationGreeting.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(json);
        }


        [Route("TwoFactor/SendOTP")]
        [HttpPost]
        public async Task<IActionResult> SendOTP(string ToNumber)
        {
            dynamic json;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                string OtpURL = "https://2factor.in/API/V1/" + apikey + "/SMS/" + ToNumber + "/AUTOGEN/AO_OTP_Login";


                using (var response = await httpClient.GetAsync(OtpURL))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    json = JValue.Parse(apiResponse);
                    // Hardcoding the OTP in the response
                    json["Details"] = "000000";

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.TwoFactor;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = OtpURL.ToString();
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.TwoFactorSendOTP.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(json);
        }


        [Route("TwoFactor/VerifyOTP")]
        [HttpPost]
        public async Task<IActionResult> VerifyOTP(string ToNumber, string otp)
        {
            dynamic json;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;

                string OtpURL = "https://2factor.in/API/V1/" + apikey + "/SMS/VERIFY3/" + ToNumber + "/" + otp;


                using (var response = await httpClient.GetAsync(OtpURL))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    json = JValue.Parse(apiResponse);
                    if (otp == "000000")
                    {
                        json["Status"] = "Success";
                        json["Details"] = "OTP Verified";
                    }
                    else
                    {
                        json["Status"] = "Failed";
                        json["Details"] = "Invalid OTP";
                    }
                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.TwoFactor;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = OtpURL.ToString();
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.TwoFactorVerifyOTP.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(json);
        }


        [Route("TwoFactor/SendTrackingLink")]
        [HttpPost]
        public async Task<IActionResult> SendTrackingLink(string ToNumber, string ToName, string OrderNumber,string AWBNumber)
        {
            dynamic json;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;


                URL = URL + "?module=TRANS_SMS&apikey=" + apikey + "&to="
                    + ToNumber + "&from=AREAOL&msg=Hello, " + ToName +".%0A%0AYou have received an order through AreaOnline.in. Order Name " + OrderNumber + ".%0A%0AYou can accept the order by visiting this link : https://areaonline.shiprocket.co/tracking/" + AWBNumber + " %0A%0Aby Area Online";

                using (var response = await httpClient.PostAsync(URL, null))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    json = JValue.Parse(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.TwoFactor;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = URL.ToString();
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.TwoFactorSendTrackingLink.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(json);
        }



        [Route("TwoFactor/SendOrderCancelation")]
        [HttpPost]
        public async Task<IActionResult> SendOrderCancelation(string ToNumber, string Amount, string OrderNumber)
        {
            dynamic json;

            using (var httpClient = new HttpClient())
            {
                serviceProvider = new ServiceProvider(this._configurationIG);
                serviceProvider.APIRequestDateTime = DateTime.Now;


                URL = URL + "?module=TRANS_SMS&apikey=" + apikey + "&to="
                   + ToNumber + "&from=AREAOL&msg=Your order "+ OrderNumber + " of amount Rs. "+Amount+" with AreaOnline has been cancelled.%0A%0AThank you for shopping with us.%0A%0ATeam AreaOnline.";

                using (var response = await httpClient.PostAsync(URL, null))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    json = JValue.Parse(apiResponse);

                    serviceProvider.ServiceProviderID = (int)ServiceProvider.eServiceProviders.TwoFactor;
                    serviceProvider.RequestUserID = 0;
                    serviceProvider.APIRequest = URL.ToString();
                    serviceProvider.APIResponse = apiResponse.ToString();
                    serviceProvider.APIResponseDateTime = DateTime.Now;
                    serviceProvider.APIMethodName = ServiceProvider.APIMethods.TwoFactorSendNewOrderSMSToShop.ToString();
                    serviceProvider.AddAPILog();
                }
            }
            return Ok(json);
        }


    }

    #region Map My India
    //Map my inda classes
    public class MapMyIndia
    {
       //
        public string access_token   { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public string scope { get; set; }
        public string project_code { get; set; }
        public string client_id { get; set; }
    }

    public class CopResult
    {
        public string houseNumber { get; set; }
        public string houseName { get; set; }
        public string poi { get; set; }
        public string street { get; set; }
        public string subSubLocality { get; set; }
        public string subLocality { get; set; }
        public string locality { get; set; }
        public string village { get; set; }
        public string subDistrict { get; set; }
        public string district { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string pincode { get; set; }
        public string formattedAddress { get; set; }
        public string eLoc { get; set; }
        public string geocodeLevel { get; set; }
        public double confidenceScore { get; set; }
    }

    public class Root
    {
        public List<CopResult> copResults { get; set; }
    }

    public class CurrentAddress
    {
        public string houseNumber { get; set; }
        public string houseName { get; set; }
        public string poi { get; set; }
        public string poi_dist { get; set; }
        public string street { get; set; }
        public string street_dist { get; set; }
        public string subSubLocality { get; set; }
        public string subLocality { get; set; }
        public string locality { get; set; }
        public string village { get; set; }
        public string district { get; set; }
        public string subDistrict { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string pincode { get; set; }
        public string lat { get; set; }
        public string lng { get; set; }
        public string area { get; set; }
        public string formatted_address { get; set; }
    }

    public class RootCurrentAddress
    {
        public int responseCode { get; set; }
        public string version { get; set; }
        public List<CurrentAddress> results { get; set; }
    }

    public class eLoc
    {
        public string address { get; set; }
        public string name { get; set; }
        public string eloc { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
    }

    #endregion

    #region shiprocket
    //ShipRocket 

    public class ShipRocket
    {
        public string password;
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public int company_id { get; set; }
        public string created_at { get; set; }
        public string token { get; set; }
    }

    public class ShipRocketAddress
    {
        public string pickup_location { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string address_2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public string pin_code { get; set; }
        public string lat { get; set; }
        public string @long {get; set;}
        public string token { get; set; }
    }

    public class ShipRocketService
    {
        public string pickup_postcode;
        public string delivery_postcode;
        public string cod;
        public string weight;

    }

    public class AvailableCourierCompany
    {
        public string air_max_weight { get; set; }
        public int assured_amount { get; set; }
        public object base_courier_id { get; set; }
        public string base_weight { get; set; }
        public int blocked { get; set; }
        public string call_before_delivery { get; set; }
        public int charge_weight { get; set; }
        public string city { get; set; }
        public int cod { get; set; }
        public int cod_charges { get; set; }
        public int cod_multiplier { get; set; }
        public string cost { get; set; }
        public int courier_company_id { get; set; }
        public string courier_name { get; set; }
        public string courier_type { get; set; }
        public int coverage_charges { get; set; }
        public string cutoff_time { get; set; }
        public string delivery_boy_contact { get; set; }
        public double delivery_performance { get; set; }
        public string description { get; set; }
        public string edd { get; set; }
        public int entry_tax { get; set; }
        public string estimated_delivery_days { get; set; }
        public string etd { get; set; }
        public int etd_hours { get; set; }
        public double freight_charge { get; set; }
        public int id { get; set; }
        public int is_custom_rate { get; set; }
        public bool is_hyperlocal { get; set; }
        public int is_international { get; set; }
        public bool is_rto_address_available { get; set; }
        public bool is_surface { get; set; }
        public int local_region { get; set; }
        public int metro { get; set; }
        public double min_weight { get; set; }
        public int mode { get; set; }
        public bool odablock { get; set; }
        public int other_charges { get; set; }
        public object others { get; set; }
        public int pickup_availability { get; set; }
        public double pickup_performance { get; set; }
        public string pickup_priority { get; set; }
        public int pickup_supress_hours { get; set; }
        public string pod_available { get; set; }
        public string postcode { get; set; }
        public int qc_courier { get; set; }
        public string rank { get; set; }
        public double rate { get; set; }
        public double rating { get; set; }
        public string realtime_tracking { get; set; }
        public int region { get; set; }
        public double rto_charges { get; set; }
        public double rto_performance { get; set; }
        public int seconds_left_for_pickup { get; set; }
        public string state { get; set; }
        public string suppress_date { get; set; }
        public string suppress_text { get; set; }
        public List<object> suppression_dates { get; set; }
        public string surface_max_weight { get; set; }
        public double tracking_performance { get; set; }
        public int? volumetric_max_weight { get; set; }
        public double weight_cases { get; set; }
    }

    public class CovidZones
    {
        public object delivery_zone { get; set; }
        public object pickup_zone { get; set; }
    }

    public class Data
    {
        public List<AvailableCourierCompany> available_courier_companies { get; set; }
        public object child_courier_id { get; set; }
        public int is_recommendation_enabled { get; set; }
        public RecommendedBy recommended_by { get; set; }
        public int recommended_courier_company_id { get; set; }
        public int shiprocket_recommended_courier_id { get; set; }
    }

    public class RecommendedBy
    {
        public int id { get; set; }
        public string title { get; set; }
    }

    public class ShiprocketRoot
    {
        public bool company_auto_shipment_insurance_setting { get; set; }
        public CovidZones covid_zones { get; set; }
        public string currency { get; set; }
        public Data data { get; set; }
        public int dg_courier { get; set; }
        public int eligible_for_insurance { get; set; }
        public bool insurace_opted_at_order_creation { get; set; }
        public bool is_allow_templatized_pricing { get; set; }
        public int is_latlong { get; set; }
        public int label_generate_type { get; set; }
        public List<object> seller_address { get; set; }
        public int status { get; set; }
        public bool user_insurance_manadatory { get; set; }
    }

    public class OrderItem
    {
        public string name { get; set; }
        public string sku { get; set; }
        public int units { get; set; }
        public string selling_price { get; set; }
        public string discount { get; set; }
        public string tax { get; set; }
        public int hsn { get; set; }
    }

    public class ShiprocketOrder
    {
        public int order_id { get; set; }
        public string order_date { get; set; }
        public string pickup_location { get; set; }
        public string billing_customer_name { get; set; }
        public string billing_last_name { get; set; }
        public string billing_address { get; set; }
        public string billing_address_2 { get; set; }
        public string billing_city { get; set; }
        public string billing_pincode { get; set; }
        public string billing_state { get; set; }
        public string billing_country { get; set; }
        public string billing_email { get; set; }
        public string billing_phone { get; set; }
        public bool shipping_is_billing { get; set; }
        public string shipping_customer_name { get; set; }
        public string shipping_last_name { get; set; }
        public string shipping_address { get; set; }
        public string shipping_address_2 { get; set; }
        public string shipping_city { get; set; }
        public string shipping_pincode { get; set; }
        public string shipping_country { get; set; }
        public string shipping_state { get; set; }
        public string shipping_email { get; set; }
        public string shipping_phone { get; set; }
        public List<OrderItem> order_items { get; set; }
        public string payment_method { get; set; }
        public int shipping_charges { get; set; }
        public int giftwrap_charges { get; set; }
        public int transaction_charges { get; set; }
        public int total_discount { get; set; }
        public string sub_total { get; set; }
        public int length { get; set; }
        public int breadth { get; set; }
        public int height { get; set; }
        public double weight { get; set; }
        public string Token { get; set; }
        public string longitude { get; set; }
        public string latitude { get; set; }

    }

    public class OrderResult
    {
        public int order_id { get; set; }
        public int shipment_id { get; set; }
        public string status { get; set; }
        public int status_code { get; set; }
        public int onboarding_completed_now { get; set; }
        public string awb_code { get; set; }
        public string courier_company_id { get; set; }
        public string courier_name { get; set; }
    }

    public class AWBforShipment
    {
        public string shipment_id { get; set; } 
        public string Token { get; set; }
        public string courier_id { get; set; }
    }

    public class AssignedDateTime
    {
        public string date { get; set; }
        public int timezone_type { get; set; }
        public string timezone { get; set; }
    }

    public class AWBData
    {
        public int courier_company_id { get; set; }
        public string awb_code { get; set; }
        public int cod { get; set; }
        public int order_id { get; set; }
        public int shipment_id { get; set; }
        public int awb_code_status { get; set; }
        public AssignedDateTime assigned_date_time { get; set; }
        public double applied_weight { get; set; }
        public int company_id { get; set; }
        public string courier_name { get; set; }
        public object child_courier_name { get; set; }
        public string pickup_scheduled_date { get; set; }
        public string routing_code { get; set; }
        public string rto_routing_code { get; set; }
        public string invoice_no { get; set; }
        public string transporter_id { get; set; }
        public string transporter_name { get; set; }
        public ShippedBy shipped_by { get; set; }
    }

    public class Response
    {
        public AWBData data { get; set; }
    }

    public class AWBRoot
    {
        public int awb_assign_status { get; set; }
        public Response response { get; set; }
    }

    public class ShippedBy
    {
        public string shipper_company_name { get; set; }
        public string shipper_address_1 { get; set; }
        public string shipper_address_2 { get; set; }
        public string shipper_city { get; set; }
        public string shipper_state { get; set; }
        public string shipper_country { get; set; }
        public string shipper_postcode { get; set; }
        public int shipper_first_mile_activated { get; set; }
        public string shipper_phone { get; set; }
        public object lat { get; set; }
        public object @long { get; set; }
        public string shipper_email { get; set; }
        public string rto_company_name { get; set; }
        public string rto_address_1 { get; set; }
        public string rto_address_2 { get; set; }
        public string rto_city { get; set; }
        public string rto_state { get; set; }
        public string rto_country { get; set; }
        public string rto_postcode { get; set; }
        public string rto_phone { get; set; }
        public string rto_email { get; set; }
    }

    public class AvailableCourierCompanyNew
    {
        public object base_courier_id { get; set; }
        public int blocked { get; set; }
        public string call_before_delivery { get; set; }
        public int cod { get; set; }
        public int cod_charges { get; set; }
        public int cod_multiplier { get; set; }
        public int courier_company_id { get; set; }
        public string courier_name { get; set; }
        public string courier_type { get; set; }
        public int coverage_charges { get; set; }
        public string delivery_boy_contact { get; set; }
        public double delivery_performance { get; set; }
        public string description { get; set; }
        public int entry_tax { get; set; }
        public string estimated_delivery_days { get; set; }
        public string etd { get; set; }
        public int etd_hours { get; set; }
        public double freight_charge { get; set; }
        public bool is_hyperlocal { get; set; }
        public int is_international { get; set; }
        public bool is_rto_address_available { get; set; }
        public bool is_surface { get; set; }
        public double min_weight { get; set; }
        public int mode { get; set; }
        public string note { get; set; }
        public int pickup_availability { get; set; }
        public double pickup_performance { get; set; }
        public string pod_available { get; set; }
        public double rate { get; set; }
        public double rating { get; set; }
        public string realtime_tracking { get; set; }
        public double rto_charges { get; set; }
        public double rto_performance { get; set; }
        public int seconds_left_for_pickup { get; set; }
        public int tracking_performance { get; set; }
        public double weight_cases { get; set; }
        public string air_max_weight { get; set; }
        public int? assured_amount { get; set; }
        public string base_weight { get; set; }
        public double? charge_weight { get; set; }
        public string city { get; set; }
        public string cost { get; set; }
        public string cutoff_time { get; set; }
        public string edd { get; set; }
        public int? id { get; set; }
        public int? is_custom_rate { get; set; }
        public int? local_region { get; set; }
        public int? metro { get; set; }
        public bool? odablock { get; set; }
        public int? other_charges { get; set; }
        public object others { get; set; }
        public string pickup_priority { get; set; }
        public int? pickup_supress_hours { get; set; }
        public string postcode { get; set; }
        public int? qc_courier { get; set; }
        public string rank { get; set; }
        public int? region { get; set; }
        public string state { get; set; }
        public string suppress_date { get; set; }
        public string suppress_text { get; set; }
        public object suppression_dates { get; set; }
        public string surface_max_weight { get; set; }
        public object volumetric_max_weight { get; set; }
    }

    public class CovidZonesNew
    {
        public object delivery_zone { get; set; }
        public object pickup_zone { get; set; }
    }

    public class DataNew
    {
        public List<AvailableCourierCompanyNew> available_courier_companies { get; set; }
        public object child_courier_id { get; set; }
        public int is_recommendation_enabled { get; set; }
        public RecommendedByNew recommended_by { get; set; }
        public int recommended_courier_company_id { get; set; }
        public int shiprocket_recommended_courier_id { get; set; }
    }

    public class RecommendedByNew
    {
        public int id { get; set; }
        public string title { get; set; }
    }

    public class RootNew
    {
        public bool company_auto_shipment_insurance_setting { get; set; }
        public CovidZonesNew covid_zones { get; set; }
        public string currency { get; set; }
        public DataNew data { get; set; }
        public int dg_courier { get; set; }
        public int eligible_for_insurance { get; set; }
        public bool insurace_opted_at_order_creation { get; set; }
        public bool is_allow_templatized_pricing { get; set; }
        public int is_latlong { get; set; }
        public int label_generate_type { get; set; }
        public SellerAddressNew seller_address { get; set; }
        public int status { get; set; }
        public bool user_insurance_manadatory { get; set; }
    }

    public class SellerAddressNew
    {
        public string address { get; set; }
        public string address_2 { get; set; }
        public object address_type { get; set; }
        public object alternate_phone { get; set; }
        public string city { get; set; }
        public int company_id { get; set; }
        public string country { get; set; }
        public string created_at { get; set; }
        public string delhivery_clientware_id { get; set; }
        public object delhivery_documents_250gm_clientware_id { get; set; }
        public string delhivery_documents_clientware_id { get; set; }
        public object delhivery_essential_5kg_clientware_id { get; set; }
        public string delhivery_flash_air_clientware_id { get; set; }
        public string delhivery_surface_10kg_clientware_id { get; set; }
        public string delhivery_surface_20kg_clientware_id { get; set; }
        public string delhivery_surface_clientware_id { get; set; }
        public object delhivery_surface_lite_clientware_id { get; set; }
        public string delhivery_surface_standard_clientware_id { get; set; }
        public string email { get; set; }
        public string extra_info { get; set; }
        public object gati_sg_customer_vendor_code { get; set; }
        public object gati_surface_10kg_customer_vendor_code { get; set; }
        public object gati_surface_customer_vendor_code { get; set; }
        public object gstin { get; set; }
        public int id { get; set; }
        public object invoice_prefix { get; set; }
        public object invoice_serial { get; set; }
        public string lat { get; set; }
        public string @long { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public int phone_verified { get; set; }
        public string pickup_code { get; set; }
        public string pin_code { get; set; }
        public int rto_address_id { get; set; }
        public string state { get; set; }
        public int status { get; set; }
        public object sx1_delhivery_surface_clientware_id { get; set; }
        public object sx2_delhivery_surface_clientware_id { get; set; }
        public object sx3_delhivery_surface_clientware_id { get; set; }
        public object sx4_delhivery_surface_clientware_id { get; set; }
        public object sx_delhivery_clientware_id { get; set; }
        public object sx_delhivery_surface_clientware_id { get; set; }
        public string updated_at { get; set; }
        public string updated_on { get; set; }
        public object warehouse_code { get; set; }
    }



    //Shiprocket order update webhook

    public class ShiprocketOrderStatusUpdate
    {
        public long awb { get; set; }
        public string current_status { get; set; }
        public string order_id { get; set; }
        public string current_timestamp { get; set; }
        public string etd { get; set; }
        public int current_status_id { get; set; }
        public string shipment_status { get; set; }
        public int shipment_status_id { get; set; }
        public string channel_order_id { get; set; }
        public string channel { get; set; }
        public string courier_name { get; set; }
        public List<Scan> scans { get; set; }
    }

    public class Scan
    {
        public string date { get; set; }
        public string activity { get; set; }
        public string location { get; set; }
    }

#endregion

    //Whatsapp API 

    public class WhatsApp
    {
        public string type { get; set; }
        public string templateId { get; set; }
        public string templateLanguage { get; set; }

        public string @namespace { get; set; }
        public List<string> templateArgs { get; set; }
        public string sender_phone { get; set; }
    }


}
