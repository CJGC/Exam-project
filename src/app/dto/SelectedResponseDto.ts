import { ExamStudentDto } from './ExamStudentDto';
import { AnswerOptionDto } from './AnswerOptionDto';

export class SelectedResponseDto  {
    
    public id : number;
    public valoration : number;
    public examStudent : ExamStudentDto;
    public answerOption : AnswerOptionDto;

    constructor() {
        this.id = 0;
        this.valoration = 0.0;
        this.examStudent = new ExamStudentDto;
        this.answerOption = new AnswerOptionDto;
    }

}
