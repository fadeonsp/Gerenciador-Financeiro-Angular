import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntriesRoutingModule } from './entries-routing.module';
import { ListaEntryComponent } from './lista-entry/lista-entry.component';
import { EntrysFormsComponent } from './entry-form/entry-form.component';
@NgModule({
  declarations: [
    ListaEntryComponent,
    EntrysFormsComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
