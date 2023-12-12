import { Component } from '@angular/core';
import { VacationsService } from 'src/app/services/vacation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private vacationService:VacationsService){}

  logOut(){
    this.vacationService.isUserLogged.next(false)
    localStorage.setItem('token', '')
  }
}
