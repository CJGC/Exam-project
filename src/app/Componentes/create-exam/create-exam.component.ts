import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public generateLink() : void {
    let link = "exam/";
  }
}
