import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'
import { ButtonModule } from 'primeng/button';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateProfessorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    AppRoutingModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
