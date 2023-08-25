<script lang="ts" setup>
import Button from "@/components/Common/Button/Button.vue";
import Input from "@/components/Common/Input/Input.vue";
import Select from "@/components/Common/Select/Select.vue";
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/Common/Loader/Loader.vue";
import Map from '@/pages/addProduct/components/Address/Map/Map.vue';
import { LatLng } from 'leaflet';
import Info from '@/components/Icon/Info.vue';
import { inputList, polygons } from "@/pages/manageProperty/Adress/data";
import useAutoComptetion from '@/composables/useAutoComplete';
import useGeocode from '@/composables/useGeocode';


const manageType = [
    {
        label : "J'occupe seule le bien",
        value : "occupied"
    },
    {
        label : "Je loue le bien",
        value : "lease"
    },
    {
        label : "Je loue le bien à titre de résidence sécondaire",
        value : "lease"
    },
]

// const propertyType = [
//     {
//         label : "Maison",
//         value : "Maison"
//     },
//     {
//         label : "Appartement",
//         value : "Appartement"
//     }
// ]

const emit = defineEmits(['activeNext', 'getAdress', 'getData']);
const store = useStore();
const propertyType = ref<any>();
const loading = ref<boolean>(false);
const params = ref<any>({});
const { autocompleteResult } = useAutoComptetion('address');

const defaultLatLng = ref<ILocationParams>({
    lat: 50.83435155500285,
    lng: 4.394954452351843,
});
const cadastreData = ref<[]>([]);
const currentLatLng = ref<ILocationParams>();
const loactionParams = ref<ILocationParams>({
    address: '',
    country: '',
    codeCountry: '',
    latitude: 0,
    longitude: 0,
    municipality: '',
    codeMunicipality: '',
    postalCode: '',
    region: '',
    codeRegion: '',
});

const { geocodeResult } = useGeocode(
    defaultLatLng as any,
    currentLatLng as any
);
const loadingMap = ref<boolean>(true);

onMounted(() => {
    emit('activeNext');
    getPropertyType();

    const val = store.dispatch(
        'AddProductModule/getCadasrteByCoord',
        defaultLatLng.value
    );
    val.then((result : []) =>{
        cadastreData.value = [...result];
        loadingMap.value = false;

    }).catch((err  : any) => console.log(err))
})

watch(
        () => autocompleteResult.value,
        (v) => {
            currentLatLng.value = {
                lat: (v as ILocationParams).lat,
                lng: (v as ILocationParams).lng,
            };
            const val = store.dispatch(
            'AddProductModule/getCadasrteByCoord',
            defaultLatLng.value
        );
        val.then((result : []) =>{
            cadastreData.value = [...result];
            loadingMap.value = false;

        }).catch((err  : any) => console.log(err))
            // console.log('CALLED');
        },
        { deep: true }
    );

    
    watch(()=> store.getters["AddProductModule/getCadastreData"],
    (newVal)=>{
        console.log('DBG cadastre store change');
        cadastreData.value = newVal;
    },
    {immediate : true}
    )

    watch(
        () => geocodeResult.value,
        (v) => {
            v && locationHandler(v);
            if (v) {
                emit('getAdress', v[0]);
            }
            console.log('geo:', v);
        },
        { immediate: true }
    );

    watch(
        () => currentLatLng.value,
        (v) => {
            defaultLatLng.value = v as ILocationParams;
            store.dispatch(
                'AddProductModule/getCadasrteByCoord',
                currentLatLng.value
            );
        },
        { deep: true }
    );

async function getPropertyType(){
    loading.value = true;
    propertyType.value = await store.dispatch('AddProductModule/getProperyType');
    loading.value = false;
}

function handleChange(e : any){
    console.log("event\n", e);
    params.value = {
        ...params.value,
        ...e
    }

    console.log("params\n", params.value);
    emit('getData', params.value);
}


