import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  providers: [MessageService]
})
export class StudentFormComponent implements OnInit {

  public exam : ExamDto;
  public studentForm : FormGroup;
  public isQueryingStudent : boolean;
  public student : StudentDto;
  public examStudent : ExamStudentDto;
  public examStarted : boolean;

  constructor(
    public route : ActivatedRoute,
    private formBuilder : FormBuilder,
    public examService : ExamService,
    public studentService : StudentService,
    public examStudentService : ExamStudentService,
    public messageService : MessageService
  ) { 
    this.exam = new ExamDto;
    route.params.pipe(map(p => p.id)).subscribe(
      param => {
        this.getExamByLink(environment.urlExams + param);
      }
    );

    this.studentForm = this.formBuilder.group({
      identificationCard : new FormControl(0.0, [Validators.required, Validators.min(0)]),
      name : new FormControl('student name', [Validators.required]),
      lastname : new FormControl('student lastname', [Validators.required])
    });

    this.isQueryingStudent = true;
    this.student = new StudentDto;
    this.examStudent = new ExamStudentDto;
    this.examStarted = false;
  }

  ngOnInit(): void {

  }

  private checkIfStudentHasAreply() : void {
    this.examStudentService.getExamStudentsByStudent(this.student.id).subscribe(
      examStudent => {
        if (examStudent && examStudent.exam.id === this.exam.id) {
          this.examStudent = examStudent;
        } else {
          this.isQueryingStudent = false;
        }
      },
      error => console.log(error)
    )
  }

  private getExamByLink(link : string) : void {
    this.examService.getExamByLink(link).subscribe(
      exam => this.exam = exam,
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
    let student = new StudentDto;
    this.extracInfoFromStudentForm(student);
    this.studentService.getStudentByIdentificationCard(student.identificationCard).subscribe(
      student => {
        this.student = student;
        this.checkIfStudentHasAreply();
      },
      error => console.log(error)
    );
    
  }

  public createStudent() : void {
    let student : StudentDto = new StudentDto;
    this.extracInfoFromStudentForm(student);
    this.studentService.saveStudent(student).subscribe(
      student => {
        this.student = student;
        this.messageService.add({severity:'success', summary:'Success', detail:'Student logged up successfully'})
      },
      error => {
        console.log(error)
        this.messageService.add({severity:'error', summary:'Error', detail:'Student was not logged up'})
      }
    );
  }

  public startExam() : void {
    this.examStudent.exam = this.exam;
    this.examStudent.student = this.student;
    this.examStarted = true;
  }
}
