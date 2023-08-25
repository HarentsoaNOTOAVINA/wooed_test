import { ref, onMounted, watch } from 'vue';
interface IAddressComponets {
    long_name: string;
    short_name: string;
    types: Array<string>;
}

export default function useAutoComptetion(
    inputId: string,
    isLoad?: any,
    immediate?: boolean
) {
    const autocompleteResult = ref<any>(null);
    const fullLocationResult = ref<any>(null);
    const isLoading = ref<boolean>(false);

    function callback(autocomplete: any) {
        //===== Limit search results ==========
        autocomplete.setComponentRestrictions({
            country: ['be', 'fr', 'lu'],
        });

        //===== Listening when the user is typing ==========
        document.getElementById(inputId)?.addEventListener('keydown', () => {
            isLoading.value = true; // Set loadingSuggestions to true when the user starts typing
        });

        document.getElementById(inputId)?.addEventListener('blur', () => {
            isLoading.value = false;
        });

        //================= oOo =================
        autocomplete.addListener('place_changed', () => {
            isLoading.value = false;
            const place = autocomplete.getPlace();
            fullLocationResult.value = place;
            try {
                const location = JSON.parse(
                    JSON.stringify(place.geometry.location)
                );
                /**assigne address paramaters */
                autocompleteResult.value = {
                    address: place.formatted_address,
                    lng: location.lng,
                    // lng: JSON.stringify(location.lng),
                    lat: location.lat,
                    // lat: JSON.stringify(location.lat),
                };
            } catch (error) {
                /**handle error if not valid value */
            }
        });
    }

    onMounted(() => {
        if (isLoad === undefined) {
            const autocomplete = new (
                window as any
            ).google.maps.places.Autocomplete(document.getElementById(inputId));
            console.log(autocomplete);
            callback(autocomplete);
        }
    });

    watch(
        () => (isLoad as any)?.value,
        () => {
            if (!!inputId) {
                setTimeout(() => {
                    const autocomplete = new (
                        window as any
                    ).google.maps.places.Autocomplete(
                        document.getElementById(inputId)
                    );
                    console.log(autocomplete);
                    callback(autocomplete);
                }, 1000);
            }
        },
        { immediate: !!immediate }
    );

    return { autocompleteResult, fullLocationResult, isLoading };
}

/**
 * 
 * @param location adressComponent from "fullLocationResult" of useAutocomplete function
 *   this fuction extract country , region, municipality name, postal code from adresse components (result of google autocomplete)
 * @returns ({
        country : '',
        region : '',
        municipalityName : '',
        postalCode : ''
    })
 */
export function ExtractAdressComponents(location: IAddressComponets[]) {
    const result = {
        country: '',
        region: '',
        municipalityName: '',
        postalCode: '',
    };
    location.forEach((locationObj) => {
        switch (true) {
            case locationObj.types.includes('country'):
                result.country = locationObj.long_name;
                break;
            case locationObj.types.includes('locality'):
                result.municipalityName = locationObj.long_name;
                break;
            case locationObj.types.includes('administrative_area_level_1'):
                result.region = locationObj.long_name;
                break;
            case locationObj.types.includes('postal_code'):
                result.postalCode = locationObj.long_name;
                break;
        }
    });
    return result;
}
