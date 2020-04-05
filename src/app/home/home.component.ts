import { Component, OnInit } from '@angular/core';
import { FreeCompanyService } from '../service/free-company.service';
import { FreeCompany } from '../model/freecompany/FreeCompany';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	title = 'Moments of Genius';
	freeCompany: FreeCompany;

	constructor(private freecompanyService: FreeCompanyService) {
		this.freeCompany = new FreeCompany();
	}

	ngOnInit() {
		this.freecompanyService.fetchFreeCompanyData();
		this.freecompanyService.getFreeCompanyData().subscribe((company: FreeCompany) => {
			this.freeCompany = company;
		});
	}
}
