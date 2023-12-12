import { Component, EventEmitter, Input, Output } from '@angular/core';
import VacationModel from 'src/app/models/vacation.model';
import appConfig from 'src/app/utils/app-config';

@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrls: ['./card-admin.component.css']
})
export class CardAdminComponent {
  @Input()
  vacation: VacationModel;//props
  imageSource: string;

  @Output()
  deleteMe = new EventEmitter<number>();
  update = new EventEmitter<number>();

  ngOnInit(): void {
    console.log(this.vacation)
    this.imageSource = appConfig.vacationsImagesUsersUrl + this.vacation.imageName;
  }

  async deleteProduct() {
    this.deleteMe.emit(this.vacation.vacationId);
  }
}