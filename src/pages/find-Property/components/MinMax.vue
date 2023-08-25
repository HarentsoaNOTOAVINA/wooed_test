<script setup lang="ts">
import Input from "@/components/Common/Input/Input.vue";
import {PropType, ref} from "vue";

interface minMaxLabelType{
    min ?: string,
    max ?: string
}

const emit = defineEmits<{
    (event : "change",payload : {} ) : void
}>() 
const props = defineProps({
    names : {
        type : Object as PropType<minMaxLabelType>,
        default : ()=>({
            min  : "min",
            max : "max"
        })
        },
    placeholders : {
        type : Object as PropType<minMaxLabelType>,
        default : ()=>({
            min  : "min",
            max : "max"
        })
        },
    label : {
        type :  String,
        default : "Prix"
    },
    unity : {
        type : String,
        default  : "€"
    }
})
const fields= ref([
    {placeholder : props.placeholders?.min, name: props.names?.min, value:""},
    {placeholder : props.placeholders?.max, name: props.names?.max, value:""}
])
const values = ref<{}>({})
const handleInput = (e : any) =>{
    values.value = {...values.value, ...e}
    emit("change",values.value);
}
</script>
<template>
    <div class="container-wrapper">
        <div v-if="!!props.label">
            <label class="label" for="">{{ props.label  }}</label>
        </div>
        <div class="container-flex">
            <Input v-for="(field, key) in fields"
                :key="key"
                class="w-full"
                input-type="number"
                :nameInput="field.name"
                :placeholder="field.placeholder"
                :unity="props.unity"
                @input="handleInput"
            />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container{
    &-wrapper{
        @apply w-full py-3 ;                
    }
    &-flex{
        @apply grid grid-cols-1 gap-[14px];
        @screen sm {
            @apply grid-cols-2;
        } 
    }

}
.label{
    font-size: 14px;
    font-weight: 500;
    color: var(--color-gray-icon);
    margin-bottom: 10px;
    display: block;
}
</style>