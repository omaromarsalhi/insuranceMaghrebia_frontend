import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderV2Component } from './image-slider-v2.component';

describe('ImageSliderV2Component', () => {
  let component: ImageSliderV2Component;
  let fixture: ComponentFixture<ImageSliderV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSliderV2Component]
    });
    fixture = TestBed.createComponent(ImageSliderV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
