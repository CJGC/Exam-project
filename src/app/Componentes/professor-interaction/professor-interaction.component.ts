import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-professor-interaction',
  templateUrl: './professor-interaction.component.html',
  styleUrls: ['./professor-interaction.component.css']
})
export class ProfessorInteractionComponent implements OnInit {

  @Input() public display : boolean;
  @Output() public tellAboutDisplay : any;

  items: MenuItem[];

  constructor() { 
    this.display = false;

    this.tellAboutDisplay = new EventEmitter<Boolean>();
    this.items = [
      {label: 'Manage exam', icon: 'pi pi-book'},
      {label: 'Account', icon: 'pi pi-user-edit'}
  ];
  }


  ngOnInit(): void {

  }

  public emitDisplay () : void  {
    this.display = false;
    this.tellAboutDisplay.emit(this.display);
  }
}
