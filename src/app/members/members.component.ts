import { Component, OnInit } from '@angular/core';
import { FreeCompany } from '../model/freecompany/FreeCompany';
import { FreeCompanyService } from '../service/free-company.service';
import { Member } from '../model/freecompany/Member';
import { ClassJob } from '../model/player/ClassJob';

@Component({
	selector: 'app-members',
	templateUrl: './members.component.html',
	styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
	static DOW_DOM: string = "DOW_DOM";
	static DOH_DOL: string = "DOH_DOL";

	freeCompany: FreeCompany;
	selectedMember: Member;
	selectedDowDom: ClassJob[];
	selectedDohDol: ClassJob[];

	constructor(private freecompanyService: FreeCompanyService) {
		this.freeCompany = new FreeCompany();
	}

	ngOnInit() {
		this.freecompanyService.getFreeCompanyData().subscribe((company: FreeCompany) => {
			this.freeCompany = company;
		});
	}

	openMember(member: Member) {
		this.selectedMember = member;
		this.selectedDowDom = this.selectedMember.details.playerCharacter.classJobs.filter(j => j.jobType == MembersComponent.DOW_DOM && j.level > 0);
		this.selectedDohDol = this.selectedMember.details.playerCharacter.classJobs.filter(j => j.jobType === MembersComponent.DOH_DOL && j.level > 0);
	}
}
