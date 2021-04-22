import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { ExamStudentDto } from 'src/app/dto/ExamStudentDto';
import { OpenResponseDto } from 'src/app/dto/OpenResponseDto';
import { ExamStudentService } from 'src/app/services/exam-student.service';
import { OpenResponseService } from 'src/app/services/open-response.service';

@Component({
  selector: 'app-exam-studen-open-response',
  templateUrl: './exam-studen-open-response.component.html',
  styleUrls: ['./exam-studen-open-response.component.css']
})
export class ExamStudenOpenResponseComponent implements OnInit {

  public gradeForm : FormGroup;
  public selectedQuestion : QuestionDto;
  public examStudent : ExamStudentDto;
  public openResponse : OpenResponseDto;

  constructor(
    private openResponseService : OpenResponseService,
    private dynamicDialogConfig : DynamicDialogConfig,
    private dynamicDialogRef : DynamicDialogRef,
    private formBuilder : FormBuilder,
    private examStudentService : ExamStudentService
  ) {
    this.gradeForm = this.formBuilder.group({
      grade : ['', [Validators.required, Validators.min(0.0), Validators.max(5.0)]],
      content : [{value : '', disabled : true }, [Validators.required]]
    });

    this.selectedQuestion = this.dynamicDialogConfig.data.selectedQuestion;
    this.examStudent = this.dynamicDialogConfig.data.examStudent;
    this.openResponse = new OpenResponseDto;
  }

  ngOnInit(): void {
    this.getOpenResponse();
  }

  private getOpenResponse() : void {
    this.openResponseService.getOpenResponsesByExamStudentAndQuestion(this.examStudent.id, this.selectedQuestion.id).subscribe(
      openResponse => {
        if (openResponse) {
          this.openResponse = openResponse;
          this.gradeForm.setValue({
            grade : this.openResponse.valoration,
            content : openResponse.content
          });
        }
      },
      error => console.log(error)
    );
  }

  private getInfoFromGradeForm() : void {
    let gradeFormContent = this.gradeForm.value;
    this.openResponse.valoration = gradeFormContent.grade;
  }

  private updateOpenResponse() : void {
    this.openResponseService.updateOpenResponse(this.openResponse).subscribe(
      openResponse => openResponse,
      error => console.log(error) 
    );
  }

  private updateExamStuden() : void {
    this.examStudentService.updateExamStudent(this.examStudent).subscribe(
      examStudent => {
        this.examStudent = examStudent;
        this.dynamicDialogRef.close(this.examStudent);
      },
      error => {
        console.log(error);
        this.dynamicDialogRef.close();
      }
    );
  }

  private calculateNewExamStudentDefinitiveGrade() : void {
    this.examStudent.definitiveGrade += this.selectedQuestion.weight * this.openResponse.valoration
  }

  private downgradeExamStudentDefinitiveGrade() : void {
    this.examStudent.definitiveGrade -= this.selectedQuestion.weight * this.openResponse.valoration;
  }

  public grade() : void {
    if (this.openResponse.valoration !== 0) {
      this.downgradeExamStudentDefinitiveGrade();
    }
    this.getInfoFromGradeForm();
    this.updateOpenResponse();
    this.calculateNewExamStudentDefinitiveGrade();
    this.updateExamStuden();
  }

  public cancel() : void {
    this.dynamicDialogRef.close();
  }
}
