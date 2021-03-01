import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ExamDto } from 'src/app/dto/ExamDto';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-main-view',
  templateUrl: './exam-main-view.component.html',
  styleUrls: ['./exam-main-view.component.css'],
  providers: [MessageService]
})
export class ExamMainViewComponent implements OnInit {

  public exams : Array<ExamDto>;
  public creatingExam : boolean;
  public selectedAccordition : boolean;
  public form : FormGroup;

  constructor( 
    private formBuilder : FormBuilder,
    private examService : ExamService,
    private messageService : MessageService
  ) { 
    this.creatingExam = true;
    this.selectedAccordition = false;
    this.exams = new Array<ExamDto>();
    this.form = this.formBuilder.group({
      id : ['', []],
      professor : new FormControl('', []),
      name : new FormControl('', [Validators.required, Validators.maxLength(100)]),
      durability : new FormControl('', [Validators.required, Validators.min(1), Validators.max(7200)]),
      maxGrade : new FormControl('', [Validators.required, Validators.min(0.0), Validators.max(5.0)]),
      description : new FormControl('', [Validators.required, Validators.min(1), Validators.max(1024)]),
      link : new FormControl('',[])
    });
  }

  ngOnInit(): void {
    this.examService.getExams().subscribe(
      response => {this.exams = response;},
      error => {console.log(error);}
    );
  }

  public addExamToArray(exam : ExamDto) : void {
    let index = this.exams.findIndex( (e) => e.id === exam.id );
    (index !== -1) ? this.exams.splice(index, 1, exam) : this.exams.push(exam);
  }

  public editExam(exam : ExamDto) : void {
    this.creatingExam = false;
    this.selectedAccordition = true;

    this.form.setValue({
      id : exam.id,
      professor : exam.professor,
      name : exam.name,
      durability : exam.durability,
      maxGrade : exam.maxGrade,
      description : exam.description,
      link : exam.link
    });
    
  }

  public delExam(exam : ExamDto) : void {
    this.examService.delExam(exam).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Exam deleted successfully'});
        this.exams.splice(this.exams.indexOf(exam), 1);
      },
      error => {console.log(error);}
    )
  }

  public onTabOpen(event : any) : void {
    this.selectedAccordition = true;
  }
}
