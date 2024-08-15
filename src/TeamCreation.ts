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
        const fm = new FileManagement();
        const squad = await fm.importSquadPlayers(this.squadFilePath+this.squadFileName);
        await fm.closeReadline();
        return squad.filter((player) => names.includes(player.name.toLowerCase()));
    }

    shufflePlayers<T> (array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    splitPlayersIntoTeams(players: PlayerDetails[], splitSpecialists = true): [PlayerDetails[], PlayerDetails[]] {
        if (splitSpecialists) {
          // Sort players by playstyle
          players.sort((a, b) => a.playstyle.localeCompare(b.playstyle));
        }
      
        const team1 = [];
        const team2 = [];
      
        // Distribute players between the teams
        for (let i = 0; i < players.length; i++) {
          if (i % 2 === 0) {
            team1.push(players[i]);
          } else {
            team2.push(players[i]);
          }
        }
      
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
            [team1, team2] = this.splitPlayersIntoTeams(this.shufflePlayers(team1.concat(team2)), false);
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