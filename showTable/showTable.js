import { LightningElement, api } from 'lwc';
export default class showTable extends LightningElement {
    @api
    showTable = false;
    handleCheckboxChange(event) {
        this.showTable = event.target.checked;
    }
}