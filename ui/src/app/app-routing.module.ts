import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './customer/home/home.component';
import { DetailsComponent } from './customer/details/details.component';
import { CreateComponent } from './customer/create/create.component';
import { UpdateComponent } from './customer/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'customer/home', pathMatch: 'full'},
  { path: 'customer', redirectTo: 'customer/home', pathMatch: 'full'},
  { path: 'customer/home', component: HomeComponent },
  { path: 'customer/details/:id', component: DetailsComponent },
  { path: 'customer/create', component: CreateComponent },
  { path: 'customer/update', component: UpdateComponent }
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
