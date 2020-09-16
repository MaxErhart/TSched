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
					height: '100%',
					top: '0',
					zIndex: '1',
				})
			),
			state(
				'void',
				style({
					height: '0%',
					top: '0',
					zIndex: '-1',

				})
			),
			transition('void => *', animate('200ms ease-in-out', keyframes([
				style({height: '0%', top: '0', zIndex: -1, offset: 0}),
				style({height: 'calc(0.99 * 90px)', top: '0%', zIndex: -1, offset: 0.99}),
				style({height: '90px', top: '0%', zIndex: 1, offset: 1}),
				]))),
			transition('* => void', animate('200ms ease-in-out', keyframes([
				style({height: '90px', top: '0%', zIndex: -1, offset: 0}),
				style({height: '0', top: '0', zIndex: -1, offset: 1}),
				]))),
		])
]
