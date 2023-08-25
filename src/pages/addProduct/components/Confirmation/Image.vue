<template>
    <figure class="confirmation-image" v-if="props.data.images">
        <ImageAudioRecorder 
            v-for="(file, index) in props.data.images"
            :key="index"
            :index="index"
            :type-file="file.file"
        />
    </figure>
</template>

<script setup lang="ts">
import ImageAudioRecorder from "@/components/Display/AudioRecord/AudioRecord.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
    data : {
        type : Object,
        default : () => {}
    }
})


onMounted(() => {
})

</script>

<style lang="scss" scoped>
.confirmation-image {
    @apply flex flex-wrap gap-[10px];
    border-radius: 4px;
    padding: 5px;
    img {
        border-radius: 4px;
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    &:deep(){
        .record-image__container{
            @apply flex-1 flex;
        }
        .record-image-card{
            @apply flex-1;
        }
    }
}
</style>