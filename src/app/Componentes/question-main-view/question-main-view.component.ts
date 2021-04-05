import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { OpenQuestionDto } from 'src/app/dto/OpenQuestionDto';
import { AnswerOptionService } from 'src/app/services/answer-option.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-main-view',
  templateUrl: './question-main-view.component.html',
  styleUrls: ['./question-main-view.component.css'],
  providers: [MessageService]
})
export class QuestionMainViewComponent implements OnInit {

  @Input() questions : Array<OpenQuestionDto>;
  @Output() questionsChange : any;

  @Input() questionForm : FormGroup;
  @Output() questionFormChange : any;

  @Input() question : OpenQuestionDto;
  @Output() questionChange : any;

  @Input() creatingQuestion : boolean;
  @Output() creatingQuestionChange : any;

  @Input() maxWeight : number;
  @Output() maxWeightChange : any;

  @Input() ansOpts : Array<AnswerOptionDto>;
  @Output() ansOptsChange : any;

  constructor(
    private formBuilder : FormBuilder,
    private messageService : MessageService,
    private questionService : QuestionService,
    private ansOptService : AnswerOptionService
    ) {

    this.questions = new Array<OpenQuestionDto>();
    this.questionsChange = new EventEmitter<Array<OpenQuestionDto>>();

    this.question = new OpenQuestionDto;
    this.questionChange = new EventEmitter<OpenQuestionDto>();

    this.questionForm = this.formBuilder.group({});
    this.questionFormChange = new EventEmitter<FormGroup>();

    this.creatingQuestion = true;
    this.creatingQuestionChange = new EventEmitter<boolean>();

    this.maxWeight = 0;
    this.maxWeightChange = new EventEmitter<number>();

    this.ansOpts = new Array<AnswerOptionDto>();
    this.ansOptsChange = new EventEmitter<Array<AnswerOptionDto>>();
  }

  ngOnInit(): void {
  }

  private putQuestionInfoIntoQuestionForm(question : QuestionDto) : void {
    
    let type : any;
    if (question.type === "op") {
      type = {code : "op", name : "Open question"};
    } else if (question.type === "mu") {
      type = {code : "mu", name : "Multiple unique"};
    } else {
      type = {code : "mm", name : "Multiple multiple"};
    }

    this.questionForm.setValue({
      weight : question.weight,
      type : type,
      description : question.description
    });
  }

  public addMaxWeight(question : QuestionDto) : void {
    this.maxWeight += question.weight
    this.maxWeight = Number(this.maxWeight.toPrecision(2));
    this.maxWeightChange.emit(this.maxWeight);
  }

  private getAnswerOptions(question : QuestionDto) : void {

    if (question.type === "op") {
      return;
    }

    this.ansOptService.getAnsOptByQuestion(question.id).subscribe(
      ansOpts => {
        this.ansOpts = ansOpts;
        this.ansOptsChange.emit(this.ansOpts);
      },
      error => console.log(error)
    );
  }

  public updateQuestion(question : OpenQuestionDto) : void {
    this.question = question;
    this.questionChange.emit(this.question);
    this.getAnswerOptions(question);    
    this.creatingQuestionChange.emit(false);
    this.putQuestionInfoIntoQuestionForm(question);
    this.questionFormChange.emit(this.questionForm);
    this.addMaxWeight(question);
  }

  private delQuestImage(question : QuestionDto) : void {
    if (question.questionImage !== "") {
      this.questionService.delImage(question.questionImage);
    }
  }

  public delQuestion(question : OpenQuestionDto) : void {
    this.questionService.delQuestion(question).subscribe(
      response => {
        this.delQuestImage(question);
        this.messageService.add({severity:'success', summary:'Success', detail:'Question deleted successfully'});
        this.questions.splice(this.questions.indexOf(question), 1);
        this.questionsChange.emit(this.questions);
        this.addMaxWeight(question);
      },
      error => console.log(error)
    );
  }

}
