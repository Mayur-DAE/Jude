import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MapTokenResponse } from './models/token-map';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //!new server
  // readonly APIUrl = 'https://www.myareaonline.in/AOL/api/v1';
  // readonly PhotoUrl = 'https://www.myareaonline.in/AOL/api/v1/Photos/';

  // readonly APIUrl = 'http://103.76.214.46/jude/api/v1';
  // readonly PhotoUrl = 'http://103.76.214.46/jude/api/v1/Photos/';

  // readonly APIUrl = 'http://103.76.214.46/jude/api/v1';
  // readonly PhotoUrl = 'http://103.76.214.46/jude/api/v1/Photos/';

  // readonly APIUrl = 'https://localhost:5001';
  // readonly PhotoUrl = 'https://localhost:5001/Photos/';

  readonly APIUrl = 'http://103.25.126.106/jude/api/v1';
  readonly PhotoUrl = 'http://103.25.126.106/jude/api/v1/Photos/';

  private TwofactorSmsUrl = 'https://2factor.in/API/R1/';

  public isAuthenticated = false;
  public currentUser: any;
  public currentUserID: any;

  constructor(private http: HttpClient) {
    this.currentUser = localStorage.getItem('BoUser');

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.UserID;
      this.isAuthenticated = true;
    }
  }

  //! Map My India

  private tokenResponse: any;

  generateToken() {
    this.http
      .post(this.APIUrl + '/mapMyIndia/GenerateToken', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .subscribe((tokenData) => {
        const tokenresponse: MapTokenResponse = <MapTokenResponse>tokenData;
        this.tokenResponse = tokenresponse;
        console.log(this.tokenResponse);
      });
  }

  getToken() {
    return this.http.post(this.APIUrl + '/mapMyIndia/GenerateToken', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  getAddresses(address: String) {
    return this.http
      .post(
        this.APIUrl +
        '/mapMyIndia/GetAddress?address=' +
        address +
        '&token=' +
        this.tokenResponse.access_token,
        {
          // headers: {
          //   Authorization:
          //     this.tokenResponse.token_type +
          //     ' ' +
          //     this.tokenResponse.access_token,
          //   'Access-Control-Allow-Origin': '*',
          // },
        }
      )
      .pipe(map((results: any) => results.copResults));
  }

  eLocLatLog(eLoc: String) {
    let val = {};

    return this.http.post<any>(
      this.APIUrl +
      '/mapMyIndia/eLoc?eLoc=' +
      eLoc +
      '&token=' +
      this.tokenResponse.access_token,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
      val
    );
  }

  // getDepList():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/department');
  // }

  // addDepartment(val:any){
  //   return this.http.post(this.APIUrl+'/department',val)
  // }

  // updateDepartment(val:any){
  //   return this.http.post(this.APIUrl+'/department',val)
  // }
  // deleteDepartment(val:any){
  //   return this.http.delete(this.APIUrl+'/department',val)
  // }

  //!For User module added by mayur//

  documentaddimg(val: any){
    return this.http.post<any>(this.APIUrl + '/Photo', val);
  }

  getUsersList(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/get', val);
  }

  addUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/insert', val);
  }

  updateUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/update', val);
  }

  setUserActive(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/Active', val);
  }

  setUserInactive(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/Inactive', val);
  }

  getLogin(val: any) {
    return this.http.post(this.APIUrl + '/user/login', val);
  }

  changePassword(val: any) {
    return this.http.post<any>(this.APIUrl + '/user/changePassword', val);
  }

  getUserRoleList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/users/userRoles');
  }
  getmasterproductsListforcompany(val: any) {
    return this.http.post<any>(this.APIUrl + '/productforcompany/get',val);
  }
  //!User module end

  //!For User Type added by rishabh mishra

  // getUserTypeList(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/userType/get', val);
  // }
  // addUserType(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/usertype/insert', val);
  //   console.log(val);
  // }
  // updateUserType(val: any) {
  //   console.log(val);
  //   return this.http.post<any>(this.APIUrl + '/usertype/update', val);
  // }
  // isActiveUserType(val: any) {
  //   return this.http.post<any>(this.APIUrl + '/usertype/IsActive', val);
  // }

  //!User type end

  //Customer Module

  // getCutomerList(val:any){

  //   return this.http.get<any>(this.APIUrl+'/customer',val);
  // }

  // getCutomerList():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/customer');
  // }

  //Customer module end

  //--------------Rishbah Maurya--------------------------//
  //FAQ module start

  getfaqList(val: any) {
    return this.http.post<any>(this.APIUrl + '/faq/get', val);
  }

  addfaq(val: any) {
    console.log(val);
    return this.http.post<any>(this.APIUrl + '/faq/insert', val);
  }

  updatefaq(val: any) {
    return this.http.post<any>(this.APIUrl + '/faq/update', val);
  }

  deletefaq(val: any) {
    return this.http.delete(this.APIUrl + '/FAQ', val);
  }

  updateapproval(val: any) {
    return this.http.post<any>(this.APIUrl + '/faq/approval', val);
  }

  updatepublish(val: any) {
    return this.http.post<any>(this.APIUrl + '/faq/publish', val);
  }

  getorderList(val: any) {
    return this.http.post<any>(this.APIUrl + '/order/get', val);
  }

  getproductsList(val: any) {
    return this.http.post<any>(this.APIUrl + '/Product/get', val);
  }

  addproducts(val: any) {
    console.log(val);
    return this.http.post<any>(this.APIUrl + '/product/insert', val);
  }

  updateproducts(val: any) {
    return this.http.post<any>(this.APIUrl + '/product/update', val);
  }

  //--------------Jidensha Sankhe --------------------------//
  //businesstype       ----Jidensha Sankhe----
  GetComplist(val: any) {
    return this.http.post<any>(this.APIUrl + '/businessTypes/get', val);
  }
  AddBusinessTypeName(val: any) {
    return this.http.post<any>(this.APIUrl + '/businessTypes/insert', val);
  }
  UpdateBusinessTypeName(val: any) {
    return this.http.post<any>(this.APIUrl + '/businessTypes/update', val);
  }
  updateIsActiveBusinessTypeName(val: any) {
    return this.http.post<any>(this.APIUrl + '/businessTypes/Isactive', val);
  }

  addbusinessTypesLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/businessTypesLanguage/add', val);
  }

  getbusinessTypesLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/businessTypesLanguage/get', val);
  }

  //CompanyMemberShip     ----Jidensha Sankhe----
  GetCompanyMemberShip(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/companyMemberShipTypes/get',
      val
    );
  }
  AddCompanyMemberShipTypes(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/companyMemberShipTypes/insert',
      val
    );
  }
  UpdateCompanyMemberShip(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/companyMemberShipTypes/update',
      val
    );
  }
  UpdateIsActiveMembership(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/companyMemberShipTypes/Isactive',
      val
    );
  }
  GetTaxSlabs(val: any) {
    return this.http.post<any>(this.APIUrl + '/taxSlabs/get', val);
  }
  //company-sources          ----Jidensha Sankhe----
  GetCompanySource(val: any) {
    return this.http.post<any>(this.APIUrl + '/companySources/get', val);
  }
  AddCompanySource(val: any) {
    return this.http.post<any>(this.APIUrl + '/companySources/insert', val);
  }
  UpdateCompanySource(val: any) {
    return this.http.post<any>(this.APIUrl + '/companySources/update', val);
  }
  updateIsActiveCompanySource(val: any) {
    return this.http.post<any>(this.APIUrl + '/companySources/isactive', val);
  }
  //Offers             ----Jidensha Sankhe----
  GetOffers(val: any) {
    return this.http.post<any>(this.APIUrl + '/offers/get', val);
  }
  AddOffers(val: any) {
    console.log(val);
    return this.http.post<any>(this.APIUrl + '/offers/insert', val);
  }
  UpdateOffers(val: any) {
    return this.http.post<any>(this.APIUrl + '/offers/update', val);
  }
  GetCompany(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/get', val);
  }
  //OrderDeliveryType ---Jidnesha Sankhe---
  GetOrderDeliveryType(val: any) {
    return this.http.post<any>(this.APIUrl + '/OrderDeliveryType/get', val);
  }
  AddOrderDeliveryType(val: any) {
    return this.http.post<any>(this.APIUrl + '/OrderDeliveryType/insert', val);
  }
  UpdateOrderDeliveryType(val: any) {
    return this.http.post<any>(this.APIUrl + '/OrderDeliveryType/update', val);
  }
  UpdateOrderDeliveryTypeIsActive(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/OrderDeliveryType/Isactive',
      val
    );
  }
  //OrderStatus--Jidnesha Sankhe---
  GetOrderStatus(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/OrderStatus/get');
  }
  AddOrderStatus(val: any) {
    return this.http.post(this.APIUrl + '/OrderStatus/insert', val);
  }
  UpdateOrderStatus(val: any) {
    return this.http.post(this.APIUrl + '/OrderStatus/update', val);
  }
  updateOrderStatusIsactive(val: any) {
    return this.http.post<any>(this.APIUrl + '/OrderStatus/Isactive', val);
  }
  //Company module start
  getCompanyList(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/get', val);
  }

  AddCompanyList(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/insert', val);
  }
  UpdateCompanyList(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/update', val);
  }
  setCompanyISActive(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/IsActive', val);
  }
  uploadPhoto(val: any, id: any) {
    return this.http.post(this.APIUrl + '/company/path?id=' + id, val);
  }

  uploadLogophoto(val: any, id: any) {
    return this.http.post(this.APIUrl + '/company/logo?id=' + id, val);
  }

  uploadcover_imgPhoto(val: any, id: any) {
    return this.http.post(this.APIUrl + '/company/cover_img?id=' + id, val);
  }
  ///home///

  getdashboardList(val: any) {
    return this.http.post<any>(this.APIUrl + '/dashboard/get', val);
  }

  getweekly(val: any) {
    return this.http.post<any>(this.APIUrl + '/dashboard/weekly', val);
  }
  getmonthly(val: any) {
    return this.http.post<any>(this.APIUrl + '/dashboard/monthly', val);
  }
  getquaterly(val: any) {
    return this.http.post<any>(this.APIUrl + '/dashboard/quaterlydata', val);
  }
  getyearly(val: any) {
    return this.http.post<any>(this.APIUrl + '/dashboard/yearlydata', val);
  }
  gettoday(val: any) {
    return this.http.post<any>(this.APIUrl + '/dashboard/todaysdata', val);
  }

  //--------------Mishra --------------------------//

  getUsertypeList(val: any) {
    return this.http.post<any>(this.APIUrl + '/userType/get', val);
  }
  addUsertype(val: any) {
    return this.http.post<any>(this.APIUrl + '/userType/insert', val);
  }
  updateusertype(val: any) {
    return this.http.post<any>(this.APIUrl + '/userType/update', val);
  }
  IsActiveUsertype(val: any) {
    return this.http.post<any>(this.APIUrl + '/userType/isActive', val);
  }

  getRevList(val: any) {
    return this.http.post<any>(this.APIUrl + '/review/get', val);
  }
  updateReview(val: any) {
    return this.http.post<any>(this.APIUrl + '/review/update', val);
  }
  updatepublishReview(val: any) {
    return this.http.post<any>(this.APIUrl + '/review/IsPublished', val);
  }

  getProductcategoryList(val: any) {
    return this.http.post<any>(this.APIUrl + '/productCategory/get', val);
  }

  addProductcategory(val: any) {
    return this.http.post<any>(this.APIUrl + '/productCategory/insert', val);
  }
  updateProductcategory(val: any) {
    return this.http.post<any>(this.APIUrl + '/productCategory/update', val);
  }
  IsActiveProductcategory(val: any) {
    return this.http.post<any>(this.APIUrl + '/productCategory/IsActive', val);
  }
  uploadPhotoProductCategory(val: any) {
    return this.http.post(this.APIUrl + '/productCategoryImage/path', val);
  }

  getProductSubcategoryList(val: any) {
    return this.http.post<any>(this.APIUrl + '/productSubCategory/get', val);
  }

  addProductSubcategory(val: any) {
    return this.http.post<any>(this.APIUrl + '/productSubCategory/insert', val);
  }
  updateProductSubcategory(val: any) {
    return this.http.post<any>(this.APIUrl + '/productSubCategory/update', val);
  }
  IsActiveProductSubcategory(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/productSubCategory/IsActive',
      val
    );
  }
  uploadSubCategoryPhoto(val: any) {
    return this.http.post(this.APIUrl + '/productSubCategoryImage/path', val);
  }

  getUserList(val: any) {
    return this.http.post<any>(this.APIUrl + '/users', val);
  }

  getproductcategoryList(val: any) {
    return this.http.post<any>(this.APIUrl + '/productcategory/get', val);
  }

  getproductsubcategoryList(val: any) {
    return this.http.post<any>(this.APIUrl + '/productsubcategory/get', val);
  }

  getcompanyList(val: any) {
    return this.http.post<any>(this.APIUrl + '/Company/get', val);
  }

  uploadProductPhoto(val: any) {
    return this.http.post(this.APIUrl + '/productImage/path', val);
  }

  updateproductapproval(val: any) {
    return this.http.post<any>(this.APIUrl + '/Product/approval', val);
  }

  updateproductpublish(val: any) {
    return this.http.post<any>(this.APIUrl + '/Product/publish', val);
  }
  ////////////// Shruti////////////////

  ///////jinesha/////
  getproductsListPagination(val: any) {
    return this.http.post<any>(this.APIUrl + '/productPagination/get', val);
  }

  getusermenuList(val: any) {
    return this.http.post<any>(this.APIUrl + '/menu/get', val);
  }
  getOrderStatusList(val: any) {
    return this.http.post<any>(this.APIUrl + '/orderStatus/get', val);
  }

  getCityList(val: any) {
    return this.http.post<any>(this.APIUrl + '/city/get', val);
  }
  getStatesList(val: any) {
    return this.http.post<any>(this.APIUrl + '/states/get', val);
  }
  getsettlementList(val: any) {
    return this.http.post<any>(this.APIUrl + '/Reports/get', val);
  }
  getOrderProductList(val: any) {
    return this.http.post<any>(this.APIUrl + '/OrderProduct/get', val);
  }
  getMembershipInvoicesList(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/companyMembershipinvoice/get',
      val
    );
  }

  /////jinesha
  getCompanyAddress(val: any) {
    return this.http.post<any>(this.APIUrl + '/companyAddresses/get', val);
  }
  addCompanyAddress(val: any) {
    return this.http.post<any>(this.APIUrl + '/companyAddresses/insert', val);
  }
  updateCompanyAddress(val: any) {
    return this.http.post<any>(this.APIUrl + '/companyAddresses/update', val);
  }

  getBankDetails(val: any) {
    return this.http.post<any>(this.APIUrl + '/companybankdetails/get', val);
  }
  addBankDetails(val: any) {
    return this.http.post<any>(this.APIUrl + '/companybankdetails/insert', val);
  }
  updateBankDetails(val: any) {
    return this.http.post<any>(this.APIUrl + '/companybankdetails/update', val);
  }

  getSettlementList(val: any) {
    return this.http.post<any>(this.APIUrl + '/Reports/get', val);
  }
  getOrderInvoiceList(val: any) {
    return this.http.post<any>(this.APIUrl + '/orderInvoice/get', val);
  }

  OrderStatusUpdate(val: any) {
    return this.http.post<any>(this.APIUrl + '/order/update', val);
  }

  addMembershipinvoice(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/companyMembershipinvoice/insert',
      val
    );
  }

  updateshopsettlement(val: any) {
    return this.http.post<any>(this.APIUrl + '/shop/settlement', val);
  }

  updatedeliverysettlement(val: any) {
    return this.http.post<any>(this.APIUrl + '/delivery/settlement', val);
  }

  getshopSettlementList(val: any) {
    return this.http.post<any>(this.APIUrl + '/Reports/get', val);
  }

  getdeliverySettlementList(val: any) {
    return this.http.post<any>(this.APIUrl + '/deliverysettlement/get', val);
  }

  getOrderSummaryreort(val: any) {
    return this.http.post<any>(this.APIUrl + '/summary/order/report', val);
  }

  getreportsExpiredShop(val: any) {
    return this.http.post<any>(this.APIUrl + '/ReportExpiredShop/get', val);
  }

  OrderInvoiceupdate(val: any) {
    return this.http.post<any>(this.APIUrl + '/orderinvoice/update', val);
  }

  walletupdate(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/serviceprovider_wallet/update',
      val
    );
  }

  //!ship rocket

  generateShiprocketToken() {
    return this.http.post(this.APIUrl + '/ShipRocket/GenerateToken', {});
  }

  GenerateAWBforShipment(val: any) {
    return this.http.post(
      this.APIUrl + '/ShipRocket/GenerateAWBforShipment',
      val
    );
  }

  //send tracking link to enduser
  // sendTrackingLink(
  //   ToNumber: any,
  //   ToName: any,
  //   OrderNumber: any,
  //   AWBNumber: any
  // ) {
  //   let body = new URLSearchParams();
  //   body.set('module', 'TRANS_SMS');
  //   body.set('apikey', '0091c5f1-a4e1-11eb-80ea-0200cd936042');
  //   body.set('to', ToNumber);
  //   body.set('from', 'AREAOL');
  //   body.set(
  //     'msg',
  //     'Hi ' +
  //       ToName +
  //       ', Your order #' +
  //       OrderNumber +
  //       ' has been approved and ready to ship, track your order ' +
  //       AWBNumber +
  //       '%0A%0Aby Area Online'
  //   );

  //   alert('mayua');
  //   console.log(body);

  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   });

  //   let option = { headers: headers };

  //   this.http.post(this.TwofactorSmsUrl, body, option).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       alert('send');
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  sendTrackingLink(
    ToNumber: any,
    ToName: any,
    OrderNumber: any,
    AWBNumber: any
  ) {
    return this.http
      .post<any>(
        this.APIUrl +
        '/TwoFactor/SendTrackingLink?ToNumber=' +
        ToNumber +
        '&ToName=' +
        ToName +
        '&OrderNumber=' +
        OrderNumber +
        '&AWBNumber=' +
        AWBNumber,
        {}
      )
      .subscribe((data) => { });
  }

  sendWhatsappSMS(val: any) {
    return this.http.post<any>(this.APIUrl + '/Whatsapp/SendSMS', val);
  }

  sendCancelSMS(ToNumber: any, Amount: any, OrderNumber: any) {
    return this.http
      .post<any>(
        this.APIUrl +
        '/TwoFactor/SendOrderCancelation?ToNumber=' +
        ToNumber +
        '&Amount=' +
        Amount +
        '&OrderNumber=' +
        OrderNumber,
        {}
      )
      .subscribe((data) => { });
  }

  getServiceProvider(val: any) {
    return this.http.post<any>(this.APIUrl + '/ServiceProvider/get', val);
  }

  ServiceProviderWalletLog(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/ServiceProviderWalletLogController/get',
      val
    );
  }

  addServiceProviderWalletLog(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/ServiceProviderWalletLogController/insert',
      val
    );
  }

  updateServiceProviderWalletLog(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/ServiceProviderWalletLogController/update',
      val
    );
  }

  getShiprocketStatement(val: any) {
    return this.http.post<any>(this.APIUrl + '/ShiprocketStatement/Get', val);
  }

  addShipRocketAddress(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/ShipRocket/AddShiprocketAddress',
      val
    );
  }
  getmembershipinvoiceList(val: any) {
    return this.http.post<any>(this.APIUrl + '/membershipinvoice/get', val);
  }

  addmasterProductsLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/api/MasterProducts/AddMasterProductLanguage', val);
  }

  getmasterProductsLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/api/MasterProducts/GetMasterProductLanguage', val);
  }


  addmasterproducts(val: any) {
    console.log(val);
    return this.http.post<any>(this.APIUrl + '/api/MasterProducts', val);

  }

  updatemasterproducts(val: any) {
    console.log(val);
    return this.http.post<any>(this.APIUrl + '/api/MasterProducts/masterProducts/update', val);

  }

  getmasterproductsList(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/MasterProducts', { params });
  }

  addcompanyproducts(val: any) {
    console.log(val);
    return this.http.post<any>(this.APIUrl + '/api/CompanyProducts', val);
  }

  getcompanyproductsList(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/CompanyProducts', { params });
  }

  updatecompanyproducts(val: any) {
    console.log(val);
    return this.http.post<any>(this.APIUrl + '/api/CompanyProducts/companyProducts/update', val);

  }

  getLanguage(LanguageId: number | null) {

    let params = new HttpParams();

    if (LanguageId !== null) {
      params = params.set('LanguageId', LanguageId.toString());
    }

    return this.http.get<any>(this.APIUrl + '/api/Language', { params });
  }


  addCategoryLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/productCategoryLanguage/add', val);
  }

  getCategoryLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/productCategoryLanguage/get', val);
  }


  addSubCategoryLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/productSubCategoryLanguage/add', val);
  }

  getSubCategoryLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/productSubCategoryLanguage/get', val);
  }


  addCompanyLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/companyLanguage/add', val);
  }

  getCompanyLanguage(val: any) {
    return this.http.post<any>(this.APIUrl + '/companyLanguage/get', val);
  }

  getcurrency(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/Country/Currency', { params });
  }

  sendOTP(ToNumber: any) {
    return this.http
      .post<any>(this.APIUrl + '/TwoFactor/SendOTP?ToNumber=' + ToNumber, {})
      .subscribe((data) => { });
  }

  //Send otp sms
  verifyOTP(ToNumber: any, otp: any) {
    return this.http.post<any>(
      this.APIUrl + '/TwoFactor/VerifyOTP?ToNumber=' + ToNumber + '&otp=' + otp,
      {}
    );
  }

  private apiUrl = this.APIUrl + '/api/PlaceAutocomplete/search';
  searchLocation(input: string): Observable<any> {
    const headers = new HttpHeaders().set('Skip-Interceptor', 'true');
    return this.http.get(`${this.apiUrl}?input=${input}`, { headers });
  }

  private latlongUrl = this.APIUrl + '/api/PlaceAutocomplete/detailsearch';
  getlatlong(placeId: string): Observable<any> {
    return this.http.get(`${this.latlongUrl}?placeid=${placeId}`);
  }

  private geoApiUrl = this.APIUrl + '/api/PlaceAutocomplete/locationbycods';
  getAddressFromCoordinates(lat: number, lng: number): Observable<any> {
    return this.http.get(`${this.geoApiUrl}?lat=${lat}&lng=${lng}`);
  }

  getenquiry(val: any) {
    return this.http.post<any>(this.APIUrl + '/enquiry/get', val);
  }
}

