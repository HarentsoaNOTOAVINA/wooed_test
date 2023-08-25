<script setup lang="ts">
    defineProps({
        color: {
            type: String,
            default: '#14223C',
        },
    });
</script>
<template>
    <svg
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8 4.27931V5.71982H4.81029V9.19249H3.18971V5.71982H0V4.27931H3.18971V0.806641H4.81029V4.27931H8Z"
            :fill="color"
        />
    </svg>
</template>
