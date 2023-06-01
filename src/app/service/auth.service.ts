import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API: any
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {
    this.API = environment.API_URL
  }

  addCounty(data: any): Observable<any> {
    return this.httpClient.post(`${this.API}County`, data);
  }

  updateCounty(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.API}County/${id}`, data);
  }

  getCountyList(): Observable<any> {
    return this.httpClient.get(`${this.API}County`);
  }
  
  deleteCounty(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API}County/${id}`);
  }


  addState(data: any): Observable<any> {
    return this.httpClient.post(`${this.API}State`, data);
  }

  updateState(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.API}State/${id}`, data);
  }

  getStateList(): Observable<any> {
    return this.httpClient.get(`${this.API}State`);
  }
  
  deleteState(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API}State/${id}`);
  }

  
  addCity(data: any): Observable<any> {
    return this.httpClient.post(`${this.API}City`, data);
  }

  updateCity(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.API}City/${id}`, data);
  }

  getCityList(): Observable<any> {
    return this.httpClient.get(`${this.API}City`);
  }
  
  deleteCity(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API}City/${id}`);
  }






  addCategory(data: any): Observable<any> {
    return this.httpClient.post(`${this.API}Category`, data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.API}Category/${id}`, data);
  }

  getCategoryList(): Observable<any> {
    return this.httpClient.get(`${this.API}Category`);
  }
  
  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API}Category/${id}`);
  }




  
  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}
