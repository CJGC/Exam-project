import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';
import { ManageExamComponent } from './Componentes/manage-exam/manage-exam.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { StudentFormComponent } from './Componentes/student-form/student-form.component';
import { ProfessorMainViewComponent } from './Componentes/professor-main-view/professor-main-view.component';

const routes: Routes = [
  { path: 'create-professor', component: CreateProfessorComponent},
  { path: 'professor-main-view', component: ProfessorMainViewComponent, 
    children: [
      {path: 'manage-exam-view', component: ManageExamComponent}
    ]
  },
  { path: 'present-exam/:id', component: StudentFormComponent},
  { path: '', redirectTo: 'professor-main-view', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
