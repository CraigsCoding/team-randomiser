import TeamCreation from "./TeamCreation";
import { PlayerDetails } from "./TeamInterfaces";


class PrintInfo {

  async printTeam (team1: PlayerDetails[], team2: PlayerDetails[]) {
    console.log("Teams are balanced");

    this.printPlayers("Dark Shirts", team1);
    this.printPlayers("Light Shirts", team2);

    await this.printPlayerToWatch(team1, "Dark");
    await this.printPlayerToWatch(team2, "Light");

    await this.printWinPercentage(team1, team2);
  }

  async printPlayers (teamName: string, team: PlayerDetails[]) {
    console.log(`\n${teamName}:`);
    team.forEach((player) => {
      console.log(`Name: ${player.name}`);
    });
  }

  async printPlayerToWatch (team: PlayerDetails[], teamColours: string) {
    console.log(`\nPlayer to Watch from ${teamColours} Shirts: ${(await this.getRandomEntry(team)).name}`);
  }

  async printWinPercentage (team1: PlayerDetails[], team2: PlayerDetails[]) {
    const tc = new TeamCreation();
    const team1Total = tc.addUpTeamTotals(team1);
    const team2Total = tc.addUpTeamTotals(team2);
    const winPercentages = await this.calculateWinPercentage(team1Total, team2Total);
    console.log(`\nDark Shirts Win Percentage: ${winPercentages[0].toFixed(2)}%`);
    console.log(`Light Shirts Win Percentage: ${winPercentages[1].toFixed(2)}%`);
  }


  async getRandomEntry<T> (array: T[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  async calculateWinPercentage (team1Total: number, team2Total: number): Promise<[number, number]> {
    const total = team1Total + team2Total;
    const team1Percentage = (team1Total / total) * 100;
    const team2Percentage = (team2Total / total) * 100;

    return [team1Percentage, team2Percentage];
  }
}

export default PrintInfo;