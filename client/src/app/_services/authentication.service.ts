import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map'

import {User} from '../_models/user.model';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    return this.http.post('/users/authenticate', { username: username, password: password})
                    .map((user: User) => {
                      if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                      } 
                      return user
                    })
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser.token : "";
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }

}
