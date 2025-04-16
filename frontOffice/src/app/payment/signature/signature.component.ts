import { Component, Inject, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import SignaturePad from 'signature_pad';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements AfterViewInit {

  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef;

  private signaturePad!: SignaturePad;
  isSignatureEmpty = true;
  showHelpText = true;


  constructor(
    public dialogRef: MatDialogRef<SignatureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  // ngAfterViewInit() {
  //   const canvas = this.signatureCanvas.nativeElement;
  //   this.signaturePad = new SignaturePad(canvas, {
  //     minWidth: 1,
  //     maxWidth: 2,
  //     penColor: "white",
  //     backgroundColor: "black"
  //   });
  // }

  // saveSignature() {
  //   console.log("hey i am in the savee");
  //   if (!this.signaturePad.isEmpty()) {
  //     const signatureData = this.signaturePad.toDataURL();
  //     console.log("Saved Signature:", signatureData);
  //   } else {
  //     alert("Please draw your signature before saving.");
  //   }
  // }

  // clearSignature() {
  //   this.signaturePad.clear();
  // }

  // confirmSignature() {
  //   console.log("hey i am in the econfirm ");
  //   if (!this.signaturePad.isEmpty()) {
  //     const signatureData = this.signaturePad.toDataURL();
  //     console.log("Confirmed Signature:", signatureData);
  //     // TODO: Send signature to backend API
  //   } else {
  //     alert("Please draw your signature before confirming.");
  //   }
  // }
  // confirmSignature() {
  //   if (!this.signaturePad.isEmpty()) {
  //     const signatureData = this.signaturePad.toDataURL();
  //     this.dialogRef.close(signatureData);
  //   } else {
  //     alert("Please draw your signature before confirming.");
  //   }
  // }

  // closeModal() {
  //   this.dialogRef.close(null);
  // }


  ngAfterViewInit() {
    this.initSignaturePad();
    this.resizeCanvas();
  }
  private initSignaturePad() {
    const canvas = this.signatureCanvas.nativeElement;
    this.signaturePad = new SignaturePad(canvas, {
      minWidth: 1.5,
      maxWidth: 2.5,
      penColor: '#3f51b5',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      throttle: 16,
      velocityFilterWeight: 0.7
    });

    // Proper event handling for TypeScript
    canvas.addEventListener('pointerdown', () => {
      this.onSignatureStart();
    });
  }
  private onSignatureStart() {
    this.isSignatureEmpty = false;
    this.showHelpText = false;

    // If you need to access the signature data:
    // const signatureData = this.signaturePad.toData();
  }
  @HostListener('window:resize')
  resizeCanvas() {
    const canvas = this.signatureCanvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);

    if (!this.isSignatureEmpty) {
      const data = this.signaturePad.toData();
      this.signaturePad.clear();
      this.signaturePad.fromData(data);
    }
  }
  confirmSignature() {
    if (!this.isSignatureEmpty) {
      const signatureData = this.signaturePad.toDataURL('image/svg+xml');
      this.dialogRef.close(signatureData);
    } else {
      this.showError("Please provide your signature before confirming.");
    }
  }

  clearSignature() {
    this.signaturePad.clear();
    this.isSignatureEmpty = true;
    this.showHelpText = true;
  }
  private showError(message: string) {
    // You could replace this with a proper toast notification
    alert(message);
  }

  closeModal() {
    this.dialogRef.close(null);
  }
}
