import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
//import { NgxStarRatingModule } from 'ngx-star-rating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ToolDetailComponent } from './components/tool-detail/tool-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { RelatedFeaturedProductsComponent } from './components/related-featured-products/related-featured-products.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageGalleryDirective } from './directives/image-gallery.directive';
import { ConfirmationRentComponent } from './components/confirmation-rent/confirmation-rent.component';
import { ThanksRentComponent } from './components/thanks-rent/thanks-rent.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { environment } from 'src/environments/environment';
import { AddToolComponent } from './components/add-tool/add-tool.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";



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
    AddToolComponent,
    UploadFileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    SlickCarouselModule,
   // NgxStarRatingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage()),

    BrowserAnimationsModule,
    NgxSpinnerModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
