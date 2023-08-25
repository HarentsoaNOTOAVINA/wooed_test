<template>
    <div class="list__container">
        <div class="list__content">
            <div class="list__about">
                <Paragraphe type="bold">
                    Trouver une agence immobilère
                </Paragraphe>
                <Slider
                    tooltip-placement="bottom"
                    @change="handleChangeSlider"
                />
                <Paragraphe class="list__count-contact">
                    <strong>{{data.length}}</strong>
                    Agences trouvées près de {{ countKm }} km de votre bien
                </Paragraphe>
            </div>
            <div class="list__wrap app-scrollbar">

                <ListItems 
                    v-for="(item, key) in data"
                    :key="key"
                    :image="item.image"
                    :name="item.name"
                    :member="item.member"
                    :numberProduct="item.numberProduct"
                    :address="item.address"
                />
            </div>
        </div>
        <div class="list__map">
            <Map
                :needMarkerLayer="true"
                :markersCoordinates="propertyCoordinates.lat ? [propertyCoordinates] : []"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Slider from '@/components/Display/Slider/Slider.vue';
    import ListItems from './components/ListItems/ListItems.vue';
    import Map from '@/components/section/map/index.vue';
    import Image from '@/assets/immo.jpeg';
    import {useStore} from "vuex";
    import {useRouter, useRoute} from "vue-router";

    import { ref, onMounted, computed, onUpdated, watch} from 'vue';

    interface Data {
        image: any;
        name: string;
        address: string;
        member: number;
        numberProduct: number;
    }
    //init
    const countKm = ref<number>(3);
    const ready  = ref<boolean>(false);
    const data = ref<Data[]>([]);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const propertyCoordinates = computed(()=>store.getters["AddProductModule/getPropertyCoordinates"]);
    //lifecycle
    onMounted(()=>{
        console.log("coordinates ",propertyCoordinates.value)
        console.log("route ",route.params.category)

        store.dispatch("AddProductModule/getContactList",{
            type : route.params.category,
            params : {
                ...propertyCoordinates.value,
                ...{dis : countKm.value}
            }   
        })
        data.value = store.getters["AddProductModule/getContactList"]
        
        console.log("DBG result : ",  data.value)
        ready.value = true;
   })

    onUpdated(()=>{
        console.log("coordinates ",propertyCoordinates.value)
    })

    watch(()=> countKm.value,
        (newVal)=>{
            if(ready.value){
                console.log(" new value", newVal);
                const _ = store.dispatch("AddProductModule/getContactList",{
                    type : route.params.category,
                    params : {
                        ...propertyCoordinates.value,
                        ...{dis : countKm.value}
                    }   
                })
            data.value = store.getters["AddProductModule/getContactList"]
        
        console.log("DBG result : ",  data.value)   
            }
        },
        {immediate : true}
    )
    //handler
    const handleChangeSlider = (e: number) => {
        countKm.value = e;
    };
   
   
</script>

<style lang="scss" scoped>
    .list {
        &__container {
            height: calc(100vh - 90px);
            margin-top: 20px;
            @apply grid gap-[20px] px-[30px];
            @screen md {
                @apply grid-cols-2;
            }
            @screen 2xl {
                @apply grid-cols-3;
            }
        }
        &__content {
            border-radius: 8px;
            background-color: #fff;
            overflow: hidden;
            @apply flex flex-col py-[10px];
            @screen lg {
                padding: 20px 0;
            }
        }
        &__count-contact {
            margin: 15px 0;
        }
        &__map {
            border-radius: 8px;
            overflow: hidden;
            display: none;
            @screen md {
                display: block;
            }
            @screen 2xl {
                @apply col-span-2;
            }
        }
        &__about {
            padding: 0 20px;
        }
        &__wrap {
            max-height: 100%;
            height: 100%;
            padding: 0 10px;
            margin-right: 10px;
            overflow-y: auto;
        }
    }
</style>
