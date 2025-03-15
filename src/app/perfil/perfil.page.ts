import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: { name: string; email: string; password: string; photoUrl?: string } = { name: '', email: '', password: '' };
  
  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Cargar los datos del usuario desde la API o almacenamiento local
  async loadUserData() {
    const token = await this.storage.get('token'); // Asegúrate de tener el token de autenticación
    if (token) {
      this.http.get('https://rest-api-sigma-five.vercel.app/api/auth/user', {
        headers: { 'Authorization': `Bearer ${token}` },
      }).subscribe((data: any) => {
        this.userData = data;
      });
    }
  }

  // Función para cambiar la foto del perfil
  changeProfileImage() {
    // Aquí puedes usar un selector de archivos para actualizar la imagen
    // Esta es solo una implementación simulada
    this.alertCtrl.create({
      header: 'Actualizar foto de perfil',
      message: '¿Quieres cambiar tu foto de perfil?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cambiar Foto',
          handler: () => {
            console.log('Foto cambiada');
            // Simula la actualización de la foto aquí
            this.userData.photoUrl = 'https://via.placeholder.com/150/0000FF/808080'; // Nueva URL de la foto
          },
        },
      ],
    }).then(alert => alert.present());
  }

  // Función para actualizar el perfil
  updateProfile() {
    const token = this.storage.get('token'); // Obtener el token de autenticación

    token.then((tkn: string | null) => {
      if (tkn) {
        this.http.put('https://rest-api-sigma-five.vercel.app/api/auth/user', {
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
        }, {
          headers: {
            'Authorization': `Bearer ${tkn}`,
          }
        }).subscribe(
          response => {
            console.log('Perfil actualizado', response);
            // Aquí puedes mostrar un mensaje de éxito o redirigir al usuario
          },
          error => {
            console.error('Error al actualizar el perfil', error);
            // Aquí puedes manejar errores y mostrar mensajes
          }
        );
      }
    });
  }
}
