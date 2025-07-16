import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { FaqComponent } from './faq/faq.component';
import { OrderComponent } from './order/order.component';
import { BusinesstypesComponent } from './businesstypes/businesstypes.component';
import { MembershipComponent } from './membership/membership.component';
import { CompanySourcesComponent } from './company-sources/company-sources.component';
import { UsertypesComponent } from './usertypes/usertypes.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthenticationGuard } from './authentication.guard';
import { CompanyComponent } from './company/company.component';
import { ReviewComponent } from './review/review.component';
import { OffersComponent } from './offers/offers.component';
import { ProductsComponent } from './products/products.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductsubcategoryComponent } from './productsubcategory/productsubcategory.component';
import { SettlementComponent } from './settlement/settlement.component';
import { ReportComponent } from './report/report.component';
import { InvoiceComponent } from './invoice/invoice.component';

import { CompanyinvoiceComponent } from './companyinvoice/companyinvoice.component';
import { DeliverypricesettlementComponent } from './deliverypricesettlement/deliverypricesettlement.component';
import { SummaryorderreportComponent } from './summaryorderreport/summaryorderreport.component';

import { ReportExpiredShopComponent } from './report-expired-shop/report-expired-shop.component';

import { ServiceProviderWalletComponent } from './service-provider-wallet/service-provider-wallet.component';

import { ShiprocketStatementComponent } from './shiprocket-statement/shiprocket-statement.component';

import { OnlinemembershippaymentComponent } from './onlinemembershippayment/onlinemembershippayment.component';

import { AdminProductsComponent } from './admin-products/admin-products.component'
import { VerificationComponent } from './login/verification/verification.component';

import { EnquiryComponent } from './enquiry/enquiry.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Verification',
    component: VerificationComponent,
  },
  {
    path: 'Home',
    canActivate: [AuthenticationGuard],
    component: HomeComponent,
  },
  {
    path: 'User',
    canActivate: [AuthenticationGuard],
    component: UserComponent,
  },
  {
    path: 'BusinessType',
    canActivate: [AuthenticationGuard],
    component: BusinesstypesComponent,
  },
  {
    path: 'CompanyMembershipType',
    canActivate: [AuthenticationGuard],
    component: MembershipComponent,
  },
  {
    path: 'CompanySource',
    canActivate: [AuthenticationGuard],
    component: CompanySourcesComponent,
  },
  {
    path: 'Faq',
    canActivate: [AuthenticationGuard],
    component: FaqComponent,
  },
  {
    path: 'Order',
    canActivate: [AuthenticationGuard],
    component: OrderComponent,
  },
  {
    path: 'UserTypes',
    canActivate: [AuthenticationGuard],
    component: UsertypesComponent,
  },
  {
    path: 'EndUser',
    canActivate: [AuthenticationGuard],
    component: CustomerComponent,
  },
  {
    path: 'Company',
    canActivate: [AuthenticationGuard],
    component: CompanyComponent,
  },
  {
    path: 'Company/:id',
    canActivate: [AuthenticationGuard],
    component: CompanyComponent,
  },
  {
    path: 'Review',
    canActivate: [AuthenticationGuard],
    component: ReviewComponent,
  },
  {
    path: 'Offers',
    canActivate: [AuthenticationGuard],
    component: OffersComponent,
  },
  {
    path: 'Product-old',
    canActivate: [AuthenticationGuard],
    component: ProductsComponent,
  },
  {
    path: 'ProductCategory',
    canActivate: [AuthenticationGuard],
    component: ProductcategoryComponent,
  },
  {
    path: 'ProductSubCategory',
    canActivate: [AuthenticationGuard],
    component: ProductsubcategoryComponent,
  },
  {
    path: 'Report',
    canActivate: [AuthenticationGuard],
    component: ReportComponent,
  },
  {
    path: 'Invoice/:id',
    canActivate: [AuthenticationGuard],
    component: InvoiceComponent,
  },

  {
    path: 'MembershipInvoice',
    canActivate: [AuthenticationGuard],
    component: CompanyinvoiceComponent,
  },
  {
    path: 'ShopPaymentSettlement',
    canActivate: [AuthenticationGuard],
    component: SettlementComponent,
  },
  {
    path: 'ShippingPaymentsettlement',
    canActivate: [AuthenticationGuard],
    component: DeliverypricesettlementComponent,
  },
  {
    path: 'Ordersummaryreport',
    canActivate: [AuthenticationGuard],
    component: SummaryorderreportComponent,
  },
  {
    path: 'ReportExpiredShop',
    canActivate: [AuthenticationGuard],
    component: ReportExpiredShopComponent,
  },
  {
    path: 'ServiceProviderWallet',
    canActivate: [AuthenticationGuard],
    component: ServiceProviderWalletComponent,
  },

  {
    path: 'ShiprocketStatement',
    canActivate: [AuthenticationGuard],
    component: ShiprocketStatementComponent,
  },
  {
    path: 'membershipupgrade',
    canActivate: [AuthenticationGuard],
    component: OnlinemembershippaymentComponent,
  },
  {
    path: 'Product',
    canActivate: [AuthenticationGuard],
    component: AdminProductsComponent,
  },
  {
    path: 'Enquiry',
    canActivate: [AuthenticationGuard],
    component: EnquiryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
