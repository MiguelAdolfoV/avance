import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit {
  constructor(private router: Router) { // Inyecta el Router
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createPieChart();
    this.createBarChart();
  }

  createPieChart() {
    const canvas = document.getElementById('myPieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Ahorros', 'Gastos', 'Inversiones'],
          datasets: [{
            label: 'Predicciones Financieras',
            data: [50, 30, 20],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 206, 86, 0.6)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Predicciones Financieras'
            }
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del canvas para el gráfico de torta');
    }
  }

  createBarChart() {
    const canvas = document.getElementById('myBarChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
          datasets: [{
            label: 'Ingresos',
            data: [100, 120, 90, 130],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }, {
            label: 'Gastos',
            data: [70, 60, 50, 90],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Ingresos vs Gastos'
            }
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del canvas para el gráfico de barras');
    }
  }

  goToForm() {
    this.router.navigate(['/form']); 
  }
}
