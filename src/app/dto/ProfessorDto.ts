export class ProfessorDto  {

    public id : number;
    public identificationCard : String;
    public name : String;
    public lastname : String;
    public email : String;
    public username : String;
    public password : String;

    constructor () {
        this.id = 1;
        this.identificationCard = new String ("");
        this.name = new String("");
        this.lastname = new String("");
        this.email = new String("");
        this.username = new String("");
        this.password = new String("");
    }
}