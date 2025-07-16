import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, NavigationEnd} from '@angular/router';
import { ChangePasswordComponent } from '../user/change-password/change-password.component';
declare function closePopup(id:any):any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  title = 'Back Office';
  UserRoleID: any;
  //MenuHeaderCaption:any;
  //MenuHeaderURL:any;
  userPermissions: any;
  currentUser: any;
  selectedMenu: string | null = null; // Track the selected menu
  selectedSubMenu: string | null = null; // Track the selected submenu
  submenuStates: { [key: string]: boolean } = {}; // Track submenu open/close states
  isSidebarOpen: boolean = true;
  constructor(
    public sharedService: SharedService,
    private router: Router,
    private service: SharedService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

   @ViewChild(ChangePasswordComponent) changePasswordComponent!: ChangePasswordComponent;
    resetVerificationInput() {
      if (this.changePasswordComponent) {
        this.changePasswordComponent.closeModal(); 
      }
    }

  ngOnInit(): void {
    this.refreshusermenuList();
    document.body.classList.toggle('sidebar-icon-only', !this.isSidebarOpen);
  }

  @Input()
  hey: any;
  usermenuList: any = [];
  usermenu: any;

  logout() {
    localStorage.removeItem('addressProfileCompleted');
    localStorage.removeItem('bankProfileCompleted');
    localStorage.removeItem('BoUser');
    this.sharedService.isAuthenticated = false;
    this.router.navigate(['Login']);
    this.refreshusermenuList();
    this.service.currentUser = null;
    this.service.currentUserID = null;
    closePopup('logout');
    window.location.reload();  
  }

  bindMenu(dataItem: any) {   
    console.log(dataItem);
    this.usermenuList = dataItem;
  }

  refreshusermenuList() {
    this.currentUser = localStorage.getItem('BoUser');

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.UserRoleID = this.currentUser.UserRoleID;
    }

    let val = { UserRoleID: this.UserRoleID };

    this.service.getusermenuList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.usermenuList = JSON.parse(data['message']);
        console.log(this.usermenuList);
        this.userPermissions = this?.usermenuList.reduce(
          (acc: any, ele: any) => {
            if (acc.length === 0) {
              acc.push(this.getModifiedMainMenu(ele));
              return acc;
            } else {
              const existedMenu = acc.find(
                (m: any) => m.MenuHeaderCaption === ele.MenuHeaderCaption
              );
              if (existedMenu) {
                existedMenu.MenuSubHeaderCaption.push(this.getSubMenu(ele));
                return acc;
              } else {
                acc.push(this.getModifiedMainMenu(ele));
                return acc;
              }
            }
          },
          []
        );
        console.log(this.userPermissions);
      }
    });
  }

  getModifiedMainMenu(obj: any) {
    return {
      MenuHeaderCaption: obj.MenuHeaderCaption,
      MenuHeaderURL: obj.MenuHeaderURL,
      MenuIconPath: obj.MenuIconPath,

      MenuSubHeaderCaption: [this.getSubMenu(obj)],
    };
  }

  getSubMenu(obj: any) {
    return {
      MenuHeaderCaption: obj.MenuHeaderCaption,
      MenuSubHeaderID: obj.MenuSubHeaderID,
      MenuSubHeaderCaption: obj.MenuSubHeaderCaption,
      MenuSubHeaderIconPath: obj.MenuSubHeaderIconPath,
      MenuSubHeaderURL: obj.MenuSubHeaderURL,
    };
  }

  changeSubMenus(event: any, MenuHeaderCaption: any, id: any) {
    console.log(MenuHeaderCaption, id);
  }
  selectMenu(menuHeaderCaption: string) {
    this.selectedMenu = menuHeaderCaption;
    this.selectedSubMenu = null; // Reset submenu selection
  
    // Close all other submenus when opening a new menu
    const allSubmenus = document.querySelectorAll('.collapse.show');
    allSubmenus.forEach(submenu => submenu.classList.remove('show'));
    this.closeSidebar(); // Close sidebar after selection
  }
  toggleSubMenu(menuHeaderCaption: string) {
    this.submenuStates[menuHeaderCaption] = !this.submenuStates[menuHeaderCaption]; // Toggle submenu state
  }

  // Method to handle submenu selection
  selectSubMenu(menuHeaderCaption: string, subMenuId: string) {
    this.selectedMenu = menuHeaderCaption; // Set the parent menu as selected
    this.selectedSubMenu = subMenuId; // Set the specific submenu as selected
    this.closeSidebar(); // Close sidebar after selection
  }

  
  // Toggle Sidebar only for mobile view
toggleSidebar() {
  // if (window.innerWidth <= 768) { // Apply only for mobile screens (<= 768px)
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.classList.toggle('sidebar-icon-only', !this.isSidebarOpen);
  // }
  
}

// Close Sidebar only for mobile view
closeSidebar() {
  if (window.innerWidth <= 768) { 
    this.isSidebarOpen = false;
  }
}

  
}
