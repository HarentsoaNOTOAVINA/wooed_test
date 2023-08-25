<script lang="ts" setup>
import MainDetail from '@/pages/detail/components/mainDetail/MainDetail.vue';

import { PropType } from 'vue';
const props = defineProps({
    info : {
        type : Object as PropType<{[key : string] : any}>,
        reqiured : true,
    },
})

</script>

<template>
    
</template>