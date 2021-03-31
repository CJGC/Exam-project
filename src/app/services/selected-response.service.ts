import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SelectedResponseDto } from '../dto/SelectedResponseDto';

@Injectable({
  providedIn: 'root'
})
export class SelectedResponseService {
  constructor(private http : HttpClient) { }

  public getSelectedResponses() : Observable<Array<SelectedResponseDto>> {
    return this.http.get<Array<SelectedResponseDto>>(environment.apiURL + 'selectedResponse/all');
  }

  public getSelectedResponseByExamStudentAndQuestion(examStudentId : number, ansOptId : number,) : Observable<SelectedResponseDto> {
    return this.http.get<SelectedResponseDto>(environment.apiURL + 
      'selectedResponse/byexamstudentandquestion/?examStudentId=' + examStudentId + '&ansOptId=' + ansOptId);
  }

  public saveSelectedResponse(selectedResponse : SelectedResponseDto) : Observable<SelectedResponseDto> {
    return this.http.post<SelectedResponseDto>(environment.apiURL + 'selectedResponse', selectedResponse);
  }

  public updateSelectedResponse(selectedResponse : SelectedResponseDto) : Observable<SelectedResponseDto> {
    return this.http.put<SelectedResponseDto>(environment.apiURL + 'selectedResponse', selectedResponse);
  }

  public delSelectedResponse(selectedResponse : SelectedResponseDto) : Observable<SelectedResponseDto> {
    return this.http.delete<SelectedResponseDto>(environment.apiURL + 'selectedResponse/' + selectedResponse.id);
  }
}
