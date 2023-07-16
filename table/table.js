import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord, refreshApex } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Application_Form__c.Name';
import AGE_FIELD from '@salesforce/schema/Application_Form__c.Age__c';
import QUALIFICATION_FIELD from '@salesforce/schema/Application_Form__c.Qualification__c';
import SALARY_MODE_FIELD from '@salesforce/schema/Application_Form__c.Salary_Mode__c';
import getApplicantList from '@salesforce/apex/ApplicantController.getApplicantList';

const COLS = [
    {
        label: 'Applicant Name',
        fieldName: NAME_FIELD.fieldApiName,
        type: 'url',
        typeAttributes: {
            label: { fieldName: NAME_FIELD.fieldApiName },
            target: '_blank'
        }
    },
    { label: 'Age', fieldName: AGE_FIELD.fieldApiName, editable: false },
    { label: 'Qualification', fieldName: QUALIFICATION_FIELD.fieldApiName },
    { label: 'Salary Mode', fieldName: SALARY_MODE_FIELD.fieldApiName },
    {
        label: 'Edit',
        type: 'button',
        typeAttributes: {
            label: 'Edit',
            name: 'edit'
        }
    },
    {
        label: 'Delete',
        type: 'button',
        typeAttributes: {
            label: 'Delete',
            name: 'delete'
        }
    }
];

export default class Table extends NavigationMixin(LightningElement) {
    columns = COLS;
    @track showEditForm = false;
    @track selectedRecordId;
    @wire(getApplicantList)
    Application_Form__c;

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
        const recordId = row.Id;

        if (action.name === 'edit') {
            // Handle edit action
            this.selectedRecordId = recordId;
            this.showEditForm = true;
        } else if (action.name === 'delete') {
            // Handle delete action
            this.deleteRecordById(recordId);
        }
    }
    
    handleSuccess() {
        // Refresh the datatable after successful edit
        this.showEditForm = false;
        return refreshApex(this.Application_Form__c);
    }

    handleCancel() {
        // Cancel the edit form and reset the state
        this.showEditForm = false;
        this.selectedRecordId = null;
    }

    navigateToRecord(recordId, actionName) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: actionName
            }
        });
    }

    deleteRecordById(recordId) {
        deleteRecord(recordId)
            .then(() => {
                // Refresh the datatable after successful deletion
                return refreshApex(this.Application_Form__c);
            })
            .catch(error => {
                console.error('Error deleting record: ', error);
            });
    }
}