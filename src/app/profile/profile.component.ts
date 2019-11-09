import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { InstructoresService } from 'app/services/instructores.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EncriptacionService } from 'app/services/encriptacion.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    public created: boolean;
    public frm: FormGroup;
    public instructorData: any;
    public notas: Array<any>;
    public closeResult: string;
    constructor(
        private service: InstructoresService,
        private modalService: NgbModal,
        private encriptacionService: EncriptacionService,
        private toastr: ToastrService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.created = false;
        this.instructorData = {
            nombre: null,
            carnet: null,
            carrera: null,
            cum: null,
            email: null,
            username: null,
            notas: null,
            is_scholarshipped: null,
        };
        this.frm = new FormGroup({
            nombre: new FormControl({value: '', disabled: true}, Validators.required),
            carnet: new FormControl({value: '', disabled: true}, Validators.required),
            carrera: new FormControl({value: '', disabled: true}, Validators.required),
            cum: new FormControl({value: '', disabled: true}, Validators.required),
            phone: new FormControl({value: '', disabled: false}, ),
            personalEmail: new FormControl({value: '', disabled: false}, [  Validators.email]),
            is_scholarshipped: new FormControl({value: false, disabled: false}, [])
        });
        this.retrieveData();
    }

    get f() { return this.frm.controls; }

    public validateNota(n): boolean {
        return Number(n) >= 8;
    }

    public retrieveData(): void {
        const pensumData = localStorage.getItem('pensumData');
        if (pensumData) {
            this.instructorData = this.encriptacionService.decryptData(pensumData);
            this.notas = this.instructorData.notas;
            this.frm.patchValue(this.instructorData);
            console.log(this.instructorData.nombre);
        } else {
            this.clean();
        }
    }

    public postData(fn): void {
        const frmData = {

            nombre: this.instructorData.nombre,
            carnet: this.instructorData.carnet,
            carrera: this.instructorData.carrera,
            cum: this.instructorData.cum,
            telefono: this.f.phone.value,
            email: this.instructorData.email,
            emailPersonal: this.f.personalEmail.value,
            username: this.instructorData.username,
            notas: this.instructorData.notas,
            is_scholarshipped: this.f.is_scholarshipped.value
        };

        if (this.evaluateNotas(this.instructorData.notas).length > 2) {
            this.service.make(frmData).subscribe(result => {
                console.log(result);
                if (!result.error) {
                    this.toastr.success(environment.MESSAGES.CREATED_OK, 'Ok');
                    fn();
                    this.created = true;
                    this.clean();
                } else {
                    this.toastr.error('No se pudo procesar', 'Error');
                    this.created = false;
                }
            }, () => {
                this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
            });
        }

        console.log(frmData);
    }


    @HostListener('window:resize', ['$event'])
    onResize(event) {
        setInterval((e) => {
            this.notas = [...this.notas];
        }, 1000);
    }

    public open(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true, backdrop: 'static'
            }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true, size: 'sm', backdrop: 'static'
            }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content, { centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
    }

    public  getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    public paintError(form, input): any {
        return {
            'is-invalid': form.get(input).touched && !form.get(input).valid,
            'is-valid': form.get(input).touched && form.get(input).valid
        };
    }

    public evaluateNotas(notas): Array<any> {
        return notas.filter(item => Number(item.nota) >= 8);
    }

    public clean(): void {
        localStorage.clear();
        setTimeout(() => {
            this.router.navigate(['/', 'register']);
        }, 2000);
    }
}
