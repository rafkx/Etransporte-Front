import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {

    static passwordsMatching(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const passwordConfirm = control.get('passwordControl')?.value;

        if ((password === passwordConfirm) && (password !== null && passwordConfirm !== null)) {
            return null;
        } else {
            console.log('errado');
            return { passwordsNotMatching: true }; 
        }
    }
}