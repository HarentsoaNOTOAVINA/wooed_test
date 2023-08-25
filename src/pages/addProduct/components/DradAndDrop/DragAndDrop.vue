<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import DeleteIcon from '@/components/Icon/deleteRoudedBG.vue';
    import Add from '@/components/Icon/AddOptions.vue';
    import { computed, onMounted, ref, shallowRef, toRaw, watch } from 'vue';
    import { data } from '../PropertyType/data';
    import Modal from '@/components/Display/Modal/Modal.vue';

    const props = defineProps({
        niveau: {
            type: Array<any>,
            required: true,
        },
        selectedFeatures: {
            type: Array<any>,
            required: true,
            default: [],
        },
        featuresAdded: {
            type: Array<any>,
            default: [],
        },
    });

    const list = shallowRef<Array<any>>(props.niveau);
    const isShow = ref<boolean>(false);

    const emit = defineEmits<{
        (event: 'onDropList', payload: any): void;
        (event: 'deleteLevel', payload: any): void;
        (event: 'deleteDropedFeatures', paylad: any): void;
        (event: 'onOpenModal', paylad?: any): void;
    }>();

    function startDrag(event: any, item: any, level: any) {
        event.dataTransfer.setData('itemId', item.id);
        event.dataTransfer.setData('itemLevel', level);
    }
    function onClickInDrag(item: any, level: any): any {
        emit('onDropList', { id: item.id, level });
    }

    function onDrop(event: any): any {
        const id = event.dataTransfer.getData('itemId');
        const level = event.dataTransfer.getData('itemLevel');
        emit('onDropList', { id, level });
    }

    function onDeleteDropedFeatures(item: any) {
        emit('deleteDropedFeatures', item);
    }
    function handleDeleteBtn(level: any) {
        emit('deleteLevel', level);
    }

    function onOpenModal(key: any) {
        emit('onOpenModal', +key);
    }
</script>

<template>
    <div
        class="drag__level-container"
        v-for="(item, key) in props.niveau"
        :key="key"
    >
        <div class="drag__level-container-item">
            <div class="drag__header-container">
                <div>
                    <Paragraphe>{{ item.title }} {{ key + 1 }}</Paragraphe>
                </div>
                <div>
                    <Paragraphe
                        class="drag__delete-container"
                        @click="handleDeleteBtn(item)"
                    >
                        <span><DeleteIcon /></span>
                    </Paragraphe>
                </div>
            </div>
            <div class="drag__item-cont">
                <div class="drag__subitem-container">
                    <div
                        class="drag__subitem-item"
                        draggable="true"
                        v-for="subitem in item.item"
                        :key="subitem.id"
                        @dragstart="startDrag($event, subitem, key)"
                        @click="onClickInDrag(subitem, key)"
                    >
                        <i :class="subitem.icon" />
                        <Paragraphe>{{ subitem.name }}</Paragraphe>
                    </div>
                </div>
                <div class="drag__add" @click="onOpenModal(key)">
                    <Add />
                    <Paragraphe>Autres</Paragraphe>
                </div>
            </div>
            <div
                class="drag__dragged"
                @drop="onDrop($event)"
                @dragenter.prevent
                @dragover.prevent
            >
                <div
                    v-if="props.selectedFeatures.length <= 0"
                    :class="[
                        props.selectedFeatures.length <= 0
                            ? 'drag__nothing-container'
                            : '',
                    ]"
                >
                    Veuillez glisser pour ajouter les contenus
                </div>
                <div class="drag__drop" v-else>
                    <div
                        class="drag__drop-item"
                        v-for="(item_, idItem) in props.selectedFeatures[key]
                            .features"
                        :key="'item' + idItem"
                        @click="
                            onDeleteDropedFeatures({ item: item_, level: key })
                        "
                    >
                        <i :class="item.item[+item_.feature - 1].icon" />
                        <Paragraphe>{{
                            item.item[+item_.feature - 1].name
                        }}</Paragraphe>
                    </div>
                    <div
                        class="flex gap-[10px]"
                        v-if="props.featuresAdded[key]"
                    >
                        <div
                            class="drag__drop-item"
                            v-for="itemV in props.featuresAdded[key].features"
                        >
                            <i :class="itemV.feature.icon" />
                            <Paragraphe>{{ itemV.feature.name }}</Paragraphe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .drag {
        &__level-container {
            @apply px-[14px] py-[10px] rounded-[4px];
            border: 0.5px solid var(--color-stroke-gray);
        }
        &__level-container-item {
            @apply flex flex-col gap-[14px];
        }
        &__subitem-container {
            @apply flex flex-wrap  gap-[32px] pt-[12px];
        }
        &__subitem-item {
            @apply flex flex-col items-center cursor-pointer;
        }
        &__dragged {
            @apply rounded-[4px] min-h-[97px]  p-[5px];
            border: 0.5px solid #606060;
        }
        &__nothing-container {
            @apply flex justify-center items-center h-[80px];
        }
        &__nothing-para {
            @apply text-[14px] leading-[17px];
            background-color: var(--color-gray-icon);
        }
        &__drop {
            @apply flex flex-row flex-wrap cursor-pointer gap-[10px];
        }
        &__drop-item {
            @apply border rounded-sm py-1 px-2 w-fit flex flex-col justify-center items-center min-w-[120px];
            background-color: var(--color-gray);
        }
        &__delete-container {
            @apply flex cursor-pointer gap-[14px] rounded;
        }
        &__header-container {
            @apply w-full flex justify-between;
        }
        &__add {
            border: 0.5px solid #d6d6d6;
            @apply w-[82px] h-[60px] rounded-[8px] flex flex-col justify-center items-center;
        }
        &__item-cont {
            @apply flex gap-[10px] cursor-pointer;
        }
    }
</style>
