import {ExamDto } from '../ExamDto';

export abstract class QuestionDto {

    public id : number;
    public description : string;
    public questionImage : File;
    public weight : number;
    public exam : ExamDto;
    public type : string;

    constructor() {
        this.id = 0;
        this.description = "";
        this.questionImage = new File([], "");
        this.weight = 0.0;

        // op -> open | mu -> multiple unique | mm -> multiple multiple
        this.type = "op";
        this.exam = new ExamDto;
    }
}
