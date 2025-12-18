import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

type LoginResponse = { token: string; idUser: number };

export interface RegisterRequest {
  email: string;
  name: string;
  surname: string;
  password: string;
  roles: ['ROLE_USER'];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE = environment.apiUrl;
  private readonly TOKEN_KEY = 'token';
  private readonly IDUSER_KEY = 'idUser';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_BASE}/login`, { email, password }).pipe(
      tap((res) => {
        this.setToken(res.token);
        this.setIdUser(res.idUser);
      })
    );
  }

  register(data: Omit<RegisterRequest, 'roles'>): Observable<{ status: string }> {
    const body: RegisterRequest = { ...data, roles: ['ROLE_USER'] };

    return this.http.post<{ status: string }>(`${this.API_BASE}/register`, body);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getIdUser(): number {
    return Number(localStorage.getItem(this.IDUSER_KEY));
  }

  private setIdUser(idUser: number): void {
    localStorage.setItem(this.IDUSER_KEY, String(idUser));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.IDUSER_KEY);
  }
}
