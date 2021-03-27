import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamStudentDto } from '../dto/ExamStudentDto';

@Injectable({
  providedIn: 'root'
})
export class ExamStudentService {

  constructor(private http : HttpClient) { }

  public getExamStudents() : Observable<Array<ExamStudentDto>> {
    return this.http.get<Array<ExamStudentDto>>(environment.apiURL + 'examStudent/all');
  }

  public saveExamStudent(examStudent : ExamStudentDto) : Observable<ExamStudentDto> {
    return this.http.post<ExamStudentDto>(environment.apiURL + 'examStudent', examStudent);
  }

  public updateExamStudent(examStudent : ExamStudentDto) : Observable<ExamStudentDto> {
    return this.http.put<ExamStudentDto>(environment.apiURL + 'examStudent', examStudent);
  }

  public delExamStudent(examStudent : ExamStudentDto) : Observable<ExamStudentDto> {
    return this.http.delete<ExamStudentDto>(environment.apiURL + 'examStudent/' + examStudent.id);
  }
}
