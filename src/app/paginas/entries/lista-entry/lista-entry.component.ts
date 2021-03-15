import { Component, OnInit } from '@angular/core';

import { EntryService } from '../shared-entries/entry.service';
import { Entry } from '../shared-entries/entry.model';

@Component({
  selector: 'app-lista-entries',
  templateUrl: './lista-entry.component.html',
  styleUrls: ['./lista-entry.component.css']
})
export class ListaEntryComponent implements OnInit {

    entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries,
      () => alert('Erro na lista')

    )
  }
  deleteEntry(entry) {
    const mustDelete = confirm('Deseja excluir este item ?');

      if(mustDelete){
        this.entryService.delete(entry.id).subscribe(
          () => this.entries = this.entries.filter(element => element != entry),
          () => alert('Erro ao tentar excluir')
        )
      }
  }

}
