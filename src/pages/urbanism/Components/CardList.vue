<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Delete from '@/components/Icon/deleteRoudedBG.vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import { liste } from '../RedrawNeighborhood/dataListeDrawed';
    import moment from 'moment';

    interface IDataList {
        id: number;
        images: any;
        status: string;
        created: string;
    }

    defineProps({
        dataList: {
            type: Array<IDataList>,
            default: [],
        },
    });

    const emit = defineEmits<{
        (e: 'showDescrition', item: Object): void;
        (e: 'onDelete', id: number): void;
    }>();

    function handleDescription(item: Object) {
        console.log(item, 'Item clicked');
        emit('showDescrition', item);
    }

    function handleDelete(id: number) {
        emit('onDelete', id);
    }
</script>

<template>
    <div class="neighborhood__list">
        <div class="neighborhood__hasData" v-if="dataList.length > 0">
            <div
                class="neighborhood__card"
                v-for="(item, index) in dataList"
                :key="index"
            >
                <div class="image-drawed">
                    <figure
                        class="figure"
                        v-for="(image, i) in item.images"
                        :key="i"
                    >
                        <img
                            :src="image.image"
                            alt="img_quartier"
                            @click="handleDescription(item)"
                        />
                    </figure>
                </div>
                <div class="neighborhood__title">
                    <Paragraphe
                        >Image Numero : {{ index + 1 }} du
                        {{ moment(item.created).format('LL') }} à
                        {{ moment(item.created).format('LT') }}</Paragraphe
                    >
                    <Delete @click="handleDelete(item.id)" class="delete" />
                </div>
            </div>
        </div>
        <div class="neighborhood__noData" v-if="dataList.length <= 0">
            <a-empty
                description="Vous n'avez pas encore de quartier redessinez! "
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .neighborhood {
        &__hasData {
            @apply flex justify-start flex-wrap gap-[10px];
        }
        &__card {
            @apply mt-2 rounded-[8px] bg-[var(--color-gray)] p-[5px];
        }
        &__title {
            @apply flex justify-between mt-[8px] items-center font-semibold;
        }
        &__noData {
            @apply flex justify-center w-full;
        }
    }

    .image-drawed {
        @apply flex flex-wrap gap-[5px] items-center;
    }

    .figure {
        // @apply rounded-[8px];
        max-width: 345px;
        height: 190px;
        position: relative;
        img {
            @apply w-full h-full rounded-[8px] object-cover cursor-pointer;
        }
    }
    .delete {
        @apply cursor-pointer;
    }
</style>
