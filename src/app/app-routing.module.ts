import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';
import { ManageExamComponent } from './Componentes/manage-exam/manage-exam.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { StudentFormComponent } from './Componentes/student-form/student-form.component';
import { ProfessorMainViewComponent } from './Componentes/professor-main-view/professor-main-view.component';
import { ExamGradeMainViewComponent } from './Componentes/exam-grade-main-view/exam-grade-main-view.component';
import { ExamStudentsResponsesComponent } from './Componentes/exam-students-responses/exam-students-responses.component';
import { ExamStudentResponseDetailComponent } from './Componentes/exam-student-response-detail/exam-student-response-detail.component';

const routes: Routes = [
  { path: 'create-professor', component: CreateProfessorComponent},
  { path: 'professor-main-view', component: ProfessorMainViewComponent, 
    children: [
      {path: 'manage-exam-view', component: ManageExamComponent},
      {path: 'exam-grade-main-view', component: ExamGradeMainViewComponent},
      {path: 'exam-students-view', component:ExamStudentsResponsesComponent},
      {path: 'exam-student-response-detail', component:ExamStudentResponseDetailComponent}
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
