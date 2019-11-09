import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {

  constructor(private http: HttpClient) { }

  public getSettings() {
    return this.http.get<any>(environment.CONTROL_URL_API.concat('sistema/preferencia'))
        .pipe(map(data => {
          return data;
        }));

  }
}
