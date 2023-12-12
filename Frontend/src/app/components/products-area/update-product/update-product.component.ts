import { VacationsService } from 'src/app/services/vacation.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import VacationModel from 'src/app/models/vacation.model';
import notify from 'src/app/utils/Notyify';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  vacation= new VacationModel();
  subscribe!: Subscription;

   constructor(private vacationService : VacationsService, private router:Router){}
  
  // take a reference to the image input according its unique id: 
  @ViewChild("imageBox")
   imageBox:ElementRef<HTMLInputElement>;

  async ngOnInit() {
    this.subscribe = this.vacationService.vacation.subscribe((data) => {
      this.vacation = data;
      console.log(this.vacation)
    })
  }

   async send(){    
    try{
      this.vacation.image = this.imageBox.nativeElement.files[0];
      await this.vacationService.updateVacation(this.vacation);
      notify.success("product has been updated")
      this.router.navigateByUrl("/admin/vacations")
    }catch(err:any){
      notify.error(err.message)
    }
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
