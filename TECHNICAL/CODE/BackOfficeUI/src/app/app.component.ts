import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Back Office';
  UserRoleID:any;
  //MenuHeaderCaption:any;
  //MenuHeaderURL:any;
  userPermissions:any;
  rishabh:any;
  

  constructor( public sharedService: SharedService,private service: SharedService){
   
   //this.refreshusermenuList();
       // if(this.sharedService.isAuthenticated){
    //   this.router.navigate(['']); 
    // }
    // else{
    //   this.router.navigate(['Login']); 
    // }
    
  }
  
  
  // @Input()
 
  // hey:any;
  // usermenuList:any=[];
  // usermenu:any;

  // logout(){
  //   localStorage.removeItem('BoUser');
  //   this.sharedService.isAuthenticated =false;
  //   this.router.navigate(['Login']);
  //   this.refreshusermenuList();
  // }

  // bindMenu(dataItem: any){    
  //   console.log('data');
  //   console.log(dataItem);
  //   this.usermenuList = dataItem;
  // }

  // refreshusermenuList() {
  //   let UserRoleID ;
  //    if(this.sharedService.isAuthenticated){

  //     UserRoleID = this.service.currentUser["UserRoleID"]  ;
  //     alert(UserRoleID);
  //   }
  //   let val = {UserRoleID : UserRoleID}

  //   this.service.getusermenuList(val).subscribe(data => {
      
  //     if (data["status_code"] == 100) {
  //       this.usermenuList = JSON.parse(data["message"]);
  //       console.log(this.usermenuList); 
  //       this.userPermissions = this?.usermenuList.reduce((acc:any, ele:any) => {
  //         if (acc.length === 0) {
  //           acc.push(this.getModifiedMainMenu(ele));
  //           return acc;
  //         } else {
  //           const existedMenu = acc.find((m:any) => m.MenuHeaderCaption === ele.MenuHeaderCaption);
  //           if (existedMenu) {
  //             existedMenu.MenuSubHeaderCaption.push(this.getSubMenu(ele));
  //             return acc;
  //           } else {
  //             acc.push(this.getModifiedMainMenu(ele));
  //             return acc;
  //           }
  //         }
  //       }, []);
  //       console.log(this.userPermissions);     
  //     }
  //   })

    
  // }
  

  // getModifiedMainMenu(obj:any) {
  //   return {
  //     MenuHeaderCaption: obj.MenuHeaderCaption,
  //     MenuHeaderURL: obj.MenuHeaderURL,
  //     MenuSubHeaderCaption: [this.getSubMenu(obj)]
  //   };
  // }

  // getSubMenu(obj:any) {
  //   return {
  //     MenuHeaderCaption: obj.MenuHeaderCaption,
  //     MenuSubHeaderID: obj.MenuSubHeaderID,
  //     MenuSubHeaderCaption: obj.MenuSubHeaderCaption,
  //     MenuSubHeaderURL: obj.MenuSubHeaderURL
  //   };
  // }

  

  // changeSubMenus(event:any, MenuHeaderCaption:any, id:any) {
  //   console.log(MenuHeaderCaption, id);
  // }
 
}
