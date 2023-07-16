import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

import NAME_FIELD from '@salesforce/schema/Application_Form__c.Name';
import AGE_FIELD from '@salesforce/schema/Application_Form__c.Age__c';
import QUALIFICATION_FIELD from '@salesforce/schema/Application_Form__c.Qualification__c';
import SALARY_MODE_FIELD from '@salesforce/schema/Application_Form__c.Salary_Mode__c';
import getApplicantList from '@salesforce/apex/ApplicantController.getApplicantList';

const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' }
];

const COLS = [
    { label: 'Applicant Name', fieldName: NAME_FIELD.fieldApiName},
    { label: 'Age', fieldName: AGE_FIELD.fieldApiName, editable: false },
    { label: 'Qualification', fieldName: QUALIFICATION_FIELD.fieldApiName },
    { label: 'Salary Mode', fieldName: SALARY_MODE_FIELD.fieldApiName },
    { type: 'action', typeAttributes: { rowActions: actions } }
];



export default class applicationTable extends NavigationMixin(LightningElement) {
    columns = COLS;
    @api showApplicationForm = false;
    @track showApplicationEditForm = false;
    @track selectedRecordId;
    @wire(getApplicantList)
    Application_Form__c;
    modalContentId = 'modal-content-id';

    handleClick(){
        this.showApplicationForm = !this.showApplicationForm;
    }


    onClickCancel() {
        this.showApplicationForm = false;
        
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'edit':
                this.showApplicationEditForm = true;
                this.selectedRecordId = row.Id;
                break;
            case 'delete':
                this.deleteRow(row);
                break;
            default:
                break;
        }
    }

    deleteRow(row) {
        const recordId = row.Id;
    
        deleteRecord(recordId)
            .then(() => {
                // Successful deletion
                this.deleteRowFromDataTable(recordId);               
            })
            .catch((error) => {
                // Handle error
                console.error('Error deleting record:', error);
            });            
    }

    deleteRowFromDataTable(recordId) {
        const newData = this.Application_Form__c.data.filter((row) => row.Id !== recordId);
        this.Application_Form__c.data = newData;
        return refreshApex(this.Application_Form__c);
    }

    handleSuccess() {
        // Refresh the datatable data after successful record creation or update
        this.showApplicationEditForm = false;
        return refreshApex(this.Application_Form__c);  
    }

    handleCancel() {
        this.showApplicationEditForm = false;
    }
}
