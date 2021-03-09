import {ExamDto } from '../ExamDto';

export abstract class QuestionDto {

    public id : number;
    public description : String;
    // public questionImage : File;
    public weight : number;
    public exam : ExamDto;
    public type : String;

    constructor() {
        this.id = 0;
        this.description = new String;
        // this.questionImage = File();
        this.weight = 0.0;
        this.type = new String("open");
        this.exam = new ExamDto;
    }
}
