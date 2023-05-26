import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API: any
  constructor(private httpClient: HttpClient) {
    this.API = environment.API_URL
  }

  citydata() {
    return this.httpClient.get(`${this.API}/City`);
  }

  postcitydata(data:any){
    return this.httpClient.post(`${this.API}/City`,data);
  }
}
