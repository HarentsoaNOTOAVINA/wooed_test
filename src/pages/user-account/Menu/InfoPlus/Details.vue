<template>
    <div>
        <Button
            @click="
                $emit('on-change-cmp', {
                    label: 'List',
                    value: Lists,
                    active: true,
                })
            "
            >Liste</Button
        >
    </div>
</template>
<script lang="ts" setup>
    import Lists from './List.vue';
    import Button from '@/components/Common/Button/Button.vue';
</script>
