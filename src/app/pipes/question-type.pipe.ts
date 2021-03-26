import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionType'
})
export class QuestionTypePipe implements PipeTransform {

  transform(questionCode : string): string {
    let name : string;
    
    if (questionCode === "op") {
      name = "Open question";
    }
    else if (questionCode === "mu") {
      name = "Multiple unique"
    }
    else if (questionCode === "mm") {
      name = "Multiple multiple";
    }
    else {
      name = "Unknown code";
    }

    return name;
  }

}
