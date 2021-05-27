import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProfessorDto } from 'src/app/dto/ProfessorDto';
import { ProfessorService } from 'src/app/services/Professor.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [DialogService, MessageService]
})
export class ChangePasswordComponent implements OnInit {

  public passwordForm : FormGroup;
  public professor : ProfessorDto;

  constructor(
    private dynamicDialogConfig : DynamicDialogConfig, 
    private dynamicDialogRef : DynamicDialogRef,
    private professorService : ProfessorService,
    private formBuilder : FormBuilder,
    private messageService : MessageService
    ) { 
      this.professor = <ProfessorDto> dynamicDialogConfig.data;
      this.passwordForm = formBuilder.group({
        oldPassword : ['', [Validators.required, Validators.min(8), Validators.max(16)]],
        newPassword : ['', [Validators.required, Validators.min(8), Validators.max(16)]]
      });
    }

  ngOnInit(): void {
  }

  public changePassword() : void {
    let oldPassword = this.passwordForm.value.oldPassword;
    let newPassword = this.passwordForm.value.newPassword;
    if (oldPassword === this.professor.password) {
      this.professor.password = newPassword;
      this.professorService.updateProfessor(this.professor).subscribe(
        professor => {
          this.professor = professor;
          this.dynamicDialogRef.close(this.professor);
        },
        error => {
          this.messageService.add({severity:'error', 
            summary:'Error', 
            detail: error.error, 
            sticky:true
          });
          console.log(error);
        }
      );

    } else {
      this.messageService.add({severity:'error', 
        summary:'Error', 
        detail:'Your old password does not match with your existing password', 
        sticky:true
      });
    }
  }

  public cancel() : void {
    this.dynamicDialogRef.close();
  }

}
