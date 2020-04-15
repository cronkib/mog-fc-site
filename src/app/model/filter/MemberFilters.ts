export class MemberFilters {
    name: string;
    rank: string;
    job: string;
    role: string;
    level: string;

    reset() {
        this.name = undefined;
        this.rank = undefined;
        this.job = undefined;
        this.role = undefined;
    }

    levelNumber() {
        if (this.level) {
            return Number.parseInt(this.level);
        }
        return undefined;;
    }
}