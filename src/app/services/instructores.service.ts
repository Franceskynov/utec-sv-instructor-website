import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstructoresService {


  public headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Platform': 'website'
    });
  }

  public checkByCarnet(carnet) {
    return this.http.get<any>(environment.CONTROL_URL_API.concat(`checkInstructorByCarnet?carnet=${carnet}`), {
      headers: this.headers
    }).pipe(map(data => {
          return data;
    }));
  }

  public getPensum(carnet) {
      return this.http.get<any>(environment.CONTROL_URL_API.concat(`pensum?carnet=${carnet}`), {
          headers: this.headers
      }).pipe(map(data => {
          return data;
      }));
  }

    public make(frmData) {
        return this.http.post<any>(environment.CONTROL_URL_API.concat('instructor'), frmData)
            .pipe(map(data => {
                return data;
            }));
    }
}
