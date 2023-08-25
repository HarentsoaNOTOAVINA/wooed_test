<template>
    <div class="wish__form-wrap">
        <hr class="__hr" />

        <Title
                type="h3"
                label="L’action envisagée doit être accomplie entre dans le délai"
                class="wish__subtitle"
            />
        <div class="wish__form-item">

            <InputDate
                label="Entre  le"
                :name="'actionStartDate'"
                :min="true"
                :placeholder="placeholder"
                @handleDateFormatFr="handleDateChange($event)"
            />
            <InputDate
                label="Et le"
                :min="true"
                :name="'actionEndDate'"
                :placeholder="placeholder"
                @handleDateFormatFr="handleDateChange($event)"
            />
        </div>
    </div>
</template>
<script lang='ts' setup>
import Title from '@/components/Common/Title/Title.vue';
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import {ref} from 'vue';

const emit = defineEmits<{
    (e : "dateChange", payload : any)  : void
}>()
const placeholder = ref<any>(new Date().toLocaleDateString('fr-Fr'));
function handleDateChange($event : any){
    emit('dateChange', $event)
}

</script>
<style lang="scss" scoped>
.wish{
    &__subtitle{
        @apply text-[14px] text-black font-[600] leading-[17px];

    }
    &__form {
        @apply flex flex-col gap-[24px];
        &:deep() {
            .custom-input__fields,
            .custom-select__wrapper {
                @apply mb-0;
            }
            .date__space {
                gap: 0 !important;
            }
            .date__label {
                @apply mb-[10px];
            }
            label {
                @apply font-[600] text-black;
            }
        }
        &-item {
            @apply grid grid-cols-1 gap-[14px];
            @screen lg {
                @apply grid-cols-2;
            }
        }
        &-wrap {
            @apply flex flex-col gap-[18px];
        }
    }
}
.__hr {
    @apply text-gray w-full;
}
</style>