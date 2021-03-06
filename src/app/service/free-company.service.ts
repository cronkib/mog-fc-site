import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FreeCompany } from '../model/freecompany/FreeCompany';
import { Member } from '../model/freecompany/Member';
import { Player } from '../model/player/Player';
import * as data from "../../../scripts/update-job/output/freecompany.json"

@Injectable()
export class FreeCompanyService {
	constructor(private http: HttpClient) { }

	public getFreeCompanyData(): FreeCompany {
		return data.Company.FreeCompany;
	}

	public getMembers(): Member[] {
		return data.Company.FreeCompanyMembers;
	}

	public getPlayer(id: number): Player {
		return data.Members[id];
	}
}
