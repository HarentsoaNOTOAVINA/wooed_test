<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import Input from '@/components/Common/Input/Input.vue';
import { computed, onMounted, ref, watch } from 'vue';
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import Select from '@/components/Common/Select/Select.vue';
import Upload from "@/components/Display/UploadImage/UploadImage.vue";
import { PEBValue,hebergementData, menuList } from "@/pages/manageProperty/Energy/data";

const props = defineProps({
    idActive : {
        type : Number,
        required : true
    }
})

const emit = defineEmits(['getData']);
const active = ref<number>(PEBValue.length - 1);
const pebResult = ref<number>(511);
const params = ref<any>({
    boilerType: '',
    boilerInstallationTime: '',
    certnumber: ' ',
    annualenergy: 0,
    primaryenergy: 0,
});
const saleData = ref<Array<any>>(menuList);
const locationData = ref<Array<any>>(hebergementData)

    
watch(() => pebResult.value, (first: any) => {
        for (let i = 0; i < PEBValue.length; i++) {
            if (first <= PEBValue[i].max && first > PEBValue[i].min) {
                active.value === PEBValue[i].id;
            }
        }
        console.log('first', typeof first);
    }
);

function handleChange(value: any) {
    if (Object.keys(value)[0] === 'primaryenergy') {
        pebResult.value = +value.primaryenergy;
    }

    for (let i in value) {
        params.value[i] = value[i];
    }
    console.log(params.value);
    emit('getData', params.value);
}

</script>

<template>
    <div class="energy energy__container">
        <div class="energy__header">
            <P>Caractéristique énergetique</P>
            <hr class="energy__divider">
        </div>
        
        <div class="energy__content">
            <div class="" v-for="item in saleData" :key="item.id">
                <Select
                    v-if="item.type === 'select'"
                    :label="item.label"
                    :name="item.name"
                    :options="item.options ?? item.options"
                    @change-select="handleChange"
                />
                <InputDate
                    v-else-if="item.type === 'date'"
                    :label="item.label"
                    :name="item.name"
                    @handle-date-format-fr="handleChange"
                    :max="true"
                />
    
                <div class="mt-[14px]" v-else>
                    <P class="energy__title">
                        {{ item.label }}
                    </P>
                    <div class="energy__peb-container">
                        <div
                            class="energy__peb-container-item"
                            v-for="subItem in item.subItem"
                            :key="subItem.id"
                        >
                            <Input
                                :input-type="subItem.type"
                                @input="handleChange"
                                :placeholder="subItem.label"
                                :name-input="subItem.name"
                                class="energy__peb-container-item-input"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="energy__valuePEB-container">
                <div
                    v-for="item in PEBValue"
                    :key="item.id"
                    :class="[
                        pebResult <= item.max && pebResult >= item.min
                            ? 'energy__active'
                            : '',
                    ]"
                    class="energy__valuePEB"
                >
                    <P :style="{ background: item.color }">{{
                        item.label
                    }}</P>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.energy{
    &__container{
        @apply flex flex-col gap-[30px];
    }

    &__content{
        @apply flex flex-col gap-[10px];
    }

    &__header{
        @apply flex flex-col gap-[10px];
    }

    &__divider{
        @apply text-slate-300;
    }
    &:deep(){
        .custom-input__fields{
            @apply mb-0;
        }
    }

    &__title {
            font-weight: 600;
            color: var(--color-gray-icon);
        }
        &__valuePEB-container {
            @apply flex w-[100%] gap-[20px] flex-wrap;
        }
        &__valuePEB {
            p {
                @apply text-[white] w-[33px] h-[33px] rounded-[50%] flex justify-center items-center flex-wrap;
            }
        }
        &__active {
            position: relative;
            z-index: 9;
            &::after {
                content: '';
                width: 115%;
                height: 115%;
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                background-color: var(--color-primary);
                z-index: -1;
            }
        }

        &:deep(){
            .relative{
                @apply w-[100%];
            }
        }
        &__peb-container {
            @apply flex flex-col  md:flex-row flex-wrap gap-[24px];
        }
        &__peb-container-item {
            @apply flex flex-1 w-[100%];
        }
        &__peb-container-item-input {
            @apply w-[100%];
        }
}
</style>
