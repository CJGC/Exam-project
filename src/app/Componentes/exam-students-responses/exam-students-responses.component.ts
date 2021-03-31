import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamDto } from 'src/app/dto/ExamDto';
import { ExamStudentDto } from 'src/app/dto/ExamStudentDto';
import { ExamStudentService } from 'src/app/services/exam-student.service';

@Component({
  selector: 'app-exam-grade-students-responses',
  templateUrl: './exam-students-responses.component.html',
  styleUrls: ['./exam-students-responses.component.css']
})
export class ExamStudentsResponsesComponent implements OnInit {

  public examStudents : Array<ExamStudentDto>;

  constructor(
    private examStudentService : ExamStudentService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) { 
    this.examStudents = new Array<ExamStudentDto>();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      param => {
        this.getExamStudent(Number(param.get('examId')));
      }
    );
  }

  private getExamStudent(examId : number) : void {
    this.examStudentService.getExamStudentsByExam(examId).subscribe(
      examStudents => this.examStudents = examStudents,
      error => console.log(error)
    );
  }

  public grade(selectedExamStudent : ExamStudentDto) : void {
    this.router.navigate(['professor-main-view/exam-student-response-detail', {examStudentId : selectedExamStudent.id}]);
  }
}
