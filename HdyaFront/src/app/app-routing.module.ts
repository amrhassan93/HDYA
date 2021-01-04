import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { SearchComponent } from './Components/search/search.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CartComponent } from './Components/cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SignupComponent } from './Components/signup/signup.component';
import { EditComponent } from './Components/edit/edit.component'
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { AboutComponent } from './Components/about/about.component';
import { LoaderComponent } from './Components/loader/loader.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'profile',component:ProfileComponent},
  {path:'about',component:AboutComponent},
  {path:'profile/edit',component:EditComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'product/createproduct',component:CreateProductComponent},
  {path:'signup',component:SignupComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'productdetails/:id',component:ProductDetailsComponent},
  {path:'search',component:SearchComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'**',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
