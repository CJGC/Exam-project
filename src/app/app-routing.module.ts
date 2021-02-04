import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';

const routes: Routes = [
  { path: '', redirectTo: 'create-professor', pathMatch: 'full'},
  { path: 'create-professor', component: CreateProfessorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
