import { ExamStudentDto } from "./ExamStudentDto";
import { OpenQuestionDto } from "./OpenQuestionDto";

export class OpenResponseDto  {
    
    public id : number;
    public valoration : number;
    public content : string;
    public examStudent : ExamStudentDto;
    public question : OpenQuestionDto;

    constructor() {
        this.id = 0;
        this.valoration = 0.0;
        this.content = "";
        this.examStudent = new ExamStudentDto;
        this.question = new OpenQuestionDto;
    }

}