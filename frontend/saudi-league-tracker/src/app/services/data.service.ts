import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teams`);
  }

  getPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/players`);
  }

  getMatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matches`);
  }

  getStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stats`);
  }

  getPlayerRankings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ai/rank-players`);
  }

  substitutePlayer(playerId: string, replacementId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ai/substitute`, { playerId, replacementId });
  }
}