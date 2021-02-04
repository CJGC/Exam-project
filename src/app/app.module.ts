import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateProfessorComponent } from './Componentes/create-professor/create-professor.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProfessorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
