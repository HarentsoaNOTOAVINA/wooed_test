<template>
    <div>
        <div class="w-full h-[calc(100vh-114px)]">
            <Map />
        </div>
    </div>
</template>

<script setup lang="ts">
    import WMS from '@/services/wms'
    import Map from '@/components/section/map/index.vue';
    // import Wallonie from '@/lib/cartes/Wallonie';
    
    import { onMounted } from 'vue';
    const center = {
        lat : 50.2607382,lng : 4.9122308
    }
    onMounted( async ()=>{
        

    })

</script>

<style scoped>

</style>