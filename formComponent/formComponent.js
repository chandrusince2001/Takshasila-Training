import { LightningElement, api} from 'lwc';
export default class ContactForm extends LightningElement {
    @api
    recordId;
    handleLoad() {
        alert('Form is loaded');
    }
    
    handleSuccess() {
        alert('success');
    }
}
