import { PlayerDetails, playStyles } from "./TeamInterfaces";
import FileManagement from "./FileHandling";

class TeamCreation {
    squadFilePath: string = "./data/squads/";
    squadFileName: string;
    balanceThreshold: number;

    constructor(squadFileName?: string, balanceThreshold = 1.5) {
        this.squadFileName = squadFileName;
        this.balanceThreshold = balanceThreshold;
    }

    async filterSquad (names: string[]): Promise<PlayerDetails[]> {

        const squad = await new FileManagement().importSquadPlayers(this.squadFilePath+this.squadFileName);
        return squad.filter((player) => names.includes(player.name.toLowerCase()));
    }

    shufflePlayers<T> (array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    splitPlayersIntoTeams (players: PlayerDetails[]): [PlayerDetails[], PlayerDetails[]] {
        const specialists = players.filter(player => player.playstyle.includes('Specialist') === true);
        const nonSpecialists = players.filter(player => player.playstyle.includes('Specialist') === false);

        const team1Specialists = specialists.slice(0, specialists.length / 2);
        const team2Specialists = specialists.slice(specialists.length / 2);

        const team1NonSpecialists = nonSpecialists.slice(0, nonSpecialists.length / 2);
        const team2NonSpecialists = nonSpecialists.slice(nonSpecialists.length / 2);

        const team1 = [...team1Specialists, ...team1NonSpecialists];
        const team2 = [...team2Specialists, ...team2NonSpecialists];

        return [team1, team2];
    }

    addUpTeamTotals (team: PlayerDetails[]): number {
        let total = 0;
        team.forEach((player) => {
            total += playStyles[player.playstyle] + player.fitness;
        });
        return total;
    }

    checkForTeamBalance (team1: PlayerDetails[], team2: PlayerDetails[]): [PlayerDetails[], PlayerDetails[]] {
        let team1Total = this.addUpTeamTotals(team1);
        let team2Total = this.addUpTeamTotals(team2);
        const targetSkillAmount = (team1Total + team2Total) / 2;
        do {
            [team1, team2] = this.splitPlayersIntoTeams(this.shufflePlayers(team1.concat(team2)));
            team1Total = this.addUpTeamTotals(team1);
            team2Total = this.addUpTeamTotals(team2);
        } while (team1Total > targetSkillAmount + this.balanceThreshold || team1Total < targetSkillAmount - this.balanceThreshold && team2Total > targetSkillAmount + this.balanceThreshold || team2Total < targetSkillAmount - this.balanceThreshold);
        return [team1, team2];
    }

    balanceTeams (filteredSquad: PlayerDetails[]): [PlayerDetails[], PlayerDetails[]] {
        const shuffledSquad = this.shufflePlayers(filteredSquad);
        const [team1, team2] = this.splitPlayersIntoTeams(shuffledSquad);
        return this.checkForTeamBalance(team1, team2);
    }

}

export default TeamCreation;