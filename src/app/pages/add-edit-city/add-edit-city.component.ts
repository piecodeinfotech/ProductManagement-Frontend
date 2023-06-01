import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-edit-city',
  templateUrl: './add-edit-city.component.html',
  styleUrls: ['./add-edit-city.component.scss']
})
export class AddEditCityComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: AuthService,
    private _dialogRef: MatDialogRef<AddEditCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      name: '',
      stateId: '',
      pincode: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateCity(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._empService.openSnackBar('City detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addCity(this.empForm.value).subscribe({
          next: (val: any) => {
            this._empService.openSnackBar('City added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
