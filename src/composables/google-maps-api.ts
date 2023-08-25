// @ts-nocheck

var googleMapID = 'google-map-script';
var autocomplete_result;

export const useGoogleMapAPI = function () {
    const API_KEY = import.meta.env.VITE_GOOLE_MAPS_API_KEY;
    const CALLBACK_NAME = 'gmapsCallback';
    // This promise handles the initialization
    // status of the google maps script.

    // We inject a new script tag into
    // the `<head>` of our HTML to load
    // the Google Maps script.

    const initPromise = new Promise((resolve, reject) => {
        // If Google Maps already is initialized
        // the `initPromise` should get resolved
        // eventually.
        const scriptTester = document.querySelectorAll('#' + googleMapID);
        if (scriptTester.length < 1) {
            const script = document.createElement('script');
            script.id = googleMapID;
            script.async = true;
            script.defer = true;
            script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&language=fr`;
            document.querySelector('head').appendChild(script);
            script.onload = () => {
                resolve(window.google);
            };
            script.onerror = () => {
                reject('otrany tsy lasa');
            };
        }
    });

    return initPromise;
};

export const removeScript = () => {
    delete window.google;
    document.querySelectorAll('head>script').forEach((item) => {
        if (item.src.includes('googleapis')) {
            item.remove();
        }
    });
};
/**
 *
 * @param {HTMLImputElement} input - input element of the field
 * @param {Array} fields - list on fields de return
 * @param {Object} options - autocomple optionss
 */

const setAutoCompleteResult = (res) => {
    autocomplete_result = res;
};
export const getAutoCompleteResult = () => {
    return autocomplete_result;
};

// export const autocomplet = (input ) => {
//     let auto;
//     const options = {
//         fields : ["address_components","geometry","formatted_address"]
//     }
//     if (!window.google) {
//         const result = useGoogleMapAPI();
//         result.then((google) => {
//             const p = new Promise((resolve, reject)=>{
//                 console.log('nandalo', google);
//                 auto = new google.maps.places.Autocomplete(input,options);
//                 setTimeout(()=>{
//                     console.log("zao no misy : ",auto)
//                 if (auto) {
//                     console.log("OKKKKK",auto)
//                     resolve(auto)
//                 } else {
//                     reject("l'autocompletion n'est pas charger")
//                 }
//                 },1000)
//             })
//             return p;
//         });
//     } else {
//         const p = new Promise((resolve, reject)=>{
//             auto = new window.google.maps.places.Autocomplete(input, options);
//             console.log('yes nandalo', auto);
//             console.log("zao no misy : ",auto)
//             if (auto) {
//                 resolve(auto)
//             } else {
//                 reject("l'autocompletion n'est pas charger")
//             }
//         })
//         return p;
//     }
//     // const p = new Promise((resolve, reject)=>{
//     //     console.log("zao no misy : ",auto)
//     //     if (auto) {
//     //         resolve(auto)
//     //     } else {
//     //         reject("l'autocompletion n'est pas charger")
//     //     }
//     // })
//     // return p;
// };

/**
 * converte address to geographical coordinates (lat long)
 * @param {String} address Some address
 * @returns {Promise}
 * @return_Formate {regularName : Array, coordinates : {lat,long}}
 */
export const geocode = (address = '') => {
    const statusCode = {
        success: 'OK',
    };
    const result = useGoogleMapAPI();
    const p1 = new Promise((resolve) => {
        if (!window.google) {
            result.then((google) => {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode(
                    { address: address },
                    function (results, status) {
                        if (status === statusCode.success) {
                            const pointer = results[0];
                            const resp = {
                                regularName: pointer.address_components,
                                coordinates: {
                                    lat: pointer.geometry.location.lat(),
                                    lng: pointer.geometry.location.lng(),
                                },
                            };
                            resolve(resp);
                        }
                    }
                );
            });
        } else {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: address }, function (results, status) {
                if (status === statusCode.success) {
                    const pointer = results[0];
                    const resp = {
                        regularName: pointer.address_components,
                        coordinates: {
                            lat: pointer.geometry.location.lat(),
                            lng: pointer.geometry.location.lng(),
                        },
                    };
                    resolve(resp);
                }
            });
        }
    });
    return p1;
};

export const directionService = (start : string |{}, end : string |{},travelMode='DRIVING')=>{
   
    const paylad = {
        origin : new google.maps.LatLng(start),
        destination : new google.maps.LatLng(end),
        travelMode
    }
    if(window.google){
        const direction = new window.google.maps.DirectionsService();
        direction.route(payload,(response, status)=>{
            if(status === "OK"){
               return response
            }
        })
      return 0;  
    }

}

export const directionCoordinatesParser = (coordinates)  : Promise=>{
    const _ = coordinates.routes[0].overview_path
                    _.forEach(elt =>{
                        coordinates.push({
                            lat : elt.lat(),
                            lng : elt.lng()
                        })
                    })
                    return coordinates;
}