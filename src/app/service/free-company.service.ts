import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FreeCompany } from '../model/freecompany/FreeCompany';

@Injectable()
export class FreeCompanyService {
	freeCompany = new ReplaySubject<FreeCompany>(10);
	data = this.freeCompany.asObservable();

	constructor(private http: HttpClient) { }

	public fetchFreeCompanyData(): void {
		this.http.get<FreeCompany>("api/freecompany").subscribe((company: FreeCompany) => {
			this.freeCompany.next(company);
		});
	}

	public getFreeCompanyData(): Observable<FreeCompany> {
		return this.data;
	}
}
