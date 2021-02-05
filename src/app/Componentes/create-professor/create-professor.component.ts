import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfessorDto } from '../../dto/ProfessorDto';
import { ProfessorService } from '../../services/Professor.service';

@Component({
  selector: 'app-create-professor',
  templateUrl: './create-professor.component.html',
  styleUrls: ['./create-professor.component.css']
})
export class CreateProfessorComponent  {

  public form : FormGroup;

  constructor(private ProfessorService : ProfessorService,
    private formBuilder : FormBuilder,
    private router : Router
    ) {  
      this.form = this.formBuilder.group({
        id : ['', []],
        identificationCard : new FormControl('', [Validators.pattern("[0-9]+"), Validators.maxLength(15)]),
        name : new FormControl('', [Validators.required, Validators.maxLength(100)]),
        lastname : new FormControl('', [Validators.required, Validators.maxLength(100)]),
        email : new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
        username : new FormControl('', [Validators.required, Validators.maxLength(100)]),
        password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
      });
    }

  public saveProfessor() : void {    
    this.ProfessorService.saveProfessor(<ProfessorDto> this.form.value).subscribe(
      response => {
        this.form.reset();
        let url = "/login"
        this.router.navigate([url]);
      },
      error => {
        console.log(error);
      }
    );
  }

  public cancel() : void {
    this.form.reset();
    let url = "/login";
    this.router.navigate([url]);
  }
}
