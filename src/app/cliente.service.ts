import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8090/getCustomer';

  constructor(private http: HttpClient) { }

  getCliente(tipoDocumento: string, numeroDocumento: string): Observable<any> {
    const body = {
      documentType: tipoDocumento,
      documentNumber: numeroDocumento
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}


