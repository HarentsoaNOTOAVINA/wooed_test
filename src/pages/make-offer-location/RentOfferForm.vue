<template>
    <div class="counter-proposal__container">
        <SideMenu :active-data="activeMenuData" @set-active-display-data="changeActiveComponent"  />
        <component :is="activeComponent"  />
    </div>
</template>
<script lang="ts" setup>
import SideMenu from './components/SideMenu.vue';
import { useStore } from "vuex";

import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue';

const route = useRoute();

const store = useStore();
const propertyId = ref<any>();

const activeComponent = ref<any>();
const activeMenuData = ref<any>();

onMounted(() => {
    propertyId.value = route.params.id;
    activeMenuData.value = store.getters["RentalModule/getActiveDisplayData"];    
    activeComponent.value = activeMenuData.value.component;
})

function changeActiveComponent(item: any) {
    activeComponent.value = item.component;
    store.dispatch("RentalModule/setActiveDisplayData", item);
}
</script>
<style lang="scss" scoped>
.counter-proposal {
    &__container {
        @apply pt-[18px] container flex flex-col gap-[10px];
        @screen md {
            @apply flex flex-row;
        }
    }
}
</style>