import { Directive } from '@angular/core';
import { ProfessorDto } from './professorDto'

@Directive()
export class ExamDto {

    public id : number;
    public name : String;
    public link : String;
    public maxGrade : number;
    public description : String;
    public durability : number;
    public professor : ProfessorDto;

    constructor() { 
        this.id = 0;
        this.name = new String;
        this.link = new String;
        this.maxGrade = 0.0;
        this.description = new String;
        this.durability = 0;
        this.professor = new ProfessorDto;
    }
}