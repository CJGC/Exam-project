import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { ExamStudentDto } from 'src/app/dto/ExamStudentDto';
import { ExamStudentService } from 'src/app/services/exam-student.service';
import { QuestionService } from 'src/app/services/question.service';
import { ExamStudenOpenResponseComponent } from '../exam-studen-open-response/exam-studen-open-response.component';
import { ExamStudenSelectedResponseComponent } from '../exam-studen-selected-response/exam-studen-selected-response.component';

@Component({
  selector: 'app-exam-student-response-detail',
  templateUrl: './exam-student-response-detail.component.html',
  styleUrls: ['./exam-student-response-detail.component.css'],
  providers: [DialogService]
})
export class ExamStudentResponseDetailComponent implements OnInit {

  public examStudent : ExamStudentDto;
  public studentForm : FormGroup;
  public questions : Array<QuestionDto>;

  constructor(
    private activatedRoute : ActivatedRoute,
    private examStudentService : ExamStudentService,
    private questionService : QuestionService,
    public dialogService : DialogService,
    private formBuilder : FormBuilder
    ) { 
    
      this.studentForm = this.formBuilder.group({
        name : new FormControl({value : '', disabled : true}),
        lastname : new FormControl({value : '', disabled : true}),
        identificationCard : new FormControl({value : '', disabled : true}),
        definitiveGrade : new FormControl({value : '', disabled : true})
      });
      this.examStudent = new ExamStudentDto;
      this.questions = new Array<QuestionDto>();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      param => {
        this.getExamStudent(Number(param.get('examStudentId')));
      }
    );
  }

  private putInfoIntoStudentForm() : void {
   
    this.studentForm.setValue({
      name : this.examStudent.student.name,
      lastname : this.examStudent.student.lastname,
      identificationCard : this.examStudent.student.identificationCard,
      definitiveGrade : this.examStudent.definitiveGrade 
    })
  }

  private getExamStudent(examStudentId : number) : void {
    this.examStudentService.getExamStudent(examStudentId).subscribe(
      examStudent => {
        this.examStudent = examStudent;
        this.putInfoIntoStudentForm();
        this.getQuestions(this.examStudent.exam.id);
      },
      error => console.log(error)
    );
  }

  private getQuestions(examId : number) : void {
    this.questionService.getQuestionByExam(examId).subscribe(
      questions => this.questions = questions,
      error => console.log(error)
    )
  }

  public showStudentResponse(selectedQuestion : QuestionDto) : void {
    // Open question
    if (selectedQuestion.type === 'op') {
      let ref = this.dialogService.open(ExamStudenOpenResponseComponent, {
        data : {selectedQuestion : selectedQuestion, examStudent : this.examStudent},
        header: 'Student open response details',
        width: '70%'
      });

      ref.onClose.subscribe((examStudent: ExamStudentDto) => {
        if (examStudent) {
          this.examStudent = examStudent;
        }
      });
    }
    // Multiple unique question
    else if (selectedQuestion.type === 'mu') {
      this.dialogService.open(ExamStudenSelectedResponseComponent, {
        data : {selectedQuestion : selectedQuestion, examStudent : this.examStudent},
        header: 'Student unique selected response details',
        width: '70%'
      });
    }
    // Multiple multiple questiond
    else {
      this.dialogService.open(ExamStudenSelectedResponseComponent, {
        data : {selectedQuestion : selectedQuestion, examStudent : this.examStudent},
        header: 'Student multiple selected response details',
        width: '70%'
      });
    }
  }
}
