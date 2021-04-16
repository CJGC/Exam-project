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

  public getImage(fileName : string) : Observable<any> {
    return this.http.get(environment.apiURL + 'question/getImage/?filename=' + fileName, {responseType: 'blob'});
  }

  public saveQuestion(question : QuestionDto) : Observable<QuestionDto> {
    return this.http.post<QuestionDto>(environment.apiURL + 'question', question);
  }

  public saveImage(image : File) : Observable<string> {
    let imageFile : FormData = new FormData();
    imageFile.append("file", image);
    return this.http.post(environment.apiURL + 'question/saveImage', imageFile, {responseType: 'text'});
  }

  public delImage(fileName : string) : Observable<string> {
    return this.http.delete(environment.apiURL + 'question/delImage/?filename=' + fileName, {responseType : 'text'});
  }

  public updateQuestion(question : QuestionDto) : Observable<QuestionDto> {
    return this.http.put<QuestionDto>(environment.apiURL + 'question', question);
  }

  public delQuestion(question : QuestionDto) : Observable<String> {
    return this.http.delete(environment.apiURL + 'question/' + question.id, {responseType : 'text'});
  }
}
