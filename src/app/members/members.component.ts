import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FreeCompany } from '../model/freecompany/FreeCompany';
import { FreeCompanyService } from '../service/free-company.service';
import { Member } from '../model/freecompany/Member';
import { Player } from '../model/player/Player';
import { ClassJob } from '../model/player/ClassJob';
import { MemberFilters } from '../model/filter/MemberFilters';
import { Jobs } from '../model/Jobs';

@Component({
	selector: 'app-members',
	templateUrl: './members.component.html',
	styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
	private static DOW_DOM: string = "DOW_DOM";
	private static DOH_DOL: string = "DOH_DOL";
    private static DOH_DOL_NAMES = ["Carpenter", "Blacksmith", "Armorer", "Goldsmith", "Leatherworker",
			"Weaver", "Alchemist", "Culinarian", "Miner", "Botanist", "Fisher"];
	private static NAME_FILTER_ID = "name-filter";
	private static RANK_FILTER_ID = "rank-filter";
	private static JOB_FILTER_ID = "job-filter";
	private static ROLE_FILTER_ID = "role-filter";
	private static LEVEL_FILTER_ID = "level-filter";

	freeCompany: FreeCompany;
	freeCompanyMembers: Member[];
	selectedMember: Player;
	selectedDowDom: ClassJob[];
	selectedDohDol: ClassJob[];
	filteredMembers: Member[];
	filters: MemberFilters;

	firstNameFilter: HTMLInputElement;
	lastNameFilter: HTMLInputElement;

	constructor(private freecompanyService: FreeCompanyService) {
		this.freeCompany = freecompanyService.getFreeCompanyData();
		this.freeCompanyMembers = freecompanyService.getMembers();
		this.filters = new MemberFilters();
		this.resetFilteredMembers();
	}

	public ngOnInit() {
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
		this.selectedMember = this.freecompanyService.getPlayer(member.ID);
		this.selectedDowDom = this.selectedMember.Character.ClassJobs.filter(j => this.isDowDom(j) && this.isLeveled(j));
		this.selectedDohDol = this.selectedMember.Character.ClassJobs.filter(j => this.isDohDol(j) && this.isLeveled(j));
	}

	public handleFiltering(source: string, event: any) {
		this.filterMembers();
	}

	public isFilterableJob(job: ClassJob) {
		let hasJob = false;
		let hasRole = false;
		let hasLevel = false;

		if (this.filters.job !== "All Jobs" && this.filters.job === job.UnlockedState.Name) {
			hasJob = true;
		}
		if (this.filters.role !== "All Roles" && Jobs.hasRole(this.filters.role, job.UnlockedState.Name)) {
			hasRole = true;
		}
		if (this.filters.level != null && this.filters.level !== "" && this.filters.levelNumber() === job.Level) {
			hasLevel = true;
		}

		return hasJob || hasRole || hasLevel;
	}

	private filterMembers() {
		this.updateFilters();
		this.filteredMembers = this.filter(this.freeCompanyMembers, this.filters);
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
		this.filteredMembers = Object.assign([], this.freeCompanyMembers);
		this.filters.reset();
	}

	private filter(members: Member[], filters: MemberFilters): Member[] {
		let filteredMembers = members;

		if (!filteredMembers || filteredMembers.length === 0) {
			return [];
		}

		return filteredMembers.filter((m: Member) => {
			let player = this.freecompanyService.getPlayer(m.ID);

			if (!player.Character || !player.Character) {
				return false;
			}

			let c = player.Character;
			let hasName = false;
			let hasRank = false;
			let hasJob = false;
			let hasRole = false;
			let hasLevel = false;

			if (filters.name == null || m.Name.toLowerCase().includes(filters.name.toLowerCase())) {
				hasName = true;
			}
			if (filters.rank === "All Ranks" || m.Rank.toLowerCase().includes(filters.rank.toLowerCase())) {
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
		let player = this.freecompanyService.getPlayer(member.ID);

		return player.Character.ClassJobs.filter((j: ClassJob) => {
			return j.UnlockedState.Name === jobName && ((level && level === j.Level) || (!level && j.Level > 0));
		}).length > 0;
	}

	private hasRole(member: Member, roleName: string, level: number) {
		let player = this.freecompanyService.getPlayer(member.ID);
		return player.Character.ClassJobs.filter((j: ClassJob) => {
			return Jobs.hasRole(roleName, j.UnlockedState.Name) && ((level && level === j.Level) || (!level && j.Level > 0));
		}).length > 0;
	}

	private hasLevel(member: Member, level: string) {
		let player = this.freecompanyService.getPlayer(member.ID);
		let levelNumber = Number.parseInt(level);
		return player.Character.ClassJobs.filter((j: ClassJob) => {
			return j.Level === levelNumber;
		}).length > 0;
	}

    private getJobType(job: ClassJob): String {
        if (this.isDohDol(job)) {
            return MembersComponent.DOH_DOL;
        }
        return MembersComponent.DOW_DOM;
    }

    private isDowDom(job: ClassJob): boolean {
        return !this.isDohDol(job);
    }

    private isDohDol(job: ClassJob): boolean {
        return MembersComponent.DOH_DOL_NAMES.includes(job.UnlockedState.Name)
    }

    private isLeveled(job: ClassJob): boolean {
        return job.Level > 0;
    }
}