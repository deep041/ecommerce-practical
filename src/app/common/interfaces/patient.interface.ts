export interface AddPatientPayload {
    blood_group: string,
    dob: string,
    first_name: string,
    gender: string,
    last_name: string,
    mobile: string,
    zipcode: string
}

export interface AddPatientResponse {
    data: {
        patient_id: string
    },
    datetime: string,
    status_code: string
    status_message: string
}

export interface Patient {
    patient_id: string,
    first_name: string,
    last_name: string,
    mobile: string,
    zipcode: string,
    dob: string,
    gender: string,
    blood_group: string
}