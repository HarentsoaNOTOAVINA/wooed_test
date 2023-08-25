<template>
    <div>
        <div>
            <Loading v-if="isLoading" />
        </div>
        <MenuTanksWork :dataDemand="props.dataDemand" :dataTankMenu="menuData" @changeComponent="changeComponent" />
    </div>
</template>

<script setup lang="ts">

import { computed, onBeforeMount, onMounted, ref } from 'vue';
import MenuTanksWork from '../MenuTanksWork/MenuTanksWork.vue';
import { Store, useStore } from 'vuex';
import Loading from '@/components/Common/Loader/Loader.vue';

const props = defineProps(["dataDemand", "obliData"]);
const emit = defineEmits(["changeFromObli"]);
const store: Store<any> = useStore();
const idCategory: number = props.dataDemand.category;
const menuData = ref<object>({});
let isLoading = ref<boolean>(false);

onBeforeMount(() => {
    getObliMenuData();
})

onMounted(() => {
    console.log("props sent:", props.obliData);
    console.log("props publish:", props.dataDemand);

})

const getObliMenuData = async () => {
    isLoading.value = true;
    const data = await store.dispatch("WorksModule/setObliMenu", idCategory);
    // const data = computed(() => store.getters["WorksModule/getObliMenu"])
    menuData.value = data;
    isLoading.value = false;
    console.log("menu data:", menuData.value);

}


const changeComponent = (item: any) => {
    emit("changeFromObli", item);
};
</script>

<style scoped>

</style>
