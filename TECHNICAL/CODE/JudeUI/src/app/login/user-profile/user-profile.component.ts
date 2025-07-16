import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

declare function showSuccess(message: any): any;
declare function showInfo(message: any): any;

declare function showWarning(message: any): any;
declare function showError(message: any): any;
declare var bootstrap: any;
declare var mappls: any; // Global Obejct

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  mapObject: any;
  marker: any;

  towncity = '';
  isCitySelected: any;
  CityList: any;
  CityID: any;
  errorMsg6 = '';

  state = '';
  StatesList: any;
  errorMsg7 = '';
  isStateSelected: any;
  StateID: any;

  flathousebld = '';
  errorMsg4 = '';

  areasectorvillage = '';
  errorMsg5 = '';

  Landmark = '';
  errorMsg3 = '';
  pincode = '';

  daePinCode = '';

  ShippingAddress: any = [];
  User: any = [];
  UserID: any;

  mobilenumber = '';
  emailaddress = '';
  UserAddressID: any;

  firstName = '';
  middleName = '';
  lastName = '';

  errorMsg1 = '';
  errorMsg2 = '';

  Order: any = [];
  OrderID: any;
  OrderDate = '';
  OrderPrice = '';
  OrderStatusDescription = '';
  OrderInvoiceList: any = [];
  // order:any;
  selectedAddress: any = {};
  addresses: any = [];

  orderinvoice: any;
  constructor(private services: SharedService, private router: Router) { }

  CurrentUser: any;
  ModalTitle: any;
  ActivateAddEditorderdetails: boolean = false;
  orderdetails: any;
  CompanyLogoPath: any;
  TotalPrice: any = 0;
  ShippingPrice: any = 0;
  TotalOrderPrice: any = 0;
  Username: any;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  EmaiID: any;
  MobileNumber: any;
  currentUserID: any;
  Address1: any;
  Address2: any;
  CityName: any;
  StateName: any;
  CompanyAddressID: any;
  isAddressSelected: boolean = false;
  eLoc: any;
  lat: any;
  long: any;
  access_token: any;
  isMapMyIndiaSelected: any = 0;
  activeTab: string = 'pills-profile'; // Default active tab
  countrydata: any = [];
  currency: any;
  showCityDropdown = false;
  showStateDropdown = false;
  ngOnInit(): void {
    if (localStorage.getItem('currentUser') != null) {
      this.CurrentUser = localStorage.getItem('currentUser');
      this.CurrentUser = JSON.parse(this.CurrentUser);
      this.UserID = this.CurrentUser.UserID;
      this.getUser();
      this.getUserAddressesshipping();
      this.getOrder();
    
    }

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
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
  closeOffcanvas() {
    const offcanvasElement = document.getElementById('offcanvasAccount');
    if (offcanvasElement) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvasInstance.hide();
    }
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

  onCityType() {
    this.CityID = null;
    this.isCitySelected = false;
    showWarning("Please select a valid city from dropdown.");
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

  onSelectcity(CityList: any) {
    this.CityList = [];
    this.isCitySelected = true;
    this.towncity = CityList['CityName'];
    this.CityID = CityList['CityID'];
    // 
  }

  onStatesType() {
    this.StateID = null;
    this.isStateSelected = false;
    showWarning("Please select a valid state from dropdown.");
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
        console.log("this.StatesList",this.StatesList);
      }
    });
  }

  onSelectstate(StatesList: any) {
    this.StatesList = [];
    this.isStateSelected = true;
    this.state = StatesList['StateName'];
    this.StateID = StatesList['StateID'];
  }
  getOrder() {
    var val: any = {};
    val.UserID = this.UserID;
    this.services.getOrderList(val).subscribe((data: any) => {
      if (data['status_code'] == 100) {
        this.Order = JSON.parse(data['message']);
        this.currencySign();
        
        this.OrderID = this.Order[0]?.OrderID;
        this.OrderPrice = this.Order[0]?.OrderPrice;
        this.OrderDate = this.Order[0]?.OrderDate;
        this.OrderStatusDescription = this.Order[0]?.OrderStatusDescription;
      } else if (data['status_code'] == 200) {
        this.OrderID = 0;
      }
    });
  }
  getOrderInvoiceList(item: any) {
    this.orderdetails = item;
    var val: any = {};
    val.OrderID = this.orderdetails.OrderID;
    this.services.getOrderInvoiceList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderInvoiceList = JSON.parse(data['message']);
        // 
        // this.OrderInvoiceList.forEach( (element: any) => {
        //   this.TotalPrice = element.TotalPrice + this.TotalPrice ;
        // });
      } else if (data['status_code'] == 200) {
        this.OrderID = 0;
      }
    });
  }
  getUserAddressesshipping() {
    var val: any = {};

    val.UserID = this.UserID;
    this.services.getUserAddresses(val).subscribe((data: any) => {
      // 
      // 
      if (data['status_code'] == 100) {
        this.ShippingAddress = JSON.parse(data['message']);
console.log("this.ShippingAddress",this.ShippingAddress);

        // this.firstName = this.ShippingAddress[0]?.FirstName;
        // this.middleName = this.ShippingAddress[0]?.MiddleName;
        // this.lastName = this.ShippingAddress[0]?.LastName;

        // this.mobilenumber = this.ShippingAddress[0]?.MobileNumber;
        // this.emailaddress = this.ShippingAddress[0]?.EmaiID;
        this.pincode = this.ShippingAddress[0]?.Zip;
        this.flathousebld = this.ShippingAddress[0]?.Address1;
        this.selectedAddress.formattedAddress =
          this.ShippingAddress[0]?.Address2;
        this.areasectorvillage = this.ShippingAddress[0]?.Address2;
        this.towncity = this.ShippingAddress[0]?.CityName;
        this.CityID = this.ShippingAddress[0]?.CityID;
        this.StateID = this.ShippingAddress[0]?.StateID;
        this.state = this.ShippingAddress[0]?.StateName;
        this.UserAddressID = this.ShippingAddress[0]?.UserAddressID;
        this.Landmark = this.ShippingAddress[0].Landmark;
        this.lat = this.ShippingAddress[0].Latitude;
        this.long = this.ShippingAddress[0].Longitude;

        // alert(this.lat + ' ' + this.long);
      } else if (data['status_code'] == 200) {
        this.UserAddressID = 0;
      }
    });
  }
  getUser() {
    var val: any = {};

    val.UserID = this.UserID;
    this.services.getUserList(val).subscribe((data: any) => {
      // 
      if (data['status_code'] == 100) {
        this.User = JSON.parse(data['message']);

        //

        this.firstName = this.User[0]?.FirstName;
        this.middleName = this.User[0]?.MiddleName;
        this.lastName = this.User[0]?.LastName;

        this.mobilenumber = this.User[0]?.MobileNumber;
        this.emailaddress = this.User[0]?.EmaiID;
        // this.pincode = this.ShippingAddress[0]?.Zip;
        // this.flathousebld = this.ShippingAddress[0]?.Address1;
        // this.areasectorvillage = this.ShippingAddress[0]?.Address2;
        // this.towncity = this.ShippingAddress[0]?.CityName;
        // this.CityID = this.ShippingAddress[0]?.CityID;
        // this.StateID = this.ShippingAddress[0]?.StateID;
        // this.state = this.ShippingAddress[0]?.StateName;
        // this.UserAddressID = this.ShippingAddress[0]?.UserAddressID;
        // this.Landmark = this.ShippingAddress[0].Landmark;
      } else if (data['status_code'] == 200) {
        this.UserAddressID = 0;
      }
    });
  }
  logOut() {
    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('CartID');
    // localStorage.clear(); // Clears all local storage data

    this.services.updateUserState();
    this.router.navigate(['/']);
    showInfo('You are successfully logged off');
  }
  closeClick() {
    this.ModalTitle = 'Order details';
    this.ActivateAddEditorderdetails = false;
  }
  viewClick(item: any) {
    this.orderinvoice = 0;

    this.ModalTitle = 'Order Details';
    this.ActivateAddEditorderdetails = true;
  }

  invoiceClick(item: any) {
    this.orderinvoice = 1;

    this.ModalTitle = 'Invoice Details';
    this.ActivateAddEditorderdetails = true;
  }
  // updateprofile() {
  //   const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
  //   const mobileRegex = /^[0-9]+$/;

  //   if (!nameRegex.test(this.firstName)) {
  //     showError("First Name should contain only alphabets with a single space between words.");
  //     return;
  //   }
  //   if (this.middleName && !nameRegex.test(this.middleName)) {
  //     showError("Middle Name should contain only alphabets with a single space between words.");
  //     return;
  //   }
  //   if (!nameRegex.test(this.lastName)) {
  //     showError("Last Name should contain only alphabets with a single space between words.");
  //     return;
  //   }
  //   if (!mobileRegex.test(this.mobilenumber)) {
  //     showError("Mobile number should contain only numbers.");
  //     return;
  //   }
  //   var val = {
  //     UserID: this.CurrentUser?.UserID,
  //     username: this.emailaddress,
  //     firstName: this.firstName,
  //     middleName: this.middleName,
  //     lastName: this.lastName,
  //     mobilenumber: this.mobilenumber,
  //     EmaiID: this.emailaddress,
  //     ModifiedBy: this.CurrentUser?.UserID,
  //   };
  //   // 
  //   // alert(this.Username);

  //   this.services.updateUser(val).subscribe((data) => {
  //     if (data['status_code'] == 100) {
  //       showSuccess(JSON.parse(data['message'])[0]['message']);
  //       //  alert('A')
  //       this.UserID = 0;
  //       this.Username = '';
  //       this.FirstName = '';
  //       this.MiddleName = '';
  //       this.LastName = '';
  //       this.EmaiID = '';
  //       this.MobileNumber = '';
  //     } else if (data['status_code'] == 200) {
  //       showError(JSON.parse(data['message'])[0]['message']);
  //     }
  //   });
  // }
  //  allowOnlyAlphabets(event: KeyboardEvent) {
  //   const charCode = event.key.charCodeAt(0);
  //   if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
  //     event.preventDefault();
  //   }
  // }

  updateprofile() {
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const mobileRegex = /^[0-9]+$/;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
    // Trim values to remove unnecessary spaces
    this.firstName = this.firstName?.trim();
    this.middleName = this.middleName?.trim();
    this.lastName = this.lastName?.trim();
    this.mobilenumber = this.mobilenumber?.trim();
    this.emailaddress = this.emailaddress?.trim().toLowerCase(); // Ensure email is lowercase
  
    if (!this.firstName || !nameRegex.test(this.firstName)) {
      showError("First Name should contain only alphabets with a single space between words.");
      return;
    }
    if (this.middleName && !nameRegex.test(this.middleName)) {
      showError("Middle Name should contain only alphabets with a single space between words.");
      return;
    }
    if (!this.lastName || !nameRegex.test(this.lastName)) {
      showError("Last Name should contain only alphabets with a single space between words.");
      return;
    }
    if (!this.mobilenumber || !mobileRegex.test(this.mobilenumber)) {
      showError("Mobile number should contain only numbers.");
      return;
    }
    if (!this.emailaddress || !emailRegex.test(this.emailaddress)) {
      showError("Please enter a valid email address in lowercase.");
      return;
    }
  
    var val = {
      UserID: this.CurrentUser?.UserID,
      username: this.emailaddress,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      mobilenumber: this.mobilenumber,
      EmaiID: this.emailaddress,
      ModifiedBy: this.CurrentUser?.UserID,
    };
  
    this.services.updateUser(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccess(JSON.parse(data['message'])[0]['message']);
        this.UserID = 0;
        this.Username = '';
        this.FirstName = '';
        this.MiddleName = '';
        this.LastName = '';
        this.EmaiID = '';
        this.MobileNumber = '';
      } else if (data['status_code'] == 200) {
        showError(JSON.parse(data['message'])[0]['message']);
      }
    });
  }
  

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
onFocusCityInput() {
  this.showCityDropdown = true;

  // Optional: Load city list if needed
  if (!this.CityList || this.CityList.length === 0) {
    this.onCityType(); // Or load from API if dynamic
  }
}

  hideCityDropdownWithDelay() {
    setTimeout(() => {
      this.showCityDropdown = false;
    }, 200);
  }

  onFocusStateInput() {
    this.showStateDropdown = true;
    if (!this.StatesList || this.StatesList.length === 0) {
      this.onStatesType();
    }
  }
  
  hideStateDropdownWithDelay() {
    setTimeout(() => {
      this.showStateDropdown = false;
    }, 200);
  }

