import { VacationsService } from 'src/app/services/vacation.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import VacationModel from 'src/app/models/vacation.model';
import notify from 'src/app/utils/Notyify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  vacation = new VacationModel();
  constructor(private vacationService: VacationsService, private router: Router) { }

  // take a reference to the image input according its unique id: 
  @ViewChild("imageBox")
  imageBox: ElementRef<HTMLInputElement>;

  async send() {
    try {
      this.vacation.image = this.imageBox.nativeElement.files[0];
      await this.vacationService.addVacation(this.vacation);
      notify.success("product has been added")
      this.router.navigateByUrl("/admin/vacations")
    } catch (err: any) {
      notify.error(err.message)
    }
  }
}
