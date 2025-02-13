import { Component, AfterViewInit } from '@angular/core';

declare var $: any; // Import jQuery globally, as Owl Carousel depends on it.

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {



  owlOptions = {
    items: 1,
    margin: 0,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    loop: true,
    smartSpeed: 700,
    nav: false,
    dots: true,
    autoplay: true,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"]
  };

  slides = [
    {
      imageLeft: '../../assets/images/main-slider/main-slider-1-1.png',
      imageRightBg: '../../assets/images/main-slider/main-slider-1-2.jpg',
      imageRight: '../../assets/images/main-slider/main-slider-1-4.jpg',
      experience: '29+',
      title: 'We Are Insurance Life Solution Company.',
      description: 'Insurance of the socie where we operate. A success website obusly needs great design to be one of the top 26+IT companies Benefit.',
      contactUrl: 'contact.html',
      videoUrl: 'https://www.youtube.com/watch?v=h9MbznbxlLc',
      shapeImage: '../../assets/images/shapes/main-slider-shape-1-1.png',
      shapeBoxImage: '../../assets/images/shapes/main-slider-shape-1-2.png'
    },
    {
      imageLeft: '../../assets/images/main-slider/main-slider-1-1.png',
      imageRightBg: '../../assets/images/main-slider/main-slider-1-3.jpg',
      imageRight: '../../assets/images/main-slider/main-slider-1-5.jpg',
      experience: '29+',
      title: 'Our Reliable Insurance For Purpose Company.',
      description: 'Thought shower drink the Kool-aid we don\'t need to boil the ocean here, yet push back, or we need distributors to evangelize the new.',
      contactUrl: 'contact.html',
      videoUrl: 'https://www.youtube.com/watch?v=h9MbznbxlLc',
      shapeImage: '../../assets/images/shapes/main-slider-shape-1-1.png',
      shapeBoxImage: '../../assets/images/shapes/main-slider-shape-1-2.png'
    }
  ];

  ngAfterViewInit(): void {
    // Initialize Owl Carousel after the view is initialized
    $('.owl-carousel').owlCarousel(this.owlOptions);

  }


}
