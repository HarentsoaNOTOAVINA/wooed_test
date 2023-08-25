<script lang='ts' setup>
import {ref, shallowRef, onMounted} from 'vue';
import {notification} from 'ant-design-vue';
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import TransportMenu from '@/pages/transport/components/TransportMenu.vue';
import Target from "./target.vue";
import AvailablePlace from "./availablePlace.vue";
import { useStore } from 'vuex';
import {useRouter} from 'vue-router';

const router = useRouter();
const store = useStore();

const components  : any[] = [Target,AvailablePlace]; 
const  currentComponent = shallowRef<any>(Target);
        const breadcrumbListsData = ref<any>([
    {
        label: 'Proposition de trajet',
    },
])

const btnLabel = ref<string>("Suivant");
onMounted(()=>{
        store.dispatch('TransportModule/fetchSizes');
})

function handleBtn(){
        if(btnLabel.value === "Valider"){
                store.dispatch("TransportModule/postTargetPurpose")
                notification.success({message  : 'Votre proposition de trajet a bien été enregistrer'});
                currentComponent.value = AvailablePlace;

        }else{

                currentComponent.value = Target;
                btnLabel.value = "Valider"
        }
}

function backToHomePage() {
        store.dispatch("TransportModule/setActiveComponent", TransportMenu);
}

</script>
<template>
        <MainCard 
                class="announce__section"
                :dataBreadcrumbs="breadcrumbListsData"
                :button="true"
                :label-button="btnLabel"
                :disable-submit-button="false"
                @on-click="handleBtn"
        >
                <BackButton :text="'retour'" @return="backToHomePage" />
                <component :is="currentComponent" />
        </MainCard>
</template>