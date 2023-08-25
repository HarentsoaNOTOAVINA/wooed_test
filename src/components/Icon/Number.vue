<template>
    <svg
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 12.75V5.25L8.25 12.75V5.25M11.25 12.75H15"
            stroke="#606060"
            stroke-opacity="0.25"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M13.125 9.75C14.1605 9.75 15 8.74264 15 7.5C15 6.25736 14.1605 5.25 13.125 5.25C12.0895 5.25 11.25 6.25736 11.25 7.5C11.25 8.74264 12.0895 9.75 13.125 9.75Z"
            stroke="#606060"
            stroke-opacity="0.25"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<script setup lang="ts">
    import { ref, PropType, onMounted } from 'vue';
    const iconSize = ref('20px');

    const props = defineProps({
        size: {
            type: String as PropType<'sm' | 'md' | 'lg' | 'xs'>,
        },
    });

    onMounted(() => {
        switch (props.size) {
            case 'xs':
                iconSize.value = '20px';
                break;
            case 'sm':
                iconSize.value = '35px';
                break;
            case 'lg':
                iconSize.value = '120px';
            default:
                break;
        }
    });
</script>
