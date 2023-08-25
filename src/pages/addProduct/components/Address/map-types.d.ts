interface ILocation {
    address?: string;
    lat: string | number;
    lng: string | number;
}

interface gm_ILocationResult {
    formatted_address: string;
    geometry: { location: { lat: number; lng: number } };
    address_components: Array<{
        long_name: string;
        short_name: string;
        types: Array<string>;
    }>;
}

interface ILocationParams {
    lat?: number | string;
    lng?: number | string;
    latitude?: number | string;
    longitude?: number | string;
    address?: string;
    country?: string;
    region?: string;
    municipality?: string;
    postalCode?: string | number;
    codeRegion?: string;
    codeMunicipality?: string;
    codeCountry?: string;
}
