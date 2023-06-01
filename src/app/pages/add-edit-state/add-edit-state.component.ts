import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-edit-state',
  templateUrl: './add-edit-state.component.html',
  styleUrls: ['./add-edit-state.component.scss']
})
export class AddEditStateComponent implements OnInit {

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
    private _dialogRef: MatDialogRef<AddEditStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      name: '',
      code: '',
      countyId: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateState(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._empService.openSnackBar('State detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addState(this.empForm.value).subscribe({
          next: (val: any) => {
            this._empService.openSnackBar('State added successfully');
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
