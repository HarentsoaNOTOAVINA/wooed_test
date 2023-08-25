<template>
    <div class="wish">
        <hr class="__hr" />
        <div class="wish__items">
            <Title
                type="h3"
                label="Sélectionner les parties qui participeront à la consultation"
                class="wish__subtitle"
            />
            <hr class="__hr" />
            <div class="wish__items-checkbox">
                <CheckBox
                    v-for="(item, index) in checkboxData"
                    :key="index"
                    :name="item.name"
                    :label="item.label"
                    :value="item.name"
                    :return-boolean="false"
                    @click-with-value="handleCheckBoxValue"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { ref } from 'vue';

    interface ItemsData {
        label: string;
        name: string;
    }

    const emit = defineEmits<{
        (e : "checked", payload : any) : void
    }>();  

    const checkboxData = ref<ItemsData[]>([
        {
            label: 'Initiateurs',
            name: 'initiateurs',
        },
        {
            label: 'Porteurs',
            name: 'porteurs',
        },
        {
            label: 'Animateurs',
            name: 'animateurs',
        },
        {
            label: 'Participants',
            name: 'participants',
        },
    ]);
    const values : string[] = [];

    function handleCheckBoxValue($event : object){
        const _value : string = Object.values($event)[0] 
        const index : number = values.indexOf(_value);
        if(index === -1){
            values.push(_value);
        }else{
            values.splice(index, 0); 
        }
        emit("checked", {  actionActors : values});
    }
</script>

<style lang="scss" scoped>
    .wish {
        @apply flex flex-col gap-[14px];
        &__title {
            @apply text-[14px] text-secondary font-[600] leading-[17px];
        }
        &__subtitle {
            @apply text-[14px] text-black font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
        &__items-checkbox {
            @apply flex flex-col gap-[14px];
            &:deep() {
                .ant-checkbox-wrapper {
                    @apply text-black;
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
