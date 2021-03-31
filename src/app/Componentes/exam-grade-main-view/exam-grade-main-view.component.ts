import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamDto } from 'src/app/dto/ExamDto';
import { ProfessorDto } from 'src/app/dto/ProfessorDto';
import { ExamService } from 'src/app/services/exam.service';
import { ProfessorService } from 'src/app/services/Professor.service';

@Component({
  selector: 'app-exam-grade-main-view',
  templateUrl: './exam-grade-main-view.component.html',
  styleUrls: ['./exam-grade-main-view.component.css']
})
export class ExamGradeMainViewComponent implements OnInit {

  public exams : Array<ExamDto>;
  public professor : ProfessorDto;
  public selectedExam : ExamDto;
  public seeingStudentAns : boolean;

  constructor(
    private examService : ExamService,
    private professorService : ProfessorService,
    private router : Router
  ) { 
    this.professor = new ProfessorDto;
    this.exams = new Array<ExamDto>();
    this.selectedExam = new ExamDto;
    this.seeingStudentAns = false;
  }

  ngOnInit(): void {
    this.setProfessor();
  }

  private setProfessor() : void {
    this.professorService.getByUsername("professor").subscribe( 
      professor => {
        this.professor = professor;
        this.setExams();
      },
      error => console.log(error)
    );
  }

  private setExams() : void {
    this.examService.getExamByProfessor(this.professor.id).subscribe(
      exams => this.exams = exams,
      error => console.log(error)
    );
  }
  
  public grade(selectedExam : ExamDto) : void {
    this.selectedExam = selectedExam;
    this.router.navigate(['professor-main-view/exam-students-view', {examId : selectedExam.id}]);
  }
}
