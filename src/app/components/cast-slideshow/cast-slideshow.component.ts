import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {

  mySwiper: Swiper;
  @Input() Casts: Cast[];
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    });
  }
  mover( arg ): void{
    switch (arg) {
      case 'next':
        this.mySwiper.slideNext();
        break;
      case 'prev':
        this.mySwiper.slidePrev();
        break;
    }
  }
}
