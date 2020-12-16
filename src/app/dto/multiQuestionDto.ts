import { QuestionDto } from './abstractDto/questionDto';
import { AnswerOptionDto } from './AnswerOptionDto';

export class MultiQuestionDto extends QuestionDto {
    
    public answerOptions : Array<AnswerOptionDto>;

    constructor() {
        super();
        this.answerOptions = new Array<AnswerOptionDto>();
    }

}
