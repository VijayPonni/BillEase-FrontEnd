import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { HttpEventType } from '@angular/common/http';
import { ACCEPTED_FILE_TYPES } from 'src/app/shared/constants/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  file!: File;

  fileUploaded: boolean = false;
  isProgress: boolean = true;
  isValidFile: boolean = false;
  isScanDisabled: boolean = true;

  isScanButtonVisible: boolean = true;
  isTryAgainButtonVisible: boolean = false;

  progress: number = 0;

  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private toastrService: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fileBrowseHandler(event: any) {
    this.file = event.target.files[0];
    this.fileUploaded = true;
    this.validateFile(this.file);
  }

  onFileDropped(files: FileList) {
    if (files.length) {
      this.file = files[0];
      this.fileUploaded = true;
      this.validateFile(this.file);
    } else {
      this.toastrService.error('Please try dragging and dropping the file again.');
    }
  }

  validateFile(file: File): void {
    const fileSize: number = file.size;
    const fileType: string = file.type;

    if (file && fileSize >= 3e7) {
      this.isValidFile = false;
      this.isProgress = false;
      this.isScanButtonVisible = false;
      this.isTryAgainButtonVisible = true;
      this.toastrService.error('File size exceeds 20 Mb');
    } else if (file && !ACCEPTED_FILE_TYPES.includes(fileType)) {
      this.isValidFile = false;
      this.isProgress = false;
      this.isScanButtonVisible = false;
      this.isTryAgainButtonVisible = true;
      this.toastrService.error('Invalid File Type. Please select a PNG, JPG, or JPEG file.');
    } else {
      this.uploadFile(file);
    }
  }

  onScanImage(): void {
    this.router.navigate(['/scanned_bill']);
  }

  uploadFile(file: File) {
    if (file) {
      const observer = this.dashboardService.uploadFile(file).subscribe({
        next: (event: any) => {
          this.subscription.closed = false;
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type == HttpEventType.Response) {
            this.toastrService.success(event.body.message);
            this.isValidFile = true;
            this.isProgress = false;
            this.isScanDisabled = false;
            this.progress = 0;
          }
        },
        error: (error) => {
          this.toastrService.error(error.message);
          this.isValidFile = false;
          this.isProgress = false;
          this.isScanButtonVisible = false;
          this.isTryAgainButtonVisible = true;
          this.progress = 0;
        },
      });
      this.subscription.add(observer);
    }
  }

  onCancel() {
    this.isTryAgainButtonVisible = false;
    this.isScanButtonVisible = true;
    this.isScanDisabled = true;
    this.fileUploaded = false;
    this.isProgress = true;
    this.isValidFile = false;
    this.progress = 0;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTryAgain(): void {
    this.isTryAgainButtonVisible = false;
    this.isScanButtonVisible = true;
    this.isScanDisabled = true;
    this.fileUploaded = false;
    this.isProgress = true;
  }

  formatBytes(bytes: number) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
