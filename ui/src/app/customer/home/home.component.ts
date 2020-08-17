import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customers: any;

  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAll().subscribe(data => {
      console.log(data);
      this.customers = data;
    })
  }

}
