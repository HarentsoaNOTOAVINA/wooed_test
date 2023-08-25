<template>
    <div class="etablishDocument">
        <Title
            type="h3"
            label="Etablir un document de présentation du projet"
            class="etablishDocument__title"
        />
        <hr class="__hr" />
        <CardWrapperTitle title="Description du terrain">
            <div class="etablishDocument__items-wrap">
                <div class="etablishDocument__items">
                    <Title
                        type="h4"
                        label="Emplacement"
                        class="etablishDocument__items-title"
                    />
                    <hr class="__hr" />
                    <div class="etablishDocument__content flex flex-row justify-between">
                        <Paragraphe class="font-bold">Superficie</Paragraphe>
                        <Paragraphe class="category" >  : {{ polygonArea.toLocaleString('fr-FR') }} m2</Paragraphe>
                    </div>
                </div>
                <div class="etablishDocument__items">
                    <Title
                    
                        type="h4"
                        label="Accès"
                        class="etablishDocument__items-title"
                    />
                    <hr class="__hr" />
                    <div class="etablishDocument__content">
                        <ul>
                            <li>
                                <RadioGroup
                                    label=" Le potager se trouve  : "
                                    :items="ACCESS_PLACEMENT"
                                    name="vegetableGardenLocation"
                                    @change="handleData"
                                />
                                
                            </li>
                            <li>
                                <RadioGroup
                                    label="Le potager bénéficie  :  "
                                    :items="ACCESS_BENEFIT"
                                    name="vegetableGardenAccess"
                                @change="handleData"
                            />
                                
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="etablishDocument__items">
                    <Title
                        type="h4"
                        label="Statut environnemental de la parcelle"
                        class="etablishDocument__items-title"
                    />
                    <hr class="__hr" />
                    <div class="etablishDocument__content">
                        <div class="content-wrap">
                            <span class="font-[600]">Le bien se situe en</span>
                            <span class="category">Catégorie 0 (cf supra)</span>
                        </div>
                    </div>
                </div>
            </div>
        </CardWrapperTitle>
        <CardWrapperTitle title="Objectifs du projet">
            <div class="etablishDocument__content">
                <CheckBox
                    v-for="(item, key) in PROJECT_TARGET"
                    :key="key"
                    :label="item.label"
                    :value="item.value.toString()"
                    :return-boolean="false"
                    name="projectsObjectives"
                    @click-with-value="handleProjectTarget"
                />
            </div>
        </CardWrapperTitle>
        <CardWrapperTitle title="Type de gestion">
            <div class="etablishDocument__map">
                <div class="etablishDocument__map--item">
                    <Map idMap="type"
                        :polygon-coordinates="currentPolygon"
                        :need-polygon-layer="true"
                        :need-draw-control="isDrawControlEnable"
                        :handleSingleLayer="true"
                        :control-config="controlConfig"
                        :polygon-layer-color="currentPlygonLayerColor"
                        @on-polygon-created="handlePolygonCreated"
                        :key="mapKey"
                    />
                </div>
                <div class="etablishDocument__map-check">
                    <!-- <RadioGroup
                        :items="MANAGEMENT_TYPE"
                        name="managementType"
                        @change="handleData"
                    /> -->
                    <div
                        v-for="(item,key) in MANAGEMENT_TYPE"
                        :key="key"
                    >
                        <input 
                            type="radio" 
                            name="managementType" 
                            :id="item.label"
                            :value="item.inputValue"
                            @change="handleData"
                        > 
                        <label :for="item.label">
                            {{ item.label }} 
                            <span :class="`plot-color-${item.color}`"></span>
                        </label>
                        
                    </div>
                                                  
                </div>
            </div>
        </CardWrapperTitle>
        <div class="flex flex-row justify-end">
            <Button
                class="flex-1"
                :width="'100%'" 
                @click="postDocumentData">
                Valider
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
// [{lat,lng},{lat,lng},{lat,lng}, ]
    import * as turf from '@turf/turf'; 
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import RadioGroup from "@/components/Common/RadioGroup/RadioGroup.vue";
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapperTitle from './components/CardWrapperTitle.vue';
    import ProjectActors from './components/ProjectActors.vue';
    import Map from '@/components/section/map/index.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import {MANAGEMENT_TYPE, ACCESS_PLACEMENT, ACCESS_BENEFIT, PROJECT_TARGET}  from "./data";
    import { LatLngLiteral } from 'leaflet';
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import { useStore } from 'vuex';
import { notification } from 'ant-design-vue';


    const store = useStore()
    const controlConfig = ref<object>({
        circlemarker: false,
        marker: false,
        polyline:false,
        rectangle:false,
        circle:false,
    })
    interface payloadsI{
        landArea ?: string;
        vegetableGardenLocation ?: string;
        vegetableGardenAccess ?: string;
        plotEnvironmentalStatus ?: string;
        projectsObjectives ?: string[];
        collectivePlot ?: LatLngLiteral[];
        individualPlot ?: LatLngLiteral[];
        shelter ?: LatLngLiteral[];
        meetingArea ?: LatLngLiteral[];
        compostingArea ?: LatLngLiteral[];
        dryToilets ?: LatLngLiteral[];
        colectiveGarden : number;
    }
    let payload : payloadsI= {
        colectiveGarden : -1,
        projectsObjectives  : []
    }
    const polygonArea = ref<number>(0)
    const currentPlygonLayerColor = ref<string>('yellow');
    const currentPolygon = ref<any[]>([]);
    let mapKey = ref<number>(0);
    const isDrawControlEnable = ref<boolean>(false);
    let currentManagementType = "";
    const collectiveGarden = computed(()=> store.getters["CollectiveGardenModule/getCollectiveGardenData"])

    function handlePolygonLayer(managementType  : string){
        switch (currentManagementType) {
                case 'collectivePlot':
                    currentPlygonLayerColor.value= "yellow";
                    delete payload?.individualPlot
                    delete payload?.shelter
                    delete payload?.meetingArea
                    delete payload?.compostingArea
                    delete payload?.dryToilets
                    break;
                case 'individualPlot':
                    currentPlygonLayerColor.value= "green"
                    delete payload?.collectivePlot
                    delete payload?.shelter
                    delete payload?.meetingArea
                    delete payload?.compostingArea
                    delete payload?.dryToilets
                    break;
                default:
                    break;
            }
    }
    onMounted(()=>{
        function callback(){
        notification.success({message : "Une conversation de groupe à été créer."})        
    }
    
        store.dispatch('CollectiveGardenModule/createConversation')
    })
    function updateMapDisplay(){
            isDrawControlEnable.value  = true; //enable drawing control on map
            currentPolygon.value =  []; //remove last  polygon in map
            mapKey.value = mapKey.value+1; //refresh  map display
    }

    function  handleData($event : any){
        if( $event.target.name === "managementType"){
            currentManagementType = $event.target.value;
            
            handlePolygonLayer(currentManagementType);
            updateMapDisplay();
        }else{
            payload = Object.assign(payload,$event);

        }
    }
    function toArray(object : LatLngLiteral[]){
        const _ : any[] = [];

        object.forEach(latlng =>{
            _.push(Object.values(latlng))
        })
            _.push(_[0])
        return _ ;
    }
    function handlePolygonCreated($event  : any){

        const  _polygon  = turf.polygon([toArray($event.latlng)])
        polygonArea.value = turf.area(_polygon);
        
        payload = Object.assign(payload,{
            [currentManagementType]  : $event.latlng,
            landArea : polygonArea.value.toLocaleString('fr-FR')
        });
        currentPolygon.value =  [$event.latlng];
        isDrawControlEnable.value  = false;
        mapKey.value = mapKey.value+1;

        
    }
    function handleProjectTarget($event : {[key : string] :  string}){

        payload.projectsObjectives?.push(Object.values($event)[0]);
    }

    
    function callback(){
        notification.success({message : "Les documents ont bien été enregistrer"})        
    }
    function postDocumentData(){
        payload.colectiveGarden = collectiveGarden.value.id;
        const _payload = {
            data : payload,
            callback
        }
        if(payload.colectiveGarden && payload.landArea){
            store.dispatch("CollectiveGardenModule/postCollectiveGardenDocument",_payload)    
        }
    }
    // onUnmounted(()=>{
    //     postDocumentData();
    // })
