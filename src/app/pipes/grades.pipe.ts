import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grades'
})
export class GradesPipe implements PipeTransform {

  transform(value: number): string {
    return (value * 100).toPrecision(2) + '%';
  }

}
