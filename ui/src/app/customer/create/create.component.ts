import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  customerForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    funkyId: new FormControl(''),
  });

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public customerService: CustomerService
  ) { }

  submitForm() {
    this.customerService.create(this.customerForm.value).subscribe(res => {
      console.log('Customer Created!')
      this.router.navigateByUrl('/customer/home')})
  }

}
