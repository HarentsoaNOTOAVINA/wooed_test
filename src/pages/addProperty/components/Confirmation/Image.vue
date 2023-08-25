<template>
    <div class="image-swiper">
        <swiper
            ref="mySwiper"
            :pagination="{
                clickable: true,
            }"
            :modules="modules"
            v-if="props.data.images"
        >
            <swiper-slide
                v-for="(file, index) in props.data.images"
                :key="index"
            >
                <figure class="confirmation-image">
                    <!-- <ImageAudioRecorder :index="index" :type-file="file.file" /> -->
                    <img :src="file.urlImg" alt="Image" />
                </figure>
                <AudioPlayer :audio-src="convertToUrl(file.soundFile)" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup lang="ts">
    import ImageAudioRecorder from '@/components/Display/AudioRecord/AudioRecord.vue';
    import { onMounted, ref } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Pagination } from 'swiper';
    import AudioPlayer from '@/components/Display/AudioPlayer/AudioPlayer.vue';

    const modules = ref<any>([Autoplay, Pagination]);

    const props = defineProps({
        data: {
            type: Object,
            default: () => {},
        },
    });

    const convertToUrl = (blob: any) => {
        if (blob) {
            return URL.createObjectURL(blob);
        } else {
            return undefined; // Return null if there is no blob (handle this case in AudioPlayer component)
        }
    };
</script>

<style lang="scss" scoped>
    .confirmation-image {
        @apply flex flex-wrap gap-[10px];
        border-radius: 4px;
        img {
            border-radius: 4px;
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        &:deep() {
            .record-image__container {
                @apply flex-1 flex;
            }
            .record-image-card {
                @apply flex-1;
            }
        }
    }
    .image-swiper {
        &:deep() {
            .swiper-pagination {
                position: initial;
                .swiper-pagination-bullet {
                    opacity: 1;
                    transition: all 0.5s ease;
                    @apply bg-grayIcon w-[8px] rounded-[8px];
                }
                .swiper-pagination-bullet-active {
                    transition: width 0.5s ease;
                    @apply bg-primary w-[24px];
                }
            }
            .swiper-slide {
                @apply place-content-8px;
            }
        }
    }
</style>
