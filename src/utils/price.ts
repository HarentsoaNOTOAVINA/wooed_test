export function initPriceOptions(start=50000,step=100000, end=1000000){
    const prices = [];
    // if(start !== step && start < step){
    //     prices.push({
    //         value: `${start}-${step}`,
    //         label: `${start} - ${step} EUR`.toLocaleUpperCase('be-BE'),
    //     });
    // }
    const formatter = new Intl.NumberFormat('fr-Fr')

    let lastValue = start;
    //pour i < 100 000
    let x= step;
    while(x <= end){
        const elt = {
            value : `${(lastValue)}-${(x)}`,
            label : `${formatter.format(lastValue)} - ${formatter.format(x)} EUR`,
        }
        prices.push(elt);
        lastValue = x;
        x+= step;
    }

    return prices;
}