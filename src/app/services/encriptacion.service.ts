import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  constructor() { }

  public encryptData(data): any {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.APP_KEY).toString();
    } catch (e) {
      console.log(e);
    }
  }

  public decryptData(data): any {

    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.APP_KEY);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
