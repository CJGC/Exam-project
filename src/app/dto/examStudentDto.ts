import { Directive } from '@angular/core';
import { ExamDto } from './examDto';
import { StudentDto } from './studentDto';

@Directive()
export class ExamStudentDto {

    public id : number;
    public definitiveGrade : number;
    public student : StudentDto;
    public exam : ExamDto;

    constructor() {
        this.id = 0;
        this.definitiveGrade = 0.1;
        this.student = new StudentDto();
        this.exam = new ExamDto;
    }

}