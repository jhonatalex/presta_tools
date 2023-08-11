import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/components/login.component';
import { RegisterComponent } from './register/components/register.component';
import { ToolDetailComponent } from './tool/components/tool-detail/tool-detail.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';


import { ThanksRentComponent } from './components/thanks-rent/thanks-rent.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';

import { ContactComponent } from './components/contact/contact.component';
import { AuthGuard } from './login/auth/auth.guard';
import { AddToolComponent } from './tool/components/add-tool/add-tool.component';
import { CategoryComponent } from './category/components/category/category.component';
import { AddCategoryComponent } from './category/components/add-category/add-category.component';
import { ListCategoryComponent } from './category/components/list-category/list-category.component';
import { ConfirmationRentComponent } from './tool/components/confirmation-rent/confirmation-rent.component';
import { EditCategoryComponent } from './category/components/edit-category/edit-category.component';
import { VerifyUserComponent } from './Lender/components/verify-user/verify-user.component';
import { HasRoleGuard } from './login/auth/has-role.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'acceso', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'herramienta/:id', component: ToolDetailComponent},
  {path: 'recupera-clave', component: RecoverPasswordComponent},
  {path: 'categoria/:id', component: CategoryComponent},
  {path: 'preguntas-frecuentes', component: FrequentQuestionsComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'verifica-usuario', component: VerifyUserComponent},



  //RUTAS PRIVADAS SOLO USER
  {
    path: 'confirma-renta/:id', component: ConfirmationRentComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'gracias', component: ThanksRentComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'agregar-producto', component: AddToolComponent,
    canActivate:[AuthGuard]
  },




  //RUTAS PRIVADAS SOLO ADMIN
  {path: 'listar-categoria', component: ListCategoryComponent,
  canLoad:[HasRoleGuard],
  data:{
    allwedRoles:['Manager']
  }
  },

  {path: 'agregar-categoria', component: AddCategoryComponent,
  canLoad:[HasRoleGuard],
  data:{
    allwedRoles:['Manager']
  }
  },

  {path: 'editar-categoria/:id', component: EditCategoryComponent,
  canLoad:[HasRoleGuard],
  data:{
    allwedRoles:['Manager']
  }
  },








  {path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
