import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FantasyApiService {
  private apiUrl = 'https://api-fantasy.llt-services.com/api/v3/players';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error obteniendo jugadores:', error);
        throw error;
      })
    );
  }

}
