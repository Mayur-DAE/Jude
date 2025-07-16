import { Component, EventEmitter, NgModule, OnInit, Output, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

declare var mappls: any; // Global Obejct
declare var google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit,AfterViewInit {
  mapObject: any;
  marker: any;

  addresses: any = [];
  selectedAddress: any = {};
  isAddressSelected: boolean = false;
  eLoc: any;

  access_token: any;
  isMapMyIndiaSelected: any = 0;
  searchResults: any[] = [];
  placeDetail: any[] = [];
  placeName: any;
  latitude: any = localStorage.getItem('latitude');
  longitude: any = localStorage.getItem('longitude');
  ShowMap: boolean = false;
  @Output() addressSelected = new EventEmitter<string>();
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  // latitude = 19.0760;  // Default latitude (Mumbai)
  // longitude = 72.8777; // Default longitude
  locationName = "Mumbai, India";

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    // this.sharedService.generateToken();    
    if ((this.latitude!=='0.00' && this.longitude!=='0.00') && (this.latitude!==null && this.longitude!==null)){
      
      
      this.ShowMap = true;
      const latnum = parseFloat(this.latitude)
      const lngnum = parseFloat(this.longitude)
      this.sharedService.getAddressFromCoordinates(latnum, lngnum).subscribe(
        (response: any) => {
          this.selectedAddress.formattedAddress = response.formattedAddress;
        }
      );
      this.loadMap();
      // setTimeout(() => {
      //   this.loadMap();
      // }, 0);
    }

    // this.sharedService.getToken().subscribe((data: any) => {
    //   
    //   this.access_token = data.access_token;

    //   // alert('mayur');
    //   //Return Callback when map is completely loaded
    //   // if not using callback then you have to use settimeout

    //   this.initialize(this.access_token, () => {
    //     //Try to do everything related to map inside this or call external function inside of this

    //     // this.mapObject = mappls.Map('map', {
    //     //   center: [28.61, 77.23],
    //     //   zoomControl: true,
    //     //   location: true,
    //     // });

    //     this.placeSearch();
    //   });
    // });
  }

  ngAfterViewInit() {
    if ((this.latitude!=='0.00' && this.longitude!=='0.00') && (this.latitude!==null && this.longitude!==null)) {
      this.loadMap();
      // setTimeout(() => {
      //   this.loadMap();
      // }, 0);
    }
  }


  loadMap() {
    if (this.latitude && this.longitude) {
      const latnum = parseFloat(this.latitude)
      const lngnum = parseFloat(this.longitude)
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
        localStorage.setItem("latitude", center.lat().toString());
        localStorage.setItem("longitude", center.lng().toString());
        this.latitude = localStorage.getItem("latitude");
        this.longitude = localStorage.getItem("longitude");
  
        // Fetch the updated address using the shared service
        this.sharedService.getAddressFromCoordinates(this.latitude, this.longitude).subscribe(
          (response: any) => {
            this.selectedAddress.formattedAddress = response.formattedAddress;
            
            this.addressSelected.emit(this.selectedAddress.formattedAddress);
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
      clearButton: false,
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
      // alert('need to call new api');
      (<HTMLInputElement>document.getElementById('areaa')).value = '';
      return;
    }

    var lat = dt.latitude;
    // (<HTMLInputElement>document.getElementById('latitude')).value = lat;

    var long = dt.longitude;
    // (<HTMLInputElement>document.getElementById('longitude')).value = long;

    localStorage.setItem('latitude', lat);
    localStorage.setItem('longitude', long);

    location.reload();
  }

  onAddressType() {
    const value = this.selectedAddress.formattedAddress;
    if (value == '') {
      this.addresses = [];
      this.isAddressSelected = false;
    } else {
      this.sharedService.getAddresses(value).subscribe((addressResponse) => {
        
        this.addresses = addressResponse;
      });
    }
  }

  onSelectAddress(address: any) {
    this.addresses = [];
    this.selectedAddress = address;
    this.isAddressSelected = true;
    this.eLoc = address.eLoc;
    
    this.geteLocLatLong();
  }

  onDetectCurrent() {
    // this.getLocation();
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          
          localStorage.setItem('latitude', lat.toString());
          localStorage.setItem('longitude', lng.toString());
          this.latitude = localStorage.getItem('latitude');
          this.longitude = localStorage.getItem('longitude');

          this.sharedService.getAddressFromCoordinates(lat, lng).subscribe(
            (response: any) => {
              this.selectedAddress.formattedAddress = response.formattedAddress;
              
              this.addressSelected.emit(this.selectedAddress.formattedAddress);
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

  getLocation() {
    this.sharedService.getLocationService().then((resp) => {
      this.sharedService.lat = resp.lat;
      this.sharedService.long = resp.lng;
      localStorage.setItem('latitude', resp.lat.toString());
      localStorage.setItem('longitude', resp.lng.toString());

      this.sharedService
        .getCurrentAddress(resp.lat, resp.lng)
        .subscribe((data) => {
          this.selectedAddress.formattedAddress =
            data.results[0].formatted_address;

          if (this.router.url == '/Home') {
            this.router.navigate(['']);
          } else {
            this.router.navigate(['Home']);
          }
        });
    });
  }

  geteLocLatLong() {
    this.sharedService.eLocLatLog(this.eLoc).subscribe((data) => {
      localStorage.setItem('latitude', data.latitude);
      localStorage.setItem('longitude', data.longitude);

      if (this.router.url == '/Home') {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['Home']);
      }
    });
  }

  onSearch() {
    if (this.selectedAddress.formattedAddress.trim()) {
      this.sharedService.searchLocation(this.selectedAddress.formattedAddress).subscribe(
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
    
    
    this.placeName = place.structured_formatting.main_text;
    


    this.sharedService.getlatlong(place.place_id).subscribe(
      (response: any) => {
        const lat = response.result.geometry.location.lat;
        const lng = response.result.geometry.location.lng;
        
        localStorage.setItem('latitude', lat);
        localStorage.setItem('longitude', lng);
        this.latitude = localStorage.getItem('latitude');
        this.longitude = localStorage.getItem('longitude');
        this.loadMap();
        this.addressSelected.emit(this.selectedAddress.formattedAddress);
      });



    this.searchResults = [];
  }
}
