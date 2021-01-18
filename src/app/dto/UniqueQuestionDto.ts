import { QuestionDto } from './abstractDto/QuestionDto';
import { AnswerOptionDto } from './AnswerOptionDto';

export class UniqueQuestionDto extends QuestionDto {
    
    public answerOptions : Array<AnswerOptionDto>;

    constructor() {
        super();
        this.answerOptions = new Array<AnswerOptionDto>();
    }

}
