import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { IngresoComponent } from './ingreso.component';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

describe('IngresoComponent', () => {
  let component: IngresoComponent;
  let fixture: ComponentFixture<IngresoComponent>;
  let clienteService: ClienteService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresoComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ClienteService]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for a client and navigate to resumen on success', () => {
    const dummyCliente = {
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      secondLastName: 'Smith',
      phone: '123-456-7890',
      address: '123 Main St.',
      city: 'New York'
    };
    spyOn(clienteService, 'getCliente').and.returnValue(of(dummyCliente));
    spyOn(router, 'navigate');

    component.tipoDocumento = 'C';
    component.numeroDocumento = '23445322';
    component.buscarCliente();

    expect(clienteService.getCliente).toHaveBeenCalledWith('C', '23445322');
    expect(sessionStorage.getItem('cliente')).toEqual(JSON.stringify(dummyCliente));
    expect(router.navigate).toHaveBeenCalledWith(['/resumen']);
  });

  it('should show error message on client search failure', () => {
    spyOn(clienteService, 'getCliente').and.returnValue(throwError('error'));
    spyOn(console, 'error');

    component.tipoDocumento = 'C';
    component.numeroDocumento = '23445322';
    component.buscarCliente();

    expect(clienteService.getCliente).toHaveBeenCalledWith('C', '23445322');
    expect(component.errorMessage).toBe('No se pudo encontrar el cliente. Por favor, verifique los datos e intente nuevamente.');
    expect(console.error).toHaveBeenCalledWith('Error al buscar cliente', 'error');
  });
});
