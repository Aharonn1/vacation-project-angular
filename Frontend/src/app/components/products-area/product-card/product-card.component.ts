import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VacationsService } from 'src/app/services/vacation.service';
import VacationModel from 'src/app/models/vacation.model';
import appConfig from 'src/app/utils/app-config';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input()
  vacation: VacationModel;//props
  imageSource: string;

  @Output()
  deleteMe = new EventEmitter<number>();
  update = new EventEmitter<number>();

  constructor(private vacationService: VacationsService) { }

  ngOnInit(): void {
    this.imageSource = appConfig.vacationsImagesUsersUrl + this.vacation.imageName;
  }

  likeVacation() {
    if (this.vacation.idFollowing == 0) {
      this.vacationService.follow(this.vacation)
      this.vacation.idFollowing = this.vacation.idFollowing ? 0 : 1;
      this.update.emit(this.vacation.followersCount++)
    }
    else {
      this.vacationService.unFollow(this.vacation)
      this.vacation.idFollowing = this.vacation.idFollowing ? 0 : 1;
      this.update.emit(this.vacation.followersCount--)
    }
  }
}