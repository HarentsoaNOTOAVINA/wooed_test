<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 24 24"
    >
        <g transform="rotate(90 12 12)">
            <path
                fill="#949fb5"
                d="M11.65 14.65q.15.15.35.15q.2 0 .35-.15l2.8-2.8q.225-.225.112-.538Q15.15 11 14.8 11H9.2q-.35 0-.462.312q-.113.313.112.538ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
            />
        </g>
    </svg>
</template>

<script setup lang="ts">
import {onMounted, PropType, ref}  from "vue";
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

<style scoped></style>
