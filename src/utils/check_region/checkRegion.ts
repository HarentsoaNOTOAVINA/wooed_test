export default function (stringParam: string): string {
    switch (stringParam) {
        case 'Bruxelles':
        case 'Bruxelles-Capitale':
            return 'Bruxelles';
        case 'Région Wallonne':
            return 'Wallonie';
        case 'Vlaams Gewest':
            return 'Flandre';
    }
    return '';
}
