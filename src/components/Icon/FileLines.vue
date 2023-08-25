<template>
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.55969 1.24023V4.12023H0.679688M3.55969 1.24023H9.31969V12.7602H0.679688V4.12023M3.55969 1.24023L0.679688 4.12023"
            :stroke="color" />
        <path d="M7.52047 6.64014H5.00047H2.48047" :stroke="color" />
        <path d="M6.08047 8.80029H5.00047H2.48047" :stroke="color" />
    </svg>
</template>
<script lang="ts" setup>
defineProps({
    color: {
        type: String,
        default: '#606060'
    }
})
</script>