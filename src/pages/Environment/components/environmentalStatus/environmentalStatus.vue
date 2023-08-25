<template>
    <div class="environment-container">
        <div class="environment-title">
            <Paragraphe>{{ text.title }}</Paragraphe>
        </div>
        <hr>
        <div class="card-container ">
            
            <div class="card-item"
            :class="_status.isResult ? '' : 'environment-bg-warn'"
            >
                <div class="card-item-header">

                    <div class="card-item-icon">
                        <StatusIcon/>
                    </div>
                    <div class="card-item-title">
                        Statut environnemental du bien
                    </div>
                </div>
                <div>
                    <template v-if="_status.isResult">
                        <Paragraphe>
                            Le bien se situe en 
                           </Paragraphe>
                           <Paragraphe class="card-response bg-white">
                                {{ _status.value }}
                           </Paragraphe>
                           <Paragraphe>
                            à l’Inventaire Bruxellois de l’Etat des Sols
                           </Paragraphe>
                    </template>
                   <template v-else>
                    <div>
                        <Paragraphe>
                            Le bien n'est pas catégorisé à l’Inventaire Bruxellois de l’Etat des Sols
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
import StatusIcon from "@/components/Icon/Environment/status.vue";
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
       const _environmentStatus =  await store.dispatch('EnvironmentModule/getEnvironmentalStatus', route.params.id );
       if(_environmentStatus){
           _status.isResult = true;
           _status.value = _environmentStatus;
        }else{
            _status.isResult = false;
        }
    })
    
</script>
