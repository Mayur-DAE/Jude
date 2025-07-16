import { Component, OnInit, NgZone } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';

declare function showSuccess(message: any): any;
declare function showInfo(message: any): any;
declare function showWarning(message: any): any;
declare function showError(message: any): any;
declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private servive: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) { }

  passwordVisible: boolean = false;
  passwordType: string = 'password';
  EmailId = '';
  Password = '';
  response: any = {};
  User: any = [];
  returnPath = '';
  isloggedIn = false;
  rememberMe: boolean = false;

  currentUser: any;
  emailaddress_errorMsg = '';
  password_errorMsg = '';

  ngOnInit(): void {

    this.returnPath = this.route.snapshot.params['id'];

    try
    {
      google.accounts.id.initialize({
        client_id: '1018549584519-ui0ganpom1at0rba0903ft1c97g80pm8.apps.googleusercontent.com',
        callback: (resp: any) => {
          
          // this.handleLogin(resp);
          this.ngZone.run(() => {
            this.handleSignin(resp);
          });
        }
      })

      setTimeout(() => {
        google.accounts.id.renderButton(document.getElementById("google-btn"), {
          // theme: "outline",  
          text: "signin_with"
        });
      }, 10)

      if (localStorage.getItem('currentUser') != null) {
        this.isloggedIn = true;
      } else {
        this.isloggedIn = false;
      }
      }
    catch(err:any)
    {
      // console.log(err.message);
    }

    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    const rememberMeState = localStorage.getItem('rememberMe');

    if (savedEmail && savedPassword && rememberMeState === 'true') 
    {
      this.EmailId = savedEmail;
      this.Password = savedPassword;
      this.rememberMe = true; // Ensure the checkbox remains checked
    } 
    else 
    {
      this.rememberMe = false;
    }


  }

  private decodeToken(token: any) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleSignin(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential)
      
      
      var val = {
        FirstName: payLoad.given_name,
        MiddleName: undefined,
        LastName: payLoad.family_name,
        EmaiID: payLoad.email,
        MobileNumber: undefined,
        Password: undefined,
        CompanyID: undefined,
        UserTypeID: 5,
        UserRoleID: 2,
        Username: payLoad.email,
        ProfilePicturePath: payLoad.picture,
        DateOfBirth: undefined,
        IsActive: 1,
        CreatedBy: undefined,
        CreatedDate: undefined,
        GoogleID: payLoad.jti
      };
      
      this.servive.addGoogleMember(val).subscribe((data) => {
        if (data['status_code'] == 100 || data['status_code'] == 200) {
          var val = { Username: payLoad.email };
          this.servive.getGoogleMember(val).subscribe((res) => {
            this.response = res;

            if (this.response['status_code'] == 100) {
              this.User = JSON.parse(this.response['message'])[0];

              localStorage.setItem(
                'currentUser',
                JSON.stringify(this.User, this.replacer)
              );

              // localStorage.setItem(
              //   'currentUser',
              //   JSON.stringify(this.User, this.replacer)
              // );

              this.servive.updateUserState();

              if (this.returnPath == 'Home') {
                this.router.navigate(['/']);
                // this.servive.isAuthenticated = true;
              } else if (this.returnPath == 'shippingaddress') {
                var cartID = localStorage.getItem('CartID');
                this.currentUser = localStorage.getItem('currentUser');
                if (this.currentUser) {
                  this.currentUser = JSON.parse(this.currentUser);
                  var currentUserID = this.currentUser.UserID;
                }
                this.router.navigate(['/shippingaddress/' + currentUserID]);
              }
              //this.router.navigate(['/Home']);
              // this.servive.isAuthenticated = true;

              this.isloggedIn = true;
              showSuccess('You are successfully logged in');
            } else {
              this.isloggedIn = false;
              showError('Login failed try again');
              

              //alert(this.response['message']);
            }
          });
        } else {
          showError('Some error occured, data not saved');
        }
      });
    }
  }

  viewpassword() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordType = this.passwordVisible ? 'text' : 'password';
  }

  replacer(i: any, val: any) {
    if (i === 'Password') {
      return undefined;
    } else {
      return val;
    }
  }

//   login(): void {
//     if (this.validateForm()) {
//       var val = { Username: this.EmailId, Password: this.Password };
//       this.servive.getEndUserLogin(val).subscribe((res) => {
//         this.response = res;

//         if (this.response['status_code'] == 100) {
//           this.User = JSON.parse(this.response['message'])[0];
// console.log("this.User",this.User);

