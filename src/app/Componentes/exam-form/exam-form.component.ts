import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ExamDto } from 'src/app/dto/ExamDto';
import { ProfessorDto } from 'src/app/dto/ProfessorDto';
import { ExamService } from 'src/app/services/exam.service';
import { ProfessorService } from 'src/app/services/Professor.service';
import CryptoES from 'crypto-es';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css'],
  providers: [MessageService]
})
export class ExamFormComponent implements OnInit {

  @Input() public exams : Array<ExamDto>;
  @Output() public examsChange : any;

  public examForm : FormGroup;
  public exam : ExamDto;

  public professor : ProfessorDto;
  public creatingExam : boolean;

  constructor(
    private formBuilder : FormBuilder,
    private examService : ExamService,
    private professorService : ProfessorService,
    private messageService : MessageService
    ) {
      this.exams = new Array<ExamDto>();
      this.examsChange = new EventEmitter<Array<ExamDto>>();
      this.creatingExam = true;
      this.exam = new ExamDto;
      this.examForm = this.formBuilder.group({ 
        name : new FormControl('', [Validators.required, Validators.maxLength(100)]),
        durability : new FormControl(0, [Validators.required, Validators.min(1), Validators.max(7200)]),
        maxGrade : new FormControl(0.0, [Validators.required, Validators.min(0.0), Validators.max(5.0)]),
        description : new FormControl('', [Validators.required, Validators.min(1), Validators.max(1024)])}
      );
      this.professor = new ProfessorDto;
    }
  

  ngOnInit(): void { 
      //This code should no be here
      this.setProfessor();
  }

  private setProfessor() : void {
    this.professorService.getByUsername("professor").subscribe( 
      response => {
        this.professor = response;
        this.setExams();
      },
      error => console.log(error)
    );
  }

  private setExams() : void {
    this.examService.getExamByProfessor(this.professor.id).subscribe(
      response => {
        this.exams = response;
        this.examsChange.emit(this.exams);
      },
      error => console.log(error)
    );
  }

  private resetExamForm() : void {
    this.examForm.reset({
      name : '',
      durability : 0,
      maxGrade : 0.0,
      description : ''
    });
  }

  private generateExamLink() : string {
    let currentDate = new Date();
    return environment.urlExams + CryptoES.SHA256(currentDate.toString());;
  }

  private extractExamInfoFromExamForm() : void {
    let examForm : ExamDto = <ExamDto> this.examForm.value;
    this.exam.name = examForm.name;
    this.exam.durability = examForm.durability;
    this.exam.maxGrade = examForm.maxGrade;
    this.exam.description = examForm.description;
  }

  public saveExam() : void {
    this.exam.id = 0;
    this.extractExamInfoFromExamForm();
    this.exam.link = this.generateExamLink();
    this.exam.professor = this.professor;

    this.examService.saveExam(this.exam).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Exam \"' + response.name + '\" created successfully'});
        this.exams.push(response);
        this.examsChange.emit(this.exams);
      },
      error => {
        console.log(error);
        this.messageService.add({severity:'error', summary:error.status, detail:'Error', sticky : true});
    });

    this.resetExamForm();
  }
  
  public updateExam() : void {
    this.extractExamInfoFromExamForm();

    this.examService.updateExam(this.exam).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Exam \"' + this.exam.name + '\" updated successfully'});
        let index = this.exams.findIndex( (e) => e.id === response.id );
        this.exams.splice(index, 1, response);
        this.examsChange.emit(this.exams);
      },
      error => {
        console.log(error);
        this.messageService.add({severity:'error', summary:error.status, detail:'Error', sticky : true});
      }
    );

    this.resetExamForm();
    this.creatingExam = true;
  }

  public cancelNewExam() : void {
    this.resetExamForm();
  }

  public cancelUpdateExam() : void {
    this.resetExamForm();
    this.creatingExam = true;
  }

}