import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { ChannelPartnerSignUpComponent } from './login/channel-partner-sign-up/channel-partner-sign-up.component';

import { MemberSignupComponent } from './login/member-signup/member-signup.component';
import { YourcartComponent } from './yourcart/yourcart.component';
import { SearchflowComponent } from './searchflow/searchflow.component';
import { CompanypageComponent } from './companypage/companypage.component';
import { AboutusComponent } from './companypage/aboutus/aboutus.component';
import { ReviewanratingComponent } from './companypage/reviewanrating/reviewanrating.component';
import { CompanyproductComponent } from './companyproduct/companyproduct.component';
import { ShippingaddressComponent } from './shippingaddress/shippingaddress.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { UserProfileComponent } from './login/user-profile/user-profile.component';
import { ProductsSearchComponent } from './products-search/products-search.component';
import { ProductsSearchByCategoryComponent } from './products-search/products-search-by-category/products-search-by-category.component';
// Static Pages

import { PrivaryPolicyComponent } from './static_pages/privary-policy/privary-policy.component';
import { AboutUsComponent } from './static_pages/about-us/about-us.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TermsAndConditionsComponent } from './static_pages/terms-and-conditions/terms-and-conditions.component';
import { DisclaimerComponent } from './static_pages/disclaimer/disclaimer.component';
import { FaqComponent } from './static_pages/faq/faq.component';
import { ContactUsComponent } from './static_pages/contact-us/contact-us.component';
import { ReviewsComponent } from './companypage/reviews/reviews.component';
import { ViewInvoiceComponent } from './login/view-invoice/view-invoice.component';

import { DepartmentComponent } from './department/department.component';
import { VerificationComponent } from './login/verification/verification.component';
import { RefundAndCancellationComponent } from './refund-and-cancellation/refund-and-cancellation.component';


// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationComponent,
    LoginComponent,
    ChannelPartnerSignUpComponent,
    PrivaryPolicyComponent,
    MemberSignupComponent,
    YourcartComponent,
    SearchflowComponent,
    CompanypageComponent,
    AboutusComponent,
    ReviewanratingComponent,
    CompanyproductComponent,
    ShippingaddressComponent,
    OrderSuccessComponent,
    UserProfileComponent,
    ProductsSearchComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    DisclaimerComponent,
    FaqComponent,
    ContactUsComponent,
    ReviewsComponent,
    ProductsSearchByCategoryComponent,
    ViewInvoiceComponent,
    DepartmentComponent,
    VerificationComponent,
    RefundAndCancellationComponent,
    ViewCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    SharedService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
