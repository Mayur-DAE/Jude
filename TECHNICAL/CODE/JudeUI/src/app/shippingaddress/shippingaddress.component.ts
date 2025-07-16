import { Component, OnInit, HostListener, ViewChild, ElementRef,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';

declare function showSuccess(message: any): any;
declare function showInfo(message: any): any;
declare function showWarning(message: any): any;
declare function showError(message: any): any;
declare function resetCartCount(): any;
declare var Razorpay: any;
declare var mappls: any; // Global Obejct
declare function openPopup(id: any): any;
declare function closePopup(id: any): any;

declare var google: any;

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css'],
  providers: [DatePipe],
})
export class ShippingaddressComponent implements OnInit {

  intervals: any = [];
  isOrderComplete: any = false;
  loopflag: any = 'NotStarted';
  source: any = '';

  private paymentCheckTimeout: any;
  mapObject: any;
  marker: any;

  title = 'Shipping Address';
  productList = [];
  fullname = '';
  errorMsg = '';
  emailaddress = '';
  errorMsg1 = '';
  mobilenumber = '';
  errorMsg2 = '';
  pincode = '';
  errorMsg3 = '';
  flathousebld = '';
  errorMsg4 = '';
  areasectorvillage = '';
  errorMsg5 = '';
  towncity = '';
  errorMsg6 = '';
  state = '';
  errorMsg7 = '';
  currentUser: any;
  ShippingAddress: any = [];
  UserID: any;
  CityList: any;
  StatesList: any;
  isStateSelected: any;
  isCitySelected: any;
  CityID: any;
  StateID: any;
  UserAddressID: any;
  Landmark = '';
  lat: any;
  long: any;
  shiprocketToken: any;
  CompanyAddress: any;
  Company: any;
  pickupId: any;
  shiprocketOrderId: any;
  availableCourierCompanies: any = null;
  showAddressDetails = true;
  progresswidth = 50;
  DeliveryCharges: any = 0;
  CartTotalamt: any;
  FinalAmount: number = 0;
  courier_company_id: any;
  shipcorketShipmentId: any;
  CartID: any;
  cartsavingamt: any;
  actualprice: any;
  Cartamt: any;
  selectedLanguageId: string | null = '';
  CartProductsList: any;
  //For payment
  message = '';
  paymentId = '';
  error = '';
  orderPlacedSuccess = false;
  shiprocketProduct: any = [];
  OrderID: any;
  selectedAddress: any = {};
  addresses: any = [];
  isAddressSelected: boolean = false;
  eLoc: any;
  showLoader = false;

