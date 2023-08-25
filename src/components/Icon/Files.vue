<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.16683 1.16797H3.50016C2.8585 1.16797 2.33933 1.69297 2.33933 2.33464L2.3335 11.668C2.3335 12.3096 2.85266 12.8346 3.49433 12.8346H10.5002C11.1418 12.8346 11.6668 12.3096 11.6668 11.668V4.66797L8.16683 1.16797ZM3.50016 11.668V2.33464H7.5835V5.2513H10.5002V11.668H3.50016Z"
            fill="#606060"
        />
    </svg>
</template>

<script setup lang="ts">
    const props = defineProps({
        width: {
            type: String,
            default: '18',
        },
        height: {
            type: String,
            default: '18',
        },
    });
</script>
