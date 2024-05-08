import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // Singleton service
})
export class ApiService {
  private baseUrl =
    environment.BASE_URL || 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    // Handle errors in a generic way
    console.error('An error occurred:', error.error.message);
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }

  get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }
}
