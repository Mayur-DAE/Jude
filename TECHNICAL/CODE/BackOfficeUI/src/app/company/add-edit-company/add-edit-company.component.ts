import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';

declare function showSuccessToast(msg: any): any;
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;
declare function showInfoToast(id: any): any;
declare function excelExport(id: any, name: string): any;
declare var google: any;
import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var mappls: any; // Global Obejct

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.css'],
})
export class AddEditCompanyComponent implements OnInit {
    bankDetailsForm!: FormGroup;
    currentTab: string = 'home';
  
  AB: any = false;
  CD: any = false;
  BusinessType_errormsg = '';
  SourceName_errormsg = '';
  MembershipType_errormsg = '';
  CompanyMemberShipExpiryDate_errormsg = '';
  BusinessCategory_errormsg = '';
  BusinessSubCategory_errormsg = '';
  Company_errormsg = '';
  Companydescription_errormsg = '';
  CompanyEmail_errormsg = '';
  Companycontactname_errormsg = '';
  CompanyMobileNo1_errormsg = '';
  CompanyMobileNo2_errormsg: string = "";
  currentUser: any;
  currentUserID: any;
  ProductsList: any = [];
  eLoc: any = '';
  TotalSettlementprice: any;

  settlementList: any = [] = [];

  membershipinvoiceList: any = [] = [];
  ModalTitle: any;
  Invoicedata: any;

  errormsg = false;

  activeLanguages: any = [];

  @Output() emitData = new EventEmitter<boolean>();

  constructor(
    public service: SharedService,
    private_http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
     private fb: FormBuilder
  ) { }
  Activategenerateinvoice: boolean = false;
  @Input() company: any;

  CompanyID: any;
  BusinessTypeID: any;
  // BusinessCategoryID: any;
  // BusinessSubCategoryID: any;
  CompanyCancelledChequePath: any;
  CompanyCancelledChequeNamePath: any;
  CompanySourceID: any;
  CompanyMemberShipTypeID: any;
  CompanyMemberShipExpiryDate: any;
  CompanyName: any;
  CompanyDescription: any;
  CompanyContactName: any;
  CompanyEmailid: any;
  CompanyMobileNo1: any;
  CompanyMobileNo2: any = '';
  // CompanyGSTNumber: any = '';
  // CompanyPANNumber: any = '';
  // CompanyMSMENumber: any = '';
  // CompanyPanCardImagePath: any;
  // CompanyPanCardImageNamePath: any;
  // CompanyGSTImageNamePath: any;
  // CompanyGSTImagePath: any;
  // CompanyMSMEImagePath: any;
  // CompanyMSMEImageNamePath: any;
  CompanyLogoPath: any;
  CompanyLogoImageNamePath: any;
  // CompanyBannerPath: any;
  // CompanyBannerImageNamePath: any;
  CompanyJoiningDate: any;
  WebsiteURL: any = '';
  FacbookID: any = '';
  Twitter: any = '';
  Linkedin: any = '';
  Instagram: any = '';
  WordPress: any = '';
  Pintrest: any = '';
  YouTube: any = '';
  CompanyTimeMonday: any = '';
  CompanyTimeTuesday: any = '';
  CompanyTimeWednesday: any = '';
  CompanyTimeThursday: any = '';
  CompanyTimeFriday: any = '';
  CompanyTimeSaturday: any = '';
  CompanyTimeSunday: any = '';
  IsActive: any;
  CreatedBy: any;
  ModifiedBy: any;
  BusinessTypeList: any;
  BusinessTypeName: any;
  CompanySourceList: any;
  CompanySource: any;
  CompanymembershipnameList: any;
  CompanyMemberShipName: any;
  Monday1: any;
  Monday2: any ="";
  Tuesday1: any;
  Tuesday2: any ="";
  Wednesday1: any;
  Wednesday2: any ="";
  Thursday1: any;
  Thursday2: any ="";
  Friday1: any;
  Friday2: any ="";
  Saturday1: any;
  Saturday2: any ="";
  Sunday1: any;
  Sunday2: any ="";
  //address
  CompanyAddressID: any;
  Address1: any = '';
  Address2: any = '';
  CityID: any;
  StateID: any;
  Zip: any;
  Landmark: any = '';
  Latitude: any = 0.0;
  Longitude: any = 0.0;
  CityList: any;
  StateList: any;
  CityName: any;
  StateName: any;
  IsDefault: any;
  companyaddressList: any = [];
  //bankdetails
  Bank: any = '';
  UPIID: any = '';
  BankName: any = '';
  BankBranchName: any = '';
  AccountHolderName: any = '';
  AccountNumber: any = '';
  IFSC: any = '';
  BankDetailsList: any;
  CompanyBankDetailsID: any;
  //product details
  ProductCategoryShortName: any;
  ProductSubCategoryShortName: any;
  TaxSlabName: any;
  ProductName: any;
  ProductDescription: any;
  ProductPrice: any;
  ProductList: any;
  ProductCategoryID: any;
  ProductSubCategoryID: any;
  IsPublished: any;
  IsApproved: any;
  UserRoleID: any;
  ProductImageThumbnailPath: any;

  fileToUpload: File | null = null;

  selectedAddress: any = {};
  addresses: any = [];
  isAddressSelected: boolean = false;
  CompanyMembershipInvoiceID: any;

  mapObject: any;
  marker: any;
  access_token: any;
  isMapMyIndiaSelected: any = 0;
  lat: any;
  long: any;

  formSubmitted: boolean = false;
  countrydata: any = [];
  currency: any;
  minDate: string = new Date().toISOString().split('T')[0]; 

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  ShowMap: boolean = false;
  mapvisible: boolean = false;
  searchAddress: any = {};
  searchResults: any[] = [];

