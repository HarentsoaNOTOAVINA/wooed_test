<template>
    <div class="streetview__container">
        <div class="streetview__content">
            <div
                id="streetview"
                :class="[isActiveFlashClass ? 'streetview--flash' : '']"
            ></div>
        </div>
        <Button @click="onTakeScreen" class="screen-shoot"
            ><Photo /> PRENDRE LA PHOTO</Button
        >
        <transition name="fade-img-preview" mode="out-in" appear>
            <div v-if="imgUrl" class="img-preview">
                <img :src="imgUrl" alt="apercu-img" />
                <div class="overlay" @click="$emit('on-save-picture', imgUrl)">
                    <Download />
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts" setup>
    import useStreetViewPanorama from '@/composables/useStreetViewPanorama';
    import { onMounted, ref, watch } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Download from '@/components/Icon/Download.vue';
    import Photo from '@/components/Icon/Photo.vue';

    const props = defineProps<{
        coords: { lat: any; lng: any };
    }>();
    const { streetViewRes, takeScreen } = useStreetViewPanorama(
        props.coords,
        'streetview'
    );

    const imgUrl = ref<string>('');
    const isActiveFlashClass = ref<boolean>(false);

    watch(
        () => streetViewRes.value,
        (v) => {
            if (v) {
                // console.log(v);
            }
        },
        { immediate: true }
    );

    function onTakeScreen() {
        isActiveFlashClass.value = true;
        setTimeout(() => {
            isActiveFlashClass.value = false;
            imgUrl.value = takeScreen();
        }, 200);
    }
</script>
<style lang="scss" scoped>
    .fade-img-preview-enter-active,
    .fade-img-preview-leave-active {
        @apply transition-all;
    }
    .fade-img-preview-enter-from,
    .fade-img-preview-leave-to {
        @apply translate-y-[-100px] opacity-0;
    }
    .img-preview {
        @apply relative overflow-hidden;
        .overlay {
            @apply transition-all opacity-0 bg-[#0000007a] flex justify-center items-center top-0 right-0 h-full w-full absolute;
            &:hover {
                @apply opacity-100 cursor-pointer scale-125;
            }
            &:deep() {
                svg {
                    @apply h-[80px] w-[80px];
                }
            }
        }
    }
    .streetview {
        &__content {
            @apply overflow-hidden;
        }
        &--flash {
            @apply scale-110;
        }
    }
    #streetview {
        @apply h-[400px] transition-all;
    }
    .screen-shoot {
        @apply my-[10px] w-full;
        &:deep() {
            div,
            button {
                @apply w-full;
            }
        }
    }
</style>
