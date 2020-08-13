import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group ({
      firstname: [''],
      lastname: [''],
      email: [''],
      funkyId: ['']
    })
  }

  submitForm() {
    this.customerService.create(this.customerForm.value).subscribe(res => {
      console.log('Customer Created!')
      this.router.navigateByUrl('/customer/home')})
  }

}
