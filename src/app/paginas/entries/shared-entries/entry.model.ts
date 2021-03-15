import { Categoria } from '../../categorias/shared/categoria.model';
export class Entry {

  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public tipo?: string,
    public quantidade?: string,
    public data?: string,
    public pago?: boolean,
    public categoriaId?: number,
    public categoria?: Categoria
  ){}

  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  };

  get textoPago(): string {
    return this.pago ? 'pago' : 'pendente';

  }
}
