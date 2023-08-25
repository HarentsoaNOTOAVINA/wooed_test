<template>
    <div class="cadastre__container">
        <div 
            class=""
            v-for="(item, index) in dataOfCadastre"
            :key="index"
        >
            <Input 
                :label="labelOfRegion +' '+ item.label"
                :name-input="item.name"
                :input-type="item.type"
                placeholder="0"
                @input="handleChange"
                :unity="item.placeholder"
                :default-value="propertyDatas[item.name]"
            />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { cadastreData } from "@/pages/addProduct/components/CadastralReturn/data";
import { ref, watch, onMounted } from "vue";
import Input from "@/components/Common/Input/Input.vue";
import { useStore } from "vuex";

const enum Region{
    be = "Belgique",
    lux = "Luxembourg",
    fl = "Flandres"
}

const info = [
    {
        name : "Belgique",
        label : "Revenu cadastral"
    },
    {
        name : "Luxembourg",
        label : "Valeur unitaire"
    },
    {
        name : "Flandres",
        label : "Valeur locative cadastrale"
    }
];

const info2 = {
    be : 'Revenu cadastral',
    fl : 'Valeur locative cadastrale',
    lux : 'Valeur unitaire',
}

const dataOfCadastre = ref<any>(cadastreData)
const params = ref<any>({});
const store = useStore();
const labelOfRegion = ref<any>(null);

const propertyDatas = ref<any>(
    store.getters['AddProductModule/getAddPropertyDatas']
);


onMounted(() => {
    getDetailsLocation();
});

function getDetailsLocation(){
    const country = store.getters['AddProductModule/getAddPropertyDatas']['detailLocation']['country'];
    switch (country) {
        case Region.be:
            labelOfRegion.value = info2.be
            break;
        case Region.fl:
            labelOfRegion.value = info2.fl
            break;
        case Region.lux:
            labelOfRegion.value = info2.lux
            break;
    
        default:
            labelOfRegion.value = info2.be
            break;
    }
}

watch(() => params.value, (value) => {
    store.dispatch('AddProductModule/setPropertyData', {
        data: { ...value },
    });
}, {immediate : true, deep : true});

function handleChange(value : any){
    params.value = {
        ...params.value,
        ...value
    }
}

</script>

<style lang='scss' scoped>
.cadastre{
    &__container{

    }
}
</style>