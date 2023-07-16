import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';


import NAME_FIELD from '@salesforce/schema/Applicant__c.Name';
import AGE_FIELD from '@salesforce/schema/Applicant__c.Age__c';
import QUALIFICATION_FIELD from '@salesforce/schema/Applicant__c.Qualification__c';
import YEAR_OF_PASSING_FIELD from '@salesforce/schema/Applicant__c.Year_of_Passing__c';
import EXPECTED_CTC_FIELD from '@salesforce/schema/Applicant__c.Expected_CTC__c';
import getApplicantDetailsList from "@salesforce/apex/ApplicantDetailsContoller.getApplicantDetailsList";


const COLS = [
    { label: 'Applicant Name', fieldName: NAME_FIELD.fieldApiName, sortable: true },
    { label: 'Age', fieldName: AGE_FIELD.fieldApiName, editable: false },
    { label: 'Qualification', fieldName: QUALIFICATION_FIELD.fieldApiName },
    { label: 'Year of Passing', fieldName: YEAR_OF_PASSING_FIELD.fieldApiName },
    { label: 'Expected CTC', fieldName: EXPECTED_CTC_FIELD.fieldApiName },
];

export default class ApplicantDetailsTable extends NavigationMixin(LightningElement) {
    columns = COLS;
    @wire(getApplicantDetailsList) Applicant__c;
    @track showApplicantForm = false;
    

    handleClick(){

        this.showApplicantForm = true;

    }

    handleRowAction(){

    }

    handleSuccess(){
        
        this.showApplicantForm = false;
        refreshApex(this.Applicant__c);
        
    }

    handleCancel(){

        this.showApplicantForm = false;
    }

    onClickCancel(){

        this.showApplicantForm = false;
    }
}