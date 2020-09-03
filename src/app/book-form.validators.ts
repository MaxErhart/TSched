import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';

export const invalidTimeSpanValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const startTime = control.get('startTime');
	const endTime = control.get('endTime');
	if(startTime.value && endTime.value){
		if(+startTime.value.split(':')[0] > +endTime.value.split(':')[0] || (+startTime.value.split(':')[0] == +endTime.value.split(':')[0] && +startTime.value.split(':')[1] >= +endTime.value.split(':')[1])){
			control.get('startTime').setErrors({startTimeLarger: true});
			control.get('endTime').setErrors({startTimeLarger: true});
			return {startTimeLarger: true};

		} else {
			control.get('startTime').setErrors(null);
			control.get('endTime').setErrors(null);
			return null;
		}
	}
};


export const pastDateValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
	const today = new Date();
	if(control.value && control.value._d.getFullYear()>=today.getFullYear() && control.value._d.getMonth()>=today.getMonth() && control.value._d.getDate()>=today.getDate()){
		return null;
	} else {
		return {pastDate: true};
	}
}