  payment_method = 'Prepaid';
  OrderPaymentReferenceNumber = 'COD';
  access_token: any;
  isMapMyIndiaSelected: any = 0;
  countrydata: any = [];
  currency: any;
  showCityDropdown = false;
  showStateDropdown = false;
  safeUrl!: SafeResourceUrl;
  currencycode:any;
  url:any='';
  searchResults: any[] = [];
  searchAddress: any = {};
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  ShowMap: boolean = false;
  mapvisible: boolean = false;
  paymentload:boolean = true;
  paymentopen:boolean=false;
  orderdata:any;
  options = {
    //live
    //key: 'rzp_live_f7525EfqRRxaZr',
    //this was used
    //key: 'rzp_live_A8l357iZikuOEv',
    //demo
    // key: 'rzp_test_JW9P8dMccqPrSg',
    //test
    key: 'rzp_test_NY3VQymZwssez4',
    secret: 'y5G5IZ4wbIW8pPOqvCeSJ5Hd',
    amount: '20000',
    name: 'JUDE',
    description: 'JUDE',
    image:
      'assets/images/favicon/icon.png',
    order_id: '',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#0eae0e',
    },
  };

  constructor(
    private services: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    console.log(this.currentUser,"currentuser");
    
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.CartID = localStorage.getItem('CartID');
    this.UserID = this.activatedRoute.snapshot.params['id'];
    this.refreshcartProductsList();
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1";

    //this.CartTotalamt = localStorage.getItem('CartTotalamt');
    // alert(this.CartTotalamt);
    this.mapvisible=true;
    this.getUserAddressesshipping();
    
    // this.services.getLocationService().then((resp) => {
    //   
    //   
    //   this.lat = resp.lat;
    //   this.long = resp.lng;
    // });

    //For shiprocker
    //this.generateShiprocketToken();

    this.getCopmanyAddress();

    this.getCopmany();

    // this.services.getToken().subscribe((data: any) => {
    //   
    //   this.access_token = data.access_token;

      //Return Callback when map is completely loaded
      // if not using callback then you have to use settimeout

      // this.initialize(this.access_token, () => {
      //   //Try to do everything related to map inside this or call external function inside of this

      //   // this.mapObject = mappls.Map('map', {
      //   //   center: [28.61, 77.23],
      //   //   zoomControl: true,
      //   //   location: true,
      //   // });

      //   this.placeSearch();
      // });
    // });

    this.handleVisibilityChangeIOS()
  }

  initialize(mmiToken: any, loadCallback = () => { }) {
    try {
      let pincode = '';
      if (mmiToken) {
        var count = 0;
        //Insert your script seperated by comma
        let mapSDK_url =
          'https://apis.mappls.com/advancedmaps/api/' +
          mmiToken +
          '/map_sdk?layer=vector&v=3.0';
        let plugins_url =
          'https://apis.mappls.com/advancedmaps/api/' +
          mmiToken +
          '/map_sdk_plugins?v=3.0';

        let plugins_url_ravi =
          'http://10.10.21.122/MapEngine_Vector-master3.0/advancedmaps/api/' +
          mmiToken +
          '/map_sdk_plugins?v=3.0&libraries=direction,search,getPinDetails';

        var scriptArr = [mapSDK_url, plugins_url];

        const recursivelyAddScript = (script: any) => {
          if (count < script.length) {
            const el = document.createElement('script');
            el.src = script[count];
            el.async = true;
            el.type = 'text/javascript';
            document.getElementsByTagName('head')[0].appendChild(el);
            count = count + 1;
            el.onload = function () {
              recursivelyAddScript(script);
            };
          } else return loadCallback();
        };
        recursivelyAddScript(scriptArr);
      }  
    } catch (e) {
      console.error(String(e));
    }
  }

  placeSearch() {
    var placeOptions = {
      location: [28.61, 77.23],
    };

    mappls.search(
      document.getElementById('areaa'),
      placeOptions,
      this.callback_method
    );
  }

  callback_method(data: any) {
    //alert('called');
    var dt = data[0];
    if (!dt) return;

    if (data[0]['placeName'] == 'Current Location') {
      //alert('need to call new api');
      (<HTMLInputElement>document.getElementById('areaa')).value = '';
      return;
    }

    var lat = dt.latitude;
    (<HTMLInputElement>document.getElementById('latitude')).value = lat;

    var long = dt.longitude;
    (<HTMLInputElement>document.getElementById('longitude')).value = long;

    (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected')).value =
      '1';

    const placeName = dt.placeName;
    if (placeName != '') {
      const placeAddress =
        placeName + ', ' + dt.placeAddress.split(',').slice(0, -3).join(',');
      // alert(placeAddress);
      (<HTMLInputElement>document.getElementById('areaa')).value = placeAddress;
    } else {
      const placeAddress = dt.placeAddress.split(',').slice(0, -3).join(',');
      // alert(placeAddress);
      (<HTMLInputElement>document.getElementById('areaa')).value = placeAddress;
    }

    let text = dt.placeAddress;
    const myArray = text.split(',');

    var pincode = myArray[myArray.length - 1];
    (<HTMLInputElement>document.getElementById('pcode')).value = pincode;

    let state = myArray[myArray.length - 2];
    (<HTMLInputElement>document.getElementById('state')).value = state;

    let city = myArray[myArray.length - 3];
    (<HTMLInputElement>document.getElementById('tcity')).value = city;
  }
  refreshcartProductsList() {
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";
    var val: any = { LanguageID: this.selectedLanguageId };
    if (this.CartID?.trim().length !== 0) {
      val.CartID = this.CartID

    }
    this.services.getCartProducts(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CartProductsList = JSON.parse(data['message']);
        this.currencySign();
        this.carttotal();
        this.cartsavingcal();
        this.cartsaving();
      }
    });
  }

  carttotal() {
    this.Cartamt = this.CartProductsList.reduce(function (acc: any, val: any) {
      return acc + val.ProductPrice * val.Quantity;
    }, 0);
  }

  cartsavingcal() {
    this.cartsavingamt = this.CartProductsList.reduce(function (
      acc: any,
      val: any
    ) {
      return acc + (val.ProductPrice - val.FinalPrice) * val.Quantity;
    },
      0);
  }

  cartsaving() {
    //this.cartsavingamt = this.Cartamt - this.actualprice;
    this.CartTotalamt = this.Cartamt - this.cartsavingamt;
  }

  // generateShiprocketToken() {
  //   this.services.generateShiprocketToken().subscribe((tokenData: any) => {
  //     this.shiprocketToken = tokenData.token;
  //     // const tokenresponse: MapTokenResponse = <MapTokenResponse>tokenData;
  //     // this.tokenResponse = tokenresponse;
  //   });
  // }

  getCopmanyAddress() {
    var val: any = {};
    // const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    val.CompanyID = localStorage.getItem("CompanyID");
    // val.CompanyID = currentUser.CompanyID;
    
    //val.CompanyID = 55884;
    // val.CompanyID = localStorage.getItem('CompanyID');
    console.log("this.CompanyAddress.CompanyID",val.CompanyID );

    this.services.getCompanyAddress(val).subscribe((data: any) => {
      if (data['status_code'] == 100) {
        this.CompanyAddress = JSON.parse(data['message'])[0];
        console.log("this.CompanyAddress.CompanyID",this.CompanyAddress.CompanyID);
        // alert(this.CompanyAddress.CompanyID);
        //
      } else if (data['status_code'] == 200) {
        this.CompanyAddress = null;
      }
    });
  }

  getCopmany() {
    var val: any = {};
    val.CompanyID = localStorage.getItem('CompanyID');

    this.services.getCompanyList(val).subscribe((data: any) => {
      if (data['status_code'] == 100) {
        this.Company = JSON.parse(data['message'])[0];
        //
      } else if (data['status_code'] == 200) {
        this.Company = null;
      }
    });
  }


  hideCityDropdownWithDelay() {
    setTimeout(() => {
      this.showCityDropdown = false;
    }, 200);
  }

  hideStateDropdownWithDelay() {
    setTimeout(() => {
      this.showStateDropdown = false;
    }, 200);
  }

  SaveAndNext() {
    // if (
    //   (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected'))
    //     .value == '1'
    // ) {
      //alert('new address selected');

      // this.pincode = (<HTMLInputElement>(
      //   document.getElementById('pcode')
      // )).value.trim();
      // 
      // this.selectedAddress.formattedAddress = (<HTMLInputElement>(
      //   document.getElementById('areaa')
      // )).value.trim();
      // 
      

      // this.lat = (<HTMLInputElement>(
      //   document.getElementById('latitude')
      // )).value.trim();

      // this.long = (<HTMLInputElement>(
      //   document.getElementById('longitude')
      // )).value.trim();

      // this.state = (<HTMLInputElement>(
      //   document.getElementById('state')
      // )).value.trim();

      // this.towncity = (<HTMLInputElement>(
      //   document.getElementById('tcity')
      // )).value.trim();

      // alert(this.towncity);
      // var cityVal: any = {
      //   CityName: this.towncity,
      // };

      // if (this.flathousebld.trim() == '') {
      //   showWarning('Please enter valid Flat, House no, Building');
      //   return;
      // }
      // 
      // if (!this.lat && !this.long) {
      //   showWarning('Please Select a Location from the Map');
      //   return;
      // }
      

      //alert(this.pincode);
      // if (this.pincode.trim() == '') {
      //   showWarning('Please enter valid pincode');
      //   return;
      // }

      // if (this.towncity.trim() == '') {
      //   showWarning('Please enter valid city');
      //   return;
      // }

      // if (this.state.trim() == '') {
      //   showWarning('Please enter valid state');
      //   return;
      // }
      this.callSaveAndNextAPI();
      // this.services.getCity(cityVal).subscribe((data) => {
      //   
      //   if (data['status_code'] == 100) {
      //     var CityList = JSON.parse(data['message']);

      //     
      //     this.CityID = CityList[0]['CityID'];
      //     this.StateID = CityList[0]['StateID'];
      //     // alert(this.CityID);
      //     // alert(this.StateID);

      //     this.callSaveAndNextAPI();
      //   }
      // });
    // } else {
    //   this.callSaveAndNextAPI();
    //   // showWarning('Please select valid Area, Street, Sector, Village');
    // }
  }

  callSaveAndNextAPI() {
    // if (!this.CityID) {
    //   showWarning("Please select a valid city from the dropdown.");
    //   return;
    // }

    // if (!this.StateID) {
    //   showWarning("Please select a valid state from the dropdown.");
    //   return;
    // }
    
    if (this.isValidate()) {
      var val = {
        UserID: this.UserID,
        Address1: this.flathousebld,
        Address2: this.selectedAddress.formattedAddress,
        // CityID: this.CityID,
        // StateID: this.StateID,
        CountryID: 58,
        // Zip: this.pincode,
        Landmark: this.Landmark,
        Latitude: this.lat,
        Longitude: this.long,
        ModifiedBy: this.UserID,
        CreatedBy: this.UserID,
        IsDefault: 1,
        IsActive: 1,
      };
      console.log("val",val);
      
      this.services.addUserAddresses(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          
          

          
          // alert(JSON.parse(data['message'])[0]['message']);

          this.UserAddressID = JSON.parse(data['message'])[0]['identity'];

          var val: any = {
            UserID: this.UserID,
          };
          
          this.services.getUserAddresses(val).subscribe((data: any) => {
            
              
            if (data['status_code'] == 100) {
              
              
              
              this.ShippingAddress = JSON.parse(data['message']);
              
              

              this.mobilenumber = this.ShippingAddress[0]?.MobileNumber;
              this.emailaddress = this.ShippingAddress[0]?.EmaiID;
              this.fullname =
                this.ShippingAddress[0]?.FirstName +
                ' ' +
                this.ShippingAddress[0]?.MiddleName +
                ' ' +
                this.ShippingAddress[0]?.LastName;

              // this.pincode = this.ShippingAddress[0]?.Zip;
              this.flathousebld = this.ShippingAddress[0]?.Address1;
              this.selectedAddress.formattedAddress =
                this.ShippingAddress[0]?.Address2;
              // this.towncity = this.ShippingAddress[0]?.CityName;
              // this.CityID = this.ShippingAddress[0]?.CityID;
              // this.StateID = this.ShippingAddress[0]?.StateID;
              // this.state = this.ShippingAddress[0]?.StateName;
              this.UserAddressID = this.ShippingAddress[0]?.UserAddressID;
              this.Landmark = this.ShippingAddress[0].Landmark;
              this.lat = this.ShippingAddress[0].Latitude;
              this.long = this.ShippingAddress[0].Longitude;

              this.placeOrder();

              window.scrollTo(0, 0);
              //this.showLoader = true;
            } else if (data['status_code'] == 200) {
              this.UserAddressID = 0;
            }
          });
        }
      });
    }
  }

  isValidate(): boolean {
    let isFormValidate = true;
    this.errorMsg='';
    this.errorMsg1='';
    this.errorMsg2='';
    this.errorMsg4='';
    this.errorMsg5='';

    if (this.fullname.trim().length === 0) {
      this.errorMsg = 'Full Name is required';
      // showWarning('Full name is required');
      isFormValidate = false;
    }
    if (this.emailaddress.trim().length === 0) {
      this.errorMsg1 = 'Email Address is required';
      // showWarning('Email address is required');
      isFormValidate = false;
    }
    if (this.mobilenumber.trim().length === 0) {
      this.errorMsg2 = 'Mobile Number is required';
      // showWarning('Mobile Number is required');
      isFormValidate = false;
    }
    // if (this.pincode.trim().length === 0) {
    //   this.errorMsg3 = 'Pincode is required';
    //   isFormValidate = false;
    // }
    if (this.flathousebld.trim().length === 0) {
      this.errorMsg4 = 'This field is required';
      // showWarning('Please enter valid Flat, House no, Building');
      isFormValidate = false;
    }
    
    if (!this.lat && !this.long) {
      this.errorMsg5 = 'Select Location from the map';
      // showWarning('Please enter this feild');
      
      
      isFormValidate = false;
    }
    
    // if (this.towncity.trim().length === 0) {
    //   this.errorMsg6 = 'Please enter this feild';
    //   isFormValidate = false;
    // }
    // if (this.state.trim().length === 0) {
    //   this.errorMsg7 = 'Please enter this feild';
    //   isFormValidate = false;
    // }
    
    
    return isFormValidate;
  }

  // UpdateAndNext() {
  //   // if (
  //   //   (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected'))
  //   //     .value == '1'
  //   // ) {
  //     //alert('new address selected');

  //     // this.pincode = (<HTMLInputElement>(
  //     //   document.getElementById('pcode')
  //     // )).value.trim();
      
      
  //     // this.selectedAddress.formattedAddress = (<HTMLInputElement>(
  //     //   document.getElementById('areaa')
  //     // )).value.trim();
      
  //     this.lat = (<HTMLInputElement>(
  //       document.getElementById('latitude')
  //     )).value.trim();

  //     this.long = (<HTMLInputElement>(
  //       document.getElementById('longitude')
  //     )).value.trim();

  //     // this.state = (<HTMLInputElement>(
  //     //   document.getElementById('state')
  //     // )).value.trim();

  //     // this.towncity = (<HTMLInputElement>(
  //     //   document.getElementById('tcity')
  //     // )).value.trim();

  //     // alert(this.towncity);
  //     // var cityVal: any = {
  //     //   CityName: this.towncity,
  //     // };

  //     if (this.flathousebld.trim() == '') {
  //       showWarning('Please enter valid Flat, House no, Building');
  //       return;
  //     }

  //     //alert(this.pincode);
  //     // if (this.pincode.trim() == '') {
  //     //   showWarning('Please enter valid pincode');
  //     //   return;
  //     // }

  //     // if (this.towncity.trim() == '') {
  //     //   showWarning('Please enter valid city');
  //     //   return;
  //     // }

  //     // if (this.state.trim() == '') {
  //     //   showWarning('Please enter valid state');
  //     //   return;
  //     // }

  //     // this.services.getCity(cityVal).subscribe((data) => {
  //     //   

  //     //   
  //     //   if (data['status_code'] == 100) {
  //     //     var CityList = JSON.parse(data['message']);

  //     //     
  //     //     this.CityID = CityList[0]['CityID'];
  //     //     this.StateID = CityList[0]['StateID'];
  //     //     //alert(this.CityID);
  //     //     // alert(this.StateID);

  //     //     this.callUpdateAndNextAPI();
  //     //   }
  //     // });
  //     this.callUpdateAndNextAPI();
  //   // } else {
  //   //   if (this.flathousebld.trim() == '') {
  //   //     showWarning('Please enter valid Flat, House no, Building');
  //   //     return;
  //   //   }

  //   //   if (this.selectedAddress.formattedAddress.trim() == '') {
  //   //     showWarning('Please select Area, Street, Sector, Village');
  //   //     return;
  //   //   }

  //   //   if (this.pincode.trim() == '') {
  //   //     showWarning('Please enter valid pincode');
  //   //     return;
  //   //   }

  //   //   if (this.towncity.trim() == '') {
  //   //     showWarning('Please enter valid city');
  //   //     return;
  //   //   }

  //   //   if (this.state.trim() == '') {
  //   //     showWarning('Please enter valid state');
  //   //     return;
  //   //   }

  //   //   // if (
  //   //   //   (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected'))
  //   //   //     .value == '2'
  //   //   // ) {
  //   //   //   showWarning('Please select Area, Street, Sector, Village');
  //   //   //   return;
  //   //   // }
  //   //   this.callUpdateAndNextAPI();
  //   // }
  // }


  UpdateAndNext() {
    let errors: string[] = [];
    console.log("update clicked update next")
  
    if (!this.fullname?.trim()) {
      errors.push('Please enter required field');
    }
  
    if (!this.emailaddress?.trim()) {
      errors.push('Please enter required field');
    }
  
    if (!this.mobilenumber?.trim()) {
      errors.push('Please enter required field');
    }
  
    if (!this.flathousebld?.trim()) {
      errors.push('Please enter required field');
    }
  
    if (!this.selectedAddress?.formattedAddress?.trim()) {
      errors.push('Please enter required field');
    }
  
    this.lat = (<HTMLInputElement>document.getElementById('latitude'))?.value.trim();
    this.long = (<HTMLInputElement>document.getElementById('longitude'))?.value.trim();
  
    if (!this.lat || !this.long) {
      errors.push('Location details are missing');
    }
  
    // Display all error messages at once
    if (errors.length > 0) {
      errors.forEach(error => showError(error));
      return;
    }
  
    this.callUpdateAndNextAPI();
  }
  
  

  callUpdateAndNextAPI() {
    console.log("vijayyyyyyy",this.CompanyAddress.CompanyID);
    
    this.placeOrder();

    window.scrollTo(0, 0);
    // 
    // 
    // if (!this.CityID) {
    //   showWarning("Please select a valid city from the dropdown.");
    //   return;
    // }

    // if (!this.StateID) {
    //   showWarning("Please select a valid state from the dropdown.");
    //   return;
    // }
    // var val: any = {};
    // val.UserAddressID = this.UserAddressID;
    // val.UserID = this.UserID;
    // val.Address1 = this.flathousebld;
    // val.Address2 = this.selectedAddress.formattedAddress;
    // // val.CityID = this.CityID;
    // // val.StateID = this.StateID;
    // val.CountryID = 78;
    // // val.Zip = this.pincode;
    // val.Landmark = this.Landmark;
    // val.Latitude = this.lat;
    // val.Longitude = this.long;
    // val.ModifiedBy = this.UserID;
    
    // console.log(val, "valsss");
    
    
    // this.services.updateUserAddresses(val).subscribe((res) => {
      
      
    //   var res = res.toString();

    //   //this.shiprockertAddAddress();

    //   //mru
 
    //   //this.showLoader = true;
    //   //this.shiprocketServiceability();
    // });
  }

  getUserAddressesshipping() {
    var val: any = {};

    val.UserID = this.UserID;
    this.services.getUserAddresses(val).subscribe((data: any) => {
      // 
      if (data['status_code'] == 100) {
        this.ShippingAddress = JSON.parse(data['message']);

        // 
        this.mobilenumber = this.ShippingAddress[0]?.MobileNumber;
        this.emailaddress = this.ShippingAddress[0]?.EmaiID;

        this.fullname =
          this.ShippingAddress[0]?.FirstName +
          ' ' +
          this.ShippingAddress[0]?.MiddleName +
          ' ' +
          this.ShippingAddress[0]?.LastName;

        // alert(this.fullname);
        this.pincode = this.ShippingAddress[0]?.Zip;
        this.flathousebld = this.ShippingAddress[0]?.Address1;
        this.selectedAddress.formattedAddress =
          this.ShippingAddress[0]?.Address2;
        this.towncity = this.ShippingAddress[0]?.CityName;
        this.CityID = this.ShippingAddress[0]?.CityID;
        this.StateID = this.ShippingAddress[0]?.StateID;
        this.state = this.ShippingAddress[0]?.StateName;
        this.UserAddressID = this.ShippingAddress[0]?.UserAddressID;
        this.Landmark = this.ShippingAddress[0].Landmark;
        this.lat = this.ShippingAddress[0].Latitude;
        this.long = this.ShippingAddress[0].Longitude;
        if(this.lat&&this.long&&this.mapvisible){
          this.loadMap();
        }
      } else if (data['status_code'] == 200) {
        this.UserAddressID = 0;
        if(!this.lat && !this.long){
          this.onDetectCurrent();
          // this.loadMap();
        }
      }
    });
  }

  onCityType() {
    this.CityID = null;
    this.isCitySelected = false;
    showWarning("Plase select a valid city from dropdown.");
    var val: any = {};
    if (val == '') {
      this.isCitySelected = false;
    }
    if (this.towncity?.trim().length !== 0) {
      val.CityName = this.towncity;
    }
    this.services.getCity(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CityList = JSON.parse(data['message']);
      }
    });
  }

  onStatesType() {
    this.StateID = null;
    this.isStateSelected = false;
    showWarning("Plase select a valid state from dropdown.");
    var val: any = {};
    if (val == '') {
      this.isStateSelected = false;
    }
    if (this.state?.trim().length !== 0) {
      val.StateName = this.state;
    }
    this.services.getStates(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.StatesList = JSON.parse(data['message']);
      }
    });
  }

  onSelectcity(CityList: any) {
    this.CityList = [];
    this.isCitySelected = true;
    this.towncity = CityList['CityName'];
    this.CityID = CityList['CityID'];
    // 
  }

  onSelectstate(StatesList: any) {
    this.StatesList = [];
    this.isStateSelected = true;
    this.state = StatesList['StateName'];
    this.StateID = StatesList['StateID'];
  }

  shiprockertAddAddress() {
    let val = {
      pickup_location: 'C-' + this.CompanyAddress.CompanyID,
      name: this.Company['CompanyContactName'],
      email: this.Company['CompanyEmailid'],
      phone: this.Company['CompanyMobileNo1'],
      address: this.CompanyAddress.Address1,
      address_2: this.CompanyAddress.Address2,
      city: this.Company['CityName'],
      state: this.Company['StateName'],
      country: 'India',
      pin_code: this.CompanyAddress.Zip,
      token: this.shiprocketToken,
    };

    // 
    this.services.addShiprocketAddress(val).subscribe(
      (data: any) => {
        // 
        if (data.success) {
          this.pickupId = data.address.pickup_code;
          this.shiprocketCreateOrder();
        } else {
          this.shiprocketCreateOrder();
        }
        // 
      },
      (error) => {
        if ((error.error.status_code = 422)) {
          this.pickupId = 'C-' + this.CompanyAddress.CompanyID;
          this.shiprocketCreateOrder();
        }
      }
    );
  }

  shiprocketCreateOrder() {
    //alert(this.FinalAmount);
    //temp kanha id // 'C-56713';
    // let payment_method = 'Prepaid';

    this.pickupId = 'C-' + this.CompanyAddress.CompanyID;
    let date = this.datePipe.transform(Date(), 'yyyy-MM-dd hh:mm');

    // alert(this.lat);
    // alert(this.long);
    let val = {
      order_id: this.OrderID,
      order_date: date?.toString(),
      pickup_location: this.pickupId,
      billing_customer_name: this.fullname,
      billing_last_name: '',
      billing_address: this.flathousebld,
      billing_address_2: this.selectedAddress.formattedAddress,
      billing_city: this.towncity,
      billing_pincode: this.pincode,
      billing_state: this.state,
      billing_country: 'India',
      billing_email: this.emailaddress,
      billing_phone: this.mobilenumber,
      shipping_is_billing: true,
      shipping_customer_name: '',
      shipping_last_name: '',
      shipping_address: '',
      shipping_address_2: '',
      shipping_city: '',
      shipping_pincode: '',
      shipping_country: '',
      shipping_state: '',
      shipping_email: '',
      shipping_phone: '',
      order_items: this.shiprocketProduct,
      payment_method: this.payment_method,
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: this.FinalAmount.toString(),
      length: 1,
      breadth: 1,
      height: 1,
      weight: 1.5,
      Token: this.shiprocketToken,
      longitude: this.long,
      latitude: this.lat,
    };

    
    

    this.services.addShiprocketOrder(val).subscribe(
      (data: any) => {
        
        
        this.shiprocketOrderId = data.order_id;
        //alert(this.shiprocketOrderId);
        this.shipcorketShipmentId = data.shipment_id;

        var val = {
          OrderStatusID: 2006, //Initiated
          OrderID: this.OrderID,
          OrderShipmentReferenceID: this.shipcorketShipmentId,
        };
        

        this.services.OrderStatusUpdate(val).subscribe((data) => {
          if (data['status_code'] == 100) {
            this.shiprocketServiceability();
          }
        });

        //this.shiprocketServiceability();
      }
      //TEMPORARY COMMENT
      // ,
      // (errr) => {
      //   
      //   
      // }
    );
  }

  shiprocketServiceability() {
    //alert(this.CompanyAddress.Zip.toString());
    //alert(this.pincode.toString());

    // 
    //

    let val = {
      order_id: this.shiprocketOrderId,
      cod: '0',
      weight: '1',
    };

    // 
    //
    this.services
      .checkShiprocketServiceability(val, this.shiprocketToken)
      .subscribe(
        (data: any) => {
          

          

          this.availableCourierCompanies =
            data.data?.available_courier_companies;

          //
          // 

          if (this.availableCourierCompanies != null) {
            this.showAddressDetails = false;
            this.progresswidth = 90;
            this.title = 'Available Courier';
          } else {
            alert('Coruier currently unavailable');
            //showWarning('Coruier currently unavailable');
          }

          this.showLoader = false;
        }
        //TEMPORARY
        // ,
        // (error) => {
        //   //
        // }
      );
  }

  // getDeliveryCharges(val: any) {
  //   this.courier_company_id = val.courier_company_id;
  //   // alert(this.courier_company_id);
  //   this.DeliveryCharges = val.freight_charge;
  //   this.progresswidth = 95;
  // }

  //TEMPORARY FUNCTION
  getDeliveryCharges() {
    this.courier_company_id = 1;
    // alert(this.courier_company_id);
    this.DeliveryCharges = 0;
    this.progresswidth = 95;
  }

  placeOrderClick() {

    // if (this.DeliveryCharges == 0) {
      if (false) {
console.log();

      showWarning('Please select Delivery option');
    } else {
      if (this.payment_method == 'Prepaid') {
        this.mapvisible=false;
        this.getUserAddressesshipping();

        this.paymentId = '';

        this.error = '';
        
        
        let val = {
          Amount: this.FinalAmount,
          Currency: this.currencycode,
          OrderId: this.OrderID,
          NotifyUrl: this.services.notifyUrl,
          RedirectUrl : this.services.redirectUrl + this.OrderID
        };
        
        
        this.services.getPaymentGateway(val).subscribe((data) => {
          if (data['statusCode'] == 200) {
            this.url = data.data.checkoutUrl;
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
            this.paymentload=true;
            this.paymentopen=true;
            openPopup('PaymentModal');

            this.intervals = [15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000];

            setTimeout(() => {              
              if (this.intervals.length != 0) {                
                this.scheduleNextCheck()
              }
            }, 10000);

          }
        });
        
        // this.FinalAmount = this.FinalAmount * 100;
        // 

        // this.options.amount = this.FinalAmount.toString(); //paise

        // // this.options.prefill.name = 'Mayur Utekar';

        // // this.options.prefill.email = 'mayurutekar124@gmail.com';

        // // this.options.prefill.contact = '9820312449';

        // var rzp1 = new Razorpay(this.options);

        // rzp1.open();

        // rzp1.on('payment.failed', function (response: any) {
        //   showError('Payment failed please retry.');

        //   // Todo - store this information in the server
        //   //
        //   //
        //   //
        //   // 
        //   // 
        //   //
        //   // 
        //   //this.error = response.error.reason;
        // });
      } else if (this.payment_method == 'COD') {
        //mru
        // this.placeOrder();
        this.OnOrderComplete();
      }
    }
  }

  onPaymentFailed() { }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    //
    //alert(event.detail.razorpay_payment_id);
    this.OrderPaymentReferenceNumber = event.detail.razorpay_payment_id;
    //mru
    //this.placeOrder();
    this.OnOrderComplete();
  }

  placeOrder() {
    this.message = 'Payment successful & order placed';
    //alert(this.message);
console.log("this.CompanyAddress.CompanyID",this.CompanyAddress.CompanyID);

    let val = {
      UserID: this.UserID,
      CompanyID: this.CompanyAddress.CompanyID,
      OrderStatusID: 2006, //Initiated
      address1: this.flathousebld,
      address2: this.selectedAddress.formattedAddress,
      latitude: this.lat,
      longitude: this.long,
      Landmark: this.Landmark,
      fullname:this.fullname,
      mobilenumber:this.mobilenumber,
      OrderDeliveryTypeID: 1,
      OrderPrice: this.CartTotalamt,
      ShippingPrice: this.DeliveryCharges,
      OrderPaymentReferenceNumber: '', //Update once payment recived
      OrderPaymentSourceID: 1,
    };

    console.log("prakash",val);
    

    

    this.services.insertOrder(val).subscribe((data) => {

      if (data['status_code'] == 100) {
        //alert('order-created');
        // alert(JSON.parse(data['message'])[0]['message']);

        var cartID = localStorage.getItem('CartID');
        this.OrderID = JSON.parse(data['message'])[0]['identity'];
        this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";

        // alert(orderID);
        var val2 = {
          CartID: cartID,
          LanguageID: this.selectedLanguageId
        };

        this.services.getCartProducts(val2).subscribe((data) => {

          if (data['status_code'] == 100) {
            this.productList = JSON.parse(data['message']);
            


            //

            this.productList.forEach((value: any) => {
              // var shiprocketproduct = {
              //   name: value.MasterProductName,
              //   sku: value.MasterProductName,
              //   units: value.Quantity,
              //   selling_price: value.FinalPrice,
              //   discount: '',
              //   tax: '',
              //   hsn: 441122,
              // };

              // this.shiprocketProduct.push(shiprocketproduct);

              var product = {
                OrderID: this.OrderID,
                ProductID: value['CompanyProductID'],
                Quantity: value['Quantity'],
                ProductPrice: value['FinalPrice'],
                DiscountPrice: 0,
              };
              

              this.services.addOrderProduct(product).subscribe((data) => {
                

                if (data['status_code'] == 100) {
                  //alert('inserted');
                }
              }
                //TEMPORARY COMMENT
                // ,
                // (err) => {
                //   
                // }
              );
            });

            // 

            //temproray disable
            //this.shiprockertAddAddress();
            //this.shiprocketCreateOrder();//Not Needed
            this.showAddressDetails = false;
            this.progresswidth = 90;
            this.title = 'Available Courier';
            //this.sendNewOrderSMS();
          }
        });

        //mru
        //localStorage.removeItem('CartID');
        //localStorage.removeItem('rzp_device_id');
        //localStorage.removeItem('CompanyID');
        //localStorage.removeItem('CartTotalamt');
        //this.router.navigate(['/OrderSuccess/' + this.OrderID]);
      }
    });

    //resetCartCount();
  }
  calculateTotal(val: number, val2: number): number {
    var A: number = +val;
    var B: number = +val2;
    this.FinalAmount = A + B;
    return this.FinalAmount;
  }

  sendNewOrderSMS() {
    let CompanyDetails = [];

    let val = {
      CompanyID: this.CompanyAddress.CompanyID,
    };
    this.services.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        CompanyDetails = JSON.parse(data['message']);

        console.log("CompanyDetails",CompanyDetails);
        
        

        //
        //alert(CompanyDetails[0].CompanyMobileNo1);
        //alert(CompanyDetails[0].CompanyName);

        //alert(CompanyDetails[0].CompanyMobileNo1);
        // alert(CompanyDetails[0].CompanyMobileNo1);
        this.services.sendNewOrderSMSToShop(
          //'9820312449',
          CompanyDetails[0].CompanyMobileNo1,
          CompanyDetails[0].CompanyName,
          this.OrderID.toString()
        );

        let whatapp = {
          type: 'buttonTemplate',
          templateId: 'vendor_order_accept',
          templateLanguage: 'en',
          namespace: '95ff4944_d726_464f_8363_64d127c7fea7',
          templateArgs: [
            CompanyDetails[0].CompanyName,
            this.OrderID,
            this.CartTotalamt,
            ' https://www.myareaonline.in/AOL/bo/#/Invoice/' + this.OrderID,
          ],
          sender_phone: '91' + CompanyDetails[0].CompanyMobileNo2,
        };
        

        this.services.sendWhatsappSMS(whatapp).subscribe((data) => {
          
        });

        // alert(this.mobilenumber);

        //alert(this.mobilenumber);
        this.services.sendNewOrderSMSToMember(
          this.mobilenumber,
          //'9820312449',
          CompanyDetails[0].CompanyName,
          this.OrderID.toString()
        );

        let whatappval = {
          type: 'buttonTemplate',
          templateId: 'order_placed_by_cust',
          templateLanguage: 'en',
          namespace: '95ff4944_d726_464f_8363_64d127c7fea7',
          templateArgs: [
            this.fullname,
            this.OrderID,
            CompanyDetails[0].CompanyName,
            CompanyDetails[0].CompanyMobileNo1,
          ],
          sender_phone: '91' + this.mobilenumber,
        };
        this.services.sendWhatsappSMS(whatappval).subscribe((data) => {
          
        });
      }
    });
  }

  changePaymentMethod(valu: string) {
    this.payment_method = valu;
    //alert(this.payment_method);
  }

  OnOrderComplete() {
    var val = {
      OrderStatusID: 2004,
      OrderID: this.OrderID,
      OrderPaymentReferenceNumber: this.OrderPaymentReferenceNumber,
      ShippingPrice: this.DeliveryCharges,
      ShiprocketCourierID: this.courier_company_id,
    };

    this.isOrderComplete = true;
    closePopup('PaymentModal');
    this.services.OrderStatusUpdate(val).subscribe((data) => {

    if (data['status_code'] == 100) {

        //updating shiprocket order price
        //temp kanha id
        this.pickupId = 'C-' + this.CompanyAddress.CompanyID;
        // alert(this.pickupId);
        let date = this.datePipe.transform(Date(), 'yyyy-MM-dd hh:mm');
        this.CartID = localStorage.getItem('CartID');
        this.deleteCartandCartProduct();
        localStorage.removeItem('CartID');
        localStorage.removeItem('rzp_device_id');
        localStorage.removeItem('CompanyID');
        localStorage.removeItem('CartTotalamt');
        this.sendNewOrderSMS();
        // alert("Order Placed Successfully");

        const val2 = {  
          OrderID: this.OrderID,
        }
        // this.services.getOrderList(val2).subscribe((data) => {
        //   console.log("OrderList", data);
        //   this.orderdata = JSON.parse(data['message'])[0];
        //   console.log("Data", this.orderdata);
        
        //   console.log("address:", this.orderdata.Address1 + this.orderdata.Address2 + this.orderdata.CityName + this.orderdata.StateName + this.orderdata.Zip);
        
        //   const address = this.orderdata.Address1 + this.orderdata.Address2;
    
        //   const val = {
        //     Email: this.currentUser.EmaiID,
        //     CustomerName: this.currentUser.FirstName,
        //     OrderID: this.OrderID,
        //     PaymentMethod: this.orderdata.OrderPaymentReferenceNumber,
        //     Currency: this.currency,
        //     OrderAmount: this.orderdata.TotalOrderPrice,
        //     ShippingAddress: address,
        //     OrderDate: this.orderdata.OrderDate,
        //     OrderStatus: this.orderdata.OrderStatusDescription,
        //   };
        
        //   console.log("vals", val);
        
        //   this.services.sendemail(val).subscribe((data) => {
        //     // optionally handle response
        //   });
        
        //   // Navigate only after getting order data and sending email
        //   this.router.navigate(['/OrderSuccess/' + this.OrderID]);
        // });

        this.services.getOrderList(val2).subscribe((data) => {
  console.log("OrderList", data);
  this.orderdata = JSON.parse(data['message'])[0];
  console.log("Data", this.orderdata);

  const address = this.orderdata.Address1 + this.orderdata.Address2;

  // 🔽 New logic: Get user details using UserID
  const userVal = {
    UserID: this.currentUser.UserID
  };

  this.services.getUserList(userVal).subscribe((userData) => {
    const user = JSON.parse(userData['message'])[0]; // Assuming response format matches orderData
    console.log("userinfoemailsent",user);
    

    const emailVal = {
      Email: user.EmaiID, // From fetched user data
      CustomerName: user.FirstName,
      OrderID: this.OrderID,
      PaymentMethod: this.orderdata.OrderPaymentReferenceNumber,
      Currency: this.currency,
      OrderAmount: this.orderdata.TotalOrderPrice,
      ShippingAddress: address,
      OrderDate: this.orderdata.OrderDate,
      OrderStatus: this.orderdata.OrderStatusDescription,
    };

    console.log("vals", emailVal);

    this.services.sendemail(emailVal).subscribe((data) => {
      // Optionally handle response
    });

    this.router.navigate(['/OrderSuccess/' + this.OrderID]);
  });
});

        
//         const address=this.orderdata.Address1+this.orderdata.Address2;
// const val={
//   Email:this.currentUser.EmaiID,
//   CustomerName:this.currentUser.FirstName,
//   OrderID:this.OrderID,
//   PaymentMethod:this.orderdata.OrderPaymentReferenceNumber,
//   Currency: this.currency,
//   OrderAmount:this.orderdata.TotalOrderPrice,
//   ShippingAddress:address,

//   OrderDate:this.orderdata.OrderDate,
//   OrderStatus:this.orderdata.OrderStatusDescription,
// }

// console.log("vals",val);
//         this.services.sendemail(val).subscribe((data) => {
          
//         });

//         this.router.navigate(['/OrderSuccess/' + this.OrderID]);

   
      }
    });

   
    this.services.updateCartCount(0);
  }

  deleteCartandCartProduct() {
    var val: any = {};
    val.CartID = this.CartID;
    this.services.deleteCartProducts(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        console.log('deleted cart products');
        
        this.services.deleteCart(val).subscribe((data) => { 
          console.log('deleted cart');
          
        });
      }
    });
  }

  onAddressType() {
    const value = this.selectedAddress.formattedAddress;
    if (value == '') {
      this.addresses = [];
      this.isAddressSelected = false;
    } else {
      this.services.getAddresses(value).subscribe((addressResponse) => {
        this.addresses = addressResponse;
      });
    }
  }

  onSelectAddress(address: any) {
    this.addresses = [];

    this.eLoc = address.eLoc;
    this.pincode = address.pincode;
    this.selectedAddress = address;
    this.selectedAddress.formattedAddress =
      address.houseName.length == 0 ? '' : address.houseName + ',';

    this.selectedAddress.formattedAddress =
      this.selectedAddress.formattedAddress +
      ' ' +
      (address.subSubLocality.length == 0 ? '' : address.subSubLocality + ',');

    this.selectedAddress.formattedAddress =
      this.selectedAddress.formattedAddress +
      ' ' +
      (address.subLocality.length == 0 ? '' : address.subLocality + ',');
    this.selectedAddress.formattedAddress =
      this.selectedAddress.formattedAddress +
      ' ' +
      (address.locality.length == 0 ? '' : address.locality + ',');

    this.isAddressSelected = true;

    this.services.eLocLatLog(address.eLoc).subscribe((data) => {
      this.lat = data.latitude;
      this.long = data.longitude;

      //alert(this.lat);
      //alert(this.long);
    });
  }

  onAreaKeyup() {
    (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected')).value =
      '2';
  }

  yourCart() {
    this.CartID = localStorage.getItem('CartID');
    this.router.navigateByUrl('/Yourcart/' + this.CartID);
  }

  currencySign() {
    var val: any = {
      IsActive: true,
    };
    this.services.getcurrency(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.countrydata = JSON.parse(data['message']);
        this.currency = this.countrydata[0].Symbol;
        this.currencycode=this.countrydata[0].CurrencyCode;

      }
    });
  }


  private scheduleNextCheck(): void {

    console.log('SSSS')
    if (this.isOrderComplete == false) {
      this.loopflag = 'running';

      var val: any = {
        OrderID: this.OrderID
      }
      this.services.checkBookingStatus(val).subscribe(data => {
        if (data["status_code"] == 100) {
          clearTimeout(this.paymentCheckTimeout);
          let OrderStatusID = JSON.parse(data["message"]);
          if (OrderStatusID == 2007) {

            this.loopflag = 'stopped';
           
            this.OnOrderComplete();
            //hind payment popup
          }         
        }
        else {
          if (this.intervals.length != 0) {
            this.paymentCheckTimeout = setTimeout(() => {
              this.scheduleNextCheck();
            }, this.getNextInterval());
          }
          else {
            this.loopflag = 'stopped';
          }
        }
      }, err => {
        if (this.intervals.length != 0) {
          this.paymentCheckTimeout = setTimeout(() => {
            this.scheduleNextCheck();
          }, this.getNextInterval());
        } else {         
          this.loopflag = 'stopped';
        }
      }
      )
    }
    else {
      clearTimeout(this.paymentCheckTimeout);
    }
  }

  private getNextInterval(): any {

    const nextInterval = this.intervals.shift();

    if (!nextInterval) {
      clearTimeout(this.paymentCheckTimeout);
    }

    return nextInterval;
  }

  handleVisibilityChangeIOS(){
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent)) {
      this.source = 'Android Mobile';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      this.source = 'iOS Mobile';
    } else if (/Windows/i.test(userAgent)) {
      this.source = 'Windows Desktop';
    } else if (/Macintosh/i.test(userAgent)) {
      this.source = 'Mac Desktop';
    } else if (/Linux/i.test(userAgent)) {
      this.source = 'Linux Desktop';
    } else if (/Mobile/i.test(userAgent)) {
      this.source = 'Mobile';
    } else {
      this.source = 'Unknown';
    }

    if (this.source == 'iOS Mobile') {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          // 
          // 
          let visibilitychangeData = localStorage.getItem('visibilitychangeData');
          let parsedData = visibilitychangeData ? JSON.parse(visibilitychangeData) : null;
          // 
          if (parsedData && parsedData.isPaymentStarted) {
            // this.confirmOrderforIOS(true,parsedData.OrderID,parsedData.mobileNo)
            // check flag
            // if not running
            // start loop again

            if (this.loopflag != 'running') {

              this.intervals = [15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000];

              // this.showMainLoading = true;
              // hideCheckoutModal();
              this.OrderID = parsedData.OrderID;
              // this.form.value.mobileNumber = parsedData.mobileNo;
              setTimeout(() => {
                if (this.intervals.length != 0) {
                  this.scheduleNextCheck()
                }
              }, 15000);
            }
          }
        }
      });
    }
  }

  onDetectCurrent() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          // 
          // 
          // localStorage.setItem('latitude', lat.toString());
          // localStorage.setItem('longitude', lng.toString());
          // this.latitude = localStorage.getItem('latitude');
          // this.longitude = localStorage.getItem('longitude');

          this.services.getAddressFromCoordinates(this.lat, this.long).subscribe(
            (response: any) => {
              // this.selectedAddress.formattedAddress = response.formattedAddress;
              // 
              this.selectedAddress.formattedAddress=response.formattedAddress;
              this.searchAddress.formattedAddress=response.formattedAddress;
              // this.addressSelected.emit(this.selectedAddress.formattedAddress);
              this.loadMap();

            }
            // ,

            //   (error) => {
            //     console.error('Error fetching address:', error);
            //   }
          );
        }
        ,
        (error) => {
          console.error('Geolocation error:', error);
        }
        , options
      );
    }
    // else {
    //   console.error('Geolocation is not supported by this browser.');
    // }
  }

  onSearch() {
    if (this.searchAddress.formattedAddress.trim()) {
      this.services.searchLocation(this.searchAddress.formattedAddress).subscribe(
        (response: any) => {
          this.searchResults = response.predictions;
          // 

        });
    } else {
      this.searchResults = [];
    }
  }

  selectAddress(place: any) {
    this.selectedAddress.formattedAddress = place.description;
    this.searchAddress.formattedAddress = place.description;
    // 
    // 
    // this.placeName = place.structured_formatting.main_text;
    // 


    this.services.getlatlong(place.place_id).subscribe(
      (response: any) => {
        this.lat= response.result.geometry.location.lat;
        this.long= response.result.geometry.location.lng;
        // 
        // localStorage.setItem('latitude', lat);
        // localStorage.setItem('longitude', lng);
        // this.latitude = localStorage.getItem('latitude');
        // this.longitude = localStorage.getItem('longitude');
        this.loadMap();
      });



    this.searchResults = [];
  }

  loadMap() {
    if (this.lat && this.long) {
      const latnum = parseFloat(this.lat)
      const lngnum = parseFloat(this.long)
      this.ShowMap = true;
      const map = new google.maps.Map(this.mapContainer.nativeElement, {
        center: { lat: latnum, lng: lngnum },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapId:'d0a4fcac9fbc0a25',
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false
      });

      const markerContent = document.createElement('div');
      // markerContent.innerHTML = `<div>
      //                             .
      //                           </div>`;

      const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: map.getCenter(),
        content: markerContent,
      });

      // const infoWindow = new google.maps.InfoWindow({
      //   content: `<h4>${this.locationName}</h4>`,
      // });

      // advancedMarker.addListener("click", () => {
      //   infoWindow.open({ anchor: advancedMarker, map: map, shouldFocus: false });
      // });

      map.addListener("idle", () => {
        const center = map.getCenter();
  
        // Keep the marker fixed at the center of the map
        advancedMarker.position = center;
  
        // Update local storage and component properties with the new coordinates
        this.lat=center.lat();
        this.long=center.lng();
  
        // Fetch the updated address using the shared service
        this.services.getAddressFromCoordinates(this.lat, this.long).subscribe(
          (response: any) => {
            this.selectedAddress.formattedAddress = response.formattedAddress;
            this.searchAddress.formattedAddress = response.formattedAddress;
            
            this.cdr.detectChanges();
            
          }
          // ,
          // (error) => {
          //   console.error("Error fetching address:", error);
          // }
        );
        
      });

      // marker.addListener("dragend", (event: any) => {
      //   const lat = event.latLng.lat();
      //   const lng = event.latLng.lng();
      //   localStorage.setItem('latitude', lat.toString());
      //   localStorage.setItem('longitude', lng.toString());
      //   this.latitude = localStorage.getItem('latitude');
      //   this.longitude = localStorage.getItem('longitude');
      //   this.sharedService.getAddressFromCoordinates(lat, lng).subscribe(
      //     (response: any) => {
      //       this.selectedAddress.formattedAddress = response.formattedAddress;
      //       
      //       this.addressSelected.emit(this.selectedAddress.formattedAddress);

      //     }
      //     // ,

      //     //   (error) => {
      //     //     console.error('Error fetching address:', error);
      //     //   }
      //   );
      //   
      // });
    }
  }

  closePaymentModal(){
    openPopup('ClosePaymentModal');
  }

  PaymentExit(){
    // this.loopflag='NotStarted';
    closePopup('ClosePaymentModal');
    closePopup('PaymentModal');
    setTimeout(() => {
      this.paymentopen = false;
    }, 300); 
    clearTimeout(this.paymentCheckTimeout);
    this.loopflag = 'NotStarted';
  }

  onPaymentFrameLoad(){
    console.log(this.paymentload);
      this.paymentload=false;
      console.log(this.paymentload);
  }
}
