import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnswerOptionDto } from '../dto/AnswerOptionDto';

@Injectable({
  providedIn: 'root'
})
export class AnswerOptionService {

  constructor(private http : HttpClient) { }

  public getAnsOpts() : Observable<Array<AnswerOptionDto>> {
    return this.http.get<Array<AnswerOptionDto>>(environment.apiURL + 'ansopt/all');
  }

  public getAnsOptByQuestion(questionID : Number) : Observable<Array<AnswerOptionDto>> {
    return this.http.get<Array<AnswerOptionDto>>(environment.apiURL + 'ansopt/' + questionID);
  }

  public saveQAnsOpt(ansOpt : AnswerOptionDto) : Observable<AnswerOptionDto> {
    return this.http.post<AnswerOptionDto>(environment.apiURL + 'ansopt', ansOpt);
  }

  public updateAnsOpt(ansOpt : AnswerOptionDto) : Observable<AnswerOptionDto> {
    return this.http.put<AnswerOptionDto>(environment.apiURL + 'ansopt', ansOpt);
  }

  public delAnsOpt(ansOpt : AnswerOptionDto) : Observable<String> {
    return this.http.delete(environment.apiURL + 'ansopt/' + ansOpt.id, {responseType : 'text'});
  }
}
