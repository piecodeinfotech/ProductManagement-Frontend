import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { AddEditCountryComponent } from '../add-edit-country/add-edit-country.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
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
    this.getCountyList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditCountryComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCountyList();
        }
      },
    });
  }

  getCountyList() {
    this._empService.getCountyList().subscribe({
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

  deleteCounty(id: number) {
    this._empService.deleteCounty(id).subscribe({
      next: (res) => {
        this._empService.openSnackBar('County deleted!', 'done');
        this.getCountyList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditCountryComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCountyList();
        }
      },
    });
  }

}
