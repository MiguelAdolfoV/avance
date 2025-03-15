import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { RegisterPageRoutingModule } from './register-routing.module'; // Importación del módulo de rutas

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Si estás usando formularios simples, FormsModule se necesita
    ReactiveFormsModule, // Aquí importamos ReactiveFormsModule para formularios reactivos
    IonicModule,
    RegisterPageRoutingModule // Asegúrate de importar correctamente el módulo de rutas
  ],
  declarations: [RegisterPage] // Declaramos el componente RegisterPage
})
export class RegisterPageModule {}
