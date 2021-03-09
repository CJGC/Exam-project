import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OpenQuestionDto } from 'src/app/dto/OpenQuestionDto';
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

  
  constructor(
    private formBuilder : FormBuilder,
    private messageService : MessageService,
    private questionService : QuestionService
    ) {

    this.questions = new Array<OpenQuestionDto>();
    this.questionsChange = new EventEmitter<Array<OpenQuestionDto>>();

    this.question = new OpenQuestionDto;
    this.questionChange = new EventEmitter<OpenQuestionDto>();

    this.questionForm = this.formBuilder.group({});
    this.questionFormChange = new EventEmitter<FormGroup>();

    this.creatingQuestion = true;
    this.creatingQuestionChange = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  private putQuestionInfoIntoQuestionForm(question : OpenQuestionDto) : void {
    this.questionForm.setValue({
      weight : question.weight,
      description : question.description
    });
  }

  public updateQuestion(question : OpenQuestionDto) : void {
    this.question = question;
    this.questionChange.emit(this.question);
    this.creatingQuestionChange.emit(false);
    this.putQuestionInfoIntoQuestionForm(question);
    this.questionFormChange.emit(this.questionForm);
  }

  public delQuestion(question : OpenQuestionDto) : void {
    this.questionService.delQuestion(question).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Question deleted successfully'});
        this.questions.splice(this.questions.indexOf(question), 1);
        this.questionsChange.emit(this.questions);
      },
      error => console.log(error)
    );
  }

}
