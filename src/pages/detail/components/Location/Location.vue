<template>
    <div class="w-full relative h-full">
        <Map
            class="my-map"
            :key="mapKey"
            @touched="testEvent"
            :isNeedPublicCadaster="true"
            :needMarkerLayer="true"
            :needPolygonLayer="true"
            :polygonCoordinates="propertyPoly"
            :markersCoordinates="propertyCoords"
        />
        <div class="action-top-container">
            <Button
                type-button="gray"
                class="action-top-btn"
                @click="()=>router.back()"
            >
                <ArrowBack />
                <template class="mobile-hide"> Retour </template>
            </Button>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Map from '@/components/section/map/index.vue';
    import {computed, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    
    const router = useRouter();
    const mapKey = ref<number>(0);
    const store: Store<any> = useStore();
    let dataDetail = ref();

    let markerCoords: any = [];

    const data = computed(
        () => store.getters['PropertyDetailModule/getPropertyDetail']
    );
    dataDetail.value = data.value.data;

    const propertyCoords = computed(
        () => store.getters['PropertyDetailModule/getPropertyCoords'],
    );
    console.log('propertyCoords:', propertyCoords.value);
    console.log('data:', dataDetail);

    const propertyPoly = computed(
        () => store.getters['PropertyDetailModule/getPropertyPoly']
    );
    watch(()=> propertyPoly.value,
        ()=>{
            mapKey.value += 1;
        }, {immediate : true, deep : true}
    )
    
    function testEvent() {
        console.log('first');
    }
</script>

<style lang="scss" scoped>
    .my-map {
        height: 100vh;
        width: 100%;
        border-radius: 8px;
        z-index: 9;
        
    }
    .action{
        &-top{
            &-container{
                @apply w-full absolute top-[10px] flex items-center gap-[10px] pl-[56px] pr-[14px] z-[999];
                @screen md {
                    @apply flex flex-row justify-between top-[32px] pl-[74px] pr-[32px];
                }
                &:deep() {
                    .custom-input__fields {
                        @apply w-full;
                        @screen md {
                            width: calc(100% - 359px);
                        }
                        @apply mb-0;
                        .ant-input {
                            @apply pl-[34px] pr-[11px];
                        }
                        .unit {
                            @apply left-[11px] w-max;
                        }
                        .icon {
                            svg path {
                                @apply fill-grayIcon;
                            }
                        }
                    }
                }
                
            }
            &-btn{
                border-radius: 25px;
                border : 1px solid black;
            }
        }
    }
    .mobile {
        &-hide {
         
                @apply py-1;
                display: inline;
            
        }
    }
</style>