//           localStorage.setItem(
//             'currentUser',
//             JSON.stringify(this.User, this.replacer)
//           );
//           // Save credentials only if "Remember Me" is checked
//                // Store or remove credentials based on "Remember Me" checkbox
//                if (this.rememberMe) {
//                 localStorage.setItem('rememberedEmail', this.EmailId);
//                 localStorage.setItem('rememberedPassword', this.Password);
//                 localStorage.setItem('rememberMe', 'true'); // Store checkbox state
//               } else {
//                 localStorage.removeItem('rememberedEmail');
//                 localStorage.removeItem('rememberedPassword');
//                 localStorage.removeItem('rememberMe');
//               }
//           // localStorage.setItem(
//           //   'currentUser',
//           //   JSON.stringify(this.User, this.replacer)
//           // );

//           this.servive.updateUserState();

//           if (this.returnPath == 'Home') {
//             this.router.navigate(['/']);
//             // this.servive.isAuthenticated = true;
//           } else if (this.returnPath == 'shippingaddress') {
//             var cartID = localStorage.getItem('CartID');
//             this.currentUser = localStorage.getItem('currentUser');
//             if (this.currentUser) {
//               this.currentUser = JSON.parse(this.currentUser);
//               var currentUserID = this.currentUser.UserID;
//             }
//             this.router.navigate(['/shippingaddress/' + currentUserID]);
//           }
//           //this.router.navigate(['/Home']);
//           // this.servive.isAuthenticated = true;

//           this.isloggedIn = true;
//           showSuccess('You are successfully logged in');
//           this.rememberMe=false;
//         } else {
//           this.isloggedIn = false;
//           showError('Login failed try again');
          

//           //alert(this.response['message']);
//         }
//       });
//     }
//   }




login(): void {
  if (this.validateForm()) {
    var val = { Username: this.EmailId, Password: this.Password };
    this.servive.getEndUserLogin(val).subscribe((res) => {
      this.response = res;

      if (this.response['status_code'] == 100) {
        this.User = JSON.parse(this.response['message'])[0];
        console.log('this.User', this.User);
        localStorage.setItem('Token',this.User.Token);
        localStorage.setItem('currentUser', JSON.stringify(this.User, this.replacer));
        this.servive.getCount();
        // Store or remove credentials based on "Remember Me" checkbox
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.EmailId);
          localStorage.setItem('rememberedPassword', this.Password);
          localStorage.setItem('rememberMe', 'true'); // Store checkbox state
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
          localStorage.removeItem('rememberMe');
        }

        this.servive.updateUserState();

        // Fetch CartID after successful login
        this.servive.getCart({ UserID: this.User.UserID }).subscribe((cartRes) => {
          console.log('cartRes:', cartRes);
        
          if (cartRes.status_code === 100 && cartRes.message) {
            let cartArray = JSON.parse(cartRes.message); // Parse the JSON string
        
            if (Array.isArray(cartArray) && cartArray.length > 0) {
              const latestCart = cartArray[cartArray.length - 1]; // Get the most recent cart
              console.log('Latest Cart:', latestCart);
        
              if (!localStorage.getItem('CartID') && latestCart?.CartID) {
                localStorage.setItem('CartID', latestCart.CartID.toString());
                if (latestCart?.CompanyID) {
                  localStorage.setItem('CompanyID', latestCart.CompanyID.toString());
                }
              }
        
              // Update the cart using CartID and UserID
              if (localStorage.getItem('CartID')) {
                const updatePayload = {
                  CartID: localStorage.getItem('CartID'),
                  UserID: this.User.UserID,
                  // Add other fields as needed
                };
                this.servive.getCount(); // Refresh cart count

                this.servive.updateCart(updatePayload).subscribe((updateRes) => {
                  console.log('Cart updated:', updateRes);
                  // this.servive.getCount(); // Refresh cart count
                });
              }
            }
          }
        });
        

        // Navigate based on returnPath
        if (this.returnPath == 'Home') {
          this.router.navigate(['/']);
        } else if (this.returnPath == 'shippingaddress') {
          this.router.navigate(['/shippingaddress/' + this.User.UserID]);
        }

        this.isloggedIn = true;
        showSuccess('You are successfully logged in');
        this.rememberMe = false;
      } else {
        this.isloggedIn = false;
        showError('Login failed. Try again.');
      }
    });
  }
}



  validateForm(): boolean {
    let isFormValidate = true;

    this.emailaddress_errorMsg = '';

    this.password_errorMsg = '';
    const trimmedEmail = this.EmailId.trim();
    if (trimmedEmail.length === 0) {
      isFormValidate = false;
      this.emailaddress_errorMsg = 'Please enter email address';
    }
    else if (!/^\S+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      isFormValidate = false;
      this.emailaddress_errorMsg = 'Invalid email format. No spaces allowed';
    }

    if (this.Password.trim().length === 0) {
      isFormValidate = false;
      this.password_errorMsg = 'Password required';
    }
    return isFormValidate;
  }
  OnCheckBoxChange(event: Event) {
    this.rememberMe = (event.target as HTMLInputElement).checked;
    console.log("this.rememberMe", this.rememberMe);
  
    // Update localStorage immediately when the checkbox is toggled
    if (this.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }
  }
}
