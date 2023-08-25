export default function updateDateTime(providedDTParams: string, preffixDT: string) {
    const providedDT = new Date(providedDTParams)
    const currentDT = new Date();

    const restDT = Math.abs(
        Math.floor(providedDT.getTime() / 1000) -
            Math.floor(currentDT.getTime() / 1000)
    );
    const s: number = restDT;
    const m: number = Math.floor(restDT / 60);
    const h: number = Math.floor(s / 60 / 60);
    const d: number = Math.floor(s / 60 / 60 / 24);

    const arrayType = [
        { value: s, suffix: 's' },
        { value: m, suffix: 'min' },
        { value: h, suffix: 'h' },
        { value: d, suffix: 'j' },
    ];

    for (let index = arrayType.length - 1; index >= 0; index--) {
        if (arrayType[index].value !== 0) {
            if (arrayType[index].value > 3 && arrayType[index].suffix === 'j') {
                return providedDT.toLocaleDateString();
            }
            return `${preffixDT} ${arrayType[index].value}${arrayType[index].suffix}`;
        }
    }
}
