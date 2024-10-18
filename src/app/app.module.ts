import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http'; // Asegúrate de importar esto

@NgModule({
  declarations: [
    AppComponent,
    // tus componentes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // No necesitas HttpClientModule aquí
  ],
  providers: [
    provideHttpClient(), // Esto es necesario para proveer HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
