import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';

@Component({
  selector: 'app-answer-option-main-view',
  templateUrl: './answer-option-main-view.component.html',
  styleUrls: ['./answer-option-main-view.component.css'],
  providers: []
})
export class AnswerOptionMainViewComponent implements OnInit {

  @Input() public creatingAnsOpt : boolean;
  @Output() public creatingAnsOptChange : any;
  
  @Input() public ansOpts : Array<AnswerOptionDto>;
  @Output() public ansOptsChange : any;
  
  @Input() public ansOpt : AnswerOptionDto;
  @Output() public ansOptChange : any;

  @Input() public ansOptForm : FormGroup;
  @Output() public ansOptFormChange : any;

  @Input() public maxWeight : number;
  @Output() public maxWeightChange : any;

  constructor(
  ) {
    this.creatingAnsOpt = true;
    this.ansOpts = new Array<AnswerOptionDto>();
    this.ansOpt = new AnswerOptionDto;
    this.ansOptForm = new FormGroup({});
    this.maxWeight = 0;

    this.creatingAnsOptChange = new EventEmitter<boolean>();
    this.ansOptsChange = new EventEmitter<Array<AnswerOptionDto>>();
    this.ansOptChange = new EventEmitter<AnswerOptionDto>();
    this.ansOptFormChange = new EventEmitter<FormGroup>();
    this.maxWeightChange = new EventEmitter<number>();
  }

  ngOnInit(): void {
  }

  private addMaxWeight(ansOpt : AnswerOptionDto) : void {
    this.maxWeight += ansOpt.weight;
    this.maxWeight = Number (this.maxWeight.toPrecision(2));
    this.maxWeightChange.emit(this.maxWeight);
  }

  private putAnsOptInfoIntoAnsOptForm(ansOpt : AnswerOptionDto) : void {
    this.ansOptForm.setValue({
      weight : ansOpt.weight,
      correctAnswer : ansOpt.correctAnswer,
      description : ansOpt.description
    });
    this.ansOptFormChange.emit(this.ansOptForm);
  }

  public updateAnsOpt(ansOpt : AnswerOptionDto) : void {
    this.creatingAnsOpt = false;
    this.creatingAnsOptChange.emit(this.creatingAnsOpt);
    this.ansOpt = ansOpt;
    this.ansOptChange.emit(this.ansOpt);
    this.addMaxWeight(ansOpt);
    this.putAnsOptInfoIntoAnsOptForm(ansOpt);
  }

  public delAnsOpt(ansOpt : AnswerOptionDto) : void {
    this.ansOpts.splice(this.ansOpts.indexOf(ansOpt), 1);
    this.ansOptsChange.emit(this.ansOpts);
    this.addMaxWeight(ansOpt);
  }
}
