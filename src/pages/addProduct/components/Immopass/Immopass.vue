<template>
    <div class="immopass__container">
        <a :href="uri" target="_blank" :title="uri">
            <Button type-button="secondary">
                Immopass
            </Button>
        </a>

        <div class="immopass__file">
            <label class="immopass__label">Rapport</label>
            <UploadImage 
                name="immopassFile"
                @handleChange="handleChange"
            />
        </div>
    </div>
</template>

<script lang='ts' setup>
import Button from '@/components/Common/Button/Button.vue';
import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
import { ref } from "vue";

const uri = ref<any>(import.meta.env.VITE_IMMOPASS);
const params = ref<any>({});

function handleChange(value : any){
    params.value = {
        ...params.value,
        ...value
    }
}

</script>

<style lang='scss' scoped>
.immopass{
    &__container{
        @apply flex flex-col gap-[20px];
    }

    &__label{
        @apply font-semibold;
    }

    &__file{
        @apply flex flex-col gap-[10px];
    }
}
</style>