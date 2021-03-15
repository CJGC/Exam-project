import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'correctAns'})
export class correctAnswerPipe implements PipeTransform {
    transform(isCorrectAns: boolean) {
        return (isCorrectAns) ? 'Yes' : 'No';
    }
}