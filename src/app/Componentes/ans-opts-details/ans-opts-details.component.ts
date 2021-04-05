import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AnswerOptionDto } from 'src/app/dto/AnswerOptionDto';

@Component({
  selector: 'app-ans-opts-details',
  templateUrl: './ans-opts-details.component.html',
  styleUrls: ['./ans-opts-details.component.css']
})
export class AnsOptsDetailsComponent implements OnInit {

  public ansOpts : Array<AnswerOptionDto>;

  constructor(conf : DynamicDialogConfig) { 
    this.ansOpts = conf.data;
  }

  ngOnInit(): void {
  }

}
