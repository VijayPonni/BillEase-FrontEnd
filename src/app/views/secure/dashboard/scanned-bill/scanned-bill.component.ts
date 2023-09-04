import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScannedImageResponse, ValueAndTime } from '../dashboard.model';
import { debounceTime } from 'rxjs/operators';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-scanned-bill',
  templateUrl: './scanned-bill.component.html',
  styleUrls: ['./scanned-bill.component.scss'],
})
export class ScannedBillComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  canvasWidth!: number;
  canvasHeight!: number;
  alteredCoordinatesList: any = [];
  originalWidth = 600;
  originalHeight = 758;
  text = '';
  billForm!: FormGroup;
  lastFocussedFormControl = '';
  invoiceNumberValues: ValueAndTime[] = [];
  gstNumberValues: ValueAndTime[] = [];
  dateTimeValues: ValueAndTime[] = [];
  totalValues: ValueAndTime[] = [];
  isLoading = false;
  imageUrl!: string;
  hasError: boolean = false;

  scannedCoordinatesList = [
    {
      coordinates: [
        [35, 37],
        [161, 37],
        [161, 53],
        [35, 53],
      ],
      text: 'Your company Name',
    },
    {
      coordinates: [
        [355, 29],
        [515, 29],
        [515, 69],
        [355, 69],
      ],
      text: 'INVOICE',
    },
    {
      coordinates: [
        [33, 50],
        [171, 50],
        [171, 69],
        [33, 69],
      ],
      text: 'Your company slogan',
    },
    {
      coordinates: [
        [33, 81],
        [129, 81],
        [129, 99],
        [33, 99],
      ],
      text: 'Street address',
    },
    {
      coordinates: [
        [33, 97],
        [145, 97],
        [145, 113],
        [33, 113],
      ],
      text: '(City ST ZIP Code)',
    },
    {
      coordinates: [
        [477, 97],
        [569, 97],
        [569, 113],
        [477, 113],
      ],
      text: 'INVOICE #[100]',
    },
    {
      coordinates: [
        [35, 109],
        [157, 109],
        [157, 129],
        [35, 129],
      ],
      text: 'Phone [509.555.0190]',
    },
    {
      coordinates: [
        [427, 109],
        [569, 109],
        [569, 129],
        [427, 129],
      ],
      text: 'DATE: MARCH 30,2015',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {
    this.billForm = this.formBuilder.group({
      invoiceNumber: [null, Validators.required],
      gstNumber: [null, Validators.required],
      dateTime: [null, Validators.required],
      total: [null, Validators.required],
    });

    this.getImageData();
  }

  ngOnInit(): void {
    this.billForm
      .get('invoiceNumber')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        if (this.invoiceNumberValues.length > 0) {
          if (this.invoiceNumberValues[this.invoiceNumberValues.length - 1].value !== value) {
            this.invoiceNumberValues.push({
              value: value,
              modifiedDate: this.getCurrentDateTimeFormatted(),
            });
          }
        } else {
          this.invoiceNumberValues.push({
            value: value,
            modifiedDate: this.getCurrentDateTimeFormatted(),
          });
        }
      });

    this.billForm
      .get('gstNumber')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        if (this.gstNumberValues.length > 0) {
          if (this.gstNumberValues[this.gstNumberValues.length - 1].value !== value) {
            this.gstNumberValues.push({
              value: value,
              modifiedDate: this.getCurrentDateTimeFormatted(),
            });
          }
        } else {
          this.gstNumberValues.push({
            value: value,
            modifiedDate: this.getCurrentDateTimeFormatted(),
          });
        }
      });

    this.billForm
      .get('dateTime')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        if (this.dateTimeValues.length > 0) {
          if (this.dateTimeValues[this.dateTimeValues.length - 1].value !== value) {
            this.dateTimeValues.push({
              value: value,
              modifiedDate: this.getCurrentDateTimeFormatted(),
            });
          }
        } else {
          this.dateTimeValues.push({
            value: value,
            modifiedDate: this.getCurrentDateTimeFormatted(),
          });
        }
      });

    this.billForm
      .get('total')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        if (this.totalValues.length > 0) {
          if (this.totalValues[this.totalValues.length - 1].value !== value) {
            this.totalValues.push({
              value: value,
              modifiedDate: this.getCurrentDateTimeFormatted(),
            });
          }
        } else {
          this.totalValues.push({
            value: value,
            modifiedDate: this.getCurrentDateTimeFormatted(),
          });
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.drawBorders();
      this.canvas.nativeElement.addEventListener('click', this.onCanvasClick.bind(this));
    }
  }

  getImageData(): void {
    this.isLoading = true;

    this.dashboardService.getScannedImageDetails().subscribe({
      next: (response: ScannedImageResponse) => {
        const mimeType = 'image/jpeg';
        this.imageUrl = `data:${mimeType};base64,${response.image_data}`;
        this.isLoading = false;
        this.drawBorders();
      },
      error: (error) => {
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  onTryAgain(): void {
    this.hasError = false;
    this.getImageData();
  }

  @HostListener('window:resize', ['$event'])
  onScreenResize(): void {
    this.canvasHeight = this.canvas.nativeElement.offsetHeight;
    this.canvasWidth = this.canvas.nativeElement.offsetWidth;
    this.alterCoordinateValues();
  }

  onControlFocus(controlName: string) {
    this.lastFocussedFormControl = controlName;
  }

  drawBorders(): void {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = this.imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      if (context) {
        context.drawImage(image, 0, 0);
        context.strokeStyle = 'red';
        context.lineWidth = 1;
        context.beginPath();
        this.scannedCoordinatesList.forEach((scannedCoordinates: any) => {
          scannedCoordinates.coordinates.forEach((coordinates: any, index: number) => {
            const [xCoordinate, yCoordinate] = coordinates;
            if (index === 0) {
              context.moveTo(xCoordinate, yCoordinate);
            } else {
              context.lineTo(xCoordinate, yCoordinate);
            }
          });
          context.closePath();
          context.stroke();
        });
      }

      this.canvasHeight = this.canvas.nativeElement.clientHeight;
      this.canvasWidth = this.canvas.nativeElement.offsetWidth;
      this.alterCoordinateValues();
    };
  }

  onCanvasClick(event: MouseEvent): void {
    const domRectangle: DOMRect = this.canvas.nativeElement.getBoundingClientRect();
    const xCoordinate: number = event.clientX - domRectangle.left;
    const yCoordinate: number = event.clientY - domRectangle.top;
    this.findText(xCoordinate, yCoordinate);
  }

  alterCoordinateValues(): void {
    this.alteredCoordinatesList = [];
    this.scannedCoordinatesList.forEach((scannedCoordinate: any) => {
      const alteredCoordinatesObject: any = { coordinates: [], text: scannedCoordinate.text };
      scannedCoordinate.coordinates.forEach((coordinate: any) => {
        const alteredCoordinates = [];
        alteredCoordinates.push(
          +(coordinate[0] * (this.canvasWidth / this.originalWidth)).toFixed(2)
        );
        alteredCoordinates.push(
          +(coordinate[1] * (this.canvasHeight / this.originalHeight)).toFixed(2)
        );
        alteredCoordinatesObject.coordinates.push(alteredCoordinates);
      });
      this.alteredCoordinatesList.push(alteredCoordinatesObject);
    });
  }

  findText(xCoordinate: number, yCoordinate: number): void {
    this.alteredCoordinatesList.forEach((alteredCoordinate: any) => {
      const minXCoordinate = Math.min(
        alteredCoordinate.coordinates[0][0],
        alteredCoordinate.coordinates[3][0]
      );
      const maxXCoordinate = Math.max(
        alteredCoordinate.coordinates[1][0],
        alteredCoordinate.coordinates[2][0]
      );
      const minYCoordinate = Math.min(
        alteredCoordinate.coordinates[0][1],
        alteredCoordinate.coordinates[1][1]
      );
      const maxYCoordinate = Math.max(
        alteredCoordinate.coordinates[2][1],
        alteredCoordinate.coordinates[3][1]
      );
      if (
        xCoordinate >= minXCoordinate &&
        xCoordinate <= maxXCoordinate &&
        yCoordinate >= minYCoordinate &&
        yCoordinate <= maxYCoordinate
      ) {
        this.text = alteredCoordinate.text;
        this.billForm.get(this.lastFocussedFormControl)?.patchValue(alteredCoordinate.text);
      }
    });
  }

  cancel(): void {
    this.billForm.reset();
  }

  submitBillForm(): void {
    // console.log(`Invoice:`, this.invoiceNumberValues);
    // console.log(`GST:`, this.gstNumberValues);
    // console.log(`DateTime:`, this.dateTimeValues);
    // console.log(`Total:`, this.totalValues);
  }

  getCurrentDateTimeFormatted() {
    const options: any = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  }
}
