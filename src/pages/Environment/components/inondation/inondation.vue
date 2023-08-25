<template>
    <div class="environment-container">
        <div class="environment-title">
            <Paragraphe>{{ text.title }}</Paragraphe>
        </div>
        <hr>
        <div class="card-container">
            
            <div class="card-item"
                :class="_status.isResult ? '' : 'environment-bg-warn'"
            >
                <div class="card-item-header">

                    <div class="card-item-icon ">
                        <InnondationIcon/>
                    </div>
                    <div class="card-item-title">
                     Inondations
                    </div>
                </div>
                <div>
                    <template v-if="_status.isResult">
                        <Paragraphe>
                            La parcelle se trouve en 
                        </Paragraphe>
                           <Paragraphe class="card-response">
                            <Paragraphe
                            v-for="(text, key) in _status.value"
                            :key="key"
                        >
                            {{ text }}
                        </Paragraphe>
                           </Paragraphe>
                    </template>
                   <template v-else>
                    <div>
                        <Paragraphe>
                            nous n'avons pas de données pour cette parcelle 
                        </Paragraphe>
                    </div>
                   </template>
                </div>              
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/assets/style/environment.scss';
import InnondationIcon from "@/components/Icon/Environment/innondation.vue";
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import {useRoute} from 'vue-router';
import { reactive } from "vue";
import { onMounted } from "vue-demi";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const text = reactive({
    title : "Statut environnemental du bien"
})
const _status = reactive<{[key : string] : any}>({
            value : null,
            isResult : false,
        })
        
        onMounted(async ()=>{
       const _floodStatus =  await store.dispatch('EnvironmentModule/getFloodStatus', route.params.id );
       
       if( Array.isArray(_floodStatus) && _floodStatus.length){
            _status.value = _floodStatus;

            if(_floodStatus)
            _status.isResult = true;
       }else{
        _status.isResult = false;
       }
    })
    
</script>
