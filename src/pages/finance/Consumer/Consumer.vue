<script lang="ts" setup>
import MenuConsumer from "@/pages/finance/MenuConsumer/MenuConsumer.vue";
import { onMounted, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const activeComp = shallowRef<Array<any>>([MenuConsumer])
const route = useRoute();
const idProperty = ref<any>(route.params.id);
const store = useStore();

watch(() => activeComp.value, (value) => {
    activeComp.value = value;
}, {immediate : true, deep : true});

// onMounted(() => {
//     getDetails();
// })


function changeComponent(component : any){
    activeComp.value = [...activeComp.value, component]
}

function handlePrev(){
    activeComp.value.pop();   
}

</script>
<template>
    <div class="consumer__container">
        <component :is="activeComp[activeComp.length-1]" @component="changeComponent" @prev="handlePrev"/>
    </div>
</template>

<style lang="scss" scoped>
    .consumer{
        &__container{
            @apply flex-1;
        }
    }
</style>