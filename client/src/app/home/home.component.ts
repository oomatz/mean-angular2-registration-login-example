import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(_id: string) {
    this.userService.delete(_id).subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(
      (users: User[]) => this.users = users,
      error => {
        console.log(error);
        this.alertService.error(error.error, true);
        this.router.navigate(['/login']);
      }
    );
  }
}
