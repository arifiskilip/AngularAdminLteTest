import { Paginate } from './../../models/paginate';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ExamplePipe } from '../../pipes/example.pipe';
import { ExampleModel } from '../../models/example.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { GetAllTodoResponse } from '../../models/getAllTodoResponse';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [SharedModule, ExamplePipe],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.css'
})
export class ExamplesComponent {

  search:string = "";
  @ViewChild("createModalCloseBtn") createModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  examples: ExampleModel[] = [];
  createModel:ExampleModel = new ExampleModel();
  updateModel:ExampleModel = new ExampleModel();

  constructor(
    private http: HttpService,
    private swal: SwalService
  ){}

  ngOnInit(): void {
  }

  todos:Paginate<GetAllTodoResponse>;
  getAll(){
    this.http.get<Paginate<GetAllTodoResponse>>("/Todo/GetAll?Index=1&Size=10").subscribe(res=>{
      this.todos = res
    })
  }
  }
