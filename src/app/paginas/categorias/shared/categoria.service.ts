import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError }  from 'rxjs/operators';
import { Categoria } from './categoria.model';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiPath: string = "api/categorias";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]>{
    return this.http.get(this.apiPath)
      .pipe(catchError(this.handleError),
      map(this.jsonDataCategorias)
    )
  }
  // retonar uma categoria específica
  getById(id: number): Observable<Categoria> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url)
      .pipe(catchError(this.handleError),
      map(this.jsonDataCategoria)
    )
  }
  // criação de uma categoria
  create(categoria: Categoria): Observable<Categoria>{
    return this.http.post(this.apiPath, categoria)
      .pipe(catchError(this.handleError),
      map(this.jsonDataCategoria)
    )
  }
  // atualização de categoria
  update(categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiPath}/${categoria.id}`;

    return this.http.put(url, categoria)
      .pipe(catchError(this.handleError),
      map(() => categoria)
    )
  }
  // excluindo uma categoria
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url)
      .pipe(catchError(this.handleError),
      map(() => null)
    )
  }

  // metodos privados
  private jsonDataCategorias(jsonData: any[]): Categoria[]{
    const categorias: Categoria[] = [];
    jsonData.forEach(element => categorias.push(element as Categoria));
    return categorias;
  }

  private jsonDataCategoria(jsonData: any): Categoria{
    return jsonData as Categoria;
  }

  private handleError(error: any): Observable<any>{
    console.log("Erro na requisição =>", error);
    return throwError(error);
  }
}
