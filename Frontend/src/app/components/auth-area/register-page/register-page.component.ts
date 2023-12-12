import { VacationsService } from 'src/app/services/vacation.service';
import RoleModel from 'src/app/models/Role-Model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  subscribe!: Subscription;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:RoleModel;
  isUserLogged1: boolean;

  ngOnInit() {
    this.subscribe = this.vacationService.isUserLogged.subscribe(data => {
      this.isUserLogged1 = data;
    })
  }

  constructor(private vacationService: VacationsService, private router: Router) { }

  async register() {
    const token = await this.vacationService.register(this.firstName, this.lastName, this.email, this.password,this.role)

    if (this.isUserLogged1&& token&&this.firstName.length>0) {
      this.router.navigateByUrl("/users/vacations")
    }
    else{
      alert("username or password isnt avilalbe");
    }
  }
}