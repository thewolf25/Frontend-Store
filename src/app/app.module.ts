import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryService } from '../services/category.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found.component';
import { ProductService } from 'src/services/product.service';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { BucketComponent } from './bucket/bucket.component';
import { BucketService } from './bucket.service';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { TokenInterceptor } from './token.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { LineChartComponent } from './admin/line-chart/line-chart.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCard} from '@angular/material/card';
import { RadarChartComponent } from './admin/radar-chart/radar-chart.component';
import { PolarAreaChartComponent } from './admin/polar-area-chart/polar-area-chart.component';
import { PieChartComponent } from './admin/pie-chart/pie-chart.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { HorizontalBarChartComponent } from './admin/horizontal-bar-chart/horizontal-bar-chart.component';
import { DashcharDirective } from './directives/dashchar.directive';
import { NavigationAdminComponent } from './admin/navigation-admin/navigation-admin.component';
import { SalesComponent } from './admin/sales/sales.component';
import { ClientComponent } from './admin/client/client.component';
import { LogoutComponent } from './logout/logout.component';
import { SortedProductPipe } from './sorted-product.pipe';
import { SignupComponent } from './signup/signup.component';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatTable, MatTableDataSource } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    PageNotFoundComponent,
    SingleproductComponent,
    HomeComponent,
    LoginComponent,
    BucketComponent,
    ContactComponent,
    AboutComponent,
    LineChartComponent,
    RadarChartComponent,
    HorizontalBarChartComponent,
    PolarAreaChartComponent,
    PieChartComponent,
    DashbordComponent,
    DashcharDirective,
    NavigationAdminComponent,
    SalesComponent,
    ClientComponent,
    LogoutComponent,
    SortedProductPipe,
    SignupComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    NoopAnimationsModule,
    LayoutModule,
    // MatTable,
    // MatPaginatorModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [CategoryService,ProductService,AuthService,BucketService,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            'clientId'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('734238887266536')
        }
      ]
    } as SocialAuthServiceConfig,
  }
,{
  provide: HTTP_INTERCEPTORS,
  useClass : TokenInterceptor,
  multi: true
  
}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
