<script lang="ts" setup>
import Layout from "@/pages/lease/offer/components/layout.vue";
import Sidebar from "@/pages/lease/offer/components/sidebar.vue";
import Body from "@/pages/lease/offer/components/body.vue";
import Sent from "./components/sent.vue";
import {useStore} from "vuex";
import {computed, onBeforeMount, onMounted, ref, watch} from 'vue';

const store = useStore();

const menuName = {
    sent : "sent",
    received : "received"
}
const currentMenu = ref<{[key : string] : any}>(Sent);
const currentOject = ref<{[key : string] : any}>({});
const offers = ref<[]>([]);
function handleCurrentMenu(e : any){
    console.log("event", e);
    currentMenu.value = e.component;
    currentOject.value = e;
}
onBeforeMount(()=>{
    store.dispatch('RentalModule/fetchOfferList');

})
onMounted(()=>{
    offers.value = computed(() => store.getters["RentalModule/getSentOfferList"]).value;

})
watch(  ()=>currentOject.value,
        (val)=>{
            if(val.name === menuName.sent){
                offers.value = computed(() => store.getters["RentalModule/getSentOfferList"]).value;
                console.log("DBG things", offers.value);
            }else if(val.name === menuName.received){
            
            }
        }
    )
watch(  ()=>store.getters["RentalModule/getSentOfferList"],
        (newVal)=>{
            offers.value = newVal;         
        }
)
</script>

<template>
    <Layout
        
    >
        <!-- <template #sidebar>
            <Sidebar
            @current-menu="handleCurrentMenu"
            />
        </template> -->
        <template #body>
            <Body :component="currentMenu" :offers="offers"/>
        </template>
    </Layout>
</template>