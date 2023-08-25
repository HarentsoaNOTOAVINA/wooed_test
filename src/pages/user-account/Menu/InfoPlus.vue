<template>
    <div>
        <h1>INFO PLUS</h1>
        <div>Liste</div>
        <Button
            @click="
                $emit('on-change-cmp', {
                    label: 'Details',
                    value: Details,
                    active: true,
                })
            "
            >Details</Button
        >
    </div>
</template>
<script lang="ts" setup>
    import Details from '../Menu/InfoPlus/Details.vue';
    import Button from '@/components/Common/Button/Button.vue';
</script>
