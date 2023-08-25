<script lang='ts' setup>

import Select from '@/components/Common/Select/Select.vue';
import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
import ColisSize  from "../colisSize/colisSize.vue";
import {ref,reactive, onMounted, watch} from 'vue';
import Switch from "@/components/Common/Switch/Switch.vue";
import {useStore} from 'vuex';
import {AVAILABLE_PLACE_DATA} from "./data";
const store = useStore();
const {vehicule_type, size, isPassengerAccepted, isAnimalAccepted} = AVAILABLE_PLACE_DATA;
let payload  = ref<any>({}); 

function handleSizeChange($event : any){
    payload.value = {...payload.value, ...$event}
    console.log("DBG $event", $event);
}
function handleSelect($event : any){
    payload.value = {...payload.value, ...$event}

}
function handleSwitcher(name : string,$event :any){
    payload.value = {...payload.value, ...{[name] : $event}}
}

watch(payload,
    (newValue : any)=>{
        store.commit('TransportModule/UPDATE_TARGET_PURPOSE', newValue);
        console.log('DBG Watcher');
    })
</script>
<template>
    <div class="available-container">
        <div class="available-field">
            <Select
                :label="vehicule_type.label"
                :name="vehicule_type.name"
                :placeholder="vehicule_type.options[0].label"
                :options="vehicule_type.options"
                @change-select="handleSelect"
            />     
        </div>
        <div class="available-field">
            <ColisSize 
                @change="handleSizeChange"
            />
        </div>
        <div class="available-field">
            <Switch 
                checked-name="Oui" 
                unchecked-name="Non" 
                :item-label="isPassengerAccepted.label"
                :name="isPassengerAccepted.name" 
                @switch-value="handleSwitcher(isPassengerAccepted.name, $event)"
                :switch-value="false" 
            />
                <Paragraph
                    :font-size="'9px'"
                >
                    {{ isPassengerAccepted.info }}
                </Paragraph>
        </div>
        <div class="available-field">
            <Switch 
                checked-name="Oui" 
                unchecked-name="Non" 
                :item-label="isAnimalAccepted.label"
                :name="isAnimalAccepted.name" 
                @switch-value="handleSwitcher(isAnimalAccepted.name, $event)"
                :switch-value="false" 
            />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.available{
    &-container{
       @apply w-full flex flex-col;
    }
}
</style>