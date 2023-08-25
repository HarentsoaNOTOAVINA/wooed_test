<script lang="ts" setup>
import Marker from "@/components/Icon/MarkerIcon.vue";
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import {useRouter, useRoute} from 'vue-router';
import {computed,reactive,ref, onMounted} from "vue";

const route = useRoute();
const router = useRouter();
const props = defineProps({
    imgPath: {
        type : String,
        default : "",
    },
    title : {
        type : String,
        default : "",
    },
    thePropertyId : {
        type : Number,
        default : -1,
    },
    price : {
        type : Number,
        default : 0,
    },
    specialModality : {
        type : String,
        default : "",
    },
    hasCounterOffer : {
       type : Boolean,
       default : false,
    },
    isOfferAccepted : {
        type : Boolean,
        default  : false
    },
    address : {
        type : String,
        default : "",
    },
    status : {
        type : String,
        default : "",
    },
    id : {
        type : Number,
        default : -1,
    }
});

const emit = defineEmits<{
        (e : "openModal", payload : number) : void, 
}>()

const text = reactive({
    labels : {
        modality : "Modalité spécial :",
    },
});
const buttons = ref<{[key : string] : any}[]>(
        [{
            label : "Etablir une contre proposition",
            condition : props.hasCounterOffer,
            // condition : false,
            handler : (id : any)=> emit('openModal', id)
        },
        {
            label : "Compléter l'offre",
            condition : props.status !== "accepted", // voir avec côter back si le vender à accepter  l'offre
            handler : ()=> router.push(`/signature-offre-location/${props.thePropertyId}/${props.id}`)
        },
        {
        label : "Completer l'état des lieu",
        condition : props.status === "accepted",
        handler: () => {

            router.push(`etat-des-lieux/${props.thePropertyId}`);

        },
    }
    
    ]
    )



</script>
<template>
    <div class="card-container">
        <div class="card-media">
            <img :src="props.imgPath"/>
        </div>
        <div class="card-content">
            <div class="card-title">
                <P type="bold" font-size="16">{{props.title}}</P>
            </div>
            <div class="card-address">
                <Marker/><P>  {{ props.address }}</P>
            </div>
            <div class="card-price">
                <P type="bold" font-size="16">
                    {{
                        (props.price).toLocaleString(
                            'be-BE', 
                            {currency  : 'EUR', style : 'currency'})
                    }}
                </P>
            </div>
            <div class="card-desc">
               <P type="bold">{{ text.labels.modality }} </P>
               <P>{{props.specialModality}}</P>
            </div>
            <div class="card-action">
                <Button
                    v-for="(btn, key) in buttons"
                    :key="key"
                    class="card-action-btn"
                    :style="btn.condition ? {display : 'auto'} : {display : 'none'}"
                    @click="btn.handler(props.id)"
                >
                    {{btn.label}}
                </Button>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.card{
    &-container{
        @apply w-full flex md:flex-row justify-start gap-5 my-1;
        border: solid 0.2px var(--color-gray-icon);
        border-radius: 8px;
        overflow: hidden;
    }
    &-media{
        @apply w-[50%];
        background-image:src(v-bind(imgPath));
        overflow: hidden;
        &>img{
            object-fit: cover;
            height: 100%;
        }
    }
    &-content{
        @apply w-full flex flex-col justify-center py-1 ;
    }
    &-address{
        @apply flex text-xs;
        ;
    }
    &-desc{
        @apply flex-col;
        
    }
    &-price{
        @apply mb-3;
    }
    &-action{
        @apply flex flex-col justify-start;

        @screen md{
            @apply flex flex-row justify-end;
        }
        &-btn{
            background-color: var(--color-primary);
            border-radius: 8px;
            color : white;
            @apply p-2 m-1;
        }
    }
}
</style>