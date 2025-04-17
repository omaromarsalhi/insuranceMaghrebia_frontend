import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentType } from '../../models/IncidentType';
import { IncidentTypeService } from '../../services/incident-type.service';
import { Claim } from '../../models/claim';
import { CreateClaimDTO } from '../../transfer/DTOs/CreateClaimDTO';
import { ClaimService } from '../../services/claim.service';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { timeNotInFutureValidator } from '../../validators/TimeValidator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/user/auth.service';
declare var $: any;

@Component({
  selector: 'app-add-claim-page',
  templateUrl: './add-claim-page.component.html',
  styleUrls: ['./add-claim-page.component.css'],
})
export class AddClaimPageComponent implements OnInit, AfterViewInit {
  claimForm!: FormGroup;
  incidentTypes!: IncidentType[];
  locationAddr!: { location: string; coordinates: string };
  step: number = 1;
  public imagePreviews: string[] = [];
  selectedFile: string | null = null;

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentTypeService,
    private claimService: ClaimService,
    private router: Router,
    private authService : AuthService
  ) {}
  ngAfterViewInit(): void {
    if ($ && $.fn.niceSelect) {
      $('#incident-types').niceSelect();
      $('select').on('change', (event: any) => {
        const selectedValue = $(event.target).val();
        this.claimForm.get('incidentType')?.setValue(selectedValue);
      });
    }
  }

  ngOnInit(): void {
    this.incidentService.findIncidentTypes(true).subscribe((data) => {
      this.incidentTypes = data;
      setTimeout(() => this.initNiceSelect(), 0);
    });
    this.claimForm = this.fb.group({
      title: ['', [Validators.required]],
      location: ['', [Validators.required]],
      incidentTime: ['', [Validators.required, timeNotInFutureValidator()]],
      incidentType: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  get title() {
    return this.claimForm.get('title');
  }

  get location() {
    return this.claimForm.get('location');
  }

  get incidentTime() {
    return this.claimForm.get('incidentTime');
  }

  get incidentType() {
    return this.claimForm.get('incidentType');
  }

  get description() {
    return this.claimForm.get('description');
  }

  initNiceSelect() {
    setTimeout(() => {
      if ($ && $.fn.niceSelect) {
        $('#incident-types').niceSelect('destroy'); // Destroy previous instance
        $('#incident-types').niceSelect(); // Re-initialize
      } else {
        console.error('Nice Select is not loaded correctly.');
      }
    }, 0);
  }

  fillLocationField(location: { location: string; coordinates: string }) {
    this.location?.setValue(location.location);
    this.locationAddr = location;
  }

  @ViewChild('next1', { static: false }) next1!: ElementRef;

  triggerButton() {
    this.next1.nativeElement.click();
    this.step = 2;
  }
  nextFormPage() {
    if (this.claimForm.valid) {
      this.triggerButton();
    }
    else 
    {
      Object.values(this.claimForm.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log(this.description?.invalid)
      console.log(this.description?.touched)

    }
  }
  submit(imageSlider: ImageSliderComponent){
    let dto: CreateClaimDTO = {
      userId: this.authService.getCurrentUserId()!,
      title: this.title?.value,
      description: this.description?.value,
      incidentDate: (this.incidentTime?.value as Date).toString(),
      incidentTypeId: this.incidentType?.value,
      incidentLocation: this.location?.value,
      locationCoordinates: this.locationAddr.coordinates,
      images: imageSlider.images.map(image => image.split(',')[1])
    };
    
    this.claimService
            .addClaim(dto)
            .subscribe((data) => {
              this.router.navigate(['/claims'])
            });

  }

  

  ///IMAGES
  public dropped(files: NgxFileDropEntry[]): void {
    this.imagePreviews = [];
    
    const droppedFile = files[0];
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.selectedFile = e.target.result; // Store the image as data URL
            };
            reader.readAsDataURL(file);
          } else {
            console.warn('Rejected file:', file.name);
          }
        });
      
    }
  }

  public fileOver(event: any): void {
    console.log('File is being dragged over:', event);
  }

  public fileLeave(event: any): void {
    console.log('File left the drop zone:', event);
  }

  saveCanvasToSlider(canvas: HTMLCanvasElement, imageSlider: ImageSliderComponent) {
    imageSlider.addImageFromCanvas(canvas);
  }
}
