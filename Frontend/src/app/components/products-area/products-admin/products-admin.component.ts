import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { VacationsService } from 'src/app/services/vacation.service';
import VacationModel from 'src/app/models/vacation.model';
import notify from 'src/app/utils/Notyify';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit, OnDestroy  {
  @Input()
  imageSource: string;
  subscribe!: Subscription;
  vacations: VacationModel[];
  vacation:VacationModel;

  @Output() deleteMe = new EventEmitter<number>();
  @Output() update = new EventEmitter<VacationModel>(); // Event emitter for update action

  constructor(private vacationService: VacationsService, private router: Router) { }
  async ngOnInit() {
    this.vacations = await this.vacationService.getAllVacation();
    this.vacationService.vacations.next(this.vacations);

    this.subscribe = this.vacationService.vacations.subscribe((data) => {
      this.vacations = data;
    })
  }

  async deleteVacation(id: number) {
    if (!window.confirm("Are you sure ?")) return;
    await this.vacationService.deleteVacation(id);
    this.vacations = this.vacations.filter((item) => item.vacationId != id)
    this.vacationService.vacations.next(this.vacations)
    notify.success("product has been deleted")
  }

  async updateVacation(vacation: VacationModel) {
    await this.vacationService.updateVacation(vacation);
    this.router.navigateByUrl("/update")
    notify.success("product has been updated")
  }

  async  addVacation() {
    await this.vacationService.addVacation(this.vacation)
    this.router.navigateByUrl("/admin/vacations")
    notify.success("vacation has been added successfully")

  }
  ngOnDestroy(): void { }
}