import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { ShowTestComponent } from './test/show-test/show-test.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './shared.service';
import { NgxPrintModule } from 'ngx-print';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ShowUserComponent } from './user/show-user/show-user.component';
import { AddEditUserComponent } from './user/add-edit-user/add-edit-user.component';
import { FaqComponent } from './faq/faq.component';
import { AddEditFaqComponent } from './faq/add-edit-faq/add-edit-faq.component';
import { ShowFaqComponent } from './faq/show-faq/show-faq.component';
import { OrderComponent } from './order/order.component';
import { ShowDetailComponent } from './order/show-detail/show-detail.component';
import { ShowOrderComponent } from './order/show-order/show-order.component';
import { BusinesstypesComponent } from './businesstypes/businesstypes.component';
import { AddEditBusinesstypesComponent } from './businesstypes/add-edit-businesstypes/add-edit-businesstypes.component';
import { ShowBusinesstypesComponent } from './businesstypes/show-businesstypes/show-businesstypes.component';
import { MembershipComponent } from './membership/membership.component';
import { AddEditMembershipComponent } from './membership/add-edit-membership/add-edit-membership.component';
import { ShowMembershipComponent } from './membership/show-membership/show-membership.component';
import { CompanySourcesComponent } from './company-sources/company-sources.component';
import { AddEditCompanySourcesComponent } from './company-sources/add-edit-company-sources/add-edit-company-sources.component';
import { ShowCompanySourcesComponent } from './company-sources/show-company-sources/show-company-sources.component';
import { UsertypesComponent } from './usertypes/usertypes.component';
import { AddEditUsertypeComponent } from './usertypes/add-edit-usertype/add-edit-usertype.component';
import { ShowUsertypeComponent } from './usertypes/show-usertype/show-usertype.component';
import { CustomerComponent } from './customer/customer.component';
import { ShowCustomerComponent } from './customer/show-customer/show-customer.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { AddEditCompanyComponent } from './company/add-edit-company/add-edit-company.component';
import { ShowCompanyComponent } from './company/show-company/show-company.component';
import { ReviewComponent } from './review/review.component';
import { ShowRevComponent } from './review/show-rev/show-rev.component';
// import { ShowRevComponent } from './review/show-review/show-review.component';
import { OffersComponent } from './offers/offers.component';
import { AddEditOffersComponent } from './offers/add-edit-offers/add-edit-offers.component';
import { ShowOffersComponent } from './offers/show-offers/show-offers.component';
import { OrderDeliveryTypeComponent } from './order-delivery-type/order-delivery-type.component';
import { AddEditOrderDeliveryTypeComponent } from './order-delivery-type/add-edit-order-delivery-type/add-edit-order-delivery-type.component';
import { ShowOrderDeliveryTypeComponent } from './order-delivery-type/show-order-delivery-type/show-order-delivery-type.component';
import { UpdateEditRevComponent } from './review/update-edit-rev/update-edit-rev.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { AddEditProductcategoryComponent } from './productcategory/add-edit-productcategory/add-edit-productcategory.component';
import { ShowProductcategoryComponent } from './productcategory/show-productcategory/show-productcategory.component';
import { ProductsubcategoryComponent } from './productsubcategory/productsubcategory.component';
import { AddEditProductsubcategoryComponent } from './productsubcategory/add-edit-productsubcategory/add-edit-productsubcategory.component';
import { ShowProductsubcategoryComponent } from './productsubcategory/show-productsubcategory/show-productsubcategory.component';
import { SettlementComponent } from './settlement/settlement.component';
import { AddEditSettlementComponent } from './settlement/add-edit-settlement/add-edit-settlement.component';
import { ShowSettlementComponent } from './settlement/show-settlement/show-settlement.component';
import { ProductsComponent } from './products/products.component';
import { AddEditProductsComponent } from './products/add-edit-products/add-edit-products.component';
import { ShowProductsComponent } from './products/show-products/show-products.component';
import { AddcompanyinvoiceComponent } from './companyinvoice/addcompanyinvoice/addcompanyinvoice.component';
import { ShowcompanyinvoiceComponent } from './companyinvoice/showcompanyinvoice/showcompanyinvoice.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { LayoutComponent } from './layout/layout.component';

