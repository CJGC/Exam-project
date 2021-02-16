import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';
import { ProfessorMainViewComponent } from './Componentes/professor-main-view/professor-main-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'create-professor', pathMatch: 'full'},
  { path: 'create-professor', component: CreateProfessorComponent},
  { path: 'professor-main-view', component: ProfessorMainViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
