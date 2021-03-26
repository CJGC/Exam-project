export class StudentDto {

    public id : number;
    public identificationCard : string;
    public name : string;
    public lastname : string;

    constructor() {
        this.id = 0;
        this.identificationCard = "";
        this.name = "";
        this.lastname = "";
    }

}