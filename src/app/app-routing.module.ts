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
import { VerifyGuard } from './login/auth/verify.guard';
import { PaymentGatewayComponent } from './payment/components/payment-gateway/payment-gateway.component';
import { FailsTransactionComponent } from './components/fails-transaction/fails-transaction.component';
import { VerifyLenderComponent } from './Lender/components/verify-lender/verify-lender.component';
import { VerifyLenderGuard } from './login/auth/verify-lender.guard';
import { DashboardComponent } from './Lender/components/dashboard/dashboard.component';
import { UpdateLenderComponent } from './Lender/components/update-lender/update-lender.component';
import { UpdateToolComponent } from './tool/components/update-tool/update-tool.component';

const routes: Routes = [

  //RAIMUNDO Y TODO EL MUNDO
  {path: '', component: HomeComponent},
  {path: 'acceso', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'producto/:id', component: ToolDetailComponent},
  {path: 'categoria/:id', component: CategoryComponent},
  {path: 'preguntas-frecuentes', component: FrequentQuestionsComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'recupera-clave', component: RecoverPasswordComponent},



  //RUTAS PRIVADAS SOLO USER LOGEADO
  {path: 'verificar-usuario', component: VerifyUserComponent,
  canActivate:[AuthGuard]
  },

  {path: 'verificar-prestatool', component: VerifyLenderComponent,
  canActivate:[AuthGuard]
  },



  //Rutas USER LOGEADO Y VERIFICADO
  {
    path: 'confirma-renta/:id', component: ConfirmationRentComponent,
    canActivate:[AuthGuard,VerifyGuard]
  },
  {
    path: 'agregar-producto', component: AddToolComponent,
    canActivate:[AuthGuard,VerifyLenderGuard],
  },
  {
    path:'actualizar-producto/:id', component: UpdateToolComponent,
    canActivate:[AuthGuard,VerifyLenderGuard]},
  {
    path: 'panel', component: DashboardComponent,
    canActivate:[AuthGuard,VerifyLenderGuard]},
  {
    path:'actualizar-prestatool', component: UpdateLenderComponent,
    canActivate:[AuthGuard,VerifyLenderGuard]},




  //Rutas VERIFICADO

  {
    path: 'gracias', component: ThanksRentComponent,
    canActivate:[VerifyGuard]
  },

  {
    path: 'transaccion-fallida', component: FailsTransactionComponent,
    canActivate:[VerifyGuard]
  },

  {
    path: 'confirmar-transaccion', component: PaymentGatewayComponent,
    canActivate:[VerifyGuard]
  },



  //RUTAS PRIVADAS SOLO ADMIN
  {path: 'listar-categoria', component: ListCategoryComponent,
  canActivate:[HasRoleGuard],
  data:{
    allowedRoles:['Manager']
  },
  },

  {path: 'agregar-categoria', component: AddCategoryComponent,
  canActivate:[HasRoleGuard],
  data:{
    allowedRoles:['Manager']
  }
  },

  {path: 'editar-categoria/:id', component: EditCategoryComponent,
  canActivate:[HasRoleGuard],
  data:{
    allowedRoles:['Manager']
  }
  },





  {path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
