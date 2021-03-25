import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { ExamDto } from 'src/app/dto/ExamDto';
import { AnswerOptionService } from 'src/app/services/answer-option.service';
import { ExamService } from 'src/app/services/exam.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-exam-details-view',
  templateUrl: './exam-details-view.component.html',
  styleUrls: ['./exam-details-view.component.css']
})
export class ExamDetailsViewComponent implements OnInit {

  public exam : ExamDto;
  public questions : Array<QuestionDto>;
  public ansOpts  : Array<AnswerOptionDto>;

  constructor(
    private questionService : QuestionService,
    private ansOptService : AnswerOptionService,
    private config : DynamicDialogConfig
    ) { 

      this.exam = new ExamDto
      this.questions = new Array<QuestionDto>();
      this.ansOpts = new Array<AnswerOptionDto>();
    }

  ngOnInit(): void {
    this.exam = this.config.data;
    this.getQuestions();
  }

  private getQuestions() : void {
    this.questionService.getQuestionByExam(this.exam.id).subscribe(
      response => { this.questions = response},
      error => console.log(error)
    );
  }

  public setAnswerOpts(event : any) : void {
    let question : QuestionDto = <QuestionDto> event.value[0];
    this.ansOptService.getAnsOptByQuestion(question.id).subscribe(
      response => this.ansOpts = response,
      error => console.log(error)
    );
  }
}
