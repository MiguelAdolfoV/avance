import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} 

  onSubmit() {
    console.log('Username:', this.username); 
    console.log('Password:', this.password); 
    this.authService.login(this.username, this.password).subscribe(
      response => {
        localStorage.setItem('userId', response.id);
        console.log('Inicio de sesión exitoso', response);
        this.router.navigate(['/dashboard']); 
      },
      error => {
        console.error('Error en el inicio de sesión', error);
        alert('Credenciales incorrectas, por favor intenta de nuevo.');
      }
    );
  }  
}
