<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import {Modal} from "ant-design-vue";  
import { reactive,onMounted, ref,watch, computed, onBeforeMount } from "vue";
import OfferCard from "./offerCard/offerCard.vue";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();
const baseUrl = ref<string>(import.meta.env.VITE_API_ROOT_URL);

const showModal = ref<boolean>(false);
const currentCounterOffer = ref<any>();
const offers = ref<{[key : string ]: any}[]>([]);


onBeforeMount(()=>{
    store.dispatch('RentalModule/fetchOfferList');

})
onMounted(()=>{
    offers.value = computed(() => store.getters["RentalModule/getSentOfferList"]).value;

})
let currentOfferId = -1;

const text = reactive({
    modal : {
        title : "Contre offre",

    }
});

const buttons = reactive([
    {
        label : "Signer l'offre",
        condition : (item : any)=> item.counterOffers.length > 0,
        handler: () => {

            showModal.value = false;
        },
        
    },
    {
        label : "faire une contre proposition",
        condition : true,
        handler: () => {

            showModal.value = false;
            router.push(`rent-procedure/${currentOfferId}`);

        },
    },
    // {
    //     label : "Completer l'état des lieu",
    //     condition : (item  : any)=> item.status === "accepted",
    //     handler: () => {

    //         showModal.value = false;
    //         router.push(`rent-procedure/${route.params.id}`);

    //     },
    // }
])
onMounted(()=>{
  console.log("DBG offers here", offers.value);  
})

watch(  ()=>store.getters["RentalModule/getSentOfferList"],
        (newVal)=>{
            offers.value = newVal;         
        }
)
const handleClickCard = (offer : any)=>{
    console.log("DBG offers here", offer);
}
const modalHandler = (id : any) => {
    showModal.value = !showModal.value;
    currentCounterOffer.value =  offers.value[id].counterOffers[0];

    console.log('modal DBGer', id,offers.value[id]);
    currentOfferId = offers.value[id]?.id;
}
</script>
<template>
    <transition mode="out-in" appear name="fade-component">
        <div class="list-container">
            <OfferCard 
                v-for="(offer, key) in offers "
                :key="key" 
                :id="offer.id"
                :the-property-id="offer.theProperty.id"
                :title="offer.theProperty.title"
                :price="offer.prices"
                :address="offer.theProperty.address"
                :special-modality="offer.specialModality"
                :status="offer.status"
                :has-counter-offer="!!offer.counterOffers.length"
                :is-offer-accepted="offer.status === 'accepted ' ?  true : false"
                :img-path="`${baseUrl}${offer.theProperty.images[0]?.path}`"
                @open-modal="modalHandler"
            />

            <Modal
            v-model:visible="showModal"
            >
                <div class="modal-container">
                    <div class="modal-header">
                        <P type="bold" class="modal-title" >
                            {{text.modal.title}}
                        </P>
                        <hr>
                    </div>
                    <div class="modal-content">
                        <div>
                            Prix : 
                            {{
                             (currentCounterOffer.prices).toLocaleString(
                                'be-BE', 
                                {currency  : 'EUR', style : 'currency'})
                            }}
                        </div>
                        <div>
                            {{!!currentCounterOffer.description  ? `'Description' : ${currentCounterOffer.description}` : null}}    
                        </div>
                        
                    </div>
                </div>
                <template #footer>
                    <Button
                    v-for="(btn, key) in buttons"
                    :key="key"
                    class="modal-action"
                    :style="btn.condition ? {display : 'auto'} : {display : 'none'}"
                    @click="btn.handler"
                >
                    {{btn.label}}
                </Button>
                </template>
            </Modal>
    </div>
    </transition>
</template>
<style lang="scss" scoped>
.list{
    &-container{
        @apply w-full flex flex-col;
    }
    &-item{
       @apply w-full flex justify-between;
       &-content{
        @apply w-2/3;
       }
       &-action{
        @apply w-1/3;
       }
    }
}
.fade-component-enter-active,
.fade-component-leave-active {
    transition: all 0.5s ease-in;
}
.fade-component-enter-from,
.fade-component-leave-to {
    opacity: 0;
    transform: translateX(60px);
    position: absolute;
    overflow: hidden;
    width: 100%;
    // top: 0;
    // right: 0;
}
.modal{
    &-container{
        @apply w-full flex flex-col;
    }
    &-content{
        @apply py-5
    }
    &-title{
        @apply mb-2;
    }
    &-action{
        background-color: var(--color-primary);
        border-radius: 8px;
        color : white;
        @apply p-2 mx-1;
    }
}
@screen md{

    .list{
        &-container{
            @apply w-full flex flex-col;
        }
        &-item{
           @apply w-full flex justify-between;
           &-content{
            @apply w-2/3;
           }
           &-action{
            @apply w-1/3;
           }
        }
    }
     
}
</style>