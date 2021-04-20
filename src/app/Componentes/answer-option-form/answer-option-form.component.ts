import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QuestionDto } from 'src/app/dto/abstractDto/QuestionDto';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { ManageAnsOpts } from 'src/app/tools/manageAnsOpts';

@Component({
  selector: 'app-answer-option-form',
  templateUrl: './answer-option-form.component.html',
  styleUrls: ['./answer-option-form.component.css'],
  providers: [ MessageService ]
})
export class AnswerOptionFormComponent implements OnInit {

  public creatingAnsOpt : boolean;
  public ansOpt : AnswerOptionDto;
  public ansOptForm : FormGroup;
  public question : QuestionDto;
  public maxWeight : number;
  public manageAnsOpts : ManageAnsOpts;

  constructor(
    private formBuilder : FormBuilder,
    private config: DynamicDialogConfig,
    private ref : DynamicDialogRef,
    private messageService : MessageService
  ) {
    this.manageAnsOpts = this.config.data.manageAnsOpts;
    this.question = this.config.data.question;

    this.ansOptForm = this.formBuilder.group({
      weight : new FormControl (0.0, [Validators.required, Validators.min(0.0), Validators.max(5.0)]),
      correctAnswer : new FormControl (true, [Validators.required]),
      description : new FormControl ('', [Validators.required, Validators.min(1), Validators.max(2048)])
    });

    this.ansOpt = new AnswerOptionDto;
    this.creatingAnsOpt = true;
    this.maxWeight = 1;
    
    if (this.manageAnsOpts.ansOpts.length) {
      this.calculateMaxAvailableGrade();
    }

  }

  ngOnInit(): void {
  }

  private subMaxWeight(ansOpt : AnswerOptionDto) : void {
    this.maxWeight -= ansOpt.weight;
    this.maxWeight = Number (this.maxWeight.toPrecision(2));
  }

  private calculateMaxAvailableGrade() : void {
    let maxWeight : number = 1;
    this.manageAnsOpts.ansOpts.forEach( ansOpt => {
      maxWeight -= ansOpt.weight;
      maxWeight = Number (maxWeight.toPrecision(2));
    });
    this.maxWeight = maxWeight;
  }

  private resetAnsOptForm() : void {
    this.ansOptForm.reset({
      weight : 0.0,
      correctAnswer : true,
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
    this.subMaxWeight(ansOpt);
    this.manageAnsOpts.ansOpts.push(ansOpt);
    this.manageAnsOpts.addItemIntoNewAnsOpts(ansOpt);
    this.resetAnsOptForm();
  }

  public cancelNewAnsOpt() : void {
    this.resetAnsOptForm();
  }

  public updateAnsOpt() : void {
    this.extractAnsOptInfoFromAnsOptForm(this.ansOpt);
    let index = this.manageAnsOpts.ansOpts.indexOf(this.ansOpt);
    this.manageAnsOpts.ansOpts.splice(index, 1, this.ansOpt);
    this.manageAnsOpts.addItemIntoUptAnsOpts(this.ansOpt);
    this.creatingAnsOpt = true;
    this.calculateMaxAvailableGrade();
    this.resetAnsOptForm();
  }

  public cancelUpdateAnsOpt() : void {
    this.creatingAnsOpt = true;
    this.subMaxWeight(this.ansOpt);
    this.resetAnsOptForm();
  }

  private notValidAnsOpts() : boolean {

    // answer options should not be emtpy
    if (!(this.manageAnsOpts.ansOpts.length > 0)) {
      this.messageService.add({sticky:true, severity:'warn', summary:'Warning', detail:'Answer options cannot be empty!'});
      return true;
    }

    let atLeastIsThereACorrectAns = false;
    let isThereWeightInNotCorrectAns = false;
    let isThereACorrectAnsOptWithoutWeight = false;
    let multipleUniqueQuestionNumOfCorrecAnsOpts = 0;
    let consideredWeight = 0.0;

    this.manageAnsOpts.ansOpts.forEach( ansOpt => {

      // check if a not correct answer has a weight
      if (ansOpt.correctAnswer && ansOpt.weight === 0) {
        isThereACorrectAnsOptWithoutWeight = true;
      }

      // check if multiple unique question only has a correct answer
      if (this.question.type === "mu" && ansOpt.correctAnswer) {
        multipleUniqueQuestionNumOfCorrecAnsOpts += 1;
      }

      // check if is not there at least one correct answer
      // check if 100 percent weights have been considered with all correct answer
      if (ansOpt.correctAnswer) {
        atLeastIsThereACorrectAns = true;
        consideredWeight += ansOpt.weight;
        consideredWeight = Number(consideredWeight.toPrecision(2));
      }

      // check if a no correct answer has a weight
      if (!ansOpt.correctAnswer && ansOpt.weight !== 0) {
        isThereWeightInNotCorrectAns = true;
      }

    });
    
    let isAllOk = true;
    if (!atLeastIsThereACorrectAns) {
      this.messageService.add({sticky:true, severity:'warn', summary:'Warning', detail:'There should be at least one correct answer!'});
      isAllOk = false;
    }

    if (isThereACorrectAnsOptWithoutWeight) {
      this.messageService.add({sticky:true, severity:'warn', summary:'Warning', detail:'A correct answer option should has a weight!'});
      isAllOk = false;
    }

    if (this.question.type === "mu" && multipleUniqueQuestionNumOfCorrecAnsOpts != 1) {
      this.messageService.add({sticky:true, severity:'warn', summary:'Warning', detail:'Multiple unique question should has only one correct answer!'});
      isAllOk = false;
    }

    if (isThereWeightInNotCorrectAns) {
      this.messageService.add({sticky:true, severity:'warn', summary:'Warning', detail:'There should not be weight in a not correct answer!'});
      isAllOk = false;
    }

    if (consideredWeight !== 1) {
      this.messageService.add({sticky:true, severity:'warn', summary:'Warning', detail:'You should consider use 100 percent in weight for every correct answer option!'});
      isAllOk = false;
    }

    if (isAllOk) {
      return false;
    }
    else {
      return true;
    }
    
  }

  public accept() : void {
    if (this.notValidAnsOpts()) {
      return;
    }
    this.ref.close(this.manageAnsOpts);
  }

  public cancel() : void {
    this.ref.close();
  }
}
