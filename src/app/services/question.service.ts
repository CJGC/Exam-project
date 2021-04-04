import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionDto } from '../dto/abstractDto/QuestionDto';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  public getQuestions() : Observable<Array<QuestionDto>> {
    return this.http.get<Array<QuestionDto>>(environment.apiURL + 'question/all');
  }

  public getQuestionByExam(examID : Number) : Observable<Array<QuestionDto>> {
    return this.http.get<Array<QuestionDto>>(environment.apiURL + 'question/' + examID);
  }

  public getImage(imageRoute : string) : Observable<any> {
    return this.http.get(environment.apiURL + 'question/getImage/?imgRoute=' + imageRoute, {responseType: 'blob'});
  }

  public saveQuestion(question : QuestionDto) : Observable<QuestionDto> {
    return this.http.post<QuestionDto>(environment.apiURL + 'question', question);
  }

  public saveImage(image : File) : Observable<string> {
    let params : FormData = new FormData();
    params.append("file", image);
    return this.http.post(environment.apiURL + 'question/saveImage', params, {responseType: 'text'});
  }

  public delImage(imageRoute : string) : Observable<string> {
    return this.http.delete(environment.apiURL + 'question/delImage/?imgRoute=' + imageRoute, {responseType : 'text'});
  }

  public updateQuestion(question : QuestionDto) : Observable<QuestionDto> {
    return this.http.put<QuestionDto>(environment.apiURL + 'question', question);
  }

  public delQuestion(question : QuestionDto) : Observable<QuestionDto> {
    return this.http.delete<QuestionDto>(environment.apiURL + 'question/' + question.id);
  }
}
