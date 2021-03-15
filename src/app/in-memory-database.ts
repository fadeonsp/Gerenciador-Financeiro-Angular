import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categoria } from './paginas/categorias/shared/categoria.model';
import { Entry } from './paginas/entries/shared-entries/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb(){
    const categorias: Categoria[] = [

      { id: 1, nome: "Moradia", descricao: "Pagamentos de contas da casa" },
      { id: 2, nome: "Saúde", descricao: "Planos de saúde" },
      { id: 3, nome: "Lazer", descricao: "cinema, parques, praia, etc" },
      { id: 4, nome: "Salário", descricao: "Recebimento do salário" },
      { id: 5, nome: "Autonomo", descricao: "Trabalhos por conta própria" }

    ];

    const entries: Entry[] = [
      { id: 1, nome: 'Gaś de Cozinha', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: "14/10/2018", quantidade: "70,80", tipo: "expense", descricao: "qualquer para despesa"} as Entry,
      { id: 2, nome: 'Suplementos', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "14/10/2018", quantidade: "50,80", tipo: "expense"} as Entry,
      { id: 3, nome: 'Salário na Empresa X', categoriaId: categorias[3].id, categoria: categorias[3], pago: true, data: "15/10/2018", quantidade: "50,00", tipo: "renenue"} as Entry,
      { id: 4, nome: 'Aluguel de Filme', categoriaId: categorias[2].id, categoria: categorias[2], pago: true, data: "16/10/2018", quantidade: "20,00", tipo: "renenue"} as Entry,
      { id: 5, nome: 'Suplementos', categoriaId: categorias[1].id, categoria: categorias[1], pago: true, data: "17/10/2018", quantidade: "40,00", tipo: "expense"} as Entry,
      { id: 6, nome: 'Video Game da Filha', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: "14/10/2018", quantidade: "70,80", tipo: "expense", descricao: "qualquer para despesa"} as Entry,
      { id: 11, nome: 'Uber', categoriaId: categorias[2].id, categoria: categorias[2], pago: true, data: "16/10/2018", quantidade: "15,80", tipo: "expense"} as Entry,
      { id: 12, nome: 'Aluguel', categoriaId: categorias[1].id, categoria: categorias[1], pago: true, data: "17/10/2018", quantidade: "20,80", tipo: "expense"} as Entry,
      { id: 13, nome: 'Gaś de Cozinha', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "25/10/2018", quantidade: "15,00", tipo: "expense"} as Entry,
      { id: 14, nome: 'Pagamento Pelo Projeto XYZ', categoriaId: categorias[4].id, categoria: categorias[4], pago: true, data: "25/10/2018", quantidade: "2270,80", tipo: "renenue"} as Entry,
      { id: 19, nome: 'Aluguel de Filme', categoriaId: categorias[2].id, categoria: categorias[2], pago: false, data: "07/11/2018", quantidade: "17,80", tipo: "expense"} as Entry,

    ]

    return {categorias, entries}
  }
}
