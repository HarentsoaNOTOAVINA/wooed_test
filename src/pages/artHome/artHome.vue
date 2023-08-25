<template>
    <div class="art-home">
        <iframe
            class="w-full h-full flex items-center"
            :src="`https://immoch.my-preprod.space/3d/?action=${action}&property_id=${propertyId}`"
            frameborder="0"
        />
    </div>
</template>
<script setup lang="ts">
    import { useRouter } from 'vue-router';

    // export default {};
    const router = useRouter();
    let action = router.currentRoute.value.query.action;
    let propertyId = router.currentRoute.value.query.property_id;
</script>
<style lang="scss" scoped>
    .art-home {
        height: calc(100vh - 62px);
    }
</style>
