import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
//import { NgxStarRatingModule } from 'ngx-star-rating';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/components/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './register/components/register.component';
import { ToolDetailComponent } from './tool/components/tool-detail/tool-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { HeaderComponent } from './components/header/header.component';

import { RelatedFeaturedProductsComponent } from './tool/components/related-featured-products/related-featured-products.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageGalleryDirective } from './directives/image-gallery.directive';

import { ThanksRentComponent } from './components/thanks-rent/thanks-rent.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { environment } from 'src/environments/environment';

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ContactComponent } from './contact/contact.component';
import { AddToolComponent } from './tool/components/add-tool/add-tool.component';
import { AddCategoryComponent } from './category/components/add-category/add-category.component';
import { CategoryComponent } from './category/components/category/category.component';
import { ListCategoryComponent } from './category/components/list-category/list-category.component';
import { SliderCategoryComponent } from './category/components/slider-category/slider-category.component';
import { ConfirmationRentComponent } from './tool/components/confirmation-rent/confirmation-rent.component';
import { EditCategoryComponent } from './category/components/edit-category/edit-category.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ToolDetailComponent,
    FooterComponent,
    RecoverPasswordComponent,
    HeaderComponent,
    CategoryComponent,
    RelatedFeaturedProductsComponent,
    ImageGalleryDirective,
    ConfirmationRentComponent,
    ThanksRentComponent,
    FrequentQuestionsComponent,
    AddToolComponent,
    ContactComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    SliderCategoryComponent,
    EditCategoryComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlickCarouselModule,
   // NgxStarRatingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage()),

    BrowserAnimationsModule,
    NgxSpinnerModule,
    SweetAlert2Module

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
