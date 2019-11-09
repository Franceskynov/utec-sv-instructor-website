import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { InstructoresService } from 'app/services/instructores.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EncriptacionService } from 'app/services/encriptacion.service';
import { ConfiguracionesService } from 'app/services/configuraciones.service';
import { CredencialesService } from 'app/services/credenciales.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    @ViewChild('classic2')
    public classic2;
    @ViewChild('classic3')
    public classic3;
    @ViewChild('classic4')
    public classic4;
    public frm: FormGroup;
    public closeResult: string;
    public row: any;
    public notas: Array<any>;
    public settings: any;
    public sent: boolean;
    constructor(
        private instructorService: InstructoresService,
        private modalService: NgbModal,
        private encriptacionService: EncriptacionService,
        private configuracionesService: ConfiguracionesService,
        private credencialesService: CredencialesService,
        private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.sent = false;
        console.log('sample', this.encriptacionService.encryptData('hola'));
        this.configuracionesService.getSettings().subscribe(response => {
           this.settings = response.data;
        }, () => {},
            () => {
                console.log(this.settings);
        });
        this.frm = new FormGroup({
            carnet: new FormControl('', [
                Validators.required,
            ]),
            scholarshipped: new FormControl({value: false, disabled: false}, [])
        });
    }

    public checkInstructor(): void {
        const carnet = this.frm.controls.carnet.value;
        this.instructorService.checkByCarnet(carnet).subscribe(response => {
            if (response.data.exist) {
               this.open(this.classic2, 'Notification', '');
            } else {
                this.instructorService.getPensum(carnet).subscribe( res => {
                    this.row = res.data;
                    console.log(res);

                    if (this.row.pensum.length > 0) {
                        this.notas = this.evaluateNotas(
                            this.mapNotas(this.row.pensum)
                        );
                        const email = carnet.concat(this.settings.instructor_email_prefix);
                        const frmData = {
                            nombre: this.row.nombre,
                            carnet: carnet,
                            carrera: this.row.carrera,
                            cum: this.row.cum,
                            email: email,
                            username: this.buildUsername(this.row.nombre),
                            notas: this.notas,
                            is_scholarshipped: this.frm.controls.scholarshipped.value
                        };

                        const credentials = {
                            email: email,
                            password: this.makePassword()
                        };
                        this.temporalUserActivation(credentials);
                        localStorage.setItem('credentials', this.encriptacionService.encryptData(JSON.stringify(credentials)));
                        localStorage.setItem('pensumData', this.encriptacionService.encryptData(frmData));

                    } else {
                        this.open(this.classic4, 'Notification', '');
                    }
                }, () => {

                });
            }
        }, () => {

        });
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

    public trimWhiteSpaces(str): string {
        return str.replace(/[ \t][ \t]+/, '');
    }

    public mapNotas(pensum): Array<any> {
        const m = [];
        pensum.forEach((row) => {
            const materias = row.materias;
            const q = materias.map((i) => {
                return {
                    mat_codigo: this.trimWhiteSpaces(i.mai_codmat),
                    mat_nombre: this.trimWhiteSpaces(i.matnom),
                    estado: (i.nf >= 6) ? 'Aprobada' : 'Desaprobada',
                    nota: i.nf,
                    ciclo: row.ciclo
                };
            });

            m.push(q);
        });
        return  m.reduce((acc, it) => [...acc, ...it]);
    }

    public evaluateNotas(notas): Array<any> {
        return notas.filter(item => Number(item.nota) >= this.settings.minimum_score);
    }


    public makePassword(): string {
        const length = 8,
            charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let retVal = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    public validateCUM(c): boolean {
        return Number(c) >= this.settings.minimun_cum;
    }

    public buildUsername(row): string {
        const name = row.toLowerCase().split(' ');
        const first = name[0];
        const last = name[2];
        return `${ last }-${ first }`;
    }

    public temporalUserActivation(user): void {
        this.credencialesService.temporalUserActivation(user).subscribe(response => {
            if (!response.error) {
                this.open(this.classic3, 'Notification', '');
                this.sent = true;
            }
        }, () => {
            this.toastr.error(environment.MESSAGES.SERVER_ERROR, environment.MESSAGES.ERROR);
        });
    }

    public validateForm(): boolean {
        if (this.frm.invalid) {
            return true;
        } else {
            return this.sent;
        }
    }
}
