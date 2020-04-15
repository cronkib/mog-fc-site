import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
	static EVENT_CALENDAR_CONTAINER_ID = "calendar-container";

	constructor() { }

	ngOnInit() {
	}
}
