import { Component, OnInit } from '@angular/core';
import { 
  trigger, 
  transition, 
  style, 
  animate, 
  state, 
  query, 
  stagger 
} from '@angular/animations';
// import { WOW } from 'wow.js';


@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css'],
  animations: [
    trigger('dynamicAnimation', [
      state('zoom', style({
        transform: 'scale(1)',
        opacity: 1,
        boxShadow: '0 0 20px rgba(0,0,0,0.15)'
      })),
      state('slide', style({
        transform: 'translateX(0)',
        opacity: 1,
        boxShadow: '0 0 20px rgba(0,0,0,0.15)'
      })),
      state('rotate', style({
        transform: 'rotate(0)',
        opacity: 1,
        boxShadow: '0 0 20px rgba(0,0,0,0.15)'
      })),
      state('hover', style({
        transform: 'translateY(-7px) scale(1.02)',
        boxShadow: '0 15px 30px rgba(0,0,0,0.25)'
      })),
    
      // Corrected enter transitions (void => [state])
      transition('void => zoom', [
        style({
          transform: 'scale(0.85) translateY(30px)',
          opacity: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)'
        }),
        animate('500ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ 
            transform: 'scale(1.05) translateY(-5px)',
            opacity: 0.8,
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
          })),
        animate('300ms 100ms ease-out',
          style({ 
            transform: 'scale(1) translateY(0)',
            opacity: 1
          }))
      ]),
    
      transition('void => slide', [
        style({
          transform: 'translateX(-100px) translateY(20px)',
          opacity: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)'
        }),
        animate('600ms 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ 
            transform: 'translateX(10px) translateY(0)',
            opacity: 0.9,
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
          })),
        animate('250ms ease-out')
      ]),
    
      transition('void => rotate', [
        style({
          transform: 'rotate(-15deg) translateY(30px)',
          opacity: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)'
        }),
        animate('700ms 100ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ 
            transform: 'rotate(3deg) translateY(0)',
            opacity: 0.85,
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
          })),
        animate('300ms ease-out',
          style({ 
            transform: 'rotate(0)',
            opacity: 1
          }))
      ]),
    
      // Hover transitions remain the same
      transition('* => hover', [
        animate('250ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({
            transform: 'translateY(-3px) scale(1.01)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }))
      ]),
      
      transition('hover => *', [
        animate('200ms 50ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
    
      // Exit transitions (using void instead of :leave)
      transition('zoom => void', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            transform: 'scale(0.9) translateY(20px)',
            opacity: 0
          }))
      ]),
      
      transition('slide => void', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            transform: 'translateX(50px)',
            opacity: 0
          }))
      ]),
      
      transition('rotate => void', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            transform: 'rotate(10deg)',
            opacity: 0
          }))
      ])
    ])
  ]
})
export class OffersListComponent implements OnInit {
  activeFilter = '*';
  portfolioItems = [
    {
      id: 1,
      classes: 'item item1',
      image: 'assets/images/portfolio/case-1.jpg',
      category: 'Life Insurance',
      title: 'Family Care Protection Plan',
      animation: 'zoom'
    },
    {
      id: 2,
      classes: 'item item2 item5',
      image: 'assets/images/portfolio/case-2.jpg',
      category: 'Business Insurance',
      title: 'Enterprise Risk Management Solution',
      animation: 'slide'
    },
    {
      id: 3,
      classes: 'item item3 item6',
      image: 'assets/images/portfolio/case-3.jpg',
      category: 'Home Insurance',
      title: 'Smart Home Protection Package',
      animation: 'rotate'
    },
    {
      id: 4,
      classes: 'item item4',
      image: 'assets/images/portfolio/case-4.jpg',
      category: 'Health Insurance',
      title: 'Comprehensive Health Coverage',
      animation: 'zoom'
    },
    {
      id: 5,
      classes: 'item item5',
      image: 'assets/images/portfolio/case-5.jpg',
      category: 'Auto Insurance',
      title: 'Premium Vehicle Protection',
      animation: 'slide'
    },
    {
      id: 6,
      classes: 'item item6',
      image: 'assets/images/portfolio/case-6.jpg',
      category: 'Travel Insurance',
      title: 'Global Travel Safeguard',
      animation: 'rotate'
    },
    {
      id: 7,
      classes: 'item item1 item4',
      image: 'assets/images/portfolio/case-7.jpg',
      category: 'Pet Insurance',
      title: 'Animal Companion Care',
      animation: 'zoom'
    },
    {
      id: 8,
      classes: 'item item2',
      image: 'assets/images/portfolio/case-8.jpg',
      category: 'Cyber Insurance',
      title: 'Digital Asset Protection',
      animation: 'slide'
    },
    {
      id: 9,
      classes: 'item item3',
      image: 'assets/images/portfolio/case-9.jpg',
      category: 'Marine Insurance',
      title: 'Cargo Transport Coverage',
      animation: 'rotate'
    },
    {
      id: 10,
      classes: 'item item4 item6',
      image: 'assets/images/portfolio/case-10.jpg',
      category: 'Disability Insurance',
      title: 'Income Protection Plan',
      animation: 'zoom'
    },
    {
      id: 11,
      classes: 'item item5',
      image: 'assets/images/portfolio/case-1.jpg',
      category: 'Event Insurance',
      title: 'Special Occasion Coverage',
      animation: 'slide'
    },
    {
      id: 12,
      classes: 'item item6 item2',
      image: 'assets/images/portfolio/case-2.jpg',
      category: 'Professional Liability',
      title: 'Career Protection Package',
      animation: 'rotate'
    },
    {
      id: 13,
      classes: 'item item1',
      image: 'assets/images/portfolio/case-3.jpg',
      category: 'Flood Insurance',
      title: 'Natural Disaster Protection',
      animation: 'zoom'
    },
    {
      id: 14,
      classes: 'item item2 item3',
      image: 'assets/images/portfolio/case-4.jpg',
      category: 'Equipment Insurance',
      title: 'Industrial Machinery Coverage',
      animation: 'slide'
    },
    {
      id: 15,
      classes: 'item item4 item5',
      image: 'assets/images/portfolio/case-5.jpg',
      category: 'Art Insurance',
      title: 'Valuables Protection Plan',
      animation: 'rotate'
    },
    {
      id: 16,
      classes: 'item item6',
      image: 'assets/images/portfolio/case-6.jpg',
      category: 'Farmers Insurance',
      title: 'Agricultural Risk Management',
      animation: 'zoom'
    },
    {
      id: 17,
      classes: 'item item1 item2',
      image: 'assets/images/portfolio/case-7.jpg',
      category: 'Aviation Insurance',
      title: 'Aircraft Protection Package',
      animation: 'slide'
    },
    {
      id: 18,
      classes: 'item item3 item4',
      image: 'assets/images/portfolio/case-8.jpg',
      category: 'Student Insurance',
      title: 'Education Protection Plan',
      animation: 'rotate'
    },
    {
      id: 19,
      classes: 'item item5 item6',
      image: 'assets/images/portfolio/case-9.jpg',
      category: 'Jewelry Insurance',
      title: 'Luxury Items Coverage',
      animation: 'zoom'
    },
    {
      id: 20,
      classes: 'item item1 item3 item5',
      image: 'assets/images/portfolio/case-10.jpg',
      category: 'Space Insurance',
      title: 'Satellite Launch Coverage',
      animation: 'slide'
    }
  ];
  

  onHover(item: any, isHover: boolean) {
    item.hover = isHover;
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
  get filteredItems() {
    return this.activeFilter === '*' 
      ? this.portfolioItems 
      : this.portfolioItems.filter(item => item.classes.includes(this.activeFilter));
  }

  ngOnInit() {
    // new WOW().init();
  }

}