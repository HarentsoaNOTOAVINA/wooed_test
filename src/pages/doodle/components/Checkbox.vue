<template>
    <div class="checkbox checkbox__my-container">
        <div 
            class="checkbox__content"
            v-for="(item, index) in props.data.dates" :key="index"
        >
            <a-checkbox
                @change="handleClick"
                v-model:value="item.id"
                :name="item.date"
            >
                <span class="checkbox__label-container">
                    <span class="checkbox__date-container">
                        <span>{{ formatDateFr(item.date) }}</span>
                        <span>{{ formatHourFr(item.time) }}</span>
                    </span>
                </span>
            </a-checkbox>

            <div 
                class="checkbox__user-container"
                @click="listUserVote(item)"
            >
                {{ item.votes.length }}
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { formatDateFr, formatHourFr } from "@/utils/date/format";
import { Checkbox as ACheckbox } from "ant-design-vue";
import { ref } from "vue";

    const props = defineProps({
        data : {
            type : Object,
            required : true
        }
    })
    const checked = ref<any>([]);
    const emit = defineEmits(['selectDate', 'openModalList']);

    function handleClick(item : any){
        const {name, value, checked} = item.target;
        emit('selectDate', value);
    }

    function listUserVote(dataDate : any){
        emit('openModalList', dataDate);
    }
</script>

<style lang='scss' scoped>
.checkbox{
    &__my-container{
        @apply w-full flex flex-col gap-[10px];
    }

    &__content{
        @apply border text-slate-300 p-[10px] flex items-center w-full rounded-[8px];
    }

    &__label-container{
        @apply w-full flex justify-between items-center min-h-[35px]; 
    }

    &__checked{
        @apply bg-slate-500 text-white;
    }

    &__label-checked{
        @apply text-white;
    }

    &:deep(){
        .ant-checkbox + span{
            @apply w-full;
        }

        .ant-checkbox-wrapper{
            @apply w-full flex items-center gap-[10px];
        }

        .ant-checkbox-checked{
            background-color: var(--color-primary);
            @apply text-white;
        }

        .ant-checkbox-input{
            @apply bg-red;
        }
    }

    &__date-container{
        @apply flex flex-col gap-[5px];
    }

    &__user-container{
        @apply border text-slate-300 rounded-[50%] h-[50px] w-[50px] flex justify-center items-center cursor-pointer;
    }
}
</style>