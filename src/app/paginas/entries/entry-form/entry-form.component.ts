import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap} from 'rxjs/operators';
import toastr from 'toastr';

import { Entry } from '../shared-entries/entry.model';
import { EntryService } from '../shared-entries/entry.service';

@Component({
  selector: 'app-entries-forms',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntrysFormsComponent implements OnInit, AfterContentChecked {

  //definindo as variaveis do componente
  currencyAction: string;
  entryForm: FormGroup;
  tituloPagina: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.setCurrencyAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked(){
    this.setTituloPagina();
  }
  // metodo para clicar nos botões do formulario
  submitForm(){
    this.submittingForm = true;

    if(this.currencyAction == 'new')
      this.createEntry();
    else
      this.updateEntry();
  }

  private setCurrencyAction(){
    if(this.route.snapshot.url[0].path == "new")
    this.currencyAction = "new"
    else
      this.currencyAction = "editar"
  }
  private buildEntryForm(){
    this.entryForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      data: [null, [Validators.required]],
      pago: [null, [Validators.required]],
      categoriaId: [null, [Validators.required]],
    });
  }
  private  loadEntry(){
    if (this.currencyAction == "editar") {

      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get("id")))
      )
      .subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry)
        },
        // caso de um erro
        (error) => alert("erro no servidor, tente novamente")
      )
    }
  }

  private setTituloPagina() {
    if (this.currencyAction == "new"){
      this.tituloPagina = "cadastro de novo Lançamento"
    } else {
      const nomeEntry = this.entry.nome || ''
      this.tituloPagina = "Editando Lançamento:" + nomeEntry;
    }
  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry)
      .subscribe(entry =>this.actionsForSuccess(entry),
      error => this.actionsForError()
      )
  }
  private updateEntry(){
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry)
      .subscribe(entry =>this.actionsForSuccess(entry),
      error => this.actionsForError()
      )
  }
  private actionsForSuccess(entry: Entry){
    toastr.success('solicitação processada');
    // forçando carregando do componente
    this.router.navigateByUrl('entries', {skipLocationChange: true})
      .then(() => this.router.navigate(['entries', entry.id, 'editar']))
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
