import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ExamDto } from 'src/app/dto/ExamDto';
import { ProfessorDto } from 'src/app/dto/ProfessorDto';
import { ExamService } from 'src/app/services/exam.service';
import { ProfessorService } from 'src/app/services/Professor.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css'],
  providers: [MessageService]
})
export class ExamFormComponent implements OnInit {

  @Input() creatingExam : boolean;
  @Output() creatingExamChange : any;

  @Input()  selectedAccordition : boolean;
  @Output() selectedAccorditionChange : any;

  @Input() form : FormGroup;
  @Output() formChange : any;

  @Output() emitExam : any;
  public professor : ProfessorDto;

  constructor(
    private formBuilder : FormBuilder,
    private examService : ExamService,
    private messageService : MessageService,
    private professorService : ProfessorService
    ) { 
      this.selectedAccordition = false;
      this.selectedAccorditionChange = new EventEmitter<boolean>();
      this.creatingExam = true;
      this.creatingExamChange = new EventEmitter<boolean>();
      this.emitExam = new EventEmitter<ExamDto>();
      this.professor = new ProfessorDto;
      this.form = this.formBuilder.group({
        id : ['', []],
        professor : new FormControl('', []),
        name : new FormControl('', []),
        durability : new FormControl('', []),
        maxGrade : new FormControl('', []),
        description : new FormControl('', []),
        link : new FormControl('',[])
      });
      this.formChange = new EventEmitter<FormGroup>();
    }

  ngOnInit(): void { 
    //This code should no be here
    this.professorService.getByUsername("professor").subscribe(
      response => {this.professor = response;},
      error => {console.log(error);}
    );
  }

  private resetForm() : void {
    this.form.reset();
    this.formChange.emit(this.form);
  }

  private setExamMissingInfo() : ExamDto {
    let exam : ExamDto = <ExamDto> this.form.value;
    exam.professor = this.professor;
    exam.link = 'localhost:4242/present-exam';
    return exam;
  }

  public saveExam() : void {
    let exam : ExamDto =  this.setExamMissingInfo();
    this.examService.saveExam(exam).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Exam created successfully'});
        this.emitExam.emit(response);
      },
      error => {
        console.log(error);
        let errorStatus : string = error.status;
        this.messageService.add({severity:'error', summary:errorStatus, 
          detail:'Error', sticky : true});
      
    });

    this.resetForm();
    this.selectedAccorditionChange.emit(false);
  }
  
  public updateExam() : void {
    let exam : ExamDto = <ExamDto> this.form.value;
    this.examService.updateExam(exam).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Exam updated successfully'});
        this.emitExam.emit(response);
      },
      error => {
        console.log(error);
        let errorStatus : string = error.status;
        this.messageService.add({severity:'error', summary:errorStatus, detail:'Error', sticky : true});
      }
    );

    this.resetForm();
    this.selectedAccorditionChange.emit(false);
    this.creatingExamChange.emit(true);
  }

  public cancelNewExam() : void {
    this.selectedAccorditionChange.emit(false);
    this.resetForm();
  }

  public cancelUpdateExam() : void {
    this.creatingExamChange.emit(true);
    this.selectedAccorditionChange.emit(false);
    this.resetForm();
  }
}
