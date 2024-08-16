import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService]
    });
    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post API to get cliente data', () => {
    const dummyCliente = {
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      secondLastName: 'Smith',
      phone: '123-456-7890',
      address: '123 Main St.',
      city: 'New York'
    };

    service.getCliente('C', '23445322').subscribe(cliente => {
      expect(cliente).toEqual(dummyCliente);
    });

    const req = httpMock.expectOne('http://localhost:8090/getCustomer');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      documentType: 'C',
      documentNumber: '23445322'
    });
    req.flush(dummyCliente);
  });
});

