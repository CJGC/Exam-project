import { Component, OnInit } from '@angular/core';
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

  constructor(
    public dialogService: DialogService,
    public messageService : MessageService
  ) { 
    this.professor = new ProfessorDto;
  }

  ngOnInit(): void {
    this.setProfessor();
  }

  public setProfessor() : void {
    let professorStringify = sessionStorage.getItem('professor');
    if (professorStringify !== null) {
      this.professor = <ProfessorDto> JSON.parse(professorStringify);
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
