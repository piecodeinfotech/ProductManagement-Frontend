import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  citys: any
  constructor(private city: AuthService) { }
  cityform!: FormGroup
  ngOnInit(): void {
    this.dispaly();
  }
  dispaly() {
    this.city.citydata().subscribe((res) => {
      this.citys = res;
    });
  }

  edit() {
    alert("test")
  }

  onSubmit() {
    alert(this.cityform.value);
    this.city.postcitydata(this.cityform.value).subscribe((res) => {
      this.citys = res;
      console.log(this.city);
    });
  }
}
