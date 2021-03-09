import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast'
import { ButtonModule } from 'primeng/button';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';
import { ProfessorMainViewComponent } from './Componentes/professor-main-view/professor-main-view.component';
import { ProfessorInteractionComponent } from './Componentes/professor-interaction/professor-interaction.component';
import { ExamMainViewComponent } from './Componentes/exam-main-view/exam-main-view.component';
import { ExamFormComponent } from './Componentes/exam-form/exam-form.component';
import { QuestionFormComponent } from './Componentes/question-form/question-form.component';
import { QuestionMainViewComponent } from './Componentes/question-main-view/question-main-view.component';
import { ManageExamComponent } from './Componentes/manage-exam/manage-exam.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CreateProfessorComponent,
    ProfessorMainViewComponent,
    ExamFormComponent,
    ProfessorInteractionComponent,
    ExamMainViewComponent,
    QuestionFormComponent,
    QuestionMainViewComponent,
    ManageExamComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    AppRoutingModule,
    MenubarModule,
    SidebarModule,
    MenuModule,
    TableModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    TabViewModule,
    AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
