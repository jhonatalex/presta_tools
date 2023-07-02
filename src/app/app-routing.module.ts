import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/components/login.component';
import { RegisterComponent } from './register/components/register.component';
import { ToolDetailComponent } from './components/tool-detail/tool-detail.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { CategoryComponent } from './components/category/category.component';
import { ConfirmationRentComponent } from './components/confirmation-rent/confirmation-rent.component';
import { ThanksRentComponent } from './components/thanks-rent/thanks-rent.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { AddToolComponent } from './components/add-tool/add-tool.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'acceso', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'herramienta/:id', component: ToolDetailComponent},
  {path: 'recupera-clave', component: RecoverPasswordComponent},
  {path: 'categoria/:id', component: CategoryComponent},
  {path: 'confirma-renta/:id', component: ConfirmationRentComponent},
  {path: 'preguntas-frecuentes', component: FrequentQuestionsComponent},
  {path: 'gracias', component: ThanksRentComponent},
  {path: 'agregar-producto', component: AddToolComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
