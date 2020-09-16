import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { EventService } from './event.service';

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

export const bookedColissionValidatorFunction = (_e) => {

	return (control: FormGroup): ValidationErrors | null => {
		if(control.get('startTime').value && control.get('endTime').value && control.get('date').value && control.get('activePageCourt').value){
			const startTime = control.get('startTime').value.split(':');
			const endTime = control.get('endTime').value.split(':');
			const date = control.get('date').value._d;
			const court = control.get('activePageCourt').value;
			if(startTime && endTime && date){
				const events = _e.getEvents(date, court.id);
				for(let event of events){
					if(+startTime[0] <  event.startDate.getHours()){
						if(+endTime[0] > event.startDate.getHours()){
							control.get('startTime').setErrors({colission: true});
							control.get('endTime').setErrors({colission: true});
							control.get('date').setErrors({colission: true});
							return {colission: true};
						} else if(+endTime[0] == event.startDate.getHours() && +endTime[1] > event.startDate.getMinutes()){
							control.get('startTime').setErrors({colission: true});
							control.get('endTime').setErrors({colission: true});
							control.get('date').setErrors({colission: true});
							return {colission: true};
						}
					} else if(+startTime[0] ==  event.startDate.getHours() && +startTime[1] <= event.startDate.getMinutes()){
						if(+endTime[0] > event.startDate.getHours()){
							control.get('startTime').setErrors({colission: true});
							control.get('endTime').setErrors({colission: true});
							control.get('date').setErrors({colission: true});
							return {colission: true};
						} else if(+endTime[0] == event.startDate.getHours() && +endTime[1] > event.startDate.getMinutes()){
							control.get('startTime').setErrors({colission: true});
							control.get('endTime').setErrors({colission: true});
							control.get('date').setErrors({colission: true});
							return {colission: true};
						}
					} else if(+startTime[0] < event.endDate.getHours()){
						if(+endTime[0] > event.endDate.getHours()){
							control.get('startTime').setErrors({colission: true});
							control.get('endTime').setErrors({colission: true});
							control.get('date').setErrors({colission: true});
							return {colission: true};
						} else if(+endTime[0] == event.endDate.getHours() && +endTime[1] >= event.endDate.getMinutes()){
							control.get('startTime').setErrors({colission: true});
							control.get('endTime').setErrors({colission: true});
							control.get('date').setErrors({colission: true});
							return {colission: true};
						}
					} else if(+startTime[0] == event.endDate.getHours() && +startTime[1] < event.endDate.getMinutes()){
						if(+endTime[0] > event.endDate.getHours()){
							control.get('startTime').setErrors({colission: true});
							control.get('endTime').setErrors({colission: true});
							control.get('date').setErrors({colission: true});
							return {colission: true};
						} else if(+endTime[0] == event.endDate.getHours() && +endTime[1] >= event.endDate.getMinutes()){
							control.get('startTime').setErrors({colission: true});
							control.get('endTime').setErrors({colission: true});
							control.get('date').setErrors({colission: true});
							return {colission: true};
						}
					} else {
						return null;
					}

				}
			}
	} else {
		return null;
	}

};


}


