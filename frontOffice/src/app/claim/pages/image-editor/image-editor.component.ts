import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css'],
})
export class ImageEditorComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;
  private isDrawing = false;
  @Input() inputImage: string | null = null;
  private img: HTMLImageElement = new Image();
  @Output() canvasEmitter = new EventEmitter<HTMLCanvasElement>();
  color: string = '#ff0000';
  private drawingHistory: string[] = [];
  private historyIndex = -1;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = 800;
    this.canvas.nativeElement.height = 600;
    this.saveState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputImage'] && this.inputImage) {
      if (typeof this.inputImage === 'string') {
        this.img.src = this.inputImage;
        this.img.onload = () => {
          this.drawImage();
          this.saveState();
        };
      }
    }
  }

  private drawImage(): void {
    const canvasElement = this.canvas.nativeElement;
    this.ctx = canvasElement.getContext('2d')!;
    const scaleWidth = canvasElement.width;
    const scaleHeight = canvasElement.height;

    this.ctx.clearRect(0, 0, scaleWidth, scaleHeight);
    this.ctx.drawImage(this.img, 0, 0, scaleWidth, scaleHeight);
    this.saveState();
  }

  startDrawing(event: MouseEvent): void {
    this.isDrawing = true;
    this.draw(event);
  }

  // Stop drawing on the canvas
  stopDrawing(): void {
    this.isDrawing = false;
    this.ctx!.beginPath();
    this.saveState();
  }

  draw(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const canvasElement = this.canvas.nativeElement;
    const rect = canvasElement.getBoundingClientRect();
    const scaleX = canvasElement.width / rect.width;
    const scaleY = canvasElement.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    this.ctx!.lineWidth = 3;
    this.ctx!.lineCap = 'round';
    this.ctx!.strokeStyle = this.color; 

    this.ctx!.lineTo(x, y);
    this.ctx!.stroke();
    this.ctx!.beginPath();
    this.ctx!.moveTo(x, y);

  }

  private saveState(): void {
    const canvasElement = this.canvas.nativeElement;
    const state = canvasElement.toDataURL();

    if (this.historyIndex < this.drawingHistory.length - 1) {
      this.drawingHistory = this.drawingHistory.slice(0, this.historyIndex + 1);
    }

    this.drawingHistory.push(state);
    this.historyIndex = this.drawingHistory.length - 1; 
  }

  undo(): void {
    if (this.historyIndex > 0) {
      this.historyIndex--; 
      this.restoreCanvasState(this.drawingHistory[this.historyIndex]);
    }
  }

  private restoreCanvasState(state: string): void {
    const canvasElement = this.canvas.nativeElement;
    const img = new Image();
    img.src = state;
    img.onload = () => {
      this.ctx!.clearRect(0, 0, canvasElement.width, canvasElement.height);
      this.ctx!.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
    };
  }
  @HostListener('window:keydown', ['$event'])
  handleUndo(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      this.undo();
    }
  }

  saveImage(){
    this.canvasEmitter.emit(this.canvas.nativeElement);
  }
}
