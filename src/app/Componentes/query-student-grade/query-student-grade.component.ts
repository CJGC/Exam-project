import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamStudentDto } from 'src/app/dto/ExamStudentDto';
import { ExamStudentService } from 'src/app/services/exam-student.service';
import { ExamDto } from 'src/app/dto/ExamDto';
import { StudentDto } from 'src/app/dto/StudentDto';


@Component({
  selector: 'app-query-student-grande',
  templateUrl: './query-student-grade.component.html',
  styleUrls: ['./query-student-grade.component.css']
})
export class QueryStudentGradeComponent implements OnInit {

  private exam : any;
  private student : any;
  public examStudent : ExamStudentDto;

  constructor(
    private router : Router,
    private examStudentService : ExamStudentService,
  ) {
    this.exam = new ExamDto;
    this.student = new StudentDto;
    this.examStudent = new ExamStudentDto;
  }

  ngOnInit(): void {
    let examStringify = sessionStorage.getItem('exam');
    let studentStringify = sessionStorage.getItem('student');
    if (examStringify && studentStringify) {
      this.exam = JSON.parse(examStringify);
      this.student = JSON.parse(studentStringify);
    }
    this.checkStudentReply();
  }

  private checkStudentReply() : void {
    this.examStudentService.getExamStudentsByExamAndStudent(this.exam.id, this.student.id).subscribe(
      examStudent => {
        if (examStudent && examStudent.exam.id === this.exam.id) {
          this.examStudent = examStudent;
        } else {
          this.router.navigate(['./solve-exam']);
        }
      },
      error => console.log(error)
    )
  }

}
