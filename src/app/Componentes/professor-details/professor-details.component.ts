import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProfessorDto } from 'src/app/dto/ProfessorDto';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-professor-details',
  templateUrl: './professor-details.component.html',
  styleUrls: ['./professor-details.component.css'],
  providers: [DialogService, MessageService]
})
export class ProfessorDetailsComponent implements OnInit {

  public professor : ProfessorDto;
  public professorDetails : FormGroup

  constructor(
    public dialogService: DialogService,
    public messageService : MessageService,
    private formBuilder : FormBuilder
  ) { 
    this.professorDetails = this.formBuilder.group({
      identificationCard : new FormControl({value : '', disabled: true}),
      name : new FormControl({value : '', disabled: true}),
      lastname: new FormControl({value : '', disabled: true}),
      email: new FormControl({value : '', disabled: true}),
      username: new FormControl({value : '', disabled: true})
    });
    this.professor = new ProfessorDto;
  }

  ngOnInit(): void {
    this.setProfessor();
  }

  private loadProfessorInfoIntoForm(professor : ProfessorDto) : void {
    this.professorDetails.setValue({
      identificationCard : professor.identificationCard,
      name : professor.name,
      lastname: professor.lastname,
      email: professor.email,
      username: professor.username
    });
  }

  public setProfessor() : void {
    let professorStringify = sessionStorage.getItem('professor');
    if (professorStringify !== null) {
      this.professor = <ProfessorDto> JSON.parse(professorStringify);
      this.loadProfessorInfoIntoForm(this.professor);
    }
  }

  public changePassword() : void {
    const ref = this.dialogService.open(ChangePasswordComponent, {
      data : this.professor,
      header : 'Change password',
      width : '70%'
    });

    ref.onClose.subscribe( (professor : ProfessorDto )=> {
      if (professor) {
        this.professor = professor;
        this.messageService.add({
          severity:'success', 
          summary:'Success', 
          detail: 'Your password has been changed sucessfully'
        });
      }
    });
  }
}
