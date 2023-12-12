import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import RoleModel from 'src/app/models/Role-Model';
import { VacationsService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  subscribe!: Subscription
  userName: string;
  password: string;
  role:RoleModel;
  isUserLogged: boolean;
  ngOnInit() {
    this.subscribe = this.vacationService.isUserLogged.subscribe(data => {
      this.isUserLogged = data;
    })
  }

  constructor(private vacationService: VacationsService, private router: Router) { }
  async login() {
    const token = await this.vacationService.login(this.userName, this.password)
    if (this.isUserLogged && this.userName === "admin@gmail.com" && this.password === "12345678") {
      this.router.navigateByUrl("/admin/vacations");
    }
    else if(this.isUserLogged){
      this.router.navigateByUrl("/users/vacations");
    }
  }
}