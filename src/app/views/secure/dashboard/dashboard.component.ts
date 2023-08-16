import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  files: any[] = [];
  fileUploaded: boolean = false;
  isProgress: boolean = true;
  isValidFile: boolean = false;
  progress: number = 100;
  submitButtonText: string = 'Scan';
  isDisabled: boolean = true;

  fileBrowseHandler(event: any) {
    const file = event.target.files[0];
    this.files.push(file);
    this.fileUploaded = true;
    setTimeout(() => this.validateFile(this.files[0]), 5000);
  }

  onFileDropped(files: any[]) {
    this.files.push(files[0]);
    this.fileUploaded = true;
    setTimeout(() => this.validateFile(this.files[0]), 5000);
  }

  validateFile(file: any): void {
    if (file.size && file.size > 3000000) {
      this.isValidFile = true;
      this.isProgress = false;
      this.isDisabled = false;
    } else {
      this.isValidFile = false;
      this.isProgress = false;
      this.isDisabled = false;
      this.submitButtonText = 'Try again';
    }
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
