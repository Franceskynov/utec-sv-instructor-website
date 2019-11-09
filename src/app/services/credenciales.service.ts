import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {

  public headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Platform': 'website'
    });
  }

  public temporalUserActivation(frmData) {
    return this.http.post<any>(environment.CONTROL_URL_API.concat('credentials/temporalUserActivation'), frmData)
        .pipe(map(data => {
          return data;
        }));
  }
}
