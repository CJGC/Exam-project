import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { ExamDto } from 'src/app/dto/ExamDto';
import { ExamStudentDto } from 'src/app/dto/ExamStudentDto';
import { OpenQuestionDto } from 'src/app/dto/OpenQuestionDto';
import { OpenResponseDto } from 'src/app/dto/OpenResponseDto';
import { SelectedResponseDto } from 'src/app/dto/SelectedResponseDto';
import { StudentDto } from 'src/app/dto/StudentDto';
import { AnswerOptionService } from 'src/app/services/answer-option.service';
import { ExamStudentService } from 'src/app/services/exam-student.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-solve-exam',
  templateUrl: './solve-exam.component.html',
  styleUrls: ['./solve-exam.component.css']
})
export class SolveExamComponent implements OnInit {

  @Input() public exam : ExamDto;
  @Input() public student : StudentDto;
  @Input() public examStudent : ExamStudentDto;

  public questions : Array<QuestionDto>;
  public question : QuestionDto;
  public questionIndex : number;
  public openResponseForm : FormGroup;
  public ansOpts : Array<any>;
  public loadedAnsOpts : Array<AnswerOptionDto>;

  public responses : Array<Array<any>>;

  public selectedAnsOpt : AnswerOptionDto;
  public selectedAnsOpts : Array<AnswerOptionDto>;

  constructor(
    public questionService : QuestionService,
    public ansOptService : AnswerOptionService,
    public examStudentService : ExamStudentService,
    private formBuilder : FormBuilder
  ) { 
    this.exam = new ExamDto;
    this.student = new StudentDto;
    this.examStudent = new ExamStudentDto
    this.questions = new Array<QuestionDto>();
    this.question = new OpenQuestionDto;
    this.question.type = "";
    this.questionIndex = 0;
    this.ansOpts = [];
    this.loadedAnsOpts = new Array<AnswerOptionDto>();

    this.responses = [];
    this.openResponseForm = this.formBuilder.group({
      content : new FormControl('', [Validators.max(2048)])
    });

    this.selectedAnsOpt = new AnswerOptionDto;
    this.selectedAnsOpts = new Array<AnswerOptionDto>();
  }

  ngOnInit(): void {
    this.questionService.getQuestionByExam(this.exam.id).subscribe(
      questions => {
        this.questions = questions;
        (this.questions.length > 0 ) ? this.setFirstQuestion() : false;
        this.setResponses();
      },
      error => console.log(error)
    );
  }

  private setFirstQuestion() : void {
    let FIRST_QUESTION = 0;
    this.questionIndex = FIRST_QUESTION;
    this.question = this.questions[FIRST_QUESTION];

    // if question type is not open question, set answer options
    (this.question.type!=='op') ? this.getAnsOpts(this.question) : false;
  }

  private setResponses() : void {
    this.questions.forEach( question => this.responses.push([]));
  }

  private getAnsOpts(question : QuestionDto) : void {
    this.ansOptService.getAnsOptByQuestion(question.id).subscribe(
      ansOpts => {
        this.ansOpts.push({question : question, ansOpts : ansOpts})
        this.loadAnsOpts();
      },
      error => console.log(error)
    );
  }

  private setOpenResponseInfo(openResponse : OpenResponseDto) {
    let openResponseForm = this.openResponseForm.value;
    openResponse.content = openResponseForm.content;
    openResponse.examStudent = this.examStudent;
    openResponse.question = this.question;
    openResponse.valoration = 0.0;
  }

  private saveOpenResponse() : void {
    let openResponseExist : boolean = !(this.responses[this.questionIndex].length===0);
    let response : OpenResponseDto; let RESPONSE = 0;
    
    if (openResponseExist) {
      response = this.responses[this.questionIndex][RESPONSE];
      this.setOpenResponseInfo(response);
      this.responses[this.questionIndex][RESPONSE] = response;
    }
    else {
      response = new OpenResponseDto;
      this.setOpenResponseInfo(response);
      this.responses[this.questionIndex].push(response);
    }
  }

  private loadOpenResponseInfoIntoOpenResponseForm(openResponse : OpenResponseDto) : void {
    this.openResponseForm.setValue({
      content : openResponse.content
    });
  }

  private clearOpenResponseForm() : void {
    this.openResponseForm.reset({
      content : ''
    })
  }

  private loadOpenResponse() : void {
    if (this.responses[this.questionIndex].length > 0) {
      let RESPONSE = 0;
      let savedOpenResponse : OpenResponseDto = this.responses[this.questionIndex][RESPONSE]; 
      this.loadOpenResponseInfoIntoOpenResponseForm(savedOpenResponse);
    }
  }

  private saveMultiUniqueResponse() : void {
    let multiUniqueResponseExist : boolean = !(this.responses[this.questionIndex].length===0);
    
    if (multiUniqueResponseExist) {
      let RESPONSE = 0;
      this.responses[this.questionIndex][RESPONSE] = this.selectedAnsOpt;
    }
    else {
      this.responses[this.questionIndex].push(this.selectedAnsOpt);
    }
  }

  private loadMultiUniqueResponse() : void {
    let multiUniqueResponseExist : boolean = !(this.responses[this.questionIndex].length===0);

    if (multiUniqueResponseExist) {
      let RESPONSE = 0;
      this.selectedAnsOpt = this.responses[this.questionIndex][RESPONSE];
    }
  }

  private saveMultiMultiResponse() : void {
    this.responses[this.questionIndex] = this.selectedAnsOpts;
  }

  private loadMultiMultiResponse() : void {
    this.selectedAnsOpts = this.responses[this.questionIndex];
  }

  private loadAnsOpts() : boolean {
    for (let i=0; i<this.ansOpts.length; i++) {
      let pair = this.ansOpts[i];
      if (pair.question === this.question) {
          this.loadedAnsOpts = pair.ansOpts;
          return true;
      }
    }
    return false;
  }

  private checkAndLoadAnsOpts() : void {
    let existAnsOpts : boolean = false;
    existAnsOpts = this.loadAnsOpts();
    (!existAnsOpts) ? this.getAnsOpts(this.question) : false;
  }

  private processStudentResponses(questionIndexOperation : number) : void {
    /* processing the answer of current question */ 
    if (this.question.type==="op") {
      this.saveOpenResponse();
      this.clearOpenResponseForm();
    }
    else if (this.question.type==="mu") {
      this.saveMultiUniqueResponse();
    } // mm question type
    else {
      this.saveMultiMultiResponse();
    }

    /* loading the answer of next/back question if exist */
    this.questionIndex += questionIndexOperation;
    this.question = this.questions[this.questionIndex];

    if (this.question.type==="op") {
      this.loadOpenResponse();
    }
    else if (this.question.type==="mu") {
      this.checkAndLoadAnsOpts();
      this.loadMultiUniqueResponse();
    } // mm question type
    else {
      this.checkAndLoadAnsOpts();
      this.loadMultiMultiResponse();
    }
  }

  public back() : void {
    this.processStudentResponses(-1);
  }

  public next() : void {
    this.processStudentResponses(1);
  }
}
