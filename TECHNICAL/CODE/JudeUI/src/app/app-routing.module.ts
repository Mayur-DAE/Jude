import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { ChannelPartnerSignUpComponent } from './login/channel-partner-sign-up/channel-partner-sign-up.component';
import { LoginComponent } from './login/login.component';

import { MemberSignupComponent } from './login/member-signup/member-signup.component';
import { SearchflowComponent } from './searchflow/searchflow.component';
import { CompanypageComponent } from './companypage/companypage.component';
import { CompanyproductComponent } from './companyproduct/companyproduct.component';
import { YourcartComponent } from './yourcart/yourcart.component';
import { ShippingaddressComponent } from './shippingaddress/shippingaddress.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsSearchComponent } from './products-search/products-search.component';
import { ProductsSearchByCategoryComponent } from './products-search/products-search-by-category/products-search-by-category.component';

import { AboutUsComponent } from './static_pages/about-us/about-us.component';
import { TermsAndConditionsComponent } from './static_pages/terms-and-conditions/terms-and-conditions.component';
import { PrivaryPolicyComponent } from './static_pages/privary-policy/privary-policy.component';
import { DisclaimerComponent } from './static_pages/disclaimer/disclaimer.component';
import { FaqComponent } from './static_pages/faq/faq.component';
import { ContactUsComponent } from './static_pages/contact-us/contact-us.component';
import { DepartmentComponent } from './department/department.component';
import { ViewInvoiceComponent } from './login/view-invoice/view-invoice.component';
import { VerificationComponent } from './login/verification/verification.component';

import { RefundAndCancellationComponent } from './refund-and-cancellation/refund-and-cancellation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Location', component: LocationComponent },
  { path: 'CompanySignup', component: ChannelPartnerSignUpComponent },

  { path: 'MemberSignup', component: MemberSignupComponent },
  { path: 'Shops', component: SearchflowComponent },
  { path: 'Login/:id', component: LoginComponent },
  { path: 'shop/:id', component: CompanypageComponent },
  { path: 'companyproduct/:id', component: CompanyproductComponent },
  { path: 'Yourcart/:id', component: YourcartComponent },
  { path: 'shippingaddress/:id', component: ShippingaddressComponent },
  { path: 'OrderSuccess/:id', component: OrderSuccessComponent },
  { path: 'ProductsSearch/:id', component: ProductsSearchComponent },
  { path: 'Products/:id', component: ProductsSearchByCategoryComponent },

  { path: 'AboutUs', component: AboutUsComponent },
  {
    path: 'TermsAndConditions',
    component: TermsAndConditionsComponent,
  },
  { path: 'PrivacyPolicy', component: PrivaryPolicyComponent },
  { path: 'Disclaimer', component: DisclaimerComponent },
  { path: 'FAQ', component: FaqComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  { path: 'Department', component: DepartmentComponent },
  { path: 'orderDetails/:id', component: ViewInvoiceComponent },
  { path: 'Verification', component: VerificationComponent },
  { path: 'RefundAndCancellation', component: RefundAndCancellationComponent },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],

// })
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      useHash: false,
      anchorScrolling: 'enabled',
    }),
    BrowserModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
