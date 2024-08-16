import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  errorMessage: string = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  formatNumeroDocumento() {
    let cleaned = ('' + this.numeroDocumento).replace(/\D/g, '');
    let formatted = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.numeroDocumento = formatted;
  }

  buscarCliente() {
    const cleanedNumeroDocumento = this.numeroDocumento.replace(/,/g, '');

    if (cleanedNumeroDocumento.length < 8 || cleanedNumeroDocumento.length > 11) {
      this.errorMessage = 'El número de documento debe ser de mínimo 8 caracteres y máximo 11.';
      return;
    }

    if (!/^\d+$/.test(cleanedNumeroDocumento)) {
      this.errorMessage = 'El número de documento debe contener solo números.';
      return;
    }

    this.clienteService.getCliente(this.tipoDocumento, cleanedNumeroDocumento).subscribe(
      data => {
        sessionStorage.setItem('cliente', JSON.stringify(data));
        this.router.navigate(['/resumen']);
      },
      error => {
        this.errorMessage = 'No se pudo encontrar el cliente. Por favor, verifique los datos e intente nuevamente.';
        console.error('Error al buscar cliente', error);
      }
    );
  }
}
