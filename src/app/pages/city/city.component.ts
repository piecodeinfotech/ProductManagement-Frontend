import { Component, OnInit, ViewChild } from '@angular/core';
import { log } from 'console';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddEditCityComponent } from '../add-edit-city/add-edit-city.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'pincode',
    'stateId',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getCityList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditCityComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCityList();
        }
      },
    });
  }

  getCityList() {
    this._empService.getCityList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCity(id: number) {
    this._empService.deleteCity(id).subscribe({
      next: (res) => {
        this._empService.openSnackBar('City deleted!', 'done');
        this.getCityList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditCityComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCityList();
        }
      },
    });
  }
}
