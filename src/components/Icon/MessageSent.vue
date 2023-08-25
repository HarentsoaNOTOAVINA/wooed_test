<template>
    <svg
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M22 13C22 17.9707 17.9707 22 13 22H4V13C4 8.0293 8.0293 4 13 4C17.9707 4 22 8.0293 22 13Z"
            stroke="#606060"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M8.5 13.9L11.2 16.6L17.05 10.75"
            stroke="#606060"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
<script lang="ts" setup>
    import { onMounted, PropType, ref } from 'vue';

    const iconSize = ref('35px');

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
            case 'md':
                iconSize.value = '70px';
                break;
            case 'lg':
                iconSize.value = '120px';

                break;
        }
    });
</script>
