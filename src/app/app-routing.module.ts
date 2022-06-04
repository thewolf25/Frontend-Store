import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';
import { AboutComponent } from './about/about.component';
import { BucketComponent } from './bucket/bucket.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found.component';
import { ProductComponent } from './product/product.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { LineChartComponent } from './admin/line-chart/line-chart.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { NavigationAdminComponent } from './admin/navigation-admin/navigation-admin.component';
import { SalesComponent } from './admin/sales/sales.component';
import { ClientComponent } from './admin/client/client.component';
import { LoginguardGuard } from './loginguard.guard';
import { LogoutGuard } from './logout.guard';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/detail', pathMatch: 'full'},
  { path:'login',component:LoginComponent , canActivate:[LogoutGuard]},
  {path :'logout', component:LogoutComponent, canActivate: [LoginguardGuard] },
  { path:'home',component:HomeComponent},
  {path:'register', component:SignupComponent , canActivate:[LogoutGuard] },
  { path :"singleProduct/:id", component: SingleproductComponent},
  { path :"products/:id", component: ProductComponent},
  { path: "checkout", component: BucketComponent},
  { path:"contact" , component:ContactComponent},
  { path:"about" , component:AboutComponent},
  {path: "chartLine", component:LineChartComponent},

  {path: "admin" , component:NavigationAdminComponent, children:[
    
    {path  :'dashboard' , component:DashbordComponent },
    {path  :'sales' , component:SalesComponent },
    {path  :'client' , component:ClientComponent },


  ]},
  { path: '**', component: PageNotFoundComponent }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
