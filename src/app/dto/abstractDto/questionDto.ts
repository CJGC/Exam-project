import {ExamDto } from '../examDto';

export abstract class QuestionDto {

    private id : number;
    private description : String;
    // private questionImage : File;
    private weight : number;
    private exam : ExamDto;

    constructor() {
        this.id = 0;
        this.description = new String;
        // this.questionImage = File();
        this.weight = 0.0;
        this.exam = new ExamDto;
    }
}
