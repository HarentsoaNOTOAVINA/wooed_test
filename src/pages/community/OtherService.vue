<script lang="ts" setup>
import CommunityPublication from '@/pages/community/components/CommunityPublication/CommunityPublication.vue'
import { provide } from 'vue';

provide('typeView', 'otherService')

</script>

<template>
    <div class="consultation">
        <CommunityPublication 
            type-action="otherService"
        />
        
    </div>
</template>

<style lang="scss" scoped>
.consultation{

}
</style>