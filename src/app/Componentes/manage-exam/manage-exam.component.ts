import { Component, OnInit } from '@angular/core';
import { ExamDto } from 'src/app/dto/ExamDto';

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.css']
})
export class ManageExamComponent implements OnInit {

  public exams : Array<ExamDto>;
  
  constructor() {
    this.exams = new Array<ExamDto>();
   }

  ngOnInit(): void {
  }

}
