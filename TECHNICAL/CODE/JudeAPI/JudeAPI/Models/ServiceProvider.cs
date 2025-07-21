using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAE.DAL.SQL;
using DaeConfiguration;
using System.Data;

namespace JudeAPI.Models
{
    public class ServiceProvider
    {
        private readonly IDaeConfigManager _configurationIG;
        public ServiceProvider(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        public int ServiceProviderID { get; set; }
        public int RequestUserID { get; set; }
        public string APIRequest { get; set; }
        public string APIResponse { get; set; }
        public DateTime? APIRequestDateTime { get; set; }
        public DateTime? APIResponseDateTime { get; set; }
        public string APIMethodName { get; set; }
        public enum eServiceProviders
        {
            ShipRocket = 1,
            MapMyIndia = 2,
            Whatsapp = 3,
            TwoFactor = 4,
            Souqpass = 5
        }

        public enum APIMethods 
        {
            ShipRocketGenerateToken =1,
            ShipRocketAddAddress = 2,
            ShipRocketServiceability = 3,
            ShipRocketGenerateAWBforShipment = 4,
            ShipRocketRequestforShipmentPickup = 5,
            ShipRocketCreateCustomOrder = 6,
            ShipRocketUpdateCustomOrder = 7,
            ShipRocketOrderStatusUpdateWebhook = 11,
            ShipRocketPickupAddressBulkUpload = 12,
            WhatsappSMS = 13,

            MapMyIndiaGenerateToken = 8,
            MapMyIndiaGetAddress = 9,
            MapMyIndiaGetCurrentAddress = 10,

            TwoFactorSendNewOrderSMSToShop = 14 ,
            TwoFactorSendNewOrderSMSToMember = 15,
            TwoFactorAORegistrationGreeting = 16,
            TwoFactorSendOTP = 17,
            TwoFactorVerifyOTP = 18,
            TwoFactorSendTrackingLink = 19,

            SouqpassNoify = 20

        }

        public void AddAPILog()
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ServiceProviderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, this.ServiceProviderID);
                oDBUtility.AddParameters("@RequestUserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, this.RequestUserID);

                oDBUtility.AddParameters("@APIRequest", DBUtilDBType.Varchar, DBUtilDirection.In, int.MaxValue, this.APIRequest);
                oDBUtility.AddParameters("@APIResponse", DBUtilDBType.Varchar, DBUtilDirection.In, int.MaxValue, this.APIResponse);


                oDBUtility.AddParameters("@APIRequestDateTime", DBUtilDBType.DateTime, DBUtilDirection.In, 50, this.APIRequestDateTime);
                oDBUtility.AddParameters("@APIResponseDateTime", DBUtilDBType.DateTime, DBUtilDirection.In, 50, this.APIResponseDateTime);

                oDBUtility.AddParameters("@APIMethodName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, this.APIMethodName);
                oDBUtility.Execute_StoreProc("USP_AddAPILog");               
            }
            catch (Exception ex)
            {
                
            }
        }
    }

   
}