updateaddress() {
  console.log("update clicked");

  const isMapSelectedEl = <HTMLInputElement>document.getElementById('isMapMyIndiaSelected');
  if (!isMapSelectedEl) {
    showWarning('Mapping selection not found.');
    return;
  }

  const isMapSelected = isMapSelectedEl.value == '1';

  // Get inputs with null checks
  const pincodeInput = <HTMLInputElement>document.getElementById('pcode');
  const areaInput = <HTMLInputElement>document.getElementById('areaa');
  const latInput = <HTMLInputElement>document.getElementById('latitude');
  const longInput = <HTMLInputElement>document.getElementById('longitude');

  if (isMapSelected) {
    if (!pincodeInput || !areaInput || !latInput || !longInput) {
      showWarning('Some required fields are missing from the form.');
      return;
    }

    this.pincode = pincodeInput.value.trim();
    this.selectedAddress.formattedAddress = areaInput.value.trim();
    this.lat = latInput.value.trim();
    this.long = longInput.value.trim();

    if (this.flathousebld.trim() === '') {
      showWarning('Please enter valid Flat, House no, Building');
      return;
    }

    if (this.pincode === '') {
      showWarning('Please enter valid pincode');
      return;
    }

    const cityVal: any = { CityName: this.towncity };

    this.services.getCity(cityVal).subscribe((data) => {
      if (data['status_code'] == 100) {
        var CityList = JSON.parse(data['message']);
        this.CityID = CityList[0]['CityID'];
        this.StateID = CityList[0]['StateID'];
        this.callUpdateAPI();
      }
    });

  } else {
    // Non-map fallback
    if (this.flathousebld.trim() === '') {
      showWarning('Please enter valid Flat, House no, Building');
      return;
    }

    if (!this.selectedAddress || !this.selectedAddress.formattedAddress || this.selectedAddress.formattedAddress.trim() === '') {
      showWarning('Please select Area, Street, Sector, Village');
      return;
    }

    if (!this.pincode || this.pincode.trim() === '') {
      showWarning('Please enter valid pincode');
      return;
    }

    this.callUpdateAPI();
  }
}


  callUpdateAPI() {
    // if (!this.CityID) {
    //   showWarning("Please select a valid city from the dropdown.");
    //   return;
    // }

    // if (!this.StateID) {
    //   showWarning("Please select a valid state from the dropdown.");
    //   return;
    // }
    console.log("update clicked calllapi")
    var val = {
      UserID: this.CurrentUser?.UserID,

      Address1: this.flathousebld,
      Address2: this.selectedAddress.formattedAddress,
      Zip: this.pincode,
      //CityName: this.towncity,
      // CityID: this.CityID,
      // StateID: this.StateID,
     //StateName: this.StateName,
      UserAddressID: this.UserAddressID,
      Landmark: this.Landmark,
      Latitude: this.lat,
      Longitude: this.long,
      ModifiedBy: this.CurrentUser?.UserID,
      CountryID: 58,
    };
    
console.log("val",val);

    this.services.updateuseraddress(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.getUserAddressesshipping();
        showSuccess(JSON.parse(data['message'])[0]['message']);
        //  alert('A')
        this.Address1 = '';
        this.Address2 = '';
        //this.CityName = '';
        // this.CityID = '';
        // this.StateID = '';
        //this.StateName = '';
        this.UserAddressID = '';
        this.Landmark = '';
        (<HTMLInputElement>(
          document.getElementById('isMapMyIndiaSelected')
        )).value = '0';
      } else if (data['status_code'] == 200) {
        showError(JSON.parse(data['message'])[0]['message']);
      }
    });
  }

  addUserAddress() {
    if (
      (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected'))
        .value == '1'
    ) {
      //alert('new address selected');

      this.pincode = (<HTMLInputElement>(
        document.getElementById('pcode')
      )).value.trim();

      this.selectedAddress.formattedAddress = (<HTMLInputElement>(
        document.getElementById('areaa')
      )).value.trim();

      this.lat = (<HTMLInputElement>(
        document.getElementById('latitude')
      )).value.trim();

      this.long = (<HTMLInputElement>(
        document.getElementById('longitude')
      )).value.trim();

      this.state = (<HTMLInputElement>(
        document.getElementById('state')
      )).value.trim();

      this.towncity = (<HTMLInputElement>(
        document.getElementById('tcity')
      )).value.trim();

      // alert(this.towncity);
      var cityVal: any = {
        CityName: this.towncity,
      };

      if (this.flathousebld.trim() == '') {
        showWarning('Please enter valid Flat, House no, Building');
        return;
      }

      //alert(this.pincode);
      if (this.pincode.trim() == '') {
        showWarning('Please enter valid pincode');
        return;
      }

      // if (this.towncity.trim() == '') {
      //   showWarning('Please enter valid city');
      //   return;
      // }

      // if (this.state.trim() == '') {
      //   showWarning('Please enter valid state');
      //   return;
      // }

      this.services.getCity(cityVal).subscribe((data) => {
        
        if (data['status_code'] == 100) {
          var CityList = JSON.parse(data['message']);

          
          this.CityID = CityList[0]['CityID'];
          this.StateID = CityList[0]['StateID'];
          // alert(this.CityID);
          // alert(this.StateID);

          this.callAddAPI();
        }
      });
    }
    else {
      this.callAddAPI();
      showWarning('Please select valid Area, Street, Sector, Village');
    }
  }

  callAddAPI() {
    // if (!this.CityID) {
    //   showWarning("Please select a valid city from the dropdown.");
    //   return;
    // }

    // if (!this.StateID) {
    //   showWarning("Please select a valid state from the dropdown.");
    //   return;
    // }
    var val = {
      UserID: this.CurrentUser?.UserID,
      Address1: this.flathousebld,
      Address2: this.selectedAddress.formattedAddress,
      // CityID: this.CityID,
      // StateID: this.StateID,
      CountryID: 58,
      Zip: this.pincode,
      Landmark: this.Landmark,
      Latitude: this.lat,
      Longitude: this.long,
      CreatedBy: this.CurrentUser?.UserID,
      IsActive: 1,
      IsDefault: 1,
    };
    this.services.addUserAddress(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.getUserAddressesshipping();
        (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected'))
          .value == '0';
        showSuccess(JSON.parse(data['message'])[0]['message']);
      } else if (data['status_code'] == 300) {
        showError(JSON.parse(data['message'])[0]['message']);
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
        // alert(addressResponse);
        this.addresses = addressResponse;
        console.log("vijay", this.addresses );
        
      });
    }
  }

  cancelOrder(item: any) {
    var val = { OrderStatusID: 4, OrderID: item.OrderID };

    this.services.OrderStatusUpdate(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccess(JSON.parse(data['message'])[0]['message']);
        this.services.sendCancelSMS(
          item.MobileNumber + ',' + item.CompanyMobileNo1,
          //'9820312449',
          item.TotalOrderPrice,
          item.OrderID
        );

        this.getOrder();
        let whatappval = {
          type: 'template',
          templateId: 'order_cancel_alert',
          templateLanguage: 'en',
          namespace: '95ff4944_d726_464f_8363_64d127c7fea7',
          templateArgs: [item.OrderID, item.TotalOrderPrice],
          sender_phone: '91' + item.MobileNumber,
        };
        //
        this.services.sendWhatsappSMS(whatappval).subscribe((data) => {
          //
        });

        let whatappvall = {
          type: 'template',
          templateId: 'order_cancel_alert',
          templateLanguage: 'en',
          namespace: '95ff4944_d726_464f_8363_64d127c7fea7',
          templateArgs: [item.OrderID, item.TotalOrderPrice],
          sender_phone: '91' + item.CompanyMobileNo2,
        };
        //
        this.services.sendWhatsappSMS(whatappvall).subscribe((data) => {
          //
        });
      }
    });
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

  currencySign() {
    var val: any = {
      IsActive: true,
    };
    this.services.getcurrency(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.countrydata = JSON.parse(data['message']);
        this.currency = this.countrydata[0].Symbol;

      }
    });
  }

  pageSize: number = 5;
currentPage: number = 1;

get filteredOrders() {
  return this.Order.filter((item: { OrderStatusID: number; }) => item.OrderStatusID != 2006);
}

get paginatedOrders() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  return this.filteredOrders.slice(startIndex, startIndex + this.pageSize);
}

get totalPages() {
  return Math.ceil(this.filteredOrders.length / this.pageSize);
}

}
