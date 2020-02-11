import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router,
              public crudApi: CrudService) { }

  submitted = false;
  actionsForm: FormGroup;
  public firstNameErrorMessage = '';
  public lastNameErrorMessage = '';
  public emailErrorMessage = '';
  public mobileNumberErrorMessage = '';

  ngOnInit() {
    this.actionsForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      status: ['', Validators.required]
    });
    this.form.firstName.statusChanges.subscribe((name: any) => {
      if (name === 'INVALID') {
          if (this.form.firstName.errors.required) {
            this.firstNameErrorMessage = 'Name is mandatory.';
          } else if (this.form.firstName.errors.pattern) {
            this.firstNameErrorMessage = 'Please enter valid name.';
          }
      } else {
        this.firstNameErrorMessage = '';
      }
    });

    this.form.lastName.statusChanges.subscribe((name: any) => {
      if (name === 'INVALID') {
          if (this.form.lastName.errors.required) {
              this.lastNameErrorMessage = 'Name is mandatory.';
          } else if (this.form.lastName.errors.pattern) {
              this.lastNameErrorMessage = 'Please enter valid name.';
          }
      } else {
          this.lastNameErrorMessage = '';
      }
    });

    this.form.email.statusChanges.subscribe((name: any) => {
      if (name === 'INVALID') {
          if (this.form.email.errors.required) {
              this.emailErrorMessage = 'Email is mandatory.';
          } else if (this.form.email.errors.pattern) {
              this.emailErrorMessage = 'Please enter valid email.';
          }
      } else {
          this.emailErrorMessage = '';
      }
    });

    this.form.mobileNumber.statusChanges.subscribe((name: any) => {
      if (name === 'INVALID') {
          if (this.form.mobileNumber.errors.required) {
              this.mobileNumberErrorMessage = 'Email is mandatory.';
          } else if (this.form.mobileNumber.errors.pattern) {
              this.mobileNumberErrorMessage = 'Please enter valid email.';
          }
      } else {
          this.mobileNumberErrorMessage = '';
      }
    });
  }

  get form(): any {
    return this.actionsForm.controls;
  }

  addUser() {
    this.crudApi.AddUser(this.actionsForm.value);
    this.ResetForm();
  }

 

  ResetForm() {
    this.actionsForm.reset();
  }
}
