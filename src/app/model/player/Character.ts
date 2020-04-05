import { ClassJob } from './ClassJob';

export class Character {
    id: number;
    avatar: string;
    classJobs: ClassJob[];
    dc: string;
    freeCompanyId: string;
    gender: number;
    name: string;
    nameday: string;
    portrait: string;
    race: number;
    server: string;
}