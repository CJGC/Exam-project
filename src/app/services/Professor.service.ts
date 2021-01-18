import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfessorDto } from '../dto/ProfessorDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http : HttpClient) { }

  public getProfessors() : Observable<Array<ProfessorDto>> {
    return this.http.get<Array<ProfessorDto>>(environment.apiURL + 'professor');
  }

  public getByUsername(username : String) : Observable<ProfessorDto> {
    return this.http.get<ProfessorDto>(environment.apiURL + 'professor/?username=' + username);
  }

  public saveProfessor(professor : ProfessorDto) : Observable<ProfessorDto> {
    return this.http.post<ProfessorDto>(environment.apiURL + 'professor', professor);
  }

  public updateProfessor(professor : ProfessorDto) : Observable<ProfessorDto> {
    return this.http.put<ProfessorDto>(environment.apiURL + 'professor', professor);
  }

  public delProfessor(professor : ProfessorDto) : Observable<ProfessorDto> {
    return this.http.delete<ProfessorDto>(environment.apiURL + 'professor/' + professor.id);
  }
}
