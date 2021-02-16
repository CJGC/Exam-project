import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-professor-main-view',
  templateUrl: './professor-main-view.component.html',
  styleUrls: ['./professor-main-view.component.css']
})
export class ProfessorMainViewComponent implements OnInit {
  
  public barMenuItems: MenuItem[];

  constructor() { 
    this.barMenuItems = [{
      icon: 'pi pi-align-justify'    
    }];
  }

  ngOnInit() : void {
    
  }

}