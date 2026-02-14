import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private baseUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) { }

  public getTrips(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  public addTrip(formData: any): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  getTrip(tripCode: string) : Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/' + tripCode);
  }

  updateTrip(formData: any) : Observable<any[]> {
    return this.http.put<any[]>(this.baseUrl + '/' + formData.code, formData);
  }
}
