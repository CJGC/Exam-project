import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-professor-main-view',
  templateUrl: './professor-main-view.component.html',
  styleUrls: ['./professor-main-view.component.css']
})
export class ProfessorMainViewComponent implements OnInit {
  
  public barMenuItems: MenuItem[];
  public display : boolean;

  constructor(private router : Router) { 
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

  logOut() : void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}