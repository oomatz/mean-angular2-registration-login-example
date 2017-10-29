import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user.model';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }
 
  getAll() {
    return this.http.get('/users');
  }

  getById(_id: string) {
      return this.http.get('/users/' + _id);
  }

  create(user: User) {
      return this.http.post('/users/register', user, {responseType: 'text'});
  }

  update(user: User) {
      return this.http.put('/users/' + user._id, user, {responseType: 'text'});
  }

  delete(_id: string) {
      return this.http.delete('/users/' + _id, {responseType: 'text'});
  }
}
