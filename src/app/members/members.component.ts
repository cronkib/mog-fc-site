import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FreeCompany } from '../model/freecompany/FreeCompany';
import { FreeCompanyService } from '../service/free-company.service';
import { Member } from '../model/freecompany/Member';
import { ClassJob } from '../model/player/ClassJob';
import { MemberFilters } from '../model/filter/MemberFilters';
import { Jobs } from '../model/Jobs';

@Component({
	selector: 'app-members',
	templateUrl: './members.component.html',
	styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
	private static NAME_FILTER_ID = "name-filter";
	private static RANK_FILTER_ID = "rank-filter";
	private static JOB_FILTER_ID = "job-filter";
	private static ROLE_FILTER_ID = "role-filter";
	private static LEVEL_FILTER_ID = "level-filter";

	static DOW_DOM: string = "DOW_DOM";
	static DOH_DOL: string = "DOH_DOL";

	freeCompany: FreeCompany;
	selectedMember: Member;
	selectedDowDom: ClassJob[];
	selectedDohDol: ClassJob[];
	filteredMembers: Member[];
	filters: MemberFilters;

	firstNameFilter: HTMLInputElement;
	lastNameFilter: HTMLInputElement;

	constructor(private freecompanyService: FreeCompanyService) {
		this.freeCompany = new FreeCompany();
		this.freeCompany.freeCompanyMembers = [];
		this.filters = new MemberFilters();
		this.resetFilteredMembers();
	}

	public ngOnInit() {
		this.freecompanyService.getFreeCompanyData().subscribe((company: FreeCompany) => {
			this.freeCompany = company;
			this.resetFilteredMembers();
		});
	}

	public getTanks() {
		return Jobs.TANK;
	}

	public getHealers() {
		return Jobs.HEALER;
	}

	public getDPS() {
		return Jobs.DPS;
	}

	public getCrafters() {
		return Jobs.CRAFTER;
	}

	public getGatherers() {
		return Jobs.GATHERER;
	}

	public getRoles() {
		return Jobs.ROLES;
	}

	public openMember(member: Member) {
		this.selectedMember = member;
		this.selectedDowDom = this.selectedMember.details.playerCharacter.classJobs.filter(j => j.jobType == MembersComponent.DOW_DOM && j.level > 0);
		this.selectedDohDol = this.selectedMember.details.playerCharacter.classJobs.filter(j => j.jobType === MembersComponent.DOH_DOL && j.level > 0);
	}

	public handleFiltering(source: string, event: any) {
		this.filterMembers();
	}

	public isFilterableJob(job: ClassJob) {
		let hasJob = false;
		let hasRole = false;
		let hasLevel = false;

		if (this.filters.job === "All Jobs" || this.filters.job === job.name) {
			hasJob = true;
		}
		if (this.filters.role === "All Roles" || Jobs.hasRole(this.filters.role, job.name)) {
			hasRole = true;
		}
		if (this.filters.level == null || this.filters.level == "" || this.filters.levelNumber() === job.level) {
			hasLevel = true;
		}

		return hasJob && hasRole && hasLevel;
	}

	private filterMembers() {
		this.updateFilters();
		this.filteredMembers = this.filter(this.freeCompany, this.filters);
	}

	private updateFilters() {
		this.filters.reset();
		this.filters.name = (<HTMLInputElement>document.getElementById(MembersComponent.NAME_FILTER_ID)).value;
		this.filters.rank = (<HTMLInputElement>document.getElementById(MembersComponent.RANK_FILTER_ID)).value;
		this.filters.job = (<HTMLInputElement>document.getElementById(MembersComponent.JOB_FILTER_ID)).value;
		this.filters.role = (<HTMLInputElement>document.getElementById(MembersComponent.ROLE_FILTER_ID)).value;
		this.filters.level = (<HTMLInputElement>document.getElementById(MembersComponent.LEVEL_FILTER_ID)).value;
	}

	private resetFilteredMembers() {
		this.filteredMembers = Object.assign([], this.freeCompany.freeCompanyMembers);
		this.filters.reset();
	}

	private filter(company: FreeCompany, filters: MemberFilters): Member[] {
		let filteredMembers = company.freeCompanyMembers!;

		if (!filteredMembers || filteredMembers.length === 0) {
			return [];
		}

		return filteredMembers.filter((m: Member) => {
			if (!m.details || !m.details.playerCharacter) {
				return false;
			}

			let c = m.details.playerCharacter;
			let hasName = false;
			let hasRank = false;
			let hasJob = false;
			let hasRole = false;
			let hasLevel = false;

			if (filters.name == null || m.name.toLowerCase().includes(filters.name.toLowerCase())) {
				hasName = true;
			}
			if (filters.rank === "All Ranks" || m.rank.toLowerCase().includes(filters.rank.toLowerCase())) {
				hasRank = true;
			}
			if (filters.job === "All Jobs" || this.hasJob(m, filters.job, filters.levelNumber())) {
				hasJob = true;
			}
			if (filters.role === "All Roles" || this.hasRole(m, filters.role, filters.levelNumber())) {
				hasRole = true;
			}
			if (filters.level == null || filters.level == "" || this.hasLevel(m, filters.level)) {
				hasLevel = true;
			}

			return hasName && hasRank && hasJob && hasRole && hasLevel;
		});
	}

	private hasJob(member: Member, jobName: string, level: number) {
		return member.details.playerCharacter.classJobs.filter((j: ClassJob) => {
			return j.name === jobName && ((level && level === j.level) || (!level && j.level > 0));
		}).length > 0;
	}

	private hasRole(member: Member, roleName: string, level: number) {
		return member.details.playerCharacter.classJobs.filter((j: ClassJob) => {
			return Jobs.hasRole(roleName, j.name) && ((level && level === j.level) || (!level && j.level > 0));
		}).length > 0;
	}

	private hasLevel(member: Member, level: string) {
		let levelNumber = Number.parseInt(level);
		return member.details.playerCharacter.classJobs.filter((j: ClassJob) => {
			return j.level === levelNumber;
		}).length > 0;
	}
}
