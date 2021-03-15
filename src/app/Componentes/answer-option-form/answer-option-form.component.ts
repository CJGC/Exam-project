import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { ExamDto } from 'src/app/dto/ExamDto';
import { MultiQuestionDto } from 'src/app/dto/MultiQuestionDto';
import { AnswerOptionService } from 'src/app/services/answer-option.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-answer-option-form',
  templateUrl: './answer-option-form.component.html',
  styleUrls: ['./answer-option-form.component.css'],
  providers: [MessageService]
})
export class AnswerOptionFormComponent implements OnInit {

  @Input() public exams : Array<ExamDto>;
  public questions : Array<QuestionDto>;

  public creatingAnsOpt : boolean;
  public ansOpts : Array<AnswerOptionDto>;
  public ansOpt : AnswerOptionDto;
  public ansOptForm : FormGroup;
  public question : QuestionDto;
  public exam : ExamDto;
  public dropListExams : Array<ExamDto>;
  public dropListQuestions : Array<MultiQuestionDto>

  constructor(
    private formBuilder : FormBuilder,
    private ansOptService : AnswerOptionService,
    private questionService : QuestionService,
    private messageService : MessageService
  ) {
    
    this.ansOptForm = this.formBuilder.group({
      weight : new FormControl (0.0, [Validators.required, Validators.min(0.0), Validators.max(5.0)]),
      correctAnswer : new FormControl (true, [Validators.required]),
      description : new FormControl ('', [Validators.required, Validators.min(1), Validators.max(2048)])
    });

    this.ansOpt = new AnswerOptionDto;
    this.ansOpts = new Array<AnswerOptionDto>();
    this.creatingAnsOpt = true;

    this.exams = new Array<ExamDto>();
    this.exam = new ExamDto;
    this.questions = new Array<QuestionDto>();
    this.question = new MultiQuestionDto;
    this.dropListExams = new Array<ExamDto>();
    this.dropListQuestions = new Array<MultiQuestionDto>();
  }

  ngOnInit(): void {
  }

  public searchExam(event : any) : void {
    this.exam = new ExamDto; this.question = new MultiQuestionDto;
    this.dropListExams = new Array<ExamDto>();
    this.exams.forEach( exam => {
      (exam.name.indexOf(event.query) !== -1) ? this.dropListExams.push(exam) : false
    });
  }

  public searchQuestion(event : any) : void {
    this.question = new MultiQuestionDto;
    this.dropListQuestions = new Array<MultiQuestionDto>();
    this.questions.forEach( question => {
      (question.description.indexOf(event.query) !== -1) ? this.dropListQuestions.push(<MultiQuestionDto> question) : false
    });
  }

  public setQuestions() : void {
    this.questionService.getQuestionByExam(this.exam.id).subscribe(
      response => this.questions = response,
      error => console.log(error)
    );
  }

  public setAnsOpts() : void {
    this.ansOptService.getAnsOptByQuestion(this.question.id).subscribe(
      response => this.ansOpts = response,
      error => console.log(error)
    );
  }

  private resetAnsOptForm() : void {
    this.ansOptForm.reset({
      weight : 0.0,
      correctAnswer : 'No',
      description : ''
    })
  }

  private extractAnsOptInfoFromAnsOptForm(ansOpt : AnswerOptionDto) : void {
    let ansOptionForm = <AnswerOptionDto> this.ansOptForm.value;
    ansOpt.weight = ansOptionForm.weight;
    ansOpt.correctAnswer = ansOptionForm.correctAnswer;
    ansOpt.description = ansOptionForm.description;
  }

  public saveAnsOpt() : void {
    let ansOpt = new AnswerOptionDto;
    this.extractAnsOptInfoFromAnsOptForm(ansOpt);
    ansOpt.question = this.question;

    this.ansOptService.saveQAnsOpt(ansOpt).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Answer option created successfully'});
        this.ansOpts.push(response);
      },
      error => console.log(error)
    );

    this.resetAnsOptForm();
  }

  public cancelNewAnsOpt() : void {
    this.resetAnsOptForm();
  }

  public updateAnsOpt() : void {
    this.extractAnsOptInfoFromAnsOptForm(this.ansOpt);
    this.ansOptService.updateAnsOpt(this.ansOpt).subscribe(
      response => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Answer option updated successfully'});
        let index = this.ansOpts.indexOf(this.ansOpt);
        this.ansOpts.splice(index, 1, response);
      },
      error => console.log(error)
    );
    this.resetAnsOptForm();
  }

  public cancelUpdateAnsOpt() : void {
    this.creatingAnsOpt = true;
    this.resetAnsOptForm();
  }
}
