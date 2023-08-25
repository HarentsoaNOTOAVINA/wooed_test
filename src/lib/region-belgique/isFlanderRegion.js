export const isFlanderRegion = (str) => {
    const filter = ['Vlaams Gewest', 'Région Flandre', 'Flandre'];
    let isFlander = false;
    filter.forEach((item) => {
        if (isFlander === false) {
            isFlander = str
                .toLocaleLowerCase()
                .includes(item.toLocaleLowerCase());
        }
    });
    return isFlander;
};
