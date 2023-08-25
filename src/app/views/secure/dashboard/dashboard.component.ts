import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private toastrSerive: ToastrService
  ) {}

  files: File[] = [];
  fileUploaded: boolean = false;
  isProgress: boolean = true;
  isValidFile: boolean = false;
  isScanDisabled: boolean = true;

  isScanButtonVisible: boolean = true;
  isTryAgainButtonVisible: boolean = false;

  imageDataUrl: string = '';

  progress: number = 100;

  fileBrowseHandler(event: any) {
    const file = event.target.files[0];
    this.files.push(file);
    this.fileUploaded = true;
    setTimeout(() => this.validateFile(this.files[0]), 5000);
  }

  onFileDropped(files: FileList) {
    if (files.length) {
      this.files.push(files[0]);
      this.fileUploaded = true;
      setTimeout(() => this.validateFile(this.files[0]), 5000);
    } else {
      this.toastrSerive.error('Please try dragging and dropping the file again.');
    }
  }

  validateFile(file: File): void {
    const fileSize: number = file.size;
    const fileType: string = file.type;

    if (
      (file && fileSize <= 2e7 && fileType.includes('png')) ||
      fileType.includes('jpg') ||
      fileType.includes('jpeg')
    ) {
      this.isValidFile = true;
      this.isProgress = false;
      this.isScanDisabled = false;
    } else {
      this.isValidFile = false;
      this.isProgress = false;
      this.isScanButtonVisible = false;
      this.isTryAgainButtonVisible = true;
      this.toastrSerive.error('File size exceeds 20 Mb or Invalid File Type');
    }
  }

  onScanImage(): void {
    this.router.navigate(['/scanned_bill']);
  }

  onCancel() {
    this.isTryAgainButtonVisible = false;
    this.isScanButtonVisible = true;
    this.isScanDisabled = true;
    this.fileUploaded = false;
    this.isProgress = true;
    this.isValidFile = false;
    this.files = [];
  }

  onTryAgain(): void {
    this.isTryAgainButtonVisible = false;
    this.isScanButtonVisible = true;
    this.isScanDisabled = true;
    this.fileUploaded = false;
    this.isProgress = true;
    this.files = [];
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
