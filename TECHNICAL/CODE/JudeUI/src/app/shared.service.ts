import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MapTokenResponse } from './models/token-map';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public lat: any;
  public long: any;

  //!Localhost
  // readonly APIUrl = 'https://localhost:5001';
  // readonly PhotoUrl = 'https://localhost:5001/Photos/';
  // readonly notifyUrl = 'https://localhost:5001/api/Souqpass/PaymentNotify';
  // readonly redirectUrl = 'http://localhost:4200/#/OrderSuccess/';
  // readonly boUrl = 'http://103.25.126.106/jude/Bo/#/';

  //!old server
  readonly APIUrl = 'http://103.25.126.106/jude/api/v1';
  readonly PhotoUrl = 'http://103.25.126.106/jude/api/v1/Photos/';
  readonly notifyUrl = 'http://103.25.126.106/jude/api/v1/api/Souqpass/PaymentNotify';
  readonly redirectUrl = 'http://103.25.126.106/jude/web/#/OrderSuccess/';
  readonly boUrl = 'http://103.25.126.106/jude/Bo/#/';

  //!new server
  // readonly APIUrl = 'http://43.230.200.205/AOL/api/v1';
  // readonly PhotoUrl = 'http://43.230.200.205/AOL/api/v1/Photos/';

  //!new url
  // readonly APIUrl = 'https://www.myareaonline.in/AOL/api/v1';
  // readonly PhotoUrl = 'https://www.myareaonline.in/AOL/api/v1/Photos/';

  // readonly mapmyindia =
  //  'https://atlas.mapmyindia.com/api/places/geocode?region=ind&itemCount=5&address=';

  // readonly tokenUrl =
  //  'https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsI7vKFuye58kkPcrk72CL7f4VivQwoqGRSvk5VrAUGBWV7tjf3L0NTNMbtcHyfshhftdc5hmNcCmg==&client_secret=lrFxI-iSEg_W8BGjppkkNMMrEeInL6S39NAGhifZCbCvUJzrm28Qe6eaXsnGsHLwwo-c2e5iodKHakaWl3Id01P8eglUgzAy';
  // readonly ReverseGeocodeApi = 'https://apis.mapmyindia.com/advancedmaps/v1/';

  private tokenResponse: any;

  private shiprocketTokenUrl =
    'https://apiv2.shiprocket.in/v1/external/auth/login';

  private pickupAddressUrl =
    'https://apiv2.shiprocket.in/v1/external/settings/company/addpickup';

  private shiprocketAddProduct =
    'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc';

  private ShiprocketServiceability =
    'https://apiv2.shiprocket.in/v1/external/courier/serviceability/';

  private TwofactorSmsUrl = 'https://2factor.in/API/R1/';

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  CartID: any;
  selectedLanguageId: any;

  updateCartCount(count: number) {
    this.cartCount.next(count);
  }
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  getCount() {
    console.log("Fetching cart count...");
    
    this.CartID = localStorage.getItem('CartID');
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";
    console.log("CartID:", this.CartID);
  
    if (this.CartID != null) {
      var val: any = { CartID: this.CartID, LanguageID: this.selectedLanguageId };
      
      this.getCartProducts(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          var CartProductsList = JSON.parse(data['message']);
          console.log("CartProductsList:", CartProductsList);
          
          this.updateCartCount(CartProductsList.length); // ✅ Correctly updates cart count
        }
      });
    } else {
      this.updateCartCount(0);
    }
  }
  // private getStoredUser() {
  //   return localStorage.getItem('currentUser')
  //     ? JSON.parse(localStorage.getItem('currentUser')!)
  //     : null;
  // }


  // Places AutoComplete
  private apiUrl = this.APIUrl + '/api/PlaceAutocomplete/search';
  searchLocation(input: string): Observable<any> {
    const headers = new HttpHeaders().set('Skip-Interceptor', 'true');
    return this.http.get(`${this.apiUrl}?input=${input}`, { headers });
  }

  private geoApiUrl = this.APIUrl + '/api/PlaceAutocomplete/locationbycods';
  getAddressFromCoordinates(lat: number, lng: number): Observable<any> {
    return this.http.get(`${this.geoApiUrl}?lat=${lat}&lng=${lng}`);
  }

  private latlongUrl = this.APIUrl + '/api/PlaceAutocomplete/detailsearch';
  getlatlong(placeId: string): Observable<any> {
    return this.http.get(`${this.latlongUrl}?placeid=${placeId}`);
  }

  // Call this inside your login function in the existing component
  updateUserState() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject.next(storedUser ? JSON.parse(storedUser) : null);
  }
  //! Map My India

  // generateToken() {
  //   this.http
  //     .post(this.APIUrl + '/mapMyIndia/GenerateToken', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     })
  //     .subscribe((tokenData) => {
  //       const tokenresponse: MapTokenResponse = <MapTokenResponse>tokenData;
  //       this.tokenResponse = tokenresponse;
  //     });
  // }

  // getToken() {
  //   return this.http.post(this.APIUrl + '/mapMyIndia/GenerateToken', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   });
  // }

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

  getCurrentAddress(lat: any, lang: any) {
    // 
    //
    return this.http
      .post(
        this.APIUrl +
        '/mapMyIndia/GetCurrentAddress?lat=' +
        lat +
        '&lang=' +
        lang +
        '&clientID=' +
        'notneed',
        {}
      )
      .pipe(map((results: any) => results));
  }
  //! END Map My India

  // Home
  getLocationService(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
          this.lat = resp.coords.latitude;
          this.long = resp.coords.longitude;
        },
        () => {
          resolve({ lng: '0.00', lat: '0.00' });
          this.lat = '0.00';
          this.long = '0.00';
        }
      );
    });
  }
  getmasterproductsoncategoryList(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/MasterProducts/GetMasterProductsOnCategory', { params });
  }

  getcompanyListforproduct(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/CompanyProducts/GetCompanyForMasterProduct', { params });
  }

  getProductCategory(val: any) {
    return this.http.post<any>(this.APIUrl + '/productCategory/get', val);
  }

  getProductSubCategory(val: any) {
    return this.http.post<any>(this.APIUrl + '/productSubCategory/get', val);
  }

  getPopularAroundYou(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/popularAroundYou', val);
  }

  getPaidPopularAroundYou(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/company/paidPopularAroundYou',
      val
    );
  }

  //Home End

  //Channel Partner sign up

  //Add Company
  AddCompany(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/insert', val);
  }

  ValidateCompany(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/validate', val);
  }

  //Add User
  AddUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/insert', val);
  }

  //Get Business Type
  GetBusinessType(val: any) {
    return this.http.post<any>(this.APIUrl + '/businessTypes/get', val);
  }

  BusinessTypeListing(val: any) {
    return this.http.post<any>(this.APIUrl + '/businessTypes/Listing', val);
  }

  //EndChannel Partner sign up

  getLogin(val: any) {
    return this.http.post(this.APIUrl + '/user/login', val);
  }

  addMember(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/insert', val);
  }

  addGoogleMember(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/googlesignup', val);
  }

  getGoogleMember(val: any) {
    return this.http.post(this.APIUrl + '/user/googlelogin', val);
  }

  getUserList(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/get', val);
  }

  //rishabh maurya
  CompanyID: any;

  getCompanyList(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/get', val);
  }

  getCompanyName(val: any) {
    return this.http.post<any>(this.APIUrl + '/companyname/get', val);
  }
  getproductsList(val: any) {
    return this.http.post<any>(this.APIUrl + '/Product/get', val);
  }

  getratingandreviewsList(val: any) {
    return this.http.post<any>(this.APIUrl + '/review/get', val);
  }

  addCart(val: any) {
    return this.http.post<any>(this.APIUrl + '/cart/insert', val);
  }

  addCartProducts(val: any) {
    return this.http.post<any>(this.APIUrl + '/cartProducts/insert', val);
  }

  addOrderProduct(val: any) {
    return this.http.post<any>(this.APIUrl + '/OrderProduct/insert', val);
  }

  getBestSellingProduct(val: any) {
    return this.http.post<any>(this.APIUrl + '/BestSellingProduct/get', val);
  }

  getCartProducts(val: any) {
    return this.http.post<any>(this.APIUrl + '/cartProducts/get', val);
  }

  updateCartProductsQuantity(val: any) {
    return this.http.post<any>(this.APIUrl + '/cartProducts/quantity', val);
  }

  deleteCartProducts(val: any) {
    return this.http.post<any>(this.APIUrl + '/cartProducts/delete', val);
  }

  deleteCart(val: any) {
    return this.http.post<any>(this.APIUrl + '/cart/delete', val);
  }
  getCart(val: any) {
    return this.http.post<any>(this.APIUrl + '/cart/get', val);
  }
  updateCart(val: any) {
    return this.http.post<any>(this.APIUrl + '/cart/update', val);
  }

  setCompanyID(id: any) {
    this.CompanyID = id;
  }

  getCompanyID() {
    return this.CompanyID;
  }

  getUserAddresses(val: any) {
    return this.http.post<any>(this.APIUrl + '/userAddresses/get', val);
  }

  updateUserAddresses(val: any) {
    return this.http.post<any>(this.APIUrl + '/userAddresses/update', val);
  }

  addUserAddresses(val: any) {
    return this.http.post<any>(this.APIUrl + '/userAddresses/insert', val);
  }

  getCity(val: any) {
    return this.http.post<any>(this.APIUrl + '/city/get', val);
  }

  getStates(val: any) {
    return this.http.post<any>(this.APIUrl + '/states/get', val);
  }

  getCompanyAddress(val: any) {
    return this.http.post<any>(this.APIUrl + '/companyAddresses/get', val);
  }

  getCompanyOrProduct(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/searchCompanyOrProduct/get',
      val
    );
  }

  getCompanyOrProductDistinct(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/searchCompanyOrProductDistinct/get',
      val,
      {
        headers: new HttpHeaders().set('Skip-Interceptor', 'true')
      }
    );
  }

  getsearch(val: any) {
    return this.http.post<any>(this.APIUrl + '/searchText', val);
  }

  getsearchByLatLong(val: any) {
    return this.http.post<any>(this.APIUrl + '/searchByLatLong', val);
  }

  insertOrder(val: any) {
    return this.http.post<any>(this.APIUrl + '/order/insert', val);
  }

  //!ship rocket

  generateShiprocketToken() {
    return this.http.post(this.APIUrl + '/ShipRocket/GenerateToken', {});
    // return this.http.post(this.shiprocketTokenUrl, {
    //   // email: 'customercare@areaonline.in',
    //   // password: 'Password$123',
    //   email: 'rishabhm0210@gmail.com',
    //   password: 'P@ssw0rd',
    // });
  }

  addShiprocketOrder(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/ShipRocket/CreateCustomOrder',
      val
    );
  }

  updateShiprocketOrder(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/ShipRocket/UpdateCustomOrder',
      val
    );
  }

  addShiprocketAddress(val: any) {
    return this.http.post<any>(
      this.APIUrl + '/ShipRocket/AddShiprocketAddress',
      val
    );
  }

  checkShiprocketServiceability(val: any, token: any) {
    var url =
      this.APIUrl +
      '/ShipRocket/checkShiprocketServiceability' +
      '?order_id=' +
      val.order_id +
      '&cod=' +
      val.cod +
      '&weight=' +
      val.weight +
      '&token=' +
      token;

    return this.http.post<any>(url, {});
    // this.ShiprocketServiceability +=
    //   '?pickup_postcode=' +
    //   val.pickup_postcode +
    //   '&delivery_postcode=' +
    //   val.delivery_postcode +
    //   '&cod=' +
    //   val.cod +
    //   '&weight=' +
    //   val.weight;
    // return this.http.get<any>(this.ShiprocketServiceability, {
    //   headers: {
    //     Authorization: 'bearer' + ' ' + token,
    //   },
    // });
  }

  //!end ship rocket

  //! SMS API
  //Send order details shop - sms

  sendNewOrderSMSToShop(ToNumber: any, ToName: any, OrderNumber: any) {
    return this.http
      .post<any>(
        this.APIUrl +
        '/TwoFactor/SendNewOrderSMSToShop?ToNumber=' +
        ToNumber +
        '&ToName=' +
        ToName +
        '&OrderNumber=' +
        OrderNumber,
        {}
      )
      .subscribe((data) => { });
  }

  //Send order details member - sms
  sendNewOrderSMSToMember(ToNumber: any, ToName: any, OrderNumber: any) {
    return this.http
      .post<any>(
        this.APIUrl +
        '/TwoFactor/SendNewOrderSMSToMember?ToNumber=' +
        ToNumber +
        '&ToName=' +
        ToName +
        '&OrderNumber=' +
        OrderNumber,
        {}
      )
      .subscribe((data) => { });
  }

  //Greeting on company created - sms
  AORegistrationGreeting(ToNumber: any, ToName: any) {
    return this.http
      .post<any>(
        this.APIUrl +
        '/TwoFactor/AORegistrationGreeting?ToNumber=' +
        ToNumber +
        '&ToName=' +
        ToName,
        {}
      )
      .subscribe((data) => { });
  }

  //Send otp sms
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

  //! END SMS API

  OrderStatusUpdate(val: any) {
    return this.http.post<any>(this.APIUrl + '/order/update', val);
  }

  getfaqList(val: any) {
    return this.http.post<any>(this.APIUrl + '/faq/get', val);
  }

  addReview(val: any) {
    return this.http.post<any>(this.APIUrl + '/review/insert', val);
  }

  getOrderInvoiceList(val: any) {
    return this.http.post<any>(this.APIUrl + '/orderInvoice/get', val);
  }
  getOrderList(val: any) {
    return this.http.post<any>(this.APIUrl + '/order/get', val);
  }

  updateUser(val: any) {
    return this.http.post<any>(this.APIUrl + '/users/update', val);
  }
  updateuseraddress(val: any) {
    return this.http.post<any>(this.APIUrl + '/userAddresses/update', val);
  }
  addUserAddress(val: any) {
    return this.http.post<any>(this.APIUrl + '/userAddresses/insert', val);
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

  //WhatsApp

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

  CompanyListing(val: any) {
    return this.http.post<any>(this.APIUrl + '/company/Listing', val);
  }

  addmasterproducts(val: any) {
    
    return this.http.post<any>(this.APIUrl + '/api/MasterProducts', val);

  }

  updatemasterproducts(val: any) {
    
    return this.http.post<any>(this.APIUrl + '/api/MasterProducts/masterProducts/update', val);

  }

  getmasterproductsList(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/MasterProducts', { params });
  }

  addcompanyproducts(val: any) {
    
    return this.http.post<any>(this.APIUrl + '/api/CompanyProducts', val);
  }

  getcompanyproductsList(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/CompanyProducts', { params });
  }

  updatecompanyproducts(val: any) {
    
    return this.http.post<any>(this.APIUrl + '/api/CompanyProducts/companyProducts/update', val);

  }
  getcompanyproductsListforshop(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/CompanyProducts/GetCompanyProductsForShop', { params });
  }

  getlanguage(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/Language', { params });
  }

  ProductCategoryListing(val: any) {
    return this.http.post<any>(this.APIUrl + '/productCategory/Listing', val);
  }

  ProductSubCategoryListing(val: any) {
    return this.http.post<any>(this.APIUrl + '/productSubCategory/Listing', val);
  }

  getcompanyandprod(val: any) {
    return this.http.post<any>(this.APIUrl + '/searchCompProd', val);
  }

  getcompanyListforproductonsearch(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/CompanyProducts/GetCompanyForMasterProductonSearch', { params });
  }

  getcurrency(params: any) {
    return this.http.get<any>(this.APIUrl + '/api/Country/Currency', { params });
  }

  insertenquiry(val: any) {
    return this.http.post<any>(this.APIUrl + '/enquiry/insert', val);
  }

  getPaymentGateway(val: any) {
    return this.http.post<any>(this.APIUrl + '/api/Souqpass', val);
  }

  checkBookingStatus(val: any) {
    const headers = new HttpHeaders().set('Skip-Interceptor', 'true');
    return this.http.post<any>(this.APIUrl + '/Orders/CheckBookingStatus', val, { headers });
  }

  getEndUserLogin(val: any) {
    return this.http.post(this.APIUrl + '/user/enduserlogin', val);
  }
  sendemail(val: any) {
    return this.http.post(this.APIUrl + '/orderemail/send', val);
  }
  
}
