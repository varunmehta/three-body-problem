import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs'
import { throwError }  from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = '/api/customers';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  createClient = function(localBaseUrl) {
    this.baseUrl = localBaseUrl
    return this
  }

  create(customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.baseUrl}`, customer, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  update(id, customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.baseUrl}/${id}`, customer, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getByFunkyId(funkyId: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseUrl}/funky/${funkyId}`, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.baseUrl}`).pipe(catchError(this.errorHandler))
  }

  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}
