import { ProfessorDto } from './ProfessorDto';

export class ExamDto {

    public id : number;
    public professor : ProfessorDto;
    public description : String;
    public link : String;
    public maxGrade : Number;
    public name : String;
    public durability : number;

    constructor() {
        this.id = 0;
        this.professor = new ProfessorDto;
        this.description = new String;
        this.link = new String;
        this.maxGrade = 0.0;
        this.name = new String;
        this.durability = 0;
    }

}