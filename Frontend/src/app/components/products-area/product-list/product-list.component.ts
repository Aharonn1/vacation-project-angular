import { VacationsService } from 'src/app/services/vacation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import VacationModel from 'src/app/models/vacation.model';
import notify from 'src/app/utils/Notyify';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  subscribe!: Subscription;
  vacations: VacationModel[];
  isArchivedTasksNeeded: boolean = false;
  day = new Date();

  constructor(private vacationService: VacationsService, private router: Router) { }
  async ngOnInit() {
    this.vacations = await this.vacationService.getAllVacation();
    this.vacationService.vacations.next(this.vacations);

    this.subscribe = this.vacationService.vacations.subscribe((data) => {
      this.vacations = data;
    })
  }

  vacationsActive() {
    const value = this.vacationService.vacations.getValue()
    this.vacationService.vacations.next(value);
    this.vacations = this.vacations.filter((task: VacationModel) => (this.vacations && new Date(task.startDate) <= this.day && new Date(task.endDate) >= this.day))
  }

  vacationsNotActive() {
    const value = this.vacationService.vacations.getValue()
    this.vacationService.vacations.next(value);
    this.vacations = this.vacations.filter((task: VacationModel) => (this.vacations && new Date(task.startDate) > this.day))
  }

  favoriteVacations() {
    const value = this.vacationService.vacations.getValue()
    this.vacationService.vacations.next(value);
    this.vacations = this.vacations.filter((task: VacationModel) => (this.vacations && task.idFollowing >= 1))
  }

  async deleteVacation(id: number) {
    if (!window.confirm("Are you sure ?")) return;
    await this.vacationService.deleteVacation(id);
    this.vacations = this.vacations.filter((item) => item.vacationId != id)
    this.vacationService.vacations.next(this.vacations)
    notify.success("product has been deleted")
  }

  ngOnDestroy(): void { }
}
