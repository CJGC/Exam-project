import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OpenResponseDto } from '../dto/OpenResponseDto';

@Injectable({
  providedIn: 'root'
})
export class OpenResponseService {
  constructor(private http : HttpClient) { }

  public getQuestions() : Observable<Array<OpenResponseDto>> {
    return this.http.get<Array<OpenResponseDto>>(environment.apiURL + 'openResponse/all');
  }

  public getOpenResponsesByExamStudentAndQuestion(examStudentId : number, questionId : number,) : Observable<OpenResponseDto> {
    return this.http.get<OpenResponseDto>(environment.apiURL + 
      'openResponse/byexamstudentandquestion/?examStudentId=' + examStudentId + '&questionId=' + questionId);
  }

  public saveOpenResponse(openResponse : OpenResponseDto) : Observable<OpenResponseDto> {
    return this.http.post<OpenResponseDto>(environment.apiURL + 'openResponse', openResponse);
  }

  public updateOpenResponse(openResponse : OpenResponseDto) : Observable<OpenResponseDto> {
    return this.http.put<OpenResponseDto>(environment.apiURL + 'openResponse', openResponse);
  }

  public delOpenResponse(openResponse : OpenResponseDto) : Observable<String> {
    return this.http.delete(environment.apiURL + 'openResponse/' + openResponse.id, {responseType : 'text'});
  }
}
