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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OrderListModule } from 'primeng/orderlist';
import { DropdownModule } from 'primeng/dropdown';


import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';
import { ProfessorMainViewComponent } from './Componentes/professor-main-view/professor-main-view.component';
import { ProfessorInteractionComponent } from './Componentes/professor-interaction/professor-interaction.component';
import { ExamMainViewComponent } from './Componentes/exam-main-view/exam-main-view.component';
import { ExamFormComponent } from './Componentes/exam-form/exam-form.component';
import { QuestionFormComponent } from './Componentes/question-form/question-form.component';
import { QuestionMainViewComponent } from './Componentes/question-main-view/question-main-view.component';
import { ManageExamComponent } from './Componentes/manage-exam/manage-exam.component';
import { AnswerOptionFormComponent } from './Componentes/answer-option-form/answer-option-form.component';
import { AnswerOptionMainViewComponent } from './Componentes/answer-option-main-view/answer-option-main-view.component';
import { correctAnswerPipe } from './pipes/correctAns';
import { ExamDetailsViewComponent } from './Componentes/exam-details-view/exam-details-view.component';
import { PresentExamComponent } from './Componentes/present-exam/present-exam.component';
import { QuestionTypePipe } from './pipes/question-type.pipe';


@NgModule({
  declarations: [
    correctAnswerPipe,
    AppComponent,
    PageNotFoundComponent,
    CreateProfessorComponent,
    ProfessorMainViewComponent,
    ExamFormComponent,
    ProfessorInteractionComponent,
    ExamMainViewComponent,
    QuestionFormComponent,
    QuestionMainViewComponent,
    ManageExamComponent,
    AnswerOptionFormComponent,
    AnswerOptionMainViewComponent,
    ExamDetailsViewComponent,
    PresentExamComponent,
    QuestionTypePipe
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
    AutoCompleteModule,
    ToggleButtonModule,
    DynamicDialogModule,
    OrderListModule,
    DropdownModule
  ],
  entryComponents: [ExamDetailsViewComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