import { ShowReportComponent } from './report/show-report/show-report.component';

import { InvoiceComponent } from './invoice/invoice.component';
import { CompanyinvoiceComponent } from './companyinvoice/companyinvoice.component';
import { GenerateinvoiceComponent } from './companyinvoice/generateinvoice/generateinvoice.component';

import { DeliverypricesettlementComponent } from './deliverypricesettlement/deliverypricesettlement.component';
import { SummaryorderreportComponent } from './summaryorderreport/summaryorderreport.component';

import { ReportExpiredShopComponent } from './report-expired-shop/report-expired-shop.component';

import { ServiceProviderWalletComponent } from './service-provider-wallet/service-provider-wallet.component';
import { ShiprocketStatementComponent } from './shiprocket-statement/shiprocket-statement.component';
import { OnlinemembershippaymentComponent } from './onlinemembershippayment/onlinemembershippayment.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ShowAdminProductsComponent } from './admin-products/show-admin-products/show-admin-products.component';
import { AddEditAdminProductsComponent } from './admin-products/add-edit-admin-products/add-edit-admin-products.component';
import { VerificationComponent } from './login/verification/verification.component';
import { CompanyAddressComponent } from './company/company-address/company-address.component';
import { CompanyBankDetailsComponent } from './company/company-bank-details/company-bank-details.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { ShowEnquiryComponent } from './enquiry/show-enquiry/show-enquiry.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
@NgModule({
  declarations: [
    CompanyBankDetailsComponent,
    CompanyAddressComponent,
    CompanyinvoiceComponent,
    ShowcompanyinvoiceComponent,
    GenerateinvoiceComponent,
    AddcompanyinvoiceComponent,
    AppComponent,
    TestComponent,
    ShowTestComponent,
    LoginComponent,
    UserComponent,
    ChangePasswordComponent,
    ShowUserComponent,
    AddEditUserComponent,
    FaqComponent,
    AddEditFaqComponent,
    ShowFaqComponent,
    OrderComponent,
    ShowDetailComponent,
    ShowOrderComponent,
    BusinesstypesComponent,
    AddEditBusinesstypesComponent,
    ShowBusinesstypesComponent,
    MembershipComponent,
    AddEditMembershipComponent,
    ShowMembershipComponent,
    CompanySourcesComponent,
    AddEditCompanySourcesComponent,
    ShowCompanySourcesComponent,
    UsertypesComponent,
    AddEditUsertypeComponent,
    ShowUsertypeComponent,
    CustomerComponent,
    ShowCustomerComponent,
    HomeComponent,
    CompanyComponent,
    AddEditCompanyComponent,
    ShowCompanyComponent,
    ReviewComponent,
    ShowRevComponent,
    OffersComponent,
    AddEditOffersComponent,
    ShowOffersComponent,
    OrderDeliveryTypeComponent,
    AddEditOrderDeliveryTypeComponent,
    ShowOrderDeliveryTypeComponent,
    UpdateEditRevComponent,
    ProductcategoryComponent,
    AddEditProductcategoryComponent,
    ShowProductcategoryComponent,
    ProductsubcategoryComponent,
    AddEditProductsubcategoryComponent,
    ShowProductsubcategoryComponent,
    SettlementComponent,
    AddEditSettlementComponent,
    ShowSettlementComponent,
    ProductsComponent,
    AddEditProductsComponent,
    ShowProductsComponent,
    ReportComponent,
    LayoutComponent,
    ShowReportComponent,
    InvoiceComponent,
    DeliverypricesettlementComponent,
    SummaryorderreportComponent,
    ReportExpiredShopComponent,
    ServiceProviderWalletComponent,
    ShiprocketStatementComponent,
    OnlinemembershippaymentComponent,
    AdminProductsComponent,
    ShowAdminProductsComponent,
    AddEditAdminProductsComponent,
    VerificationComponent,
    EnquiryComponent,
    ShowEnquiryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ],
  providers: [
    SharedService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
       {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
