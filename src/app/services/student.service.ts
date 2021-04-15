import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentDto } from '../dto/StudentDto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }

  public getStudents() : Observable<Array<StudentDto>> {
    return this.http.get<Array<StudentDto>>(environment.apiURL + 'student/all');
  }

  public getStudentByIdentificationCard(identCard : string) : Observable<StudentDto> {
    return this.http.get<StudentDto>(environment.apiURL + 'student/byIdentCard?id=' + identCard);
  }

  public saveStudent(student : StudentDto) : Observable<StudentDto> {
    return this.http.post<StudentDto>(environment.apiURL + 'student', student);
  }

  public updateStudent(student : StudentDto) : Observable<StudentDto> {
    return this.http.put<StudentDto>(environment.apiURL + 'student', student);
  }

  public delStudent(student : StudentDto) : Observable<String> {
    return this.http.delete(environment.apiURL + 'student/' + student.id, {responseType : 'text'});
  }
}
