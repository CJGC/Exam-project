import { Component, OnInit } from '@angular/core';
import { ExamDto } from 'src/app/dto/ExamDto';

@Component({
  selector: 'app-exam-main-view',
  templateUrl: './exam-main-view.component.html',
  styleUrls: ['./exam-main-view.component.css']
})
export class ExamMainViewComponent implements OnInit {

  public exams : Array<ExamDto>;
  

  constructor() { 
    this.exams = new Array<ExamDto>();
  }

  ngOnInit(): void {
    
  }

  public createExam() : void {

  }

  public editExam() : void {

  }

  public deleteExam() : void {

  }

}
