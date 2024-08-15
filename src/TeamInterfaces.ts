interface PlayerDetails {
    name: string;
    playstyle: playStyleTypes;
    fitness?: number;
}

interface playStyle {
    playStyle: playStyleTypes;
    number: number;
}

type playStyleTypes = "Defender" | "SpecialistDefender" | "Midfielder" | "SpecialistMidfielder" | "Attacker" | "SpecialistAttacker";

const playStyles: Record<playStyleTypes, number> = {
    SpecialistDefender: 6,
    SpecialistMidfielder: 5,
    SpecialistAttacker: 4,
    Defender: 3,
    Midfielder: 2,
    Attacker: 1
};

export { PlayerDetails, playStyle, playStyleTypes, playStyles };