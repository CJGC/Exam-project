import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-professor-main-view',
  templateUrl: './professor-main-view.component.html',
  styleUrls: ['./professor-main-view.component.css']
})
export class ProfessorMainViewComponent implements OnInit {
  
  public barMenuItems: MenuItem[];
  public display : boolean;

  constructor() { 
    this.display = false;
    this.barMenuItems = [{
      icon: 'pi pi-bars',
      command: (event) => {
        this.display = true ;
      } 
    }];
  }

  ngOnInit() : void {
  }

  setDisplay(display : boolean) {
    this.display = display;
  }

}