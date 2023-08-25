interface optionsI{
    label  : string;
    inputValue : string;
    value: number;
    color ?: string;
}
export const PROJECT_TARGET : optionsI[] = [
    {
        label : "S’ouvrir au quartier",
        inputValue : "s’ouvrir au quartier",
        value: 0
    },
    {
        label : "Favoriser la cohésion sociale",
        inputValue : "favoriser la cohésion sociale",
        value: 1
    },
    {
        label : "Favoriser la biodiversité",
        inputValue : "favoriser la biodiversité",
        value: 2
    },
    {
        label : "Sensibiliser au jardinage écologique, à l’alimentation saine, au compostage",
        inputValue : "sensibiliser au jardinage écologique, à l’alimentation saine, au compostage",
        value: 3
    },
    {
        label : "Favoriser la responsabilisation citoyenne, l’auto-gestion, la participation, la rencontre entre habitants du quartier.",
        inputValue : "favoriser la responsabilisation citoyenne, l’auto-gestion, la participation, la rencontre entre habitants du quartier.",
        value: 4
    },
    
]
export const MANAGEMENT_TYPE : optionsI[] = [
    {
        label : "Parcelles collectives",
        inputValue : "collectivePlot",
        color : "yellow",
        value: 0
    },
    {
        label : "Parcelles individuelles",
        inputValue : "individualPlot",
        color : "green",
        value: 1
    },
    {
        label : "Abri",
        inputValue : "shelter",
        value: 2
    },
    {
        label : "Zone de rencontre",
        inputValue : "meetingArea",
        value: 3
    },
    {
        label : "Zone de compostage",
        inputValue : "compostingArea",
        value: 4
    },
    {
        label : "Toilettes sèches",
        inputValue : "dryToilets",
        value: 5
    },

]

export const ACCESS_PLACEMENT : optionsI[] = [
    {
        label : "A la hauteur de la voirie",
        inputValue : "à la hauteur de la voirie",
        value: 0
    },
    {
        label : "Sur le toit d’un immeuble",
        inputValue : "sur le toit d’un immeuble",
        value: 1
    },

]
export const ACCESS_BENEFIT :  optionsI[] = [
    {
        label : "D’un accès direct depuis la voie publique",
        inputValue : "d’un accès direct depuis la voie publique",
        value: 0
    },
    {
        label : "Se fait par un bâtiment appartenant à un tiers occupé par une administration publique",
        inputValue : "se fait par un bâtiment appartenant à un tiers occupé par une administration publique",
        value: 1
    },
    {
        label : "Se fait par une parcelle de terrain appartenant à un tiers",
        inputValue : "se fait par une parcelle de terrain appartenant à un tiers",
        value: 2
    },
    {
        label : "Occupé par une administration publique",
        inputValue : "occupé par une administration publique",
        value: 3
    },
]
