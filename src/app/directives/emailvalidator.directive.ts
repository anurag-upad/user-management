import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appEmailvalidator]',
  providers: [  
    {  
      provide: NG_VALIDATORS,  
      useClass: EmailvalidatorDirective,  
      multi: true  
    }  
  ] 
})
export class EmailvalidatorDirective implements Validator{

  validator: ValidatorFn;

  constructor() {
    this.validator= this.emailValidator();
   }

  validate(control: AbstractControl): ValidationErrors {
    return this.validator(control); //control will be email control here
  }

  emailValidator(): ValidatorFn {  
    return (control: AbstractControl) => {  
      if (control.value != null && control.value !== '') {  
        let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)$/.test(control.value);  
        if (isValid) {  
          return null;   //return null if email is valid
        } else {  
          return {  
            emailvalidator: { valid: false }
            //emailvalidator: { value: control.value  }
          };  
        }  
      } else {  
        return null;  //return null if email is valid
      }  
    };  
  }  

}
