export const separatorMillier: Function = (a: Number | String, b?: String) => {
    a = '' + a;
    b = b || ' ';
    var c = '',
        d = 0;
    while (a.match(/^0[0-9]/)) {
        a = a.substr(1);
    }
    for (var i = a.length - 1; i >= 0; i--) {
        c = d !== 0 && d % 3 === 0 ? a[i] + b + c : a[i] + c;
        d++;
    }
    return c;
};

export function separatorHandleFloat(rawNb: string | number): string {
    function _parseStr(nb: string): string {
        let splitedNb = '';
        let offset = '';
        if (nb.includes('.')) {
            splitedNb = nb.slice(0, nb.indexOf('.'));
            offset = nb.slice(nb.indexOf('.'), nb.length);
        }
        let i = splitedNb.length - 1;
        const res = [];
        let countMod = 1;
        while (i >= 0) {
            res.unshift(splitedNb[i]);
            if (countMod % 3 === 0) {
                res.unshift(' ');
            }
            countMod++;
            i--;
        }
        return res.join('').trim() + offset;
    }
    const nb = rawNb.toString()
    return nb.includes('.') ? _parseStr(nb) : (+rawNb).toLocaleString();
}
