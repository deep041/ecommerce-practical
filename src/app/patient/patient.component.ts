import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddPatientResponse, Patient } from '../common/interfaces/patient.interface';
import { ApiService } from '../common/services/api.service';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

    patientForm!: FormGroup;
    patient!: Patient;

    constructor(private api: ApiService, private router: Router) { }

    ngOnInit(): void {
        this.createForm();

        let patient = localStorage.getItem('patient');
        if (patient) {
            this.patient = JSON.parse(patient);
        }
    }

    createForm(): void {
        this.patientForm = new FormGroup({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl(''),
            mobile: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
            zipcode: new FormControl(''),
            dob: new FormControl(''),
            gender: new FormControl(''),
            blood_group: new FormControl('')
        });
    }

    savePatient(): void {
        if (this.patientForm.valid) {
            let payload = this.patientForm.value;
            payload.mobile = '' + payload.mobile;
            payload.zipcode = '' + payload.zipcode;
            this.api.addPatient(payload).subscribe((data: AddPatientResponse) => {
                if (data && data.status_code === '1') {
                    localStorage.setItem('patient', JSON.stringify({patient_id: data.data.patient_id, ...payload}));
                    this.router.navigate(['/checkout']);
                }
            });
        }
    }

    navigate(): void {
        this.router.navigate(['/checkout']);
    }

}
