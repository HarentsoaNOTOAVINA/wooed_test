<template>
    <div class="messageViewerEmpty">
        <Icon icon-name="MailBox" />
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Common/Icon/Icon.vue';
import { Empty as AEmpty } from 'ant-design-vue';


</script>

<style lang="scss" scoped>
    .messageViewerEmpty {
        @apply w-full h-full hidden justify-center items-center;
        @screen lg {
            @apply flex;
        }
    }
</style>