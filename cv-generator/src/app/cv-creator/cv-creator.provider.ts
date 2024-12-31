import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CvDocumentModel } from './models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CvCreatorProvider {
  constructor(private http: HttpClient) {}

  public generatePdf(documentModel: CvDocumentModel): Observable<Blob> {
    const url = `${environment.apiUrl}/Pdf/generate`;
    const headers = new HttpHeaders({
      Accept: 'application/pdf',
    });

    return this.http.post(url, documentModel, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
