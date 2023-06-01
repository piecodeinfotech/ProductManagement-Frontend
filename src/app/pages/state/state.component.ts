import { Component, OnInit, ViewChild } from '@angular/core';
import { log } from 'console';
import { AuthService } from 'src/app/service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddEditStateComponent } from '../add-edit-state/add-edit-state.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'countyId',
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
    this.getStateList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditStateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStateList();
        }
      },
    });
  }

  getStateList() {
    this._empService.getStateList().subscribe({
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

  deleteState(id: number) {
    this._empService.deleteState(id).subscribe({
      next: (res) => {
        this._empService.openSnackBar('State deleted!', 'done');
        this.getStateList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditStateComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStateList();
        }
      },
    });
  }
}
