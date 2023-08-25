<template>
        <Note :text="notificationText" />
        <span class="image-form__subtitle">Image</span>
        <span class="image-form__description">
            La taille maximale par image est 5MB
            Formats acceptés: JPG
        </span>
        <div class="image-form__image-input">
            <UploadImage 
                :type-image="true"
                name="photos" 
                @upload="handleUpload"
            />
        </div>
</template>
<script lang="ts" setup>
import Note from '@/pages/transport/components/Note.vue';
import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';

import { ref, watch } from 'vue';

import { useStore } from 'vuex';

const store = useStore();

const photos = ref<any>();

watch(() => photos.value,
    (value) => {
        photos.value = value;
        store.dispatch('TransportModule/addObjectPhotos', { photos: photos.value })
    }
)

const notificationText = ref<string>('Les transporteurs preferent les annonces avec photos car celles-ci sont plus precises. \
Vous pouvez ajouter 5 photos sans frais, ne vous en privez pas !');

function handleUpload(value: any) {
  photos.value = value.map((element: any) => element.originFileObj);
}

</script>
<style lang="scss" scoped>
.image-form {

    &__title,
    &__subtitle {
        @apply block font-semibold text-[14px];
    }

    &__title {
        color: var(--color-primary);
    }

    &__subtitle {
        @apply my-2.5;
    }

    &__description {
        @apply block my-2;
    }

    &__image-input {
        @apply flex flex-col;
    }
}

.__hr {
    @apply block my-4 text-gray;
}
</style>