import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const FormAnimation = [
	trigger('FormAnimation',[
			state(
				'step0',
				style({
					transform: 'translateX(0)',
				})
			),
			state(
				'step1',
				style({
					transform: 'translateX(calc(-1 * 100 / 4 * 1%))',
				})
			),
			state(
				'step2',
				style({
					transform: 'translateX(calc(-2 * 100 / 4 * 1%))',
				})
			),
			state(
				'step3',
				style({
					transform: 'translateX(calc(-3 * 100 / 4 * 1%))',
				})
			),
			transition('step0 <=> step1', animate('300ms ease-in-out')),
			transition('step1 <=> step2', animate('300ms ease-in-out')),
			transition('step2 <=> step3', animate('300ms ease-in-out')),
		])
]

export const ExpandAnimation = [
	trigger('ExpandAnimation',[
			state(
				'display',
				style({
					transform: 'translateY(0%)',
				})
			),
			state(
				'void',
				style({

					transform: 'translateY(-110%)',
				})
			),
			transition('void <=> *', animate('300ms ease-in-out')),
		])
]
