import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { state, style, transition, trigger ,animate,group,keyframes} from '@angular/animations';
import * as AOS from 'aos';


declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
   

})





export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    // jQuery('.owl-carousel').owlCarousel(); 
    AOS.init();

  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
