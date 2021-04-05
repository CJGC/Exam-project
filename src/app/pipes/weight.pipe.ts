import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight'
})
export class WeightPipe implements PipeTransform {

  transform(weight: number): string {
    let data : string = "";
    data = (weight * 100).toPrecision(2) + '%';
    return data;
  }

}
