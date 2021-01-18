import { Directive } from '@angular/core';

@Directive()
export class StudentDto {

    public id : number;
    public identificationCard : String;
    public name : String;
    public lastname : String;

    constructor() {
        this.id = 0;
        this.identificationCard = new String;
        this.name = new String;
        this.lastname = new String;
    }

}