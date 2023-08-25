<template>
    <div>
        <div class="" v-for="(item, index) in InputList" :key="index">
            <Select 
                v-if="item.type === 'select'"
                :name="item.name"
                :label="item.label"
                @change-select="handleChange"
                :options="allPropertyType"
                :required="item.required"
            />
            <TextArea
                v-if="item.type === 'textArea'"
                :name-input="item.name"
                :label="item.label"
                @handle-change="handleChange"
            />
        </div>
    </div>
</template>

<script lang='ts' setup>
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import { onMounted, watch, ref } from "vue";
    import { useStore } from "vuex";
    import Select from '@/components/Common/Select/Select.vue';
    import { InputList } from "@/pages/addProduct/components/Property2/data";

    const store = useStore();
    const allPropertyType = ref<any>(null);
    const params = ref<any>({});

    watch(() => params.value, (value) => {
        store.dispatch('AddProductModule/setPropertyData', {
            data : {...value},
            step : {property : validation()} 
        })
    }, {immediate : true, deep : true});

    onMounted(() => {
        getPropertyType();
    })

    async function getPropertyType() {
        allPropertyType.value = await store.dispatch('AddProductModule/getProperyType'); 
    }

    function validation(){
        return params.value.propertyType ? true : false;
    }

    function handleChange(item : any){
        params.value = {
            ...params.value,
            ...item
        }
    }


</script>

<style lang='scss' scoped>
.property{
    &__container{

    }
}
</style>