  ngOnInit(): void {
     this.bankDetailsForm = this.fb.group({
    
      UPIID: ['', Validators.required],
      BankName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]], // Only alphabets and spaces
      BankBranchName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]], // Only alphabets and spaces
      AccountHolderName: ['', [Validators.required,Validators.pattern(/^[A-Za-z ]+$/)]],
      AccountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]], // Only numbers
      IFSC: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]] // Alphabets and numbers
     });

    // this.service.generateToken();
    this.ProductImageThumbnailPath = this.service.PhotoUrl;
    this.loadBusinessList();
    this.loadCompanySourceList();
    this.loadCompanyMemberShipNameList();
    this.loadCityListList();
    this.loadStateList();
    this.CompanyID = this.company.CompanyID;
    //Get Product
    this.refreshProductsList();
    //Get Address
    this.refreshCompanyAddresssList();
    //Get Bankdetails
    this.refreshBankDetailsList();

    this.refreshMembershipInvoiceList();
    this.getLanguage();
    this.currencySign();

    this.currentUser = localStorage.getItem('BoUser');

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.UserID;
      this.UserRoleID = this.currentUser.UserRoleID;
    }

    this.BusinessTypeID = this.company.BusinessTypeID;
    // this.BusinessCategoryID = this.company.BusinessCategoryID;
    // this.BusinessSubCategoryID = this.company.BusinessSubCategoryID
    this.CompanySourceID = this.company.CompanySourceID;
    this.CompanyMemberShipTypeID = this.company.CompanyMemberShipTypeID;
    this.CompanyMemberShipExpiryDate = this.company.CompanyMemberShipExpiryDate;
    this.CompanyName = this.company.CompanyName;
    this.CompanyDescription = this.company.CompanyDescription;
    this.CompanyContactName = this.company.CompanyContactName;
    this.CompanyEmailid = this.company.CompanyEmailid;
    this.CompanyMobileNo1 = this.company.CompanyMobileNo1;
    this.CompanyMobileNo2 = this.company.CompanyMobileNo2;
    // this.CompanyGSTNumber = this.company.CompanyGSTNumber;
    // this.CompanyPANNumber = this.company.CompanyPANNumber;
    // this.CompanyMSMENumber = this.company.CompanyMSMENumber;
    // this.CompanyPanCardImagePath = this.company.CompanyPanCardImagePath;
    // this.CompanyPanCardImageNamePath = this.company.CompanyPanCardImageNamePath;
    // this.CompanyPanCardImageNamePath =
    //   this.service.PhotoUrl + this.company.CompanyPanCardImagePath;
    // this.CompanyGSTImagePath = this.company.CompanyGSTImagePath;
    // this.CompanyGSTImageNamePath = this.company.CompanyGSTImageNamePath;
    // this.CompanyGSTImageNamePath =
    //   this.service.PhotoUrl + this.company.CompanyGSTImagePath;
    // this.CompanyMSMEImagePath = this.company.CompanyMSMEImagePath;
    // this.CompanyMSMEImageNamePath = this.company.CompanyMSMEImageNamePath;
    // this.CompanyMSMEImageNamePath =
    //   this.service.PhotoUrl + this.company.CompanyMSMEImagePath;
    this.CompanyLogoPath = this.company.CompanyLogoPath;
    this.CompanyLogoImageNamePath = this.company.CompanyLogoImageNamePath;
    this.CompanyLogoImageNamePath =
      this.service.PhotoUrl + 'listing/' + this.company.CompanyLogoPath;
    // this.CompanyBannerPath = this.company.CompanyBannerPath;
    // this.CompanyBannerImageNamePath = this.company.CompanyBannerImageNamePath;
    // this.CompanyBannerImageNamePath =
    //   this.service.PhotoUrl + 'cover_img/' + this.company.CompanyBannerPath;
    this.CompanyCancelledChequePath = this.company.CompanyCancelledChequePath;
    this.CompanyCancelledChequeNamePath =
      this.company.CompanyCancelledChequeNamePath;
    this.CompanyCancelledChequeNamePath =
      this.service.PhotoUrl + this.company.CompanyCancelledChequePath;
    this.CompanyJoiningDate = this.company.CompanyJoiningDate;
    this.WebsiteURL = this.company.WebsiteURL;
    this.FacbookID = this.company.FacbookID;
    this.Twitter = this.company.Twitter;
    this.Linkedin = this.company.Linkedin;
    this.Instagram = this.company.Instagram;
    this.WordPress = this.company.WordPress;
    this.Pintrest = this.company.Pintrest;
    this.YouTube = this.company.YouTube;
    this.IsActive = this.company.IsActive;
    this.CompanyTimeMonday = this.company.CompanyTimeMonday.split(' - ');
    this.Monday1 = this.CompanyTimeMonday[0];
    this.Monday2 = this.CompanyTimeMonday[1] ?? "";

    this.CompanyTimeTuesday = this.company.CompanyTimeTuesday.split(' - ');
    this.Tuesday1 = this.CompanyTimeTuesday[0];
    this.Tuesday2 = this.CompanyTimeTuesday[1] ?? "";

    this.CompanyTimeWednesday = this.company.CompanyTimeWednesday.split(' - ');
    this.Wednesday1 = this.CompanyTimeWednesday[0];
    this.Wednesday2 = this.CompanyTimeWednesday[1] ?? "";

    this.CompanyTimeThursday = this.company.CompanyTimeThursday.split(' - ');
    this.Thursday1 = this.CompanyTimeThursday[0];
    this.Thursday2 = this.CompanyTimeThursday[1] ?? "";

    this.CompanyTimeFriday = this.company.CompanyTimeFriday.split(' - ');
    this.Friday1 = this.CompanyTimeFriday[0];
    this.Friday2 = this.CompanyTimeFriday[1] ?? "";

    this.CompanyTimeSaturday = this.company.CompanyTimeSaturday.split(' - ');
    this.Saturday1 = this.CompanyTimeSaturday[0];
    this.Saturday2 = this.CompanyTimeSaturday[1] ?? "";

    this.CompanyTimeSunday = this.company.CompanyTimeSunday.split(' - ');
    this.Sunday1 = this.CompanyTimeSunday[0];
    this.Sunday2 = this.CompanyTimeSunday[1] ?? "";

    // this.CreatedBy = this.company.CreatedBy
    // this.ModifiedBy = this.company.ModifiedBy

    this.service.getToken().subscribe((data: any) => {
      console.log(data);
      this.access_token = data.access_token;

      //Return Callback when map is completely loaded
      // if not using callback then you have to use settimeout

      this.initialize(this.access_token, () => {
        //Try to do everything related to map inside this or call external function inside of this

        // this.mapObject = mappls.Map('map', {
        //   center: [28.61, 77.23],
        //   zoomControl: true,
        //   location: true,
        // });

        this.placeSearch();
      });
    });
  }


  getLanguage() {
    this.service.getLanguage(null).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.activeLanguages = JSON.parse(data['message']);
        this.getCompanyLanguage();
      } else {
        showSuccessToast('Some error occured');
      }
    });
  }


  getCompanyLanguage() {
    if (this.CompanyID != 0) {
      this.service.getCompanyLanguage({ "CompanyID": this.CompanyID }).subscribe((data) => {
        if (data['status_code'] == 100) {
          var companyLanguage = JSON.parse(data['message']);

          this.activeLanguages.forEach((lang: any) => {
            const categoryLang = companyLanguage.find(
              (catLang: any) => catLang.LanguageID === lang.LanguageId
            );
            if (categoryLang) {
              lang.Name = categoryLang.CompanyName;
              lang.Description = categoryLang.CompanyDescription;
            }
          });
        }
      })
    }

  }

  isFieldInvalid(value: string): boolean {
    return this.formSubmitted && !value?.trim();
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
      } else console.log('Please! pass a token inside initialize()');
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

    // let state = myArray[myArray.length - 2];
    // (<HTMLInputElement>document.getElementById('state')).value = state;

    // let city = myArray[myArray.length - 3];
    // (<HTMLInputElement>document.getElementById('tcity')).value = city;
  }

  onAddressType() {
    const value = this.selectedAddress.formattedAddress;
    if (value == '') {
      this.addresses = [];
      this.isAddressSelected = false;
    } else {
      this.service.getAddresses(value).subscribe((addressResponse) => {
        this.addresses = addressResponse;
        this.CityID = 78;
      });
    }
  }

  onSelectAddress(address: any) {
    this.addresses = [];

    this.eLoc = address.eLoc;
    this.Zip = address.pincode;
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

    this.service.eLocLatLog(address.eLoc).subscribe((data) => {
      this.Latitude = data.latitude;
      this.Longitude = data.longitude;
    });
  }

  //Dropdown Bussiness list
  loadBusinessList() {
    let val = { IsActive: 1 };
    this.service.GetComplist(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.BusinessTypeList = JSON.parse(data['message']);
        this.BusinessTypeName = this.company.BusinessTypeID;
      }
    });
  }

  //Dropdown Source List
  loadCompanySourceList() {
    let val = { IsActive: 1 };
    this.service.GetCompanySource(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanySourceList = JSON.parse(data['message']);
        this.CompanySource = this.company.CompanySourceID;
      }
    });
  }
  //Dropdown Membership List
  loadCompanyMemberShipNameList() {
    let val = { IsActive: 1 };
    this.service.GetCompanyMemberShip(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanymembershipnameList = JSON.parse(data['message']);
        this.CompanyMemberShipName = this.company.CompanyMemberShipTypeID;
      }
    });
  }

  //Adding Company
  addCompany(shouldNavigate: boolean = false) {
    // this.BusinessCategory_errormsg = "";
    // if (this.BusinessCategoryID.trim().length === 0) {
    //   this.BusinessCategory_errormsg = "please enter business category name";
    //   this.errormsg = true;
    // }

    // this.BusinessSubCategory_errormsg = "";
    // if (this.BusinessSubCategoryID.trim().length === 0) {
    //   this.BusinessSubCategory_errormsg = "please enter business Sub category name";
    //   this.errormsg = true;
    // }
    this.BusinessType_errormsg = '';
    if (this.BusinessTypeID.trim().length === 0) {
      this.BusinessType_errormsg = 'Please select businesstype';
      this.errormsg = true;
    }
    this.SourceName_errormsg = '';
    if (this.CompanySourceID.trim().length === 0) {
      this.SourceName_errormsg = 'Please select source name';
      this.errormsg = true;
    }
    this.MembershipType_errormsg = '';
    if (this.CompanyMemberShipTypeID.trim().length === 0) {
      this.MembershipType_errormsg = 'Please select membership type';
      this.errormsg = true;
    }
    this.CompanyMemberShipExpiryDate_errormsg = '';
    if (this.CompanyMemberShipExpiryDate.trim().length === 0) {
      this.CompanyMemberShipExpiryDate_errormsg = 'Please select expiry date';
      this.errormsg = true;
    }
    this.Company_errormsg = '';
    if (this.CompanyName.trim().length === 0) {
      this.Company_errormsg = 'Please enter shop name';
      this.errormsg = true;
    }
    // this.Companydescription_errormsg = '';
    // if (this.CompanyDescription.trim().length === 0) {
    //   this.Companydescription_errormsg =
    //     '*Please enter business Sub category name';
    //   this.errormsg = true;
    // }

    this.Companycontactname_errormsg = '';
    if (this.CompanyContactName.trim().length === 0) {
      this.Companycontactname_errormsg = 'Please enter contact name';
      this.errormsg = true;
    }
    this.CompanyEmail_errormsg = '';
    if (this.CompanyEmailid.trim().length === 0) {
      this.CompanyEmail_errormsg = 'Please enter email';
      this.errormsg = true;
    }
    this.CompanyMobileNo1_errormsg = ''; 
    if (this.CompanyMobileNo1.trim().length === 0) {
      this.CompanyMobileNo1_errormsg = 'Please enter mobile no.';
      this.errormsg = true;
    }

    this.formSubmitted = true;

    // Check if form is valid
    const isValid = this.activeLanguages.every(
      (lang: any) => lang.Name?.trim() && lang.Description?.trim()
    );

    if (!isValid) {
      return;
    }

    if (isValid) {
      this.errormsg = false;
      if (this.errormsg == false) {
        var val = {
          CompanyID: this.CompanyID,
          BusinessTypeID: this.BusinessTypeID,
          BusinessTypeName: this.BusinessTypeID,
          // BusinessCategoryID: this.BusinessCategoryID,
          // BusinessSubCategoryID: this.BusinessSubCategoryID,
          CompanySourceID: this.CompanySourceID,
          CompanySource: this.CompanySourceID,
          CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
          CompanyMemberShipName: this.CompanyMemberShipTypeID,
          CompanyMemberShipExpiryDate: this.CompanyMemberShipExpiryDate,
          CompanyName: this.CompanyName,
          CompanyDescription: this.CompanyDescription || '', // Allow empty description,
          CompanyContactName: this.CompanyContactName,
          CompanyEmailid: this.CompanyEmailid,
          CompanyMobileNo1: this.CompanyMobileNo1,
          CompanyMobileNo2: this.CompanyMobileNo2,
          // CompanyGSTNumber: this.CompanyGSTNumber,
          // CompanyPANNumber: this.CompanyPANNumber,
          // CompanyMSMENumber: this.CompanyMSMENumber,
          // CompanyPanCardImagePath: this.CompanyPanCardImagePath,
          // CompanyGSTImagePath: this.CompanyGSTImagePath,
          // CompanyMSMEImagePath: this.CompanyMSMEImagePath,
          CompanyLogoPath: this.CompanyLogoPath,
          // CompanyBannerPath: this.CompanyBannerPath,
          CompanyCancelledChequePath: this.CompanyCancelledChequePath,
          CompanyJoiningDate: this.CompanyJoiningDate,
          WebsiteURL: this.WebsiteURL,
          FacbookID: this.FacbookID,
          Twitter: this.Twitter,
          Linkedin: this.Linkedin,
          Instagram: this.Instagram,
          WordPress: this.WordPress,
          Pintrest: this.Pintrest,
          YouTube: this.YouTube,
          // CompanyTimeMonday: this.Monday1 ? this.Monday1 : '' + ' - ' + this.Monday2 ? this.Monday2 : '',
          // CompanyTimeTuesday: this.Tuesday1 ? this.Tuesday1 : '' + ' - ' + this.Tuesday2 ? this.Tuesday2 : '',
          // CompanyTimeWednesday: this.Wednesday1 ? this.Wednesday1 : '' + ' - ' + this.Wednesday2 ? this.Wednesday2 : '',
          // CompanyTimeThursday: this.Thursday1 ? this.Thursday1 : '' + ' - ' + this.Thursday2 ? this.Thursday2 : '',
          // CompanyTimeFriday: this.Friday1 ? this.Friday1 : '' + ' - ' + this.Friday2 ? this.Friday2 : '',
          // CompanyTimeSaturday: this.Saturday1 ? this.Saturday1 : '' + ' - ' + this.Saturday2 ? this.Saturday2 : '',
          // CompanyTimeSunday: this.Sunday1 ? this.Sunday1 : '' + ' - ' + this.Sunday2 ? this.Sunday2 : '',


          
         CompanyTimeMonday: this.Monday1 && this.Monday2 ? this.Monday1 + ' - ' + this.Monday2 : '',
         CompanyTimeTuesday: this.Tuesday1 && this.Tuesday2 ? this.Tuesday1 + ' - ' + this.Tuesday2 : '',
         CompanyTimeWednesday: this.Wednesday1 && this.Wednesday2 ? this.Wednesday1 + ' - ' + this.Wednesday2 : '',
         CompanyTimeThursday: this.Thursday1 && this.Thursday2 ? this.Thursday1 + ' - ' + this.Thursday2 : '',
         CompanyTimeFriday: this.Friday1 && this.Friday2 ? this.Friday1 + ' - ' + this.Friday2 : '',
         CompanyTimeSaturday: this.Saturday1 && this.Saturday2 ? this.Saturday1 + ' - ' + this.Saturday2 : '',
         CompanyTimeSunday: this.Sunday1 && this.Sunday2 ? this.Sunday1 + ' - ' + this.Sunday2 : '',

          IsActive: this.IsActive,
          CreatedBy: this.currentUserID,
        };

        this.service.AddCompanyList(val).subscribe((data) => {
          if (data['status_code'] == 100) {
            this.CompanyID = JSON.parse(data['message'])[0]['identity'];
            // closePopup('exampleModal');
            // this.emitData.emit(false);
            // alert(this.CompanyID);

            const payload = {
              CaptionDetails: this.activeLanguages,
              CompanyID: this.CompanyID// Captured Name & Description
            };


            this.service.addCompanyLanguage(payload).subscribe((data_language) => {

              if (data_language['status_code'] == 100) {
                showSuccessToast(JSON.parse(data_language['message']));
              }
              else {
                showSuccessToast('Some error occured, data not saved');
              }

            })



            // showSuccessToast(JSON.parse(data['message'])[0]['message']);
          } else if (data['status_code'] == 300) {
            showDangerToast(JSON.parse(data['message'])[0]['message']);
          } else {
            showDangerToast('Some error occured, data not saved');
          }
        });
      }
    }
    if (shouldNavigate) {
      const profileTab = document.getElementById('pills-profile-tab');
      if (profileTab) {
        profileTab.click();
        this.currentTab = 'profile';
      }
    }
  }
  updateCompany() {

    this.formSubmitted = true;

    // Check if form is valid
    const isValid = this.activeLanguages.every(
      (lang: any) => lang.Name?.trim() && lang.Description?.trim()
    );


    this.BusinessType_errormsg = '';
    if (this.BusinessTypeID.toString().length === 0) {
      this.BusinessType_errormsg = 'Please select businesstype';
      this.errormsg = true;
    }
    this.SourceName_errormsg = '';
    if (this.CompanySourceID.toString().length === 0) {
      this.SourceName_errormsg = 'Please select source name';
      this.errormsg = true;
    }
    this.MembershipType_errormsg = '';
    if (this.CompanyMemberShipTypeID.toString().length === 0) {
      this.MembershipType_errormsg = 'Please select membership type';
      this.errormsg = true;
    }
    this.CompanyMemberShipExpiryDate_errormsg = '';
    if (this.CompanyMemberShipExpiryDate == null) {
      this.CompanyMemberShipExpiryDate_errormsg = 'Please select expiry date';

      this.errormsg = true;
    }
    this.Company_errormsg = '';
    if (this.CompanyName.trim().length === 0) {
      this.Company_errormsg = 'Please enter shop name';
      this.errormsg = true;
    }
    // this.Companydescription_errormsg = '';
    // if (this.CompanyDescription.trim().length === 0) {
    //   this.Companydescription_errormsg = '*please enter description';
    //   this.errormsg = true;
    // }

    this.Companycontactname_errormsg = '';
    if (this.CompanyContactName.trim().length === 0) {
      this.Companycontactname_errormsg = 'Please enter contact name';
      this.errormsg = true;
    }
    this.CompanyEmail_errormsg = '';
    if (this.CompanyEmailid.trim().length === 0) {
      this.CompanyEmail_errormsg = 'Please enter email';
      this.errormsg = true;
    }
    this.CompanyMobileNo1_errormsg = '';
    if (this.CompanyMobileNo1.trim().length === 0) {
      this.CompanyMobileNo1_errormsg = 'Please enter mobile no.';
      this.errormsg = true;
    }
    if (!isValid) {
      return;
    }

    if (isValid) {
      // this.errormsg = false;
      if (this.errormsg == false) {
        // alert("abhi call hua")
        var val = {
          CompanyID: this.CompanyID,
          BusinessTypeID: this.BusinessTypeID,
          // BusinessCategoryID: this.BusinessCategoryID,
          // BusinessSubCategoryID: this.BusinessSubCategoryID,
          CompanySourceID: this.CompanySourceID,
          CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
          CompanyMemberShipExpiryDate: this.CompanyMemberShipExpiryDate
            ? this.CompanyMemberShipExpiryDate
            : '',
          CompanyName: this.CompanyName,
          CompanyDescription: this.CompanyDescription || '',
          CompanyContactName: this.CompanyContactName,
          CompanyEmailid: this.CompanyEmailid,
          CompanyMobileNo1: this.CompanyMobileNo1,
          CompanyMobileNo2: this.CompanyMobileNo2 ? this.CompanyMobileNo2 : '',
          // CompanyGSTNumber: this.CompanyGSTNumber ? this.CompanyGSTNumber : '',
          // CompanyPANNumber: this.CompanyPANNumber ? this.CompanyPANNumber : '',
          // CompanyMSMENumber: this.CompanyMSMENumber
          //   ? this.CompanyMSMENumber
          //   : '',
          // CompanyPanCardImagePath: this.CompanyPanCardImagePath
          //   ? this.CompanyPanCardImagePath
          //   : 'anonymous.png',
          // CompanyGSTImagePath: this.CompanyGSTImagePath
          //   ? this.CompanyGSTImagePath
          //   : 'anonymous.png',
          // CompanyMSMEImagePath: this.CompanyMSMEImagePath
          //   ? this.CompanyMSMEImagePath
          //   : 'anonymous.png',
          CompanyLogoPath: this.CompanyLogoPath
            ? this.CompanyLogoPath
            : '',
          // CompanyBannerPath: this.CompanyBannerPath
          //   ? this.CompanyBannerPath
          //   : 'anonymous.png',

          CompanyCancelledChequePath: this.CompanyCancelledChequePath
            ? this.CompanyCancelledChequePath
            : '',
          CompanyJoiningDate: this.CompanyJoiningDate,
          WebsiteURL: this.WebsiteURL ? this.WebsiteURL : '',
          FacbookID: this.FacbookID ? this.FacbookID : '',
          Twitter: this.Twitter ? this.Twitter : '',
          Linkedin: this.Linkedin ? this.Linkedin : '',
          Instagram: this.Instagram ? this.Instagram : '',
          WordPress: this.WordPress ? this.WordPress : '',
          Pintrest: this.Pintrest ? this.Pintrest : '',
          YouTube: this.YouTube ? this.YouTube : '',
          CompanyTimeMonday: this.Monday1 + ' - ' + this.Monday2,

          CompanyTimeTuesday: this.Tuesday1 + ' - ' + this.Tuesday2,

          CompanyTimeWednesday: this.Wednesday1 + ' - ' + this.Wednesday2,

          CompanyTimeThursday: this.Thursday1 + ' - ' + this.Thursday2,

          CompanyTimeFriday: this.Friday1 + ' - ' + this.Friday2,

          CompanyTimeSaturday: this.Saturday1 + ' - ' + this.Saturday2,

          CompanyTimeSunday: this.Sunday1 + ' - ' + this.Sunday2,
          // CompanyTimeWednesday: this.CompanyTimeWednesday,
          // CompanyTimeThursday: this.CompanyTimeThursday,
          // CompanyTimeFriday: this.CompanyTimeFriday,
          // CompanyTimeSaturday: this.CompanyTimeSaturday,
          // CompanyTimeSunday: this.CompanyTimeSunday,
          IsActive: this.IsActive,

          // ModifiedBy: 2,
          ModifiedBy: this.currentUserID,
        };

        this.service.UpdateCompanyList(val).subscribe((data) => {
          console.log(val);
          if (data['status_code'] == 100) {


            const payload = {
              CaptionDetails: this.activeLanguages,
              CompanyID: this.CompanyID// Captured Name & Description
            };


            this.service.addCompanyLanguage(payload).subscribe((data_language) => { })

            showSuccessToast(JSON.parse(data['message'])[0]['message']);
            //Closing module popup using js function
            closePopup('exampleModal');
            //sending false value to ShowCompont to destroy this component
            this.emitData.emit(false);
            this.CompanyID = 0;
            this.BusinessTypeID = 0;
            // this.BusinessCategoryID = 0;
            // this.BusinessSubCategoryID = 0;
            this.CompanySourceID = 0;
            this.CompanyMemberShipTypeID = 0;
            this.CompanyMemberShipExpiryDate = '';
            this.CompanyName = '';
            this.CompanyDescription = '';
            this.CompanyContactName = '';
            this.CompanyEmailid = '';
            this.CompanyMobileNo1 = '';
            this.CompanyMobileNo2 = 0;
            // this.CompanyGSTNumber = '';
            // this.CompanyPANNumber = '';
            // this.CompanyMSMENumber = '';
            // this.CompanyPanCardImagePath = '';
            // this.CompanyGSTImagePath = '';
            // this.CompanyMSMEImagePath = '';
            this.CompanyLogoPath = '';
            // this.CompanyBannerPath = '';
            this.CompanyJoiningDate = '';
            this.CompanyCancelledChequePath = '';
            this.WebsiteURL = '';
            this.FacbookID = '';
            this.Twitter = '';
            this.Linkedin = '';
            this.Instagram = '';
            this.WordPress = '';
            this.Pintrest = '';
            this.YouTube = '';
            this.CompanyTimeMonday = '';
            this.CompanyTimeTuesday = '';
            this.CompanyTimeWednesday = '';
            this.CompanyTimeThursday = '';
            this.CompanyTimeFriday = '';
            this.CompanyTimeSaturday = '';
            this.CompanyTimeSunday = '';
            this.IsActive = false;
            this.ModifiedBy = 0;
          } else if (data['status_code'] == 300) {
            showDangerToast(JSON.parse(data['message'])[0]['message']);
          } else {
            showDangerToast('Some error occured, data not saved');
          }
        });
      }
      this.errormsg=false;
    }
  }
  // updateTime(){
  //   if(this.Monday1=="Closed" && this.Monday2=="Closed"){
  //     this.CompanyTimeMonday=this.Monday1
  //   }
  //   else {
  //     this.CompanyTimeMonday= this.Monday1 + " - " + this.Monday2

  //   }
  // }
  // uploadpancardimage(event: File[]) {
  //   var file = event[0];
  //   const fromData: FormData = new FormData();
  //   fromData.append('uploaded File', file, file.name);
  //   this.service
  //     .uploadPhoto(fromData, this.CompanyID)
  //     .subscribe((data: any) => {
  //       this.CompanyPanCardImagePath = data.toString();
  //       this.CompanyPanCardImageNamePath =
  //         this.service.PhotoUrl + this.CompanyPanCardImagePath;
  //     });
  //   // console.log(data.toString())
  // }
  // uploadGSTcardimage(event: File[]) {
  //   var file = event[0];
  //   const fromData: FormData = new FormData();
  //   fromData.append('uploaded File', file, file.name);
  //   this.service
  //     .uploadPhoto(fromData, this.CompanyID)
  //     .subscribe((data: any) => {
  //       this.CompanyGSTImagePath = data.toString();
  //       this.CompanyGSTImageNamePath =
  //         this.service.PhotoUrl + this.CompanyGSTImagePath;
  //     });
  // }
  // uploadMSMEcardimage(event: File[]) {
  //   var file = event[0];
  //   const fromData: FormData = new FormData();
  //   fromData.append('uploaded File', file, file.name);
  //   this.service
  //     .uploadPhoto(fromData, this.CompanyID)
  //     .subscribe((data: any) => {
  //       this.CompanyMSMEImagePath = data.toString();
  //       this.CompanyMSMEImageNamePath =
  //         this.service.PhotoUrl + this.CompanyMSMEImagePath;
  //     });
  // }
  uploadLogoimage(event: File[]) {
    var file = event[0];
    const fromData: FormData = new FormData();
    fromData.append('uploaded File', file, file.name);
    this.service
      .uploadLogophoto(fromData, this.CompanyID)
      .subscribe((data: any) => {
        this.CompanyLogoPath = data.toString();
        this.CompanyLogoImageNamePath =
          this.service.PhotoUrl + 'listing/' + this.CompanyLogoPath;
      });
  }
  // uploadBannerimage(event: File[]) {
  //   var file = event[0];
  //   const fromData: FormData = new FormData();
  //   fromData.append('uploaded File', file, file.name);
  //   this.service
  //     .uploadcover_imgPhoto(fromData, this.CompanyID)
  //     .subscribe((data: any) => {
  //       this.CompanyBannerPath = data.toString();
  //       this.CompanyBannerImageNamePath =
  //         this.service.PhotoUrl + 'cover_img/' + this.CompanyBannerPath;
  //     });
  // }

  uploadCompanyCancelledChequeimage(event: File[]) {
    var file = event[0];
    const fromData: FormData = new FormData();
    fromData.append('uploaded File', file, file.name);
    this.service
      .uploadPhoto(fromData, this.CompanyID)
      .subscribe((data: any) => {
        this.CompanyCancelledChequePath = data.toString();
        this.CompanyCancelledChequeNamePath =
          this.service.PhotoUrl + this.CompanyCancelledChequePath;
      });
  }
  //Addresss
  loadCityListList() {
    let val = {};
    this.service.getCityList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CityList = JSON.parse(data['message']);
      }
    });
  }
  loadStateList() {
    let val = {};
    this.service.getStatesList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.StateList = JSON.parse(data['message']);
      }
    });
  }

  refreshCompanyAddresssList() {
    if (this.CompanyID != 0) {
      let val = { CompanyID: this.CompanyID };
      this.service.getCompanyAddress(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.companyaddressList = JSON.parse(data['message']);
          this.CompanyAddressID = this.companyaddressList[0].CompanyAddressID;

          this.Address1 = this.companyaddressList[0].Address1;
          // this.Address2 = this.companyaddressList[0].Address2;
          this.selectedAddress.formattedAddress =
            this.companyaddressList[0].Address2;
          // this.CityID = this.companyaddressList[0].CityID;
          // this.StateID = this.companyaddressList[0].StateID;
          this.Zip = this.companyaddressList[0].Zip;
          this.Landmark = this.companyaddressList[0].Landmark;
          this.Latitude = this.companyaddressList[0].Latitude;
          this.Longitude = this.companyaddressList[0].Longitude;
          this.lat=this.Latitude;
          this.long=this.Longitude;
    
          if(this.lat&&this.long){
            this.loadMap();            
          }
          // console.log(this.companyaddressList)
          // console.log(this.Address1);
        }
      });
    }else{
      this.onDetectCurrent();
      // this.loadMap();
    }
  }

  onAreaKeyup() {
    (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected')).value =
      '2';
  }

  containsNumbers(str: any) {
    return /\d/.test(str);
  }

  addCompanyaddress() {
    // if (
    //   (<HTMLInputElement>document.getElementById('isMapMyIndiaSelected'))
    //     .value == '1'
    // ) {
      //alert('new address selected');

      // this.Zip = (<HTMLInputElement>(
      //   document.getElementById('pcode')
      // )).value.trim();

      this.selectedAddress.formattedAddress = (<HTMLInputElement>(
        document.getElementById('areaa')
      )).value.trim();

      // this.lat = (<HTMLInputElement>(
      //   document.getElementById('latitude')
      // )).value.trim();

      // this.long = (<HTMLInputElement>(
      //   document.getElementById('longitude')
      // )).value.trim();

      this.Latitude = this.lat;
      this.Longitude = this.long;

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

      if (this.CompanyID===0) {
        showDangerToast('Please enter shop details.');
        return;
      }

      if (this.Address1.trim() == '') {
        showDangerToast('Please enter valid Shop no / Flat no and shop name.');
        return;
      }

      if (!this.lat && !this.long) {
        showDangerToast('Please select location from the map.');
        return;
      }

      if (this.Address1.trim().length < 10) {
        showDangerToast('Address line 1 can not be less than 10 characters.');
        return;
      }

      // if (!this.CityID || !this.StateID) {
      //   if (!this.CityID) {
      //     showDangerToast('Please select city.');
      //   }
      //   if (!this.StateID) {
      //     showDangerToast('Please select state.');
      //   }
      //   return;
      // }
      


      if (!this.containsNumbers(this.Address1.trim())) {
        showDangerToast(
          'Address line 1 should have House no or Flat no or Road no.'
        );
        return;
        
      }
      //alert(this.pincode);
      // if (this.Zip.trim() == '') {
      //   showDangerToast('Please enter valid pincode');
      //   return;
      // }

      // if (this.towncity.trim() == '') {
      //   showDangerToast('Please enter valid city');
      //   return;
      // }

      // if (this.state.trim() == '') {
      //   showDangerToast('Please enter valid state');
      //   return;
      // }

      // this.service.getCity(cityVal).subscribe((data) => {
      //   console.log(data);
      //   if (data['status_code'] == 100) {
      //     var CityList = JSON.parse(data['message']);

      //     console.log(CityList);
      //     this.CityID = CityList[0]['CityID'];
      //     this.StateID = CityList[0]['StateID'];
      //     // alert(this.CityID);
      //     // alert(this.StateID);

      //     this.callAddAddressAPI();
      //   }
      // });

      this.callAddAddressAPI();
    // } else {
    //   showDangerToast('Please select valid Area, Street, Sector, Village');
    // }
  }

  callAddAddressAPI() {
    var val = {
      CompanyID: this.CompanyID,
      Address1: this.Address1,
      Address2: this.selectedAddress.formattedAddress,
      // CityID: this.CityID,
      // StateID: this.StateID,
      CountryID: 58,
      // Zip: this.Zip,
      Landmark: this.Landmark,
      Latitude: this.Latitude,
      Longitude: this.Longitude,
      IsDefault: 0,
      IsActive: 0,
      CreatedBy: this.currentUserID,
    };
    console.log(val);
    
    this.service.addCompanyAddress(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        console.log(data);
        
        this.CompanyAddressID = JSON.parse(data['message'])[0]['identity'];
        // closePopup('exampleModal');
        // this.emitData.emit(false);
        // this.addShiprocketAddress();
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
           localStorage.setItem('addressProfileCompleted', 'true');
                   const isAddressProfileCompleted = localStorage.getItem('addressProfileCompleted') === 'true';
      const isBankProfileCompleted = localStorage.getItem('bankProfileCompleted') === 'true';
         if (isAddressProfileCompleted && isBankProfileCompleted) {
      // ✅ Both are completed, now redirect to Home!
      this.router.navigate(['/Home']);
    }
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
    });
  }

  onCityChange($event: any) {
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    // alert(text);
    this.CityName = text;
  }

  onStateChange($event: any) {
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    // alert(text);
    this.StateName = text;
  }

  token: any;
  addShiprocketAddress() {
    // alert('mayur');
    this.service.generateShiprocketToken().subscribe((data: any) => {
      console.log(data);
      this.token = data.token;

      var val = {
        pickup_location: 'C-' + this.CompanyID,
        name: this.CompanyName,
        email: this.CompanyEmailid,
        phone: this.CompanyMobileNo1,
        address: this.Address1,
        address_2: this.selectedAddress.formattedAddress,
        city: this.CityName,
        state: this.StateName,
        country: 'india',
        pin_code: this.Zip,
        lat: this.Latitude,
        long: this.Longitude,
        token: this.token,
      };
      console.log(val);

      this.service.addShipRocketAddress(val).subscribe((data) => {
        console.log(data);
      });
    });
  }

  updateCompanyaddress() {
      //alert('new address selected');

      // this.Zip = (<HTMLInputElement>(
      //   document.getElementById('pcode')
      // )).value.trim();

      this.selectedAddress.formattedAddress = (<HTMLInputElement>(
        document.getElementById('areaa')
      )).value.trim();

      // this.lat = (<HTMLInputElement>(
      //   document.getElementById('latitude')
      // )).value.trim();
      this.Latitude = this.lat;

      // this.long = (<HTMLInputElement>(
      //   document.getElementById('longitude')
      // )).value.trim();

      this.Longitude = this.long;

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

      if (this.Address1.trim() == '') {
        showDangerToast(
          'Please enter valid Enter Shop no / Flat no and shop name.'
        );
        return;
      }

      if (this.Address1.trim().length < 10) {
        showDangerToast('Address line 1 can not be less than 10 characters.');
        return;
      }

      // if (!this.CityID || !this.StateID) {
      //   if (!this.CityID) {
      //     showDangerToast('Please select city.');
      //   }
      //   if (!this.StateID) {
      //     showDangerToast('Please select state.');
      //   }
      //   return;
      // }
      

      if (!this.containsNumbers(this.Address1.trim())) {
        showDangerToast(
          'Address line 1 should have House no or Flat no or Road no.'
        );
        return;
      }

      //alert(this.pincode);
      // if (this.Zip.trim() == '') {
      //   showDangerToast('Please enter valid pincode');
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

      // this.services.getCity(cityVal).subscribe((data) => {
      //   console.log(data);
      //   if (data['status_code'] == 100) {
      //     var CityList = JSON.parse(data['message']);

      //     console.log(CityList);
      //     this.CityID = CityList[0]['CityID'];
      //     this.StateID = CityList[0]['StateID'];
      //     //alert(this.CityID);
      //     // alert(this.StateID);

      //     this.callUpdateCompanyAddressAPI();
      //   }
      // });
      this.callUpdateCompanyAddressAPI();
  }

  callUpdateCompanyAddressAPI() {
    var val = {
      CompanyAddressID: this.CompanyAddressID,
      CompanyID: this.CompanyID,
      Address1: this.Address1,
      Address2: this.selectedAddress.formattedAddress,
      // CityID: this.CityID,
      // StateID: this.StateID,
      CountryID: 58,
      // Zip: this.Zip,
      Landmark: this.Landmark,
      Latitude: this.Latitude,
      Longitude: this.Longitude,
      IsDefault: 1,
      IsActive: 1,
      ModifiedBy: this.currentUserID,
    };
    console.log(val);
    
    this.service.updateCompanyAddress(val).subscribe((data) => {
      console.log(data);
      
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        closePopup('exampleModal');
        this.emitData.emit(false);
        this.CompanyAddressID = 0;
        this.CompanyID = 0;
        this.Address1 = '';
        this.selectedAddress.formattedAddress = '';
        this.Address2 = '';
        // this.CityID = 0;
        // this.StateID = 0;
        this.Zip = '';
        this.Landmark = '';
        this.Latitude = 0.0;
        this.Longitude = 0.0;
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
    });
  }
  //bankDetails
  refreshBankDetailsList() {
    if (this.CompanyID != 0) {
      let val = { CompanyID: this.CompanyID };
      this.service.getBankDetails(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.BankDetailsList = JSON.parse(data['message']);
          this.CompanyBankDetailsID =
            this.BankDetailsList[0].CompanyBankDetailsID;
          this.CompanyID = this.BankDetailsList[0].CompanyID;
          this.UPIID = this.BankDetailsList[0].UPIID;
          this.BankName = this.BankDetailsList[0].BankName;
          this.BankBranchName = this.BankDetailsList[0].BankBranchName;
          this.AccountHolderName = this.BankDetailsList[0].AccountHolderName;
          this.AccountNumber = this.BankDetailsList[0].AccountNumber;
          this.IFSC = this.BankDetailsList[0].IFSC;
        }
        //console.log(this.BankDetailsList)
      });
    }
  }
  addbankdeatils() {


    if(!this.bankDetailsForm.valid){
      console.log("hiii");
      this.bankDetailsForm.markAllAsTouched();

      return;
    }
    else{
    var val = {
      CompanyID: this.CompanyID,
      UPIID: this.UPIID,
      BankName: this.BankName,
      BankBranchName: this.BankBranchName,
      AccountHolderName: this.AccountHolderName,
      AccountNumber: this.AccountNumber,
      IFSC: this.IFSC,
      IsDefault: 1,
      CreatedBy: this.currentUserID,
    };

    this.service.addBankDetails(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanyBankDetailsID = JSON.parse(data['message'])[0]['identity'];
        closePopup('exampleModal');
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
           localStorage.setItem('bankProfileCompleted', 'true');
            const isAddressProfileCompleted = localStorage.getItem('addressProfileCompleted') === 'true';
      const isBankProfileCompleted = localStorage.getItem('bankProfileCompleted') === 'true';
         if (isAddressProfileCompleted && isBankProfileCompleted) {
      // ✅ Both are completed, now redirect to Home!
      this.router.navigate(['/Home']);
    }
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
    });
  }
  }
  updatebankdeatils() {
        if(!this.bankDetailsForm.valid){
      console.log("hiii");
      this.bankDetailsForm.markAllAsTouched();

      return;
    }
    var val = {
      CompanyBankDetailsID: this.CompanyBankDetailsID,
      CompanyID: this.CompanyID,
      UPIID: this.UPIID,
      BankName: this.BankName,
      BankBranchName: this.BankBranchName,
      AccountHolderName: this.AccountHolderName,
      AccountNumber: this.AccountNumber,
      IFSC: this.IFSC,
      IsDefault: 0,
      ModifiedBy: this.currentUserID,
    };
    this.service.updateBankDetails(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        closePopup('exampleModal');
        this.emitData.emit(false);
        this.CompanyBankDetailsID = 0;
        this.CompanyID = 0;
        this.UPIID = '';
        this.BankName = '';
        this.BankBranchName = '';
        this.AccountHolderName = '';
        this.AccountNumber = '';
        this.IFSC = '';
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
    });
  }
  Unapproved(item: any) {
    let ProductID = item.ProductID;
    this.Unpublishboth(ProductID);
    var val = {
      ProductID: item.ProductID,
      IsApproved: 0,
    };
    this.service.updateproductapproval(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        this.refreshProductsList();
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
    });
  }

  Unpublishboth(ProductID: any) {
    var val = {
      ProductID: ProductID,
      IsPublished: 0,
    };
    this.service.updateproductpublish(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        JSON.parse(data['message'])[0]['message'];
        this.refreshProductsList();
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
    });
  }

  approved(item: any) {
    var val = {
      ProductID: item.ProductID,
      IsApproved: 1,
    };

    this.service.updateproductapproval(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        this.refreshProductsList();
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
    });
  }

  Unpublish(item: any) {
    var val = {
      ProductID: item.ProductID,
      IsPublished: 0,
    };

    this.service.updateproductpublish(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        this.refreshProductsList();
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
    });
  }
  Publish(item: any) {
    var val = {
      ProductID: item.ProductID,
      IsPublished: 1,
    };

    this.service.updateproductpublish(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        this.refreshProductsList();
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
    });
  }

  refreshProductsList() {
    if (this.CompanyID != 0) {
      var val: any = {};
      if (this.CompanyID?.toString().length !== 0) {
        val.CompanyID = this.CompanyID;
      }
      if (this.ProductCategoryID?.trim().length !== 0) {
        val.ProductCategoryID = this.ProductCategoryID;
      }
      if (this.ProductSubCategoryID?.trim().length !== 0) {
        val.ProductSubCategoryID = this.ProductSubCategoryID;
      }
      if (this.IsPublished == true) {
        val.IsPublished = 0;
      }
      if (this.IsApproved == true) {
        val.IsApproved = 0;
      }
      this.service.getproductsList(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.ProductsList = JSON.parse(data['message']);
        }
      });
    }
  }

  refreshSettlementList() {

    

    if (this.CompanyID != 0) {
      var val: any = {};

      if (this.CompanyID?.toString().length !== 0) {
        val.CompanyID = this.CompanyID;
        val.IsShopPaymentSettled = true;
      }
      this.service.getshopSettlementList(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.settlementList = JSON.parse(data['message']);
          this.TotalSettlementprice = this.settlementList.reduce(function (
            acc: any,
            val: any
          ) {
            return acc + val.OrderPrice;
          },
            0);
          console.log(this.TotalSettlementprice);

          console.log(this.settlementList);
        } else {
          this.settlementList = [];

          showInfoToast('No data found');
        }
      });
    }
  }
  exportToExcel() {
    excelExport('show-settlement', 'Settlement');
  }
  // getmembershipinvoiceList
  refreshMembershipInvoiceList() {
    if (this.CompanyID != 0) {
      var val: any = {};
      if (this.CompanyID?.toString().length !== 0) {
        val.CompanyID = this.CompanyID;
      }
      this.service.getmembershipinvoiceList(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.membershipinvoiceList = JSON.parse(data['message']);
          console.log(this.membershipinvoiceList);
        } else {
          this.membershipinvoiceList = [];
          // showInfoToast('No data found');
        }
      });
    }
  }

  InvoiceNumber: any;
  InvoiceDate: any;
  CompanyName1: any;
  Address3: any;
  Address4: any;
  CityName1: any;
  StateName1: any;
  CountryName: any;
  Zip1: any;
  CompanyMobileNo12: any;
  // CompanyGSTNumber1: any;
  InvoiceAmount: any;
  TaxSlabPercentage: any;
  CGST: any;
  SGST: any;
  InvoiceTotal: any;
  CompanyMemberShipName1: any;
  CompanyMemberShipStartDate: any;
  CompanyMemberShipExpiryDate1: any;

  View: boolean = false;
  viewClick(item: any) {
    var val = { CompanyMembershipInvoiceID: item };

    console.log(val);
    this.service.getMembershipInvoicesList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        console.log(data);
        this.Invoicedata = JSON.parse(data['message']);
        console.log(this.Invoicedata);
        this.InvoiceNumber = this.Invoicedata[0].InvoiceNumber;
        this.InvoiceDate = this.Invoicedata[0].InvoiceDate;
        this.CompanyName1 = this.Invoicedata[0].CompanyName;
        // alert('1')
        this.Address3 = this.Invoicedata[0].Address1;
        this.Address4 = this.Invoicedata[0].Address2;
        // this.CityName1 = this.Invoicedata[0].CityName;
        // this.StateName1 = this.Invoicedata[0].StateName;
        this.CountryName = this.Invoicedata[0].CountryName;
        this.Zip1 = this.Invoicedata[0].Zip;
        // alert('2')
        this.CompanyMobileNo12 = this.Invoicedata[0].CompanyMobileNo1;
        // this.CompanyGSTNumber1 = this.Invoicedata[0].CompanyGSTNumber;
        this.InvoiceAmount = this.Invoicedata[0].InvoiceAmount;
        this.TaxSlabPercentage = this.Invoicedata[0].TaxSlabPercentage;
        this.CGST = this.Invoicedata[0].CGST;
        // alert('3')
        this.SGST = this.Invoicedata[0].SGST;
        this.InvoiceTotal = this.Invoicedata[0].InvoiceTotal;
        this.CompanyMemberShipName1 = this.Invoicedata[0].CompanyMemberShipName;
        //this.days=this.Invoicedata.CompanyMemberShipStartDate-this.Invoicedata.CompanyMemberShipExpiryDate;
        this.CompanyMemberShipExpiryDate1 =
          this.Invoicedata[0].CompanyMemberShipExpiryDate;
        this.CompanyMemberShipStartDate =
          this.Invoicedata[0].CompanyMemberShipStartDate;
        //this.days= ((Date.UTC(this.CompanyMemberShipExpiryDate.getFullYear(), this.CompanyMemberShipExpiryDate.getMonth(), this.CompanyMemberShipExpiryDate.getDate()) - Date.UTC(this.CompanyMemberShipStartDate.getFullYear(), this.CompanyMemberShipStartDate.getMonth(), this.CompanyMemberShipStartDate.getDate()) ) /(1000 * 60 * 60 * 24));

        this.View = true;
        this.openPDF();
      } else if (data['status_code'] == 200) {
        showInfoToast(JSON.parse(data['message'])[0]['Message']);
      }
    });

    // this.AB= false;
    // this.CD=true;
  }

  public openPDF(): void {
    setTimeout(() => {
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save(this.InvoiceNumber + '.pdf');
        this.View = false;
      });
    }, 3000);
  }

  emittedDataChil(data: boolean) {
    this.Activategenerateinvoice = data;
    if (!data) {
      this.refreshSettlementList();
    }
  }

  loadDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = this.service.PhotoUrl + "anonymous.png";
  }

  currencySign() {
    var val: any = {
      IsActive: true,
    };
    this.service.getcurrency(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.countrydata = JSON.parse(data['message']);
        this.currency = this.countrydata[0].Symbol;

      }
    });
  }

  onSearch() {
    if (this.searchAddress.formattedAddress.trim()) {
      this.service.searchLocation(this.searchAddress.formattedAddress).subscribe(
        (response: any) => {
          this.searchResults = response.predictions;
          // console.log(this.searchResults);

        });
    } else {
      this.searchResults = [];
    }
  }

  selectAddress(place: any) {
    this.selectedAddress.formattedAddress = place.description;
    this.searchAddress.formattedAddress = place.description;
    // console.log(this.selectedAddress.formattedAddress);
    // console.log(place.place_id);
    // this.placeName = place.structured_formatting.main_text;
    // console.log(this.placeName);


    this.service.getlatlong(place.place_id).subscribe(
      (response: any) => {
        this.lat= response.result.geometry.location.lat;
        this.long= response.result.geometry.location.lng;
        console.log(this.lat,this.long);
        // console.log(this.lat, this.long);
        // localStorage.setItem('latitude', lat);
        // localStorage.setItem('longitude', lng);
        // this.latitude = localStorage.getItem('latitude');
        // this.longitude = localStorage.getItem('longitude');
        this.loadMap();
      });



    this.searchResults = [];
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
          // console.log("Accuracy (meters):", position.coords.accuracy);
          console.log(this.lat,this.long);
          // localStorage.setItem('latitude', lat.toString());
          // localStorage.setItem('longitude', lng.toString());
          // this.latitude = localStorage.getItem('latitude');
          // this.longitude = localStorage.getItem('longitude');

          this.service.getAddressFromCoordinates(this.lat, this.long).subscribe(
            (response: any) => {
              // this.selectedAddress.formattedAddress = response.formattedAddress;
              // console.log(response);
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
        fullscreenControl: false,
        // gestureHandling: 'greedy'
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
        this.service.getAddressFromCoordinates(this.lat, this.long).subscribe(
          (response: any) => {
            this.selectedAddress.formattedAddress = response.formattedAddress;
            this.searchAddress.formattedAddress = response.formattedAddress;
            // console.log(response);
            this.cdr.detectChanges();
            
          }
          // ,
          // (error) => {
          //   console.error("Error fetching address:", error);
          // }
        );
        // console.log(`New Location: ${this.lat}, ${this.long}`);
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
      //       console.log(response);
      //       this.addressSelected.emit(this.selectedAddress.formattedAddress);

      //     }
      //     // ,

      //     //   (error) => {
      //     //     console.error('Error fetching address:', error);
      //     //   }
      //   );
      //   console.log(`New Location: ${lat}, ${lng}`);
      // });
    }
  }

validateNumberInput(event: KeyboardEvent, errorField: string) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    if (errorField === 'CompanyMobileNo1_errormsg') {
      this.CompanyMobileNo1_errormsg = "Only numbers are allowed!";
    } else if (errorField === 'CompanyMobileNo2_errormsg') {
      this.CompanyMobileNo2_errormsg = "Only numbers are allowed!";
    }
  } else {
    if (errorField === 'CompanyMobileNo1_errormsg') {
      this.CompanyMobileNo1_errormsg = "";
    } else if (errorField === 'CompanyMobileNo2_errormsg') {
      this.CompanyMobileNo2_errormsg = "";
    }
  }
}

deleteImage() {
  this.CompanyLogoImageNamePath = this.service.PhotoUrl + "anonymous.png";
  this.CompanyLogoPath = '';

  const fileInput = document.getElementById('logoFileInput') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
}

deleteChequeImage() {
  this.CompanyCancelledChequeNamePath = this.service.PhotoUrl + "anonymous.png"; 
  this.CompanyCancelledChequePath = '';

  const fileInput = document.getElementById('chequeFileInput') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
}


  
}
