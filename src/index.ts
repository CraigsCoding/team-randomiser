import FileManagement from "./FileHandling";
import PrintInfo from "./PrintInformation";
import TeamCreation from "./TeamCreation";

const teamsheetName = `teamsheet.txt`;
const squadName = `WakeyBoys.csv`;
const balanceThreshold = 1.5;

const fm = new FileManagement();
const tc = new TeamCreation(squadName, balanceThreshold);
const pi = new PrintInfo();

async function main () {
  const names = await fm.getNamesFromFile(teamsheetName);
  const filterSquad = await tc.filterSquad(names);
  const balancedTeams = tc.balanceTeams(filterSquad);
  pi.printTeam(balancedTeams[0], balancedTeams[1]);
  fm.closeReadline();
}

main();