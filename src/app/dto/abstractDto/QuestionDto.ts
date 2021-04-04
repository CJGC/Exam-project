import {ExamDto } from '../ExamDto';

export abstract class QuestionDto {

    public id : number;
    public description : string;
    public questionImage : string;
    public weight : number;
    public exam : ExamDto;
    public type : string;

    constructor() {
        this.id = 0;
        this.description = "";
        this.questionImage = "";
        this.weight = 0.0;

        // op -> open | mu -> multiple unique | mm -> multiple multiple
        this.type = "op";
        this.exam = new ExamDto;
    }
}
