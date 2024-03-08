interface PlayerDetails {
    name: string;
    playstyle: playStyleTypes;
    fitness?: number;
}

interface playStyle {
    playStyle: playStyleTypes;
    number: number;
}

type playStyleTypes = "Defender" | "SpecialistDefender" | "Midfielder" | "Attacker" | "SpecialistAttacker";

const playStyles: Record<playStyleTypes, number> = {
    SpecialistDefender: 5,
    Defender: 4,
    Midfielder: 3,
    SpecialistAttacker: 2,
    Attacker: 1
};

export { PlayerDetails, playStyle, playStyleTypes, playStyles };