import { AnswerOptionDto } from "../dto/AnswerOptionDto";

export class ManageAnsOpts {
    
    private _ansOpts: Array<AnswerOptionDto>;
    private _newAnsOpts: Array<AnswerOptionDto>;
    private _uptAnsOpts: Array<AnswerOptionDto>;
    private _delAnsOpts: Array<AnswerOptionDto>;

    constructor () {
        this._ansOpts = new Array<AnswerOptionDto>();
        this._newAnsOpts = new Array<AnswerOptionDto>();
        this._uptAnsOpts = new Array<AnswerOptionDto>();
        this._delAnsOpts = new Array<AnswerOptionDto>();
    }

    public resetAttributes() : void {
        this._ansOpts = new Array<AnswerOptionDto>();
        this._newAnsOpts = new Array<AnswerOptionDto>();
        this._uptAnsOpts = new Array<AnswerOptionDto>();
        this._delAnsOpts = new Array<AnswerOptionDto>();
    }

    public get ansOpts(): Array<AnswerOptionDto> {
        return this._ansOpts;
    }
    public set ansOpts(value: Array<AnswerOptionDto>) {
        this._ansOpts = value;
    }

    public get newAnsOpts(): Array<AnswerOptionDto> {
        return this._newAnsOpts;
    }
    public set newAnsOpts(value: Array<AnswerOptionDto>) {
        this._newAnsOpts = value;
    }
    public get uptAnsOpts(): Array<AnswerOptionDto> {
        return this._uptAnsOpts;
    }
    public set uptAnsOpts(value: Array<AnswerOptionDto>) {
        this._uptAnsOpts = value;
    }
    public get delAnsOpts(): Array<AnswerOptionDto> {
        return this._delAnsOpts;
    }
    public set delAnsOpts(value: Array<AnswerOptionDto>) {
        this._delAnsOpts = value;
    }

    private findIndicesForUnexistentUptAns(unexistentUptAnsIndices : Array<number>) : void {
        let i=0;
        this.uptAnsOpts.forEach( ansOpt => {
            if (ansOpt.id === 0) {
                unexistentUptAnsIndices.push(i);
            }
            i++;
        });
    }

    private findIndicesForUnexistentDelAns(unexistentDelAnsIndices : Array<number>) : void {
        let i=0;
        this.delAnsOpts.forEach( ansOpt => {
            if (ansOpt.id === 0) {
                unexistentDelAnsIndices.push(i);
            }
            i++;
        });
    }

    private addUnexistentAnsOptAsNewAnsOpt(unexistentUptAnsIndices : Array<number>) : void {
        unexistentUptAnsIndices.forEach( index => {
            this.newAnsOpts.push(this.uptAnsOpts[index]);
            this.uptAnsOpts.splice(index, 1);
        });
    }

    private discardUnexistentAnsOptForDeleteRequest(unexistentDelAnsIndices : Array<number>) : void {
        unexistentDelAnsIndices.forEach( index => {
            this.delAnsOpts.splice(index, 1);
        });
    }

    public resolve() : void {
        // all unexistent ans options mean that these don't exist into database
        let unexistentUptAnsIndices = new Array<number>();
        let unexistentDelAnsIndices = new Array<number>();
        this.findIndicesForUnexistentUptAns(unexistentUptAnsIndices);
        this.findIndicesForUnexistentDelAns(unexistentDelAnsIndices);
        this.addUnexistentAnsOptAsNewAnsOpt(unexistentUptAnsIndices);
        this.discardUnexistentAnsOptForDeleteRequest(unexistentDelAnsIndices);
    }

    public addItemIntoAnsOpts(ansOpt : AnswerOptionDto) : void {
        this.ansOpts.push(ansOpt);
    }

    public addItemIntoNewAnsOpts(ansOpt : AnswerOptionDto) : void {
        this.newAnsOpts.push(ansOpt);
    }

    public addItemIntoUptAnsOpts(ansOpt : AnswerOptionDto) : void {
        let index = this.uptAnsOpts.indexOf(ansOpt);
        if (index === -1) {
            this.uptAnsOpts.push(ansOpt);
        } else {
            this.uptAnsOpts.splice(index, 1, ansOpt);
        }

        this.delDuplicates(ansOpt, this.newAnsOpts, this.delAnsOpts);
    }

    public addItemIntoDelAnsOpts(ansOpt : AnswerOptionDto) : void {
        this.delAnsOpts.push(ansOpt);
        this.delDuplicates(ansOpt, this.newAnsOpts, this.uptAnsOpts);
    }

    private delDuplicates(
        ansOpt : AnswerOptionDto, 
        array1 : Array<AnswerOptionDto>, 
        array2 : Array<AnswerOptionDto>) : void {

        let array1Index = array1.indexOf(ansOpt);
        let array2Index = array2.indexOf(ansOpt);
        
        if (array1Index !== -1) {
            array1.splice(array1Index, 1);
        }
        if (array2Index !== -1) {
            array2.splice(array2Index, 1);
        }
    }
}