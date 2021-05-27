import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProfessorDto } from 'src/app/dto/ProfessorDto';
import { ProfessorService } from 'src/app/services/Professor.service';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css'],
  providers: [MessageService]
})
export class LogginComponent implements OnInit {

  public professor : ProfessorDto;
  public loginForm : FormGroup;

  constructor(
    formBuilder : FormBuilder,
    private router : Router,
    private professorService : ProfessorService,
    private messageService : MessageService
    ) { 
      this.professor = new ProfessorDto;
      this.loginForm = formBuilder.group({
        username : new FormControl('', [Validators.required]),
        password : new FormControl('', [Validators.required])
      })
  }

  ngOnInit(): void {
  }

  private queryProfessor() : void {
    let username : string = this.loginForm.value.username;
    this.professorService.getByUsername(username).subscribe( 
      professor => {
        this.professor = professor;
        if (this.professor) {
          this.checkPassword(this.professor);          
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:'Professor does not exist', sticky : true});          
        }
      },
      error => {
        this.messageService.add({severity:'error', summary:error.status, detail:'An error has ocurred', sticky : true});
        console.log(error);
      }
    );
  }

  private checkPassword(professor : ProfessorDto): void {
    let password : string = this.loginForm.value.password;
    if (professor.password === password) {
      sessionStorage.setItem('professor', JSON.stringify(this.professor));
      this.router.navigate(["/professor-main-view/manage-exam-view"]);
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'The password does not match', sticky : true});
    }
  }

  public logIn() : void {
    this.queryProfessor();
  }

  public logUp() : void {
    this.router.navigate(["/create-professor"]);
  }
}
