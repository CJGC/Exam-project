import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
import { OpenResponseService } from 'src/app/services/open-response.service';
import { QuestionService } from 'src/app/services/question.service';
import { SelectedResponseService } from 'src/app/services/selected-response.service';

@Component({
  selector: 'app-solve-exam',
  templateUrl: './solve-exam.component.html',
  styleUrls: ['./solve-exam.component.css'],
  providers: [MessageService]
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
  public maxGrade : number;
  public imgUrl : any;
  public thereWereOpenQuestion : boolean;
  public examHasBeenEnded : boolean;

  public responses : Array<Array<any>>;

  public selectedAnsOpt : AnswerOptionDto;
  public selectedAnsOpts : Array<AnswerOptionDto>;

  constructor(
    private questionService : QuestionService,
    private ansOptService : AnswerOptionService,
    private examStudentService : ExamStudentService,
    private openResponseService : OpenResponseService,
    private selectedResponseService : SelectedResponseService,
    private formBuilder : FormBuilder,
    public messageService : MessageService
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
    this.maxGrade = 5.0;

    this.responses = [];
    this.openResponseForm = this.formBuilder.group({
      content : new FormControl('', [Validators.max(2048)])
    });

    this.selectedAnsOpt = new AnswerOptionDto;
    this.selectedAnsOpts = new Array<AnswerOptionDto>();
    this.imgUrl = "";
    this.thereWereOpenQuestion = false;
    this.examHasBeenEnded = false;
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

  private getImage(question : QuestionDto) : void {

    if (question.questionImage === "") {
      return;
    }
    
    this.questionService.getImage(question.questionImage).subscribe(
      image => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          this.imgUrl = reader.result;
        }
      },
      error => console.error(error)
    );
  }

  private resetImage() : void {
    this.imgUrl = "";
  }

  private setFirstQuestion() : void {
    let FIRST_QUESTION = 0;
    this.questionIndex = FIRST_QUESTION;
    this.question = this.questions[FIRST_QUESTION];
    
    if (this.question.questionImage !== "") {
      this.getImage(this.question);
    }
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

  private addOpenResponse() : void {
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

  private addMultiUniqueResponse() : void {
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

  private addeMultiMultiResponse() : void {
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

  private addStudentResponse() : void {
    if (this.question.type==="op") {
      this.addOpenResponse();
      this.clearOpenResponseForm();
    }
    else if (this.question.type==="mu") {
      this.addMultiUniqueResponse();
    } // mm question type
    else {
      this.addeMultiMultiResponse();
    }
  }

  private processStudentResponses(questionIndexOperation : number) : void {
    /* adding student answer of current question */ 
    this.addStudentResponse();

    /* loading student answer of next/back question if it exist */
    this.questionIndex += questionIndexOperation;
    this.question = this.questions[this.questionIndex];
    this.resetImage();
    this.getImage(this.question);

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

  private saveOpenResponse(openResponse : OpenResponseDto) : void {
    this.openResponseService.saveOpenResponse(openResponse).subscribe(
      openResponse => openResponse,
      error => console.log(error)
    );
  }

  private saveSelectedResponse(selectedResponse : SelectedResponseDto) : void {
    this.selectedResponseService.saveSelectedResponse(selectedResponse).subscribe(
      selectedResponse => selectedResponse,
      error => console.log(error)
    );
  }

  private setSelectedResponseInfo(question : QuestionDto, selectedResponse : SelectedResponseDto, 
    selectedAnsOpt : AnswerOptionDto) : void {
    selectedResponse.valoration = question.weight * selectedAnsOpt.weight * this.maxGrade;
    selectedResponse.examStudent = this.examStudent;
    selectedResponse.answerOption = selectedAnsOpt;
  }

  public saveExamStudent() : void {
    this.examStudentService.saveExamStudent(this.examStudent).subscribe(
      examStudent => {
        this.examStudent = examStudent;
        this.messageService.add({severity:'success', summary:'Success', detail:'Your response to this exam has been saved'});
        this.saveStudentResponses();
      },
      error => {
        console.log(error);
        this.messageService.add({sticky:true, severity:'error', summary:'Error', detail:'There was error saving you exam response!'});
      }
    );
  }

  private updateExamStudent() : void {
    this.examStudentService.updateExamStudent(this.examStudent).subscribe(
      examStudent => this.examStudent = examStudent,
      error => console.log(error)
    );
  }

  private saveStudentResponses() : void {
    this.addStudentResponse();
    let QUESTION_INDEX = 0;
    let studentGrade : number = 0.0;

    this.questions.forEach( question => {
      // save OPen responses
      if (question.type === "op") {
        let OPEN_RESPONSE_INDEX = 0;
        let openResponse : OpenResponseDto = this.responses[QUESTION_INDEX][OPEN_RESPONSE_INDEX];
        openResponse.examStudent = this.examStudent;
        //studentGrade += question.weight * openResponse.valoration;
        this.saveOpenResponse(openResponse);
        this.thereWereOpenQuestion = true;
      } 
      
      // save Multple Unique response
      else if (question.type === "mu") {
        let UNIQUE_RESPONSE_INDEX = 0;
        let selectedResponse = new SelectedResponseDto;
        let selectedAnsOpt : AnswerOptionDto = this.responses[QUESTION_INDEX][UNIQUE_RESPONSE_INDEX];
        this.setSelectedResponseInfo(question, selectedResponse, selectedAnsOpt);
        studentGrade += selectedResponse.valoration;
        this.saveSelectedResponse(selectedResponse);
      }
      
      // save Multiple Multiple responses
      else {
        this.responses[QUESTION_INDEX].forEach( selectedAnsOPt => {
          let selectedResponse = new SelectedResponseDto;
          this.setSelectedResponseInfo(question, selectedResponse, selectedAnsOPt);
          studentGrade += selectedResponse.valoration;
          this.saveSelectedResponse(selectedResponse);
        });
      }

      QUESTION_INDEX += 1;
    });

    this.examStudent.definitiveGrade = studentGrade;
    this.updateExamStudent();
    this.questions = new Array<QuestionDto>();
    this.examHasBeenEnded = true;
  }
}
