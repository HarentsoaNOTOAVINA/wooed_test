<template>
    <div>
        <div class="confirmation__item" v-for="d in data" :key="d.id">
            <div class="confirmation__head" >
                <Title type="h4" weight="600">{{ d.title }}</Title>
                <!-- <Button><Icon iconName="Edit" /> Modifier</Button> -->
            </div>
            <Divider />
            <component 
                :is="d.component" 
                :data="allFilledData"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';

    import dataSell from './Data/dataSell';
    import { groundData } from "@/pages/addProduct/components/Confirmation/Data/dataSell";
    import { Divider } from 'ant-design-vue';
    import { ref, computed, onMounted, onBeforeMount } from 'vue';
    import { useStore } from "vuex";
    import fakeData from './Data/zaza.json';
    import Desc from './Description.vue';

    const data = ref<any>(dataSell);
    const store = useStore();
    const allFilledData = computed(() => store.getters['AddProductModule/getAddPropertyDatas']);
    onBeforeMount(() => {
        getTypeProperty();
    })
    
    function getTypeProperty(){
        const allType : Array<any> = store.getters['AddProductModule/getPropertyType']; 
        const id : number = store.getters['AddProductModule/getAddPropertyDatas']['propertyType'];
        const type = allType.find(item => item.id === id)
        console.log("Ito\n", type)
        if(type.name === "Terrain"){
            data.value = groundData;
        }else{
            data.value = dataSell;
        }
    }

</script>

<style lang="scss" scoped>
    .confirmation {
        &__item {
            border: 1px solid var(--color-stroke-gray);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            &:deep() {
                .ant-divider {
                    margin: 15px 0;
                }
            }
        }
        &__head {
            @apply flex justify-between items-center;
        }
    }
</style>
