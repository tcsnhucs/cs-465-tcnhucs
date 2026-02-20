import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private baseUrl = 'http://localhost:3000/api/trips';

  // Everything must be inside these class braces
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // 1. Authentication Methods
  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    // Note: Authentication typically uses a different base URL than /api/trips
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }

  // 2. Trip Management Methods
  public getTrips(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  public addTrip(formData: any): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  public getTrip(tripCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${tripCode}`);
  }

  public updateTrip(formData: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.baseUrl}/${formData.code}`, formData);
  }
}
