import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private BASE_URL = '/api/customers';

  constructor(private httpClient: HttpClient) {
  }

  createCustomer(resource: Customer): Observable<number> {
    return this.httpClient
      .post(this.BASE_URL, resource).pipe(
        map(data => data['id']));
  }

  getCustomer(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.BASE_URL}/${id}`);
  }

  getCustomerByFunkyId(funkyId: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.BASE_URL}/funky/${funkyId}`);
  }

  getCustomers(): Observable<Customer> {
    return this.httpClient.get<Customer>(this.BASE_URL);
  }

  updateCustomer(resource: Customer, id: number): Observable<any> {
    return this.httpClient
      .put(`${this.BASE_URL}/${id}`, resource);
  }
}
