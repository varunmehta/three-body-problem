import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs'
import { throwError }  from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8080/customers'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.baseUrl}`, JSON.stringify(customer), this.httpOptions).pipe(catchError(this.errorHandler))
  }

  update(id, customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.baseUrl}/${id}`, JSON.stringify(customer), this.httpOptions).pipe(catchError(this.errorHandler))
  }

  getById(id): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseUrl}/${id}`).pipe(catchError(this.errorHandler))
  }

  getByFunkyId(funkyId: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseUrl}/funky/${funkyId}`).pipe(catchError(this.errorHandler))
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
