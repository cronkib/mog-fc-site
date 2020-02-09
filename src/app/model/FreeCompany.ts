import { Seeking } from './Seeking';
import { Estate } from './Estate';
import { Focus } from './Focus';
import { Ranking } from './Ranking';
import { Member } from "./Member";

export class FreeCompany {
    active: string;
    activeMemberCount: number;
    dc: string
    estate?: Estate;
    focus?: Focus[];
    grandCompany: string;
    id: string;
    name: string;
    rank: number;
    ranking?: Ranking;
    recruitment: string;
    seeking?: Seeking[];
    server: string;
    slogan: string;
    tag: string;
    freeCompanyMembers?: Member[];
    status: string;
}