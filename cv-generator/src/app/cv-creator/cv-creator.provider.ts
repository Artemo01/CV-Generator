import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CvDocumentModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class CvCreatorProvider {
  constructor(private http: HttpClient) {}

  public generatePdf(documentModel: CvDocumentModel): Observable<Blob> {
    const url = 'https://localhost:44390/api/Pdf/generate';
    const headers = new HttpHeaders({
      Accept: 'application/pdf',
    });

    return this.http.post(url, documentModel, {
      headers,
      responseType: 'blob',
    });
  }
}
