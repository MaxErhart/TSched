export interface BookedEvent {
	id: number,
	startDate: Date,
	endDate: Date,
	category: string,
	user: string,
	info: string,
	weekly: boolean,
	pageId: number,
	numOfWeeks: number,
}
