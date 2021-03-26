import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ExamDto } from 'src/app/dto/ExamDto';
import { OpenQuestionDto } from 'src/app/dto/OpenQuestionDto';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [MessageService]
})
export class QuestionFormComponent implements OnInit {

  @Input() public exams : Array<ExamDto>;
  public dropListExams : Array<ExamDto>;
  public questionTypes : Array<any>;
  public exam : ExamDto;
  public questionForm : FormGroup;
  public question : OpenQuestionDto;
  public questions : Array<OpenQuestionDto>;
  public creatingQuestion : boolean;

  constructor(
    private questionService : QuestionService,
    private formBuilder : FormBuilder,
    private messageService : MessageService
    ) {

      this.questionTypes = [
        {code : "op", name : "Open question"},
        {code : "mu", name : "Multiple unique"}, 
        {code : "mm", name : "Multiple multiple"}
      ];

      this.dropListExams = new Array<ExamDto>();
      this.exams = new Array<ExamDto>();
      this.questions = new Array<OpenQuestionDto>();
      this.exam = new ExamDto;
      this.questionForm = this.formBuilder.group({
        weight : new FormControl(0.0, [Validators.required, Validators.min(0), Validators.max(5)]),
        type : new FormControl(this.questionTypes[0], [Validators.required]),
        description : new FormControl('', [Validators.required, Validators.min(1), Validators.max(200)])
      });

      this.question = new OpenQuestionDto;
      this.creatingQuestion = true;
  }

  ngOnInit(): void {
  }

  public search(event : any) : void {
    this.dropListExams = new Array<ExamDto>();
    this.exams.forEach( exam => {
      (exam.name.indexOf(event.query) != -1) ? this.dropListExams.push(exam) : false
    });
  }


  public setQuestions() : void {
    this.questionService.getQuestionByExam(this.exam.id).subscribe(
      response => this.questions = response,
      error => console.log(error)
    );    
  }

  private resetQuestionForm() : void {
    this.questionForm.reset({
      weight : 0.0,
      type : this.questionTypes[0],
      description : ''
    });
  }

  private getInfoFromQuestionForm(question : OpenQuestionDto) : void {
    let questionForm  =  this.questionForm.value;
    question.weight = questionForm.weight;
    question.type = questionForm.type.code;
    question.description = questionForm.description;
  }

  public saveQuestion() : void {
    let question = new OpenQuestionDto;
    this.getInfoFromQuestionForm(question);
    this.resetQuestionForm();
    question.exam = this.exam;
    this.questionService.saveQuestion(question).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Question created successfully'})
        this.questions.push(response);
      },
      error => console.log(error)
    );
  }

  public updateQuestion() : void {
    let index = this.questions.findIndex( (q) => q === this.question );
    if (index !== -1) {
      this.getInfoFromQuestionForm(this.question);
      this.questionService.updateQuestion(this.question).subscribe( 
        response => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Question updated successfully'});
          this.questions.splice(index, 1, response);
        },
        error => console.log(error)
      );
    }
    else {
      console.log("question not found!");
    }

    this.resetQuestionForm();
    this.creatingQuestion = true;
  }

  public cancelUpdateQuestion() : void {
    this.resetQuestionForm();
    this.creatingQuestion = true;
  }
}
