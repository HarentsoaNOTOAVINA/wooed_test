<script setup lang="ts">
    import HelloWorld from '@/components/HelloWorld.vue';
    import {NotificationsService} from '@/services/notificationsService'

    import { ref, onMounted } from 'vue';

    onMounted(async () => {
        await NotificationsService.test()
    })
</script>

<template>
    <div>
        <HelloWorld name="world" />
    </div>
</template>
