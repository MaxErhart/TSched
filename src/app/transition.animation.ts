import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const TransitionAnimation = [
	trigger('TransitionAnimation',[
			state(
				'initial',
				style({
					left: '{{x}}px',
					opacity: '{{opacity}}',
				}),
				{params: {x: 0, opacity: 1}}
			),
			state(
				'final',
				style({
					left: '{{x}}px',
					opacity: '{{opacity}}',
				}),
				{params: {x: 0, opacity: 1}}
			),
			transition('initial => final', animate('100ms ease-out')),
		])
]
