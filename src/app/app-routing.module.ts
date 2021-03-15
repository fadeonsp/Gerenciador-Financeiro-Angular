import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'entries', loadChildren: './paginas/entries/entries.module#EntriesModule'},
  {
    path: 'categorias',
    loadChildren: './paginas/categorias/categorias.module#CategoriasModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
