export interface MarkerType {
    lat: number;
    lng: number;
    prices?: number | string;
    activeClass?: string;
    customIcon?: string;
    iconSize?: number[];
    iconAnchor?: number[];
}
export interface ICustomControlParams{
    label: string;
    callback : any;
}

export interface ICoords {
    lat: number;
    lng: number;
}
export interface IFields {
    label?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    options?: any[];
    fill?: boolean;
    condition ?: any; 
    handler?: () => any;
}