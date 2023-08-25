<template>
    <section class="mp-container">
        <div class="mp-img-container">
            <img
                :src="props.data.image ? props.data.image : ''"
                alt="image du bien"
            />
        </div>
        <div class="mp-desc">
            <div class="mp-desc-header">
                <Close @click="emit('close')" />
            </div>
            <div class="mp-desc-head">
                <Title
                    type="h4"
                    :label="
                        props.data.propertyType ? props.data.propertyType : ''
                    "
                    class="font-[600]"
                />
                <div class="mp-desc-price">
                    {{ props.data.price ? props.data.price : '' }}
                </div>
            </div>
            <div class="mp-desc-addr">
                <Map /> {{ props.data.address ? props.data.address : '' }}
            </div>
            <div class="mp-desc-internal">
                <div class="mp-desc-internal-roomcount">
                    <Room />
                    {{ props.data.roomcount ? props.data.roomcount : '' }} ch.
                </div>
                <div>{{ props.data.surface ? props.data.surface : '' }} m2</div>
            </div>
            <div class="mp-desc-detail">
                {{ props.data.details ? props.data.details : '' }}
            </div>
            <div class="flex justify-end">
                <Button @click="gotToDetail">Voir plus</Button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import Close from '@/components/Icon/Close.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Room from '@/components/Icon/Room.vue';
    import Map from '@/components/Icon/Map.vue';
    import { useRouter } from 'vue-router';
    import { PropType, onMounted } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';

    interface Iprops {
        id?: number;
        address?: string;
        price?: number | string;
        details?: string;
        image?: string;
        surface?: number;
        roomcount?: number;
        propertyType?: string;
    }
    const router = useRouter();
    const props = defineProps({
        data: {
            type: Object as PropType<Iprops>,
            default: {},
        },
    });
    const emit = defineEmits<{ (e: 'close'): void }>();
    onMounted(() => {});
    function gotToDetail() {
        router.push(`/detail/${props.data.id}`);
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .mp {
        &-container {
            border: 2px solid var(--color-gray-icon);
            max-width: 400px;
            width: calc(100vw - 28px);
            margin: 0 auto;
            transform: translate(-50%, 0px);
            z-index: 1001;
            // max-height: 300px;
            height: auto;
            @apply absolute left-[50%] bottom-[60px] bg-white rounded-lg overflow-y-auto;
            @include scrollbar;

            @screen md {
                bottom: 25px;
                height: 260px;
                width: 520px;
                @apply max-w-none flex;
            }
        }
        &-img-container {
            @apply w-full;
            @screen md {
                width: 40%;
            }

            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
        &-desc {
            @apply flex flex-col py-5 px-3 justify-between;
            @screen md {
                @apply min-w-[60%];
            }
            &-header {
                @apply flex flex-row justify-end;
                svg {
                    @apply p-[2px] h-[16px] w-[16px] rounded bg-[var(--color-stroke-gray)];
                }
            }
            &-head {
                @apply w-full flex flex-row justify-between;
            }
            &-type {
                @apply text-2xl font-semibold;
            }
            &-addr {
                @apply text-sm flex gap-2;
                font-weight: 500;
                color: var(--color-stroke-gray);
            }
            &-price {
                color: var(--color-alert-str-rose);
                background: rgba(255, 130, 130, 0.15);
                border-radius: 15px;
                padding: 4px 12px;
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
            }
            &-internal {
                @apply w-full flex justify-start gap-10 font-semibold;
                &-roomcount {
                    @apply flex gap-2;
                }
            }
            &-detail {
                @apply py-5;
            }
        }
    }
</style>
