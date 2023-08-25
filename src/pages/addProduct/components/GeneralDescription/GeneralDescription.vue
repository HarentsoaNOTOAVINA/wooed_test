<script setup lang="ts">
import { data } from "@/pages/addProduct/components/GeneralDescription/data";
import { ref } from "vue";
import Input from "@/components/Common/Input/Input.vue";
import Select from "@/components/Common/Select/Select.vue";
import Switch from "@/components/Common/Switch/Switch.vue";
import InputDate from '@/components/Common/InputDate/InputDate.vue'

const element = ref<Array<any>>(data);
const params = ref<any>({

});

function handleChange(value : any){

}

</script>

<template>
    <div class="">
        <div class="" v-for="(item, idItem) in element" :key="idItem">
            <div class="">
                <Input 
                    :label="item.label"
                    :name-input="item.name"
                    @input="handleChange"
                    :input-type="item.type"
                    v-if="item.type === 'text'"
                />
                <Input 
                    :label="item.label"
                    :name-input="item.name"
                    @input="handleChange"
                    :input-type="item.type"
                    v-if="item.type === 'number'"
                />
                <Select 
                    v-if="item.type === 'select'"
                    :label="item.label"
                    :name ='item.name'
                    :options="item.options"
                    @change-select="handleChange"
                />
                <Switch 
                    v-if="item.type === 'switch'"
                    :name="item.name"
                    checked-name="OUI"
                    unchecked-name="NON"
                    :item-label="item.label"
                />
                
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .description{
        &__container{

        }

        &__input-container{

        }

        &__input{
            
        }
    }
</style>