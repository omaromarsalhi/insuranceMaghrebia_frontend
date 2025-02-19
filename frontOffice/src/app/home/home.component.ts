import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {




  galleryItemsSliderConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 575,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  galleryItems = [
    {
      image: 'assets/images/gallery/gallery-1.jpg',
      alt: 'Gallery Image 1',
      link: 'service-details.html',
      title: 'Life Insurance'
    },
    {
      image: 'assets/images/gallery/gallery-2.jpg',
      alt: 'Gallery Image 2',
      link: 'service-details.html',
      title: 'Life Insurance'
    },
    {
      image: 'assets/images/gallery/gallery-3.jpg',
      alt: 'Gallery Image 3',
      link: 'service-details.html',
      title: 'Life Insurance'
    },
    {
      image: 'assets/images/gallery/gallery-4.jpg',
      alt: 'Gallery Image 4',
      link: 'service-details.html',
      title: 'Life Insurance'
    },
    {
      image: 'assets/images/gallery/gallery-2.jpg',
      alt: 'Gallery Image 5',
      link: 'service-details.html',
      title: 'Life Insurance'
    }
  ];


  testimonialItemsSliderConfig = {
    slidesToShow: 2,        // Show 2 items at once
    slidesToScroll: 1,      // Scroll one item at a time
    autoplay: true,         // Enable autoplay
    autoplaySpeed: 1000,    // Autoplay every 3 seconds
    infinite: true,         // Enable infinite looping
    dots: true,             // Show dots for navigation
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 2 } // Show 2 items for large screens
      },
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2 } // Show 2 items for medium screens
      },
      {
        breakpoint: 575,
        settings: { slidesToShow: 1 } // Show 1 item for small screens
      }
    ]
  };

  testimonialItems = [
    { image: 'assets/images/testimonial/author-1.jpg', content: 'Your testimonial content', author: 'Joseph B. Renn', position: 'CEO & Founder' },
    { image: 'assets/images/testimonial/author-2.jpg', content: 'Another testimonial content', author: 'John Doe', position: 'Manager' },
    { image: 'assets/images/testimonial/author-2.jpg', content: 'Another testimonial content', author: 'John Doe', position: 'Manager' }

  ];

}
