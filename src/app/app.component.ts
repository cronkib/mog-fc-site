import { Component, OnInit } from '@angular/core';
import { FreeCompanyService } from './service/free-company.service';
import { FreeCompany } from './model/freecompany/FreeCompany';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Moments of Genius';
	freeCompany: FreeCompany;

	constructor(private freecompanyService: FreeCompanyService) { 
		this.freeCompany = new FreeCompany();
	}

	ngOnInit() {
		this.freecompanyService.fetchFreeCompanyData();
		this.freecompanyService.getFreeCompanyData().subscribe((company: FreeCompany) => {
			this.freeCompany = company;
		})
	}
}
