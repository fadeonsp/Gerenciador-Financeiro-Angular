import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrysFormsComponent } from './entry-form/entry-form.component';
import { ListaEntryComponent } from './lista-entry/lista-entry.component';

const routes: Routes = [
  {path: '', component: ListaEntryComponent},
  {path: 'new', component: EntrysFormsComponent},
  {path: ':id/edit', component: EntrysFormsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class EntriesRoutingModule { }
