import { LightningElement, api } from 'lwc';
export default class EmploymentVerificationDetails extends LightningElement {
    @api 
     firstName;
     lastName;
     email;
     phone;
     verificationStatus = 'None';
     displayValues = false;

    verificationStatusOptions = [
        { label: 'New', value: 'New' },
        { label: 'In-Progress', value: 'In-Progress' },
        { label: 'Completed', value: 'Completed' },
        { label: 'None', value: 'None' }
    ];

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }
    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }
    handleEmailChange(event) {
        this.email = event.target.value;
    }
    handlePhoneChange(event) {
        this.phone = event.target.value;
    }
    handleVerificationStatusChange(event) {
        this.verificationStatus = event.target.value;
    }
    handleSubmit() {
        if (this.firstName && this.email) {
            this.displayValues = true;
        }
    }
}