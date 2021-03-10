import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap} from 'rxjs/operators';
import toastr from 'toastr';
import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';
@Component({
  selector: 'app-categorias-forms',
  templateUrl: './categorias-forms.component.html',
  styleUrls: ['./categorias-forms.component.css']
})
export class CategoriasFormsComponent implements OnInit, AfterContentChecked {

  //definindo as variaveis do componente
  currencyAction: string;
  categoriaForm: FormGroup;
  tituloPagina: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.setCurrencyAction();
    this.buildCategoriaForm();
    this.loadCategoria();
  }

  ngAfterContentChecked(){
    this.setTituloPagina();
  }
  // metodo para clicar nos botões do formulario
  submitForm(){
    this.submittingForm = true;

    if(this.currencyAction == 'new')
      this.createCategoria();
    else
      this.updateCategoria();
  }

  private setCurrencyAction(){
    if(this.route.snapshot.url[0].path == "new")
    this.currencyAction = "new"
    else
      this.currencyAction = "editar"
  }
  private buildCategoriaForm(){
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    });
  }
  private  loadCategoria(){
    if (this.currencyAction == "editar") {

      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get("id")))
      )
      .subscribe(
        (categoria) => {
          this.categoria = categoria;
          this.categoriaForm.patchValue(categoria)
        },
        // caso de um erro
        (error) => alert("erro no servidor, tente novamente")
      )
    }
  }

  private setTituloPagina() {
    if (this.currencyAction == "new"){
      this.tituloPagina = "cadastro de nova categoria"
    } else {
      const nomeCategoria = this.categoria.nome || ''
      this.tituloPagina = "Editando categoria:" + nomeCategoria;
    }
  }

  private createCategoria() {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.create(categoria)
      .subscribe(categoria =>this.actionsForSuccess(categoria),
      error => this.actionsForError()
      )
  }
  private updateCategoria(){
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaService.update(categoria)
      .subscribe(categoria =>this.actionsForSuccess(categoria),
      error => this.actionsForError()
      )
  }
  private actionsForSuccess(categoria: Categoria){
    toastr.success('solicitação processada');
    // forçando carregando do componente
    this.router.navigateByUrl('categorias', {skipLocationChange: true})
      .then(() => this.router.navigate(['categorias', categoria.id, 'editar']))
  }
  private actionsForError() {
    toastr.error('erro no processo de solicitação');
    this.submittingForm = false;
    // integrando um servidor remoto
   // if(error.status === 422)
    //  this.serverErrorMessages = JSON.parse(error._body).errors;
     // else
     //   this.serverErrorMessages = ['falha na comunicação com servidor']
  }
}
