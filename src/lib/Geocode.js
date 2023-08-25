import axios from 'axios';

const geocode = (place) => {
    const adress = typeof place === 'string';
    const baseUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/${
        adress ? 'findAddressCandidates' : 'reverseGeocode'
    }`;
    let params = {};
    if (adress) {
        params = {
            f: 'json',
            address: place,
        };
    } else {
        if (typeof place === 'object') {
            place = `${place.lng},${place.lat}`;
        } else if (Array.isArray(place)) {
            place = `${place[1]},${place[0]}`;
        }
        params = {
            returnIntersection: false,
            f: 'json',
            location: place,
            langCode: 'fr',
        };
    }
    return new Promise((resolve, reject) => {
        axios
            .get(baseUrl, { params })
            .then(({ data }) => {
                if (adress) {
                    resolve(
                        data.candidates.map((c) => ({
                            address: c.address,
                            position: c.location,
                        }))
                    );
                } else {
                    resolve(data.address.LongLabel);
                }
            })
            .catch((e) => reject(e));
    });
};

export default geocode;
