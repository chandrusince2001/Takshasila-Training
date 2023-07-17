import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import { createRecord } from 'lightning/uiRecordApi';
import APPLICANT_OBJECT from '@salesforce/schema/Applicant__c';
import NAME_FIELD from '@salesforce/schema/Applicant__c.Name';
import FIRST_NAME_FIELD from '@salesforce/schema/Applicant__c.First_Name__c';
import LAST_NAME_FIELD from '@salesforce/schema/Applicant__c.Last_Name__c';
import AGE_FIELD from '@salesforce/schema/Applicant__c.Age__c';
import QUALIFICATION_FIELD from '@salesforce/schema/Applicant__c.Qualification__c';
import UNIVERSITY_FIELD from '@salesforce/schema/Applicant__c.University__c';
import YEAR_OF_PASSING_FIELD from '@salesforce/schema/Applicant__c.Year_of_Passing__c';
import GRADE_FIELD from '@salesforce/schema/Applicant__c.Grade__c';
import PERCENTAGE_FIELD from '@salesforce/schema/Applicant__c.Percentage__c';
import PREVIOUS_WORK_EXP_FIELD from '@salesforce/schema/Applicant__c.Previous_Work_Experience__c';
import PREVIOUS_COMPANY_FIELD from '@salesforce/schema/Applicant__c.Previous_Company__c';
import CURRENT_CTC_FIELD from '@salesforce/schema/Applicant__c.Current_CTC__c';
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
    @track isFresher = true;
    @track applicantDetails = {};
    @track educationDetails = {};
    @track experienceDetails = {};

    handleClick(){

        this.showApplicantForm = true;

    }

    handleApplicantDetailsSave(event) {
        this.applicantDetails = event.detail;
    }

    handleEducationDetailsSave(event) {
        this.educationDetails = event.detail;
    }

    handleExperienceDetailsSave(event) {
        this.experienceDetails = event.detail;
    }

    handleIsFresherChange(event) {
        this.isFresher = event.target.checked;
    }

    async handleSave() {
        // Create a new record using the saved details
        const fields = {
            [NAME_FIELD.fieldApiName]: this.applicantDetails.Name,
            [FIRST_NAME_FIELD.fieldApiName]: this.applicantDetails.First_Name__c,
            [LAST_NAME_FIELD.fieldApiName]: this.applicantDetails.Last_Name__c,
            [AGE_FIELD.fieldApiName]: this.applicantDetails.Age__c,
            [QUALIFICATION_FIELD.fieldApiName]: this.educationDetails.Qualification__c,
            [UNIVERSITY_FIELD.fieldApiName]: this.educationDetails.University__c,
            [YEAR_OF_PASSING_FIELD.fieldApiName]: this.educationDetails.Year_of_Passing__c,
            [GRADE_FIELD.fieldApiName]: this.educationDetails.Grade__c,
            [PERCENTAGE_FIELD.fieldApiName]: this.educationDetails.Percentage__c,
            [PREVIOUS_WORK_EXP_FIELD.fieldApiName]: this.experienceDetails.Previous_Work_Experience__c,
            [PREVIOUS_COMPANY_FIELD.fieldApiName]: this.experienceDetails.Previous_Company__c,
            [CURRENT_CTC_FIELD.fieldApiName]: this.experienceDetails.Current_CTC__c,
            [EXPECTED_CTC_FIELD.fieldApiName]: this.experienceDetails.Expected_CTC__c
        };

        try {
            const recordInput = { apiName: APPLICANT_OBJECT.objectApiName, fields };
            await createRecord(recordInput);
            this.resetForm();
            // Display success message or perform any other necessary actions
        } catch (error) {
            console.error('Error creating record:', error);
            // Display error message or perform any other necessary actions
        }
    }


    handleCancel() {
        this.resetForm();
    }

    resetForm() {
        this.showApplicantForm = false;
        this.isFresher = true;
        this.applicantDetails = null;
        this.educationDetails = null;
        this.experienceDetails = null;
    }

    handleSuccess(){
        
        this.showApplicantForm = false;
        refreshApex(this.Applicant__c);
        
    }

    onClickCancel(){

        this.showApplicantForm = false;
    }
}
