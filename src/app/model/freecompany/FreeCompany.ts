import { Seeking } from './Seeking';
import { Estate } from './Estate';
import { Focus } from './Focus';
import { Ranking } from './Ranking';
import { Member } from "./Member";

export class FreeCompany {
    Active: string;
    ActiveMemberCount: number;
    DC: string
    Estate?: Estate;
    Focus?: Focus[];
    GrandCompany: string;
    ID: string;
    Name: string;
    Rank: number;
    Ranking?: Ranking;
    Recruitment: string;
    Seeking?: Seeking[];
    Server: string;
    Slogan: string;
    Tag: string;
    FreeCompanyMembers?: Member[];
}