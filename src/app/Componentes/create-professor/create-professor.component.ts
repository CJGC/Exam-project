import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import CryptoES from 'crypto-es';
import { ProfessorDto } from '../../dto/ProfessorDto';
import { ProfessorService } from '../../services/Professor.service';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-create-professor',
  templateUrl: './create-professor.component.html',
  styleUrls: ['./create-professor.component.css'],
  providers: [MessageService]
})
export class CreateProfessorComponent  {

  public form : FormGroup;

  constructor(private ProfessorService : ProfessorService,
    private formBuilder : FormBuilder,
    private router : Router,
    private messageService : MessageService
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


  private getProfessorInfoFromForm() : ProfessorDto {
    let professor = <ProfessorDto> this.form.value;
    // this.cryptProfessorPassword(professor);
    // console.log(CryptoES.AES.decrypt(<string> professor.password), "crypto");
    return professor;
  }

  // private cryptProfessorPassword(professor : ProfessorDto) : void {
  //   professor.password = CryptoES.AES.encrypt();
  // }

  public saveProfessor() : void {
    let professor : ProfessorDto = this.getProfessorInfoFromForm();
    this.ProfessorService.saveProfessor(professor).subscribe(
      response => {
        this.form.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'Professor created successfully'});
        this.router.navigate(["/login"]);
      },
      error => {
        console.log(error);
        let errorMessageObject : String = error.error;
        let errorMessage : string, errorStatus : string = error.status;
        
        this.messageService.add({severity:'error', summary:errorStatus, 
          detail:'error', sticky : true});
        //console.log(error);
      }
    );
  }

  public cancel() : void {
    this.form.reset();
    this.router.navigate(["/login"]);
  }
}
