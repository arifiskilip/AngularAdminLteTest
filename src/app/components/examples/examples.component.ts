import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ExamplePipe } from '../../pipes/example.pipe';
import { ExampleModel } from '../../models/example.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [SharedModule, ExamplePipe],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.css'
})
export class ExamplesComponent {
  examples: ExampleModel[] = [];
  search:string = "";

  @ViewChild("createModalCloseBtn") createModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  createModel:ExampleModel = new ExampleModel();
  updateModel:ExampleModel = new ExampleModel();

  constructor(
    private http: HttpService,
    private swal: SwalService
  ){}

  ngOnInit(): void {
  }

  }
