import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  @Input() public exams : Array<ExamDto>;
  @Output() public examsChange : any;

  @Input() public exam : ExamDto;
  @Output() public examChange : any;
  
  @Input() public creatingExam : boolean;
  @Output() public creatingExamChange : any;

  @Input() public examForm : FormGroup;
  @Output() public examFormChange : any;

  constructor( 
    private examService : ExamService,
    private messageService : MessageService
  ) { 
    this.exam = new ExamDto;
    this.creatingExam = true;
    this.exams = new Array<ExamDto>();
    this.examChange = new EventEmitter<ExamDto>();
    this.examForm = new FormGroup({});

    this.examsChange = new EventEmitter<Array<ExamDto>>();
    this.examFormChange = new EventEmitter<FormGroup>();
    this.creatingExamChange = new EventEmitter<boolean>();
  }

  ngOnInit(): void { }

  private putExamInfoIntoExamForm(exam : ExamDto) : void {
    this.examForm.setValue({
      name : exam.name,
      durability : exam.durability,
      maxGrade : exam.maxGrade,
      description : exam.description
    });
    this.examFormChange.emit(this.examForm); 
  }

  public editExam(exam : ExamDto) : void {
    this.creatingExam = false;
    this.creatingExamChange.emit(this.creatingExam);
    this.exam = exam;
    this.examChange.emit(this.exam);
    this.putExamInfoIntoExamForm(exam);
  }

  public delExam(exam : ExamDto) : void {
    this.examService.delExam(exam).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Exam \"' + response.name + '\" was deleted successfully'});
        this.exams.splice(this.exams.indexOf(exam), 1);
        this.examsChange.emit(this.exams);
      },
      error => console.log(error)
    );
  }

}
