export class Jobs {
    public static ROLES = ["Tank", "Healer", "DPS", "Crafter", "Gatherer"];
    public static TANK = ["Paladin", "Warrior", "Dark knight", "Gunbreaker"];
    public static HEALER = ["White mage", "Scholar", "Astrologian"];
    public static DPS = ["Monk", "Dragoon", "Ninja", "Samurai", "Bard", "Machinist", "Black mage", "Summoner", "Red mage", "Blue mage"];
    public static CRAFTER = ["Alchemist", "Armorer", "Blacksmith", "Carpenter", "Culinarian", "Goldsmith", "Leatherworker", "Weaver"];
    public static GATHERER = ["Botanist", "Fisher", "Miner"];

    public static hasRole(roleName: string, jobName: string) {
        if (roleName === "Tank") {
            return Jobs.isTank(jobName);
        }
        else if (roleName === "Healer") {
            return Jobs.isHealer(jobName);
        }
        else if (roleName === "DPS") {
            return Jobs.isDPS(jobName);
        }
        else if (roleName === "Crafter") {
            return Jobs.isCrafter(jobName);
        }
        else if (roleName === "Gatherer") {
            return Jobs.isGatherer(jobName);
        }
        return false;
    }

    public static isTank(jobName: string): boolean {
        return Jobs.TANK.includes(jobName);
    }

    public static isHealer(jobName: string): boolean {
        return Jobs.HEALER.includes(jobName);
    }

    public static isDPS(jobName: string): boolean {
        return Jobs.DPS.includes(jobName);
    }

    public static isCrafter(jobName: string): boolean {
        return Jobs.CRAFTER.includes(jobName);
    }

    public static isGatherer(jobName: string): boolean {
        return Jobs.GATHERER.includes(jobName);
    }
}