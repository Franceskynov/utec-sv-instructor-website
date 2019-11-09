import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EncriptacionService } from 'app/services/encriptacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  public frm: FormGroup;
  public credentials: any;
  constructor(
      private toastr: ToastrService,
      private encriptacionService: EncriptacionService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.credentials = {
      email: null,
      password: null
    };
    this.frm = new FormGroup({
      email: new FormControl('', [
          Validators.required,
          Validators.email
      ]),
      password: new FormControl('', [
          Validators.required,
      ]),
    });
  }

  public login(): void {
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      this.credentials = JSON.parse(this.encriptacionService.decryptData(credentials));
      console.log(this.credentials.password);
      if (this.credentials.password === this.frm.controls.password.value &&
          this.credentials.email === this.frm.controls.email.value) {
        console.log('success');
        this.router.navigate(['/', 'profile']);
      } else {
        this.toastr.warning('Las credenciales no coinciden');
      }
    }
  }

}
