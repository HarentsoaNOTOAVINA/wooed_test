<template>
    <div class="confirmation-address" v-if="props.data.detailLocation.address">
        <Paragraphe>
            <Icon icon-name="MarkerIcon" />
            <span> {{ props.data.detailLocation.address }}</span>
           
        </Paragraphe>
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Common/Icon/Icon.vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

const props = defineProps({
    data : {
        type : Object,
        required : true
    }
});

</script>

<style lang="scss" scoped>
.confirmation-address {
    p {
        @apply flex gap-[10px] items-center
    }
}
</style>