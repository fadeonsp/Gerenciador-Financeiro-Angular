import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categoria } from './paginas/categorias/shared/categoria.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb(){
    const categorias: Categoria[] = [

      { id: 1, nome: "Moradia", descricao: "Pagamentos de contas da casa" },
      { id: 2, nome: "Saúde", descricao: "Planos de saúde" },
      { id: 3, nome: "Lazer", descricao: "cinema, parques, praia, etc" },
      { id: 4, nome: "Salário", descricao: "Recebimento do salário" },
      { id: 5, nome: "Autonomo", descricao: "Trabalhos por conta própria" }

    ];
    return {categorias}
  }
}
