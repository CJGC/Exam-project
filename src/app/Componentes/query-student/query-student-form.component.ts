import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamDto } from 'src/app/dto/ExamDto';
import { ExamService } from 'src/app/services/exam.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentDto } from 'src/app/dto/StudentDto';
import { StudentService } from 'src/app/services/student.service';
import { MessageService } from 'primeng/api';
import { ExamStudentService } from 'src/app/services/exam-student.service';
import { ExamStudentDto } from 'src/app/dto/ExamStudentDto';

@Component({
  selector: 'app-query-student-form',
  templateUrl: './query-student-form.component.html',
  styleUrls: ['./query-student-form.component.css'],
  providers: [MessageService]
})
export class QueryStudentFormComponent implements OnInit {

  public exam : ExamDto;
  public studentForm : FormGroup;
  public student : StudentDto;
  public examStudent : ExamStudentDto;
  public studentExist : boolean;
  public isThereAValidExam : boolean;

  constructor(
    public route : ActivatedRoute,
    private formBuilder : FormBuilder,
    public examService : ExamService,
    public studentService : StudentService,
    public examStudentService : ExamStudentService,
    public messageService : MessageService,
    public router : Router  
    ) { 
    this.exam = new ExamDto;
    route.params.pipe(map(p => p.id)).subscribe(
      param => {
        this.getExamByLink(environment.urlExams + param);
      }
    );

    this.studentForm = this.formBuilder.group({
      identificationCard : new FormControl(null, [Validators.required]),
      name : new FormControl('', [Validators.required]),
      lastname : new FormControl('', [Validators.required])
    });

    this.student = new StudentDto;
    this.examStudent = new ExamStudentDto;
    this.studentExist = true;
    this.isThereAValidExam = false;
  }

  ngOnInit(): void {

  }

  private getExamByLink(link : string) : void {
    this.examService.getExamByLink(link).subscribe(
      exam => {
        if (exam) {
          this.exam = exam
          this.isThereAValidExam = true;
        }
      },
      error => console.log(error)
    );
  }

  private extracInfoFromStudentForm(student : StudentDto) : void {
    let studentForm : StudentDto = <StudentDto> this.studentForm.value;
    student.identificationCard = studentForm.identificationCard
    student.name = studentForm.name;
    student.lastname = studentForm.lastname;
  }

  public queryStudent() : void {
    this.extracInfoFromStudentForm(this.student);
    this.studentService.getStudentByIdentificationCard(this.student.identificationCard).subscribe(
      student => {
        if (student) {
          this.student = student;
          sessionStorage.setItem('exam', JSON.stringify(this.exam));
          sessionStorage.setItem('student', JSON.stringify(this.student));
          this.router.navigate(['./query-grade/']);
        } else {
          this.studentExist = false;
        }
      },
      error => console.log(error)
    );
    
  }

  public createStudent() : void {
    this.extracInfoFromStudentForm(this.student);
    this.studentService.saveStudent(this.student).subscribe(
      student => {
        this.student = student;
        sessionStorage.setItem('exam', JSON.stringify(this.exam));
        sessionStorage.setItem('student', JSON.stringify(this.student));
        this.router.navigate(['./solve-exam']);
      },
      error => {
        console.log(error)
        this.messageService.add({severity:'error', summary:'Error', detail:'Student was not logged up'})
      }
    );
  }
}
