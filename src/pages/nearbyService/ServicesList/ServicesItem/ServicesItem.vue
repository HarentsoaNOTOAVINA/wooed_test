<template>
    <div class="service__item">
        <template v-if="isReadyService">
            <div class="service__item__img">
                <img v-if="urlPhoto" :src="urlPhoto" alt="image-service" />
                <img
                    v-else
                    src="@/static/images/empty-img.png"
                    alt="image-service"
                />
            </div>
            <div class="service__item__body">
                <Title
                    v-if="!!service.name"
                    class="service__item__body__title"
                    type="h2"
                    :label="service.name"
                />
                <paragraphe class="service__item__body__location"
                    ><Map /> {{ service.vicinity }}</paragraphe
                >
            </div>
        </template>
        <div class="h-[200px] relative" v-else>
            <Loader />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Map from '@/components/Icon/Map.vue';
    import { PropType, ref, watch } from 'vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const isReadyService = ref<boolean>(false);
    const urlPhoto = ref<string>('');

    const props = defineProps({
        service: {
            type: Object as PropType<any>,
            default: {},
        },
    });

    watch(
        () => props.service,
        (v) => {
            if (v) {
                isReadyService.value = true;
                if (!!v.url_photo) {
                    urlPhoto.value = v.url_photo;
                }
            }
        },
        { immediate: true }
    );
</script>

<style lang="scss" scoped>
    .service__item {
        overflow: hidden;
        box-shadow: 1px 1px 10px gray;
        background-color: #fff;
        border-radius: 8px;
        border: 1px solid var(--color-gray);
        @apply relative p-[10px] flex gap-[10px] w-[190px] flex-col h-[200px] md:h-auto md:w-[300px] md:flex-row;
        @screen md {
            box-shadow: none;
        }
        &:hover {
            cursor: pointer;
        }
        &__img {
            border-radius: 4px;
            flex: 0 0 90px;
            img {
                @apply h-[90px] w-full md:w-[160px] object-cover;
                border-radius: 8px;
            }
        }
        &__body {
            &__title {
                font-size: 20px;
                line-height: 24px;
                font-weight: 600;
                @apply mb-[10px];
            }
            &__location {
                @apply flex gap-[20px];
                color: var(--color-stroke-gray);
                font-size: 12px;
                svg {
                    flex: 0 0 20px;
                }
            }
        }
    }
</style>
