import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { ExamDto } from 'src/app/dto/ExamDto';
import { AnswerOptionService } from 'src/app/services/answer-option.service';
import { QuestionService } from 'src/app/services/question.service';
import { environment } from 'src/environments/environment';
import { AnsOptsDetailsComponent } from '../ans-opts-details/ans-opts-details.component';

@Component({
  selector: 'app-exam-details-view',
  templateUrl: './exam-details-view.component.html',
  styleUrls: ['./exam-details-view.component.css'],
  providers: [DialogService]
})
export class ExamDetailsViewComponent implements OnInit {

  public exam : ExamDto;
  public questions : Array<QuestionDto>;
  public ansOpts  : Array<AnswerOptionDto>;

  constructor(
    private questionService : QuestionService,
    private ansOptService : AnswerOptionService,
    private config : DynamicDialogConfig,
    private dialogService : DialogService
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
      questions => {
        let QUESTION_INDEX = 0;
        questions.forEach( question => {
          question.questionImage = 
            (question.questionImage !== "") ? `${environment.apiURL}question/getImage/?filename=${question.questionImage}` : "";
          this.questions.push(question);
          question
          QUESTION_INDEX += 1;
        });
      },
      error => console.log(error)
    );
  }

  private viewAnsOptDetails() : void {
    this.dialogService.open(AnsOptsDetailsComponent, {
      data : this.ansOpts,
      header: 'Answer options details',
      width: '70%'
    });
  }

  public setAnswerOpts(selectedQuestion : QuestionDto) : void {

    this.ansOptService.getAnsOptByQuestion(selectedQuestion.id).subscribe(
      ansOpts => {
        this.ansOpts = ansOpts;
        this.viewAnsOptDetails();
      },
      error => console.log(error)
    );
  }
}
