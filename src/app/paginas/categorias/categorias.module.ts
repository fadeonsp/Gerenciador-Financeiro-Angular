import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { CategoriasFormsComponent } from './categorias-forms/categorias-forms.component';

@NgModule({
  declarations: [ListaCategoriasComponent, CategoriasFormsComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
