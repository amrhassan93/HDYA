import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { SearchComponent } from './Components/search/search.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EditComponent } from './Components/edit/edit.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { ValidateEqualModule } from 'ng-validate-equal';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {trigger,state,style,animate,transition,} from '@angular/animations';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { ReactiveValidationModule } from 'angular-reactive-validation';
import { CustomFormsModule } from 'ng2-validation'
import { DollartoegpPipe } from './Pipes/dollartoegp.pipe';
import { AboutComponent } from './Components/about/about.component';
import { AlertModule } from './_alert';
import { LoaderComponent } from './Components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    CheckoutComponent,
    ProductDetailsComponent,
    SearchComponent,
    ProfileComponent,
    EditComponent,
    CreateProductComponent,
    PagenotfoundComponent,
    DollartoegpPipe,
    AboutComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ValidateEqualModule,
    BrowserAnimationsModule,
    AnimateOnScrollModule.forRoot(),
    CustomFormsModule,
    ReactiveValidationModule,
    AlertModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
