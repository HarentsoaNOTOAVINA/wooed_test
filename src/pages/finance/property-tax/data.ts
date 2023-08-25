interface IOptions{
    id : number,
    label : string,
    value : string | number,
}



export const modesteHouse : IOptions[] = [
    {
        id : 0,
        label : "Pas de maison modeste",
        value : -1
    },
    {
        id : 1,
        label : "Réduction de 25%",
        value : "25"
    },
    {
        id : 2,
        label : "Réduction de 50%",
        value : "50"
    }
]

export const classedBien : IOptions[] = [
    
        {
            id : 0,
            label : "25%",
            value : "25"
        },
        {
            id : 1,
            label : "50%",
            value : "50"
        },
        {
            id : 2,
            label : "100%",
            value : "100"
        }
]