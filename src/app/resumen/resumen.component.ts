import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  cliente: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const clienteData = sessionStorage.getItem('cliente');
    if (clienteData) {
      this.cliente = JSON.parse(clienteData);
    } else {
      console.error('No se encontraron datos del cliente');
      this.router.navigate(['/']); // Redirige a la página de ingreso
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
