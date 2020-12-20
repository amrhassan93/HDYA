import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
