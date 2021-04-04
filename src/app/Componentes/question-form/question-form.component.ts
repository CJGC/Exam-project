import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { ExamDto } from 'src/app/dto/ExamDto';
import { OpenQuestionDto } from 'src/app/dto/OpenQuestionDto';
import { QuestionService } from 'src/app/services/question.service';
import { AnswerOptionFormComponent } from '../answer-option-form/answer-option-form.component';
import { AnswerOptionService } from 'src/app/services/answer-option.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [MessageService, DialogService, ConfirmationService]
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
  public ansOpts : Array<AnswerOptionDto>;
  public maxWeight : number;
  public imgURL : any;
  public loadedImage : any;

  constructor(
    private questionService : QuestionService,
    private formBuilder : FormBuilder,
    private messageService : MessageService,
    private dynamicService : DialogService,
    private confirmDialog : ConfirmationService,
    private answerOptionService : AnswerOptionService
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
      this.maxWeight = 1;

      this.questionForm = this.formBuilder.group({
        weight : new FormControl(0.0, [Validators.required, Validators.min(0.01), Validators.max(this.maxWeight)]),
        type : new FormControl(this.questionTypes[0], [Validators.required]),
        description : new FormControl('', [Validators.required, Validators.min(1), Validators.max(200)])
      });

      this.question = new OpenQuestionDto;
      this.creatingQuestion = true;
      this.ansOpts = new Array<AnswerOptionDto>();

      this.loadedImage = undefined
      this.imgURL = "";
  }

  ngOnInit(): void {
  }

  private resetComponentAttributes() : void {
    this.dropListExams = new Array<ExamDto>();
    this.question = new OpenQuestionDto;
    this.questions = new Array<QuestionDto>();
    this.ansOpts = new Array<AnswerOptionDto>();
    this.loadedImage = undefined;
    this.imgURL = "";
    this.creatingQuestion = true;
    this.maxWeight = 1;
  }

  public search(event : any) : void {
    this.resetComponentAttributes();
    this.exams.forEach( exam => {
      (exam.name.indexOf(event.query) != -1) ? this.dropListExams.push(exam) : false
    });
  }

  private subMaxWeight(question : QuestionDto) : void {
    this.maxWeight -= question.weight;
    this.maxWeight = Number (this.maxWeight.toPrecision(2));
  }

  private calculateMaxAvailableGrade() : void {
    let maxWeight : number = 1;
    this.questions.forEach( question => {
      maxWeight -= question.weight;
      maxWeight = Number (maxWeight.toPrecision(2));
    });
    this.maxWeight = maxWeight
  }

  public setQuestions() : void {
    this.questionService.getQuestionByExam(this.exam.id).subscribe(
      questions => {
        this.questions = questions;
        this.calculateMaxAvailableGrade();
      },
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


  public onFileChanged(event : any) : void {
    let selectedImage = event.target.files[0];

    if (selectedImage) {

      this.loadedImage = selectedImage;

      // Below part is used to display the selected image
      let readerBase64 = new FileReader();
      readerBase64.readAsDataURL(selectedImage);
      readerBase64.onload = () => { 
        this.imgURL = readerBase64.result;
      };
    } else {
      this.imgURL = "";
      this.loadedImage = undefined;
    }    
  }

  private getInfoFromQuestionForm(question : OpenQuestionDto) : void {
    let questionForm  =  this.questionForm.value;
    question.weight = questionForm.weight;
    question.type = questionForm.type.code;
    question.description = questionForm.description;
  }

  private saveAnswerOpt(question : QuestionDto) : void {
    this.ansOpts.forEach( ansOpt => {
      ansOpt.question = question;
      this.answerOptionService.saveQAnsOpt(ansOpt).subscribe(
        ansOpt => ansOpt,
        error => console.log(error)
      );
    });
    this.ansOpts = new Array<AnswerOptionDto>();
  }

  private saveQuestionIntoDataBase(question : QuestionDto) : void {
    this.questionService.saveQuestion(question).subscribe(
      question => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Question created successfully'})
        this.questions.push(question);
        this.subMaxWeight(question);
        this.saveAnswerOpt(question);
      },
      error => console.log(error)
    );
  }

  private saveSelectedImageIntoDataBase(question : QuestionDto) : void {
    this.questionService.saveImage(this.loadedImage).subscribe(
      imageRoute => {
        question.questionImage = imageRoute;
        this.saveQuestionIntoDataBase(question);
      },
      error => console.log(error)
    );
  }

  public saveQuestion() : void {
    let question = new OpenQuestionDto;
    question.exam = this.exam;
    this.getInfoFromQuestionForm(question);
    this.resetQuestionForm();

    if (this.loadedImage) {
      this.saveSelectedImageIntoDataBase(question);
      this.loadedImage = undefined;
      this.imgURL = "";
    } else {
      this.saveQuestionIntoDataBase(question);
    }
    
  }

  private updateAnswerOpt(question : QuestionDto) : void {
    this.ansOpts.forEach( ansOpt => {
      ansOpt.question = question;
      this.answerOptionService.updateAnsOpt(ansOpt).subscribe(
        ansOpt => ansOpt,
        error => console.log(error)
      );
    });
    this.ansOpts = new Array<AnswerOptionDto>();
  }

  private updateQuestionIntoDataBase(question : QuestionDto, index : number) : void {
    this.questionService.updateQuestion(this.question).subscribe( 
      question => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Question updated successfully'});
        this.questions.splice(index, 1, question);
        this.calculateMaxAvailableGrade();
        this.updateAnswerOpt(question);
      },
      error => {
        console.log(error);
        this.subMaxWeight(this.question);
      }
    );
  }

  private updateSelectedImageIntoDataBase(question : QuestionDto, index : number) : void {
    this.questionService.saveImage(this.loadedImage).subscribe(
      imageRoute => {
        question.questionImage = imageRoute;
        this.updateQuestionIntoDataBase(question, index);
      },
      error => console.log(error)
    );
  }

  private deleteModifiedImageIntoDataBase(question : QuestionDto) : void {
    if (question.questionImage === "") {
      return;
    }

    this.questionService.delImage(question.questionImage).subscribe(
      response => response,
      error => console.log(error)
    );
  }

  public updateQuestion() : void {
    let index = this.questions.findIndex( (q) => q === this.question );
    
    if (index === -1) { 
      console.log("question not found!");
      return;
    }

    this.getInfoFromQuestionForm(this.question);

    if (this.loadedImage) {
      this.deleteModifiedImageIntoDataBase(this.question);
      this.updateSelectedImageIntoDataBase(this.question, index);
      this.loadedImage = undefined;
      this.imgURL = "";
    } else {
      this.updateQuestionIntoDataBase(this.question, index);
    }
    
    this.question = new OpenQuestionDto;
    this.creatingQuestion = true;
    this.resetQuestionForm();
  }

  public cancelUpdateQuestion() : void {
    this.subMaxWeight(this.question);
    this.resetQuestionForm();
    this.creatingQuestion = true;
    this.question = new OpenQuestionDto;
    this.ansOpts = new Array<AnswerOptionDto>();
  }

  private goTomanageAnsOpt(event : any) : void {
    let questionType = event.value;
    this.question.type = questionType.code;
    let ref = this.dynamicService.open(AnswerOptionFormComponent, {
      data : {question : this.question, asnOpts : this.ansOpts},
      header: 'Manage answer option',
      width: '70%'
    });

    ref.onClose.subscribe((ansOpts : Array<AnswerOptionDto>) => {
      if (ansOpts) {
        this.ansOpts = ansOpts;
      }
      else {
        let OPEN_QUESTION_INDEX = 0;
        let questionForm = this.questionForm.value;

        this.questionForm.setValue({
          weight : questionForm.weight,
          type : this.questionTypes[OPEN_QUESTION_INDEX],
          description : questionForm.description
        });
      }
    });
  }

  public manageAnsOpts(event : any) : void {

    if (event.value.code === "op") {
      return;
    }

    if (this.ansOpts.length) {
      this.confirmDialog.confirm({
        message: 'if you want to proceed, saved answer options from last question will be erased!',
        accept: () => {
          this.ansOpts = new Array<AnswerOptionDto>();
          this.goTomanageAnsOpt(event);
        },
        reject: () => {

        }
      });
    }
    else {
      this.goTomanageAnsOpt(event);
    }
  }

  public updateAnsOpt() : void {
    let ref = this.dynamicService.open(AnswerOptionFormComponent, {
      data : {question : this.question, asnOpts : this.ansOpts},
      header: 'Update answer options',
      width: '70%'
    });

    ref.onClose.subscribe((ansOpts : Array<AnswerOptionDto>) => {
      if (ansOpts) {
        this.ansOpts = ansOpts;
      }
    });
  }
}
