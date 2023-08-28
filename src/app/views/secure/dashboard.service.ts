import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessMessage } from 'src/app/shared/shared.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<HttpEvent<SuccessMessage>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<SuccessMessage>(`${this.api}/file_upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
