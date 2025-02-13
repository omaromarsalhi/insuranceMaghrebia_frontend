import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMainPage]'
})
export class MainPageDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  async ngAfterViewInit(): Promise<void> {
    // Define scripts in EXACT dependency order
    const scripts = [
      'assets/vendors/jquery/jquery-3.7.0.min.js',              // jQuery first
      'assets/vendors/bootstrap/js/bootstrap.bundle.min.js',     // Depends on jQuery
      'assets/vendors/bootstrap-select/bootstrap-select.min.js',
      'assets/vendors/jquery-ui/jquery-ui.js',
      'assets/vendors/jquery-appear/jquery.appear.min.js',
      'assets/vendors/imagesloaded/imagesloaded.min.js',
      'assets/vendors/isotope/isotope.js',                       // Depends on imagesloaded
      'assets/vendors/owl-carousel/js/owl.carousel.min.js',
      'assets/vendors/wow/wow.js',
      'assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js',
      'assets/vendors/jquery-circle-progress/jquery.circle-progress.min.js',
      'assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js',
      'assets/vendors/jquery-validate/jquery.validate.min.js',
      'assets/vendors/nouislider/nouislider.min.js',
      'assets/vendors/ion.rangeSlider/js/ion.rangeSlider.min.js',
      'assets/vendors/tiny-slider/tiny-slider.js',
      'assets/vendors/wnumb/wNumb.min.js',
      'assets/vendors/countdown/countdown.min.js',
      'assets/vendors/jquery-circleType/jquery.circleType.js',
      'assets/vendors/jquery-lettering/jquery.lettering.min.js',
      'assets/vendors/chart/chart.js',
      'assets/js/insuba.js'  // Your custom script last
    ];

    try {
      // Load scripts sequentially
      for (const script of scripts) {
        await this.loadScript(script);
      }
    } catch (error) {
      console.error('Script loading failed:', error);
    }
  }

  private loadScript(scriptUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Avoid duplicate loading
      if (document.querySelector(`script[src="${scriptUrl}"]`)) {
        resolve();
        return;
      }

      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = () => resolve();
      scriptElement.onerror = (err) => reject(err);
      document.body.appendChild(scriptElement);
    });
  }
}