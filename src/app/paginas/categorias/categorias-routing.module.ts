import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { CategoriasFormsComponent } from './categorias-forms/categorias-forms.component';

const routes: Routes = [
  { path: '', component: ListaCategoriasComponent },
  { path: ':new', component: CategoriasFormsComponent },
  { path: ':id/editar', component: CategoriasFormsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],


exports: [RouterModule]
})
export class CategoriasRoutingModule { }
