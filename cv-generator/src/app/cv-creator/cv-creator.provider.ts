import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvCreatorProvider {
  constructor(private http: HttpClient) {}

  public generatePdf(): Observable<Blob> {
    const url = 'https://localhost:44390/api/Pdf/generate';
    const headers = new HttpHeaders({
      Accept: 'application/pdf', // Informujemy serwer, że oczekujemy pliku PDF
    });

    return this.http.get(url, { headers, responseType: 'blob' });
  }
}
