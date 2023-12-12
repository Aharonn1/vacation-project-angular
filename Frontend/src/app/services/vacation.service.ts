import { VacationActionType, vacationStore } from '../redux/vacation-state';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import VacationModel from '../models/vacation.model';
import appConfig from '../utils/app-config';
import { Injectable } from '@angular/core';
import RoleModel from '../models/Role-Model';
import notify from '../utils/Notyify';

@Injectable({
  providedIn: 'root'
})
export class VacationsService {

  constructor(private http: HttpClient) { }
  vacations = new BehaviorSubject<any[]>([]);
  vacation = new BehaviorSubject<any>([]);
  isUserLogged = new BehaviorSubject<boolean>(false);


  getHttpHeader() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  async getAllVacation(): Promise<VacationModel[]> {
    let vacation: any = vacationStore.getState().vacations;

    if (vacation.length === 0) {
      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const observable = this.http.get<VacationModel[]>(appConfig.vacationsUsersUrl, { headers });

      vacation = await firstValueFrom(observable);
      console.log(vacation);
      vacationStore.dispatch({ type: VacationActionType.FetchVacation, payload: vacation });
    }

    console.log(vacation);
    return vacation;
  }

  async addVacation(vacation: VacationModel): Promise<void> {
    try {
      const formData = new FormData();
      // formData.append("areaId", vacation.toString())
      formData.append("destination", vacation.destination)
      formData.append("description", vacation.description)
      formData.append("startDate", vacation.startDate)
      formData.append("endDate", vacation.endDate)
      formData.append("price", vacation.price.toString())
      formData.append("image", vacation.image);
      const observable = this.http.post<VacationModel>(appConfig.vacationsAdminUrl, formData);
      const addedVacation = await firstValueFrom(observable);
      vacationStore.dispatch({ type: VacationActionType.AddVacation, payload: addedVacation })
    } catch (err: any) {
      notify.error(err.message)
    }
  }

  async updateVacation(vacation: VacationModel) {
    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const updatedVacation = await this.http.put<VacationModel>(appConfig.vacationsAdminUrl + vacation.vacationId, vacation, { headers });
      const vacations = this.vacations.getValue();
      const index = vacations.findIndex(item => item.vacationId === vacation.vacationId);
      vacations[index] = updatedVacation;
      this.vacations.next(vacations);
    } catch (err: any) {
      notify.error(err.message)
    }
  }

   async getOneVacation(vacationId: number): Promise<VacationModel> {
    let vacations = vacationStore.getState().vacations;
    let vacation = vacations.find(v => v.vacationId === vacationId)
    if (!vacation) {
      const observable = await this.http.get<VacationModel>(appConfig.vacationsAdminUrl + vacationId)
      await firstValueFrom(observable)
    }
    return vacation;
  }

   async deleteVacation(id: number): Promise<void> {
    const observable = this.http.delete(appConfig.vacationsAdminUrl + id);
    await firstValueFrom(observable);
    vacationStore.dispatch({ type: VacationActionType.DeleteVacation, payload: id });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const observable = this.http.post<string>(appConfig.loginUrl, { email: email, password: password });
      const token = await firstValueFrom(observable);
      console.log(token)
      this.isUserLogged.next(true)
      localStorage.setItem("token", token)

    } catch (err: any) {
      notify.error(err.message)
    }
  }

  async register(firstName: string, lastName: string, email: string, password: string, role: RoleModel): Promise<any> {
    try {
      const observable = this.http.post<string>(appConfig.registerUrl, { firstName: firstName, lastName: lastName, email: email, password: password, role: role });
      const token = await firstValueFrom(observable);
      console.log(token)
      this.isUserLogged.next(true)
      localStorage.setItem("token", token)
      return token;
    } catch (err: any) {
      notify.error(err.message)
      return err;
    }
  }

  async follow(task: VacationModel) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers)
    try {
      this.getAllVacation();
      const observable = this.http.post<VacationModel>(appConfig.followUrl + task.vacationId,{},{headers});
      const token = await firstValueFrom(observable);
      this.getAllVacation();
      return true;
    }
    catch (err: any) {
      return false;
    }
  }

  async unFollow(task: VacationModel) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      this.getAllVacation();
      const observable = this.http.post<VacationModel>(appConfig.unfollowUrl + task.vacationId, {}, { headers });
      const token = await firstValueFrom(observable);
      this.getAllVacation();
      return true;
    }
    catch (err: any) {
      return false;
    }
  }
}