function handleClickMap(e: LatLng) {
        currentLatLng.value = e;
    }
    function locationHandler(params: Array<gm_ILocationResult>) {
        console.log(params[0], 'params[0]');
        params[0].address_components.forEach((item) => {
            extractLocationDetails(item);
        });
        const formattedParams: { latitude: any; longitude: any } = {
            latitude: (params[0].geometry.location as any).lat(),
            longitude: (params[0].geometry.location as any).lng(),
        };
        loactionParams.value = {
            ...loactionParams.value,
            ...JSON.parse(JSON.stringify(formattedParams)),
            address: params[0].formatted_address,
        };
    }
    function extractLocationDetails(locationObj: {
        long_name: string;
        short_name: string;
        types: Array<string>;
    }) {
        switch (true) {
            case locationObj.types.includes('country'):
                loactionParams.value = {
                    ...loactionParams.value,
                    country: locationObj.long_name,
                    codeCountry: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('locality'):
                loactionParams.value = {
                    ...loactionParams.value,
                    municipality: locationObj.long_name,
                    codeMunicipality: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('administrative_area_level_1'):
                loactionParams.value = {
                    ...loactionParams.value,
                    region: locationObj.long_name,
                    codeRegion: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('postal_code'):
                loactionParams.value = {
                    ...loactionParams.value,
                    postalCode: locationObj.long_name,
                };
                break;
        }
    }

    function inputHandler(obj: { address: string } | object) {

        for (const key in obj) {
            if (key === 'address') {
                loactionParams.value = {
                    ...loactionParams.value,
                    address: obj[key as keyof typeof obj],

                };
            }
            else if(key === ''){

            }
        }
        console.log('first', loactionParams.value);
    }

</script>

<template>
    <div class="adress adress__container">
        <div class="adress__header">
            <P>Information et adresse</P> 
            <hr class="adress__divider">
        </div>
        <Loader v-if="loading" />
        <div class="" v-else>
            <Select 
                label="Type de gestion"
                :options="manageType"
                name="operationType"
                :required="true"
                @change-select="handleChange"
            />
            <Select 
                label="Type de bien"
                :options="propertyType"
                name="propertyType"
                :required="true"
                @change-select="handleChange"
            />
        </div>

        <div class="adress__adress-container">
            <div class="adress__adress-header">
                <P>Adresse</P>
                <hr class="adress__divider">
            </div>

            
        </div>
        <!-- <div class="adress__adress-container">
            <P class="adress__container__info">
                <Info :size="'xs'" /><small
                    >Entrez votre adresse ou cliquez sur la carte.</small
                >
            </P>
            <div class="" v-for="item in inputList" :key="item.id">
                <Input
                    v-if="item.type === 'input'"
                    :id="item.id"
                    :label="item.label"
                    :name-input="item.name"
                    :value="(loactionParams as ILocationParams)[item.name as keyof ILocationParams]"
                    :required="item.required"
                    @input="inputHandler"
                />
                <div 
                    v-else-if="item.type === 'text'"
                    class="adress__info"
                >
                    <P
                        :fontSize="'16'"
                        
                    >
                        {{item.label }} :
                        <b>
                            {{(loactionParams as ILocationParams)[item.name as keyof ILocationParams]}}
                        </b>
                    </P>
                </div>

                <div class="adress__map" v-if="item.name === 'address'">
                    <div v-if="loadingMap" class="adress__map--loading">
                        <Loader />
                    </div>
                    <Map
                        v-else
                        :defaultLatLng="defaultLatLng"
                        :currentLatLng="currentLatLng"
                        :cadastre-data="cadastreData"
                        @on-click-map="handleClickMap"
                    />
                </div>
            </div>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.adress{

    &__container{
        @apply flex flex-col gap-[20px];
        &__info {
            @apply mb-[20px] flex items-center gap-[10px];
            color: var(--color-primary);
        }
    }

    &__header{
        @apply flex flex-col gap-[10px];
    }
    &__divider{
        @apply text-slate-300; 
    }

    &__adress-content{
        @apply flex flex-col gap-[20px];
    }

    &__adress-container{
        @apply flex flex-col gap-[20px];
    }

    &__adress-header{
        @apply flex flex-col gap-[10px];
    }

    &__adress-map{
        @apply border rounded-[8px] h-[300px] border-slate-300;
    }

    &:deep(){
        .custom-input__fields{
            @apply mb-0;
        }
    }
    &__map {
            @apply border rounded-sm h-[350px] mb-[10px];
            min-height: 350px;
            &--loading {
                min-height: inherit;
                @apply relative;
            }
        }
        &__info{
            @apply mb-3;
            
        }
}
</style>