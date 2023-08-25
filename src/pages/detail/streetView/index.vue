<template>
    <MainContainer class="SV-Container">
        <MainCard
            class="SV-card"
            :data-breadcrumbs="breadcrumbListsData">
            <div v-if="available" id="pano">

            </div>
            <div v-else>
                <Empty>
                    <template #description>
                        <span>
                            <Parapgraphe> L'affichage sur street view n'est pas disponible pour ce bien</Parapgraphe>
                        </span>
                    </template>
                </Empty>
            </div>
            
        </MainCard>
    </MainContainer>
</template>

<script setup lang="ts">
import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import useStreetView from "@/composables/useStreetView";
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Empty } from 'ant-design-vue';

const route = useRoute(); 
const store = useStore();
const available = ref<boolean>(false);
const breadcrumbListsData = [
        
        {
            label: 'Détails du bien',
            url: `/detail/${route.params.id}`,
        },
        {
            label: 'Vue sur street view',
        },
    ];
onBeforeMount(()=>{
    store.dispatch("PropertyDetailModule/setPropertyData", route.params.id);
})

watch(()=> store.getters['PropertyDetailModule/getPropertyDetail'],
    (value : any)=>{
        if(!!value.data.latitude && !!value.data.longitude){
            available.value = true;
            useStreetView(
                'pano',
                { 
                    lat: value.data.latitude,
                    lng: value.data.longitude
                });
            }
    }, {immediate: true}
);
</script>

<style lang="scss" scoped>
#pano{
    width : 100%;
    height : 100%;
}
.SV{
    &-Container{

    }
    &-card{
        :deep(){
            .mainCard__items-wrap{
                height : calc(100vh - 174px);
            }
        }
    }
}
</style>