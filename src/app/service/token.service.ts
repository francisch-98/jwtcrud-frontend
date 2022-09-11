import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const NAMEUSER_KEY = 'AuthNameUser';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  role: Array<string> = [];

  constructor() { }

  
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  public setNameUser(nameUser: string): void {
    window.sessionStorage.removeItem(NAMEUSER_KEY);
    window.sessionStorage.setItem(NAMEUSER_KEY, nameUser);
  }

  public getNameUser(): string {
    return sessionStorage.getItem(NAMEUSER_KEY) || '';
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.role = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: any) => {
        this.role.push(authority.authority);
      });
    }
    return this.role;
  }
  public logOut(): void {
    window.sessionStorage.clear();
  }
}
