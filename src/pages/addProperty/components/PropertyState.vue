<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="propertyState__container">
            <div class="propertyState__form place-content-14px">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="propertyState__form-item"
                >
                    <template v-if="item.type === 'link'">
                        <div class="propertyState__content">
                            <a :href="uri" target="_blank" title="Immopass">
                                <Button type-button="secondary">
                                    {{ item.label }}
                                </Button>
                            </a>
                        </div>
                    </template>
                    <template v-if="item.type === 'file'">
                        <div class="propertyState__content place-content-14px">
                            <label class="propertyState__label">
                                {{ item.label }}
                            </label>
                            <!-- <div
                                class="propertyState__item"
                                v-if="params[item.name]"
                            >
                                <a
                                    class="propertyState__item-file"
                                    :href="
                                        createUrlFile(params[item.name])
                                    "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon-name="FileRed" />
                                    <span>Fichier PDF</span>
                                </a>
                            </div> -->
                            <UploadImage
                                :name="item.name"
                                @uploadUpdate="
                                    handleChange($event, item.label, item.name)
                                "
                                :default-file-list="documentLists(item.label)"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { onMounted, ref, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { useStore } from 'vuex';
    import {
        valueParams,
        formatDocument,
        documentLists,
    } from '../utils/default-value';
    import Icon from '@/components/Common/Icon/Icon.vue';

    const store = useStore();

    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
        data: {
            type: Array as any,
        },
    });

    const data = ref<any>(props.data);

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    const uri = ref<any>(import.meta.env.VITE_IMMOPASS);
    const params = ref<any>({});
    const paramsDoc = ref<any>({});

    onMounted(() => {
        params.value = valueParams(data.value);
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        () => {
            params.value = valueParams(data.value);
        },
        { immediate: true }
    );

    function createUrlFile(data: any) {
        return URL.createObjectURL(data);
    }

    function handleChange(value: any, label?: string, name?: string) {
        params.value = {
            ...params.value,
            ...value,
        };

        paramsDoc.value = formatDocument(params.value, label, name);
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        if (paramsDoc.value && paramsDoc.value.length) {
            store.dispatch('AddProductModule/setPropertyData', {
                data: {
                    ...params.value.content,
                    // documents: [...params.value.documents, ...paramsDoc.value],
                    documents: [...paramsDoc.value],
                },
            });
        } else {
            store.dispatch('AddProductModule/setPropertyData', {
                data: {
                    ...params.value.content,
                },
            });
        }

        emit('onClickNext');
    }
</script>

<style lang="scss" scoped>
    .propertyState {
        &__content {
            label {
                @apply font-[600] text-grayIcon;
            }
        }
        &__item-file {
            @apply flex gap-[10px] text-blue-500;
        }

        &__item {
            @apply flex flex-col gap-[10px] mb-[10px];
        }
    }
</style>
