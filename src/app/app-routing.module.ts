import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';
import { ExamMainViewComponent } from './Componentes/exam-main-view/exam-main-view.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { ProfessorMainViewComponent } from './Componentes/professor-main-view/professor-main-view.component';

const routes: Routes = [
  { path: 'create-professor', component: CreateProfessorComponent},
  { path: 'professor-main-view', component: ProfessorMainViewComponent, 
    children: [
      {path: 'exam-main-view', component: ExamMainViewComponent}
    ]
  },
  { path: '', redirectTo: 'ProfessorMainViewComponent', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
