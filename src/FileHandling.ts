import { PlayerDetails, playStyleTypes } from "./TeamInterfaces";
import * as readline from "readline";
import * as fs from 'fs';


class FileManagement {
    teamsheetFilePath: string = "./data/teamsheets/";

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    async importSquadPlayers (filePath: string): Promise<PlayerDetails[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                const lines = data.trim().split('\n');
                const players: PlayerDetails[] = lines.map((line) => {
                    const [name, playstyle, fitness] = line.split(',');
                    return {
                        name: name.trim(),
                        playstyle: playstyle.trim() as playStyleTypes,
                        fitness: parseInt(fitness.trim()),
                    };
                });

                resolve(players);
            });
        });
    }

    async getNamesFromFile (fileName: string): Promise<string[]> {

        return new Promise((resolve, reject) => {
            fs.readFile(this.teamsheetFilePath+fileName, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                const names = data
                    .toLowerCase()
                    .trim()
                    .split('\n')
                    .map((name) => name.trim().toLowerCase());

                resolve(names);
            });
        });
    }

    async closeReadline (): Promise<void> {
        return new Promise((resolve) => {
            this.rl.close();
            resolve();
        });
    }

}

export default FileManagement;