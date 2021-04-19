import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';
import { ManageAnsOpts } from 'src/app/tools/manageAnsOpts';

@Component({
  selector: 'app-answer-option-main-view',
  templateUrl: './answer-option-main-view.component.html',
  styleUrls: ['./answer-option-main-view.component.css'],
  providers: [ConfirmationService]
})
export class AnswerOptionMainViewComponent implements OnInit {

  @Input() public creatingAnsOpt : boolean;
  @Output() public creatingAnsOptChange : any;
    
  @Input() public ansOpt : AnswerOptionDto;
  @Output() public ansOptChange : any;

  @Input() public ansOptForm : FormGroup;
  @Output() public ansOptFormChange : any;

  @Input() public maxWeight : number;
  @Output() public maxWeightChange : any;

  @Input() public manageAnsOpts : ManageAnsOpts;
  @Output() public manageAnsOptsChange : any;

  constructor(
    private confirmDialog : ConfirmationService,
  ) {
    this.creatingAnsOpt = true;
    this.ansOpt = new AnswerOptionDto;
    this.ansOptForm = new FormGroup({});
    this.maxWeight = 0;
    this.manageAnsOpts = new ManageAnsOpts;

    this.creatingAnsOptChange = new EventEmitter<boolean>();
    this.ansOptChange = new EventEmitter<AnswerOptionDto>();
    this.ansOptFormChange = new EventEmitter<FormGroup>();
    this.maxWeightChange = new EventEmitter<number>();
    this.manageAnsOptsChange = new EventEmitter<ManageAnsOpts>();

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
    this.confirmDialog.confirm({
      message: 'Are you sure that want to proceed?',
      accept: () => {
        this.manageAnsOpts.ansOpts.splice(this.manageAnsOpts.ansOpts.indexOf(ansOpt), 1);
        this.manageAnsOpts.addItemIntoDelAnsOpts(ansOpt);
        this.manageAnsOptsChange.emit(this.manageAnsOpts);
        this.addMaxWeight(ansOpt);
      },
      reject: () => {

      }
    });
  }
}
