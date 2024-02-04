import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';
import { TokenService } from './token.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(data: ILogin) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          console.log(response.data.token);
          if (response && response.data.token) {
            console.log(response.data.token);

            this.tokenService.setToken(response.data.token);
          }
          return response;
        })
      );
  }

  logout() {
    return this.http.get(`${apiEndpoint.AuthEndpoint.logout}`).pipe(
      map((response) => {
        if (response) {
          this.tokenService.removeToken();
        }
        return response;
      })
    );
  }
}
