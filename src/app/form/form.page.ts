import { Component } from '@angular/core';
import { TransactionsService } from '../services/transactions.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  description: string = '';
  amount: number = 0;
  type: 'ingreso' | 'egreso' = 'ingreso'; // Valor por defecto

  constructor(private transactionsService: TransactionsService, private router: Router) {}

  onSubmit() {
    const userId = localStorage.getItem('userId'); // Obtén el user_id del almacenamiento local

    const transactionData = {
      description: this.description,
      amount: this.amount,
      type: this.type,
      user_id: userId ? parseInt(userId) : null // Asegúrate de que sea un número
    };

    this.transactionsService.registerTransaction(transactionData).subscribe(
      response => {
        console.log('Transacción registrada', response);
        this.router.navigate(['/dashboard']); // Navega a otra página después de registrar
      },
      error => {
        console.error('Error al registrar la transacción', error);
        alert('Registro completo');
      }
    );
  }
}
