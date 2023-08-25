<template>
    <div class="peb__wrap">
        <span
            v-for="(item, index) in data"
            :key="index"
            :style="{ backgroundColor: item.color }"
            :class="{
                peb__active: item.id === findObjectIdByMinValue(data),
            }"
        >
            {{ item.label }}
        </span>
    </div>
</template>

<script setup lang="ts">
    import { data } from './data';
    import { watch, ref } from 'vue';

    const props = defineProps({
        value: {
            type: Number || String,
            default: 0,
        },
    });

    const valueId = ref<number>(props.value)

    watch(() => props.value, (v) => {

        valueId.value = +v

    }, {immediate: true})

    function findObjectIdByMinValue(data: any) {
        for (let i = 0; i < data.length; i++) {
            if (valueId.value < data[i].min) {
                return data[i].id - 1;
            } 
        }

        return data[data.length - 1].id;
    }
</script>

<style lang="scss" scoped>
    .peb {
        &__wrap {
            @apply flex gap-[10px];
            span {
                @apply flex justify-center items-center text-[12px] relative;
                color: #fff;
                border-radius: 50%;
                width: 25px;
                height: 25px;
            }
        }
        &__active {
            &:after {
                content: '';
                width: 32px;
                height: 32px;
                border-radius: 50%;
                border: 2px solid var(--color-secondary);
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(calc(-50% - 0.5px), calc(-50% - 0.5px));
            }
        }
    }
</style>
