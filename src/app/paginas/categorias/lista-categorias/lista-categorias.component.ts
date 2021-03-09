import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../shared/categoria.service';
import { Categoria } from '../shared/categoria.model';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

    categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias,
      () => alert('Erro na lista')

    )
  }
  deleteCategoria(categoria) {
    const mustDelete = confirm('Deseja excluir este item ?');

      if(mustDelete){
        this.categoriaService.delete(categoria.id).subscribe(
          () => this.categorias = this.categorias.filter(element => element != categoria),
          () => alert('Erro ao tentar excluir')
        )
      }
  }

}