</script>

    <style lang="scss" scoped>
    input[type='radio']{
        @apply m-[5px];
    }
    .plot-color{
        @apply w-3 h-3  inline-block;
        &-green{
            @extend .plot-color;
            @apply bg-green;
        }
        &-yellow{
            @extend .plot-color;
            @apply bg-yellow-200;
        }
        
    }

      
    .etablishDocument {
        @apply flex flex-col gap-[24px];
        &__title {
            @media (max-width: 575px) {
                @apply hidden;
            }
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__subtitle {
            @apply text-[14px] text-secondary font-[600];
        }
        &__items {
            @apply flex flex-col gap-[18px];
            &-wrap {
                @apply flex flex-col gap-[24px];
            }
            &-title {
                @apply text-[14px] text-grayIcon font-[600] pl-[18px];
            }
            &:deep() {
                .custom-input__fields,
                .custom-select__wrapper {
                    @apply mb-0;
                }
                .date__space {
                    gap: 0 !important;
                }
                .date__label {
                    @apply mb-[10px];
                }
                label {
                    @apply font-[600] text-black;
                }
            }
        }
        &__map {
            @apply flex flex-col gap-[18px];
            @screen lg {
                @apply flex-row;
            }
            &--item {
                max-height: 179px;
                @apply h-[179px] w-full;
                @screen sm {
                    max-height: 300px;
                    @apply h-[300px];
                }
                @screen md {
                    max-height: calc(100vh - 275px);
                    @apply h-[325px];
                }
            }
            &-check {
                @apply w-full max-w-[209px] flex flex-col gap-[18px];
            }
        }
        &__content {
            @apply p-[14px] bg-gray rounded-[8px];
            ul {
                @apply list-disc pl-[14px];
            }
            .content-wrap {
                @apply flex flex-wrap items-center justify-between gap-[14px];
            }
            .category {
                @apply px-[14px] py-[10px] rounded-[4px] bg-white text-primary;
            }
        }
        .cardWrapper {
            &:deep() {
                .projectActors__subtitle {
                    @apply pl-[18px];
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
