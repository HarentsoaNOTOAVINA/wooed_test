<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <!-- Ajout document -->
        <!-- <div class="document__occur-container">
            <div v-for="(item, index) in data" :key="index">
                <template v-if="item.type === 'select'" class="">
                    <Select
                        :options="item.options"
                        :label="item.label"
                        :name="item.name"
                        placeholder="selectionner"
                        @change-select="handleChange"
                        :value="params.title"
                    />
                </template>
                <template v-if="item.type === 'file'" class="">
                    <UploadImage
                        :name="item.name"
                        :default-file-list="params.fileDocument"
                        @upload-single-with-name="handleChange"
                        :max-count="1"
                    />
                </template>
            </div>
            <div class="document__add-footer">
                <Button type-button="secondary" @click="handleAddFile"
                    >Ajouter</Button
                >
            </div>
        </div> -->

        <!-- Liste document deja ajouter -->
        <div class="document__content-document">
            <Title type="h2" weight="bold" class="document__title-container">
                Listes des documents que vous avez ajouté
            </Title>
            <div class="document__wrapper">
                <Empty
                    description="Aucun document"
                    v-if="allDocument && allDocument.length === 0"
                />
                <template v-else>
                    <div
                        class="document__item"
                        v-for="(file, idx) in allDocument"
                        :key="idx"
                    >
                        <Paragraphe class="document__title">{{
                            file?.type?.name
                        }}</Paragraphe>
                        <a
                            class="document__item-file"
                            target="_blank"
                            rel="noopener noreferrer"
                            :href="createUrlFile(file.file)"
                        >
                            <Icon icon-name="FileRed" />
                            <span>{{ file?.file?.name }}</span>
                        </a>
                    </div>
                </template>
            </div>
        </div>

        <!-- Possibilité d'ajouter les documents precedant -->
        <div class="document__content-document">
            <Title type="h2" weight="bold" class="document__title-container">
                Listes des documents que vous n'avez pas ajouté
            </Title>
            <div
                class="document__item"
                v-for="(otherDoc, idx) in otherDocuments"
                :key="idx"
            >
                <div v-if="!hasMatchingDocument(otherDoc.title)" class="place-content-14px">
                    <Paragraphe class="document__title">{{
                        otherDoc.title
                    }}</Paragraphe>
                    <UploadImage
                        :name="otherDoc.name"
                        :default-file-list="params.fileDocument"
                        @upload-single-with-name="
                            handleAddBlankDoc($event, otherDoc)
                        "
                        :max-count="1"
                    />
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import { ref, watch, computed, onMounted } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { useStore } from 'vuex';
    import Title from '@/components/Common/Title/Title.vue';
    import { Empty } from 'ant-design-vue';
    import { formatDocument } from '../utils/default-value';

    const otherDocuments = [
        {
            name: 'immopass',
            title: 'Rapport immopass',
        },
        {
            name: 'lastControlBoiler',
            title: 'Certificat énergetique',
        },
        {
            name: 'licence',
            title: 'Certificat éléctrique',
        },
        {
            name: 'sewerDocument',
            title: 'Document relatif',
        },
        {
            name: 'permitEnvFile',
            title: "Permis d'environnement",
        },
        {
            name: 'documentUrbanismeFile',
            title: "Permis d'urbanisme",
        },
        {
            name: 'plan',
            title: 'Plan cadastral',
        },
    ];

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

    const store = useStore();
    const data = ref<any>(props.data);
    const params = ref<any>({});
    let allDocument = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']['documents']
    );

    let propertyDatas = computed(
        () => store.getters['AddProductModule/getAddPropertyDatas']
    );

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    function createUrlFile(data: any) {
        return URL.createObjectURL(data);
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        store.dispatch('AddProductModule/setPropertyData', {
            data: { documents: [...allDocument.value] },
        });
        emit('onClickNext');
        console.log(params.value, "ALL PARAMS");
        
    }

    function hasMatchingDocument(title: string) {
        return allDocument.value?.some(
            (document: any) => document.type && document.type.name === title
        );
    }

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }

    function handleAddBlankDoc(value: any, label: any) {
        params.value = {
            ...params.value,
            fileDocument: value[label.name],
            title: label.title,
        };
        handleAddFile();
    }

    function handleAddFile() {
        const oldParams = formatDocument(params.value, params.value.title);

        allDocument.value = [...allDocument.value, ...oldParams];

        params.value = {
            title: '',
            fileDocument: [],
        };
    }
</script>

<style lang="scss" scoped>
    .document {
        &__occur-container {
            @apply rounded-[8px] p-[18px] flex flex-col gap-[18px];
            border: 0.5px solid #d6d6d6;
        }
        &__add-footer {
            @apply w-full flex justify-end;
            &:deep() {
                .button__secondary {
                    @apply w-[120px];
                }
            }
        }
        &__item {
            @apply flex flex-col gap-[10px] mb-[10px];
        }
        &__divider {
            @apply text-slate-400;
        }
        &__item-file {
            border: 1px solid var(--color-primary);
            border-radius: 3px;
            padding: 10px 5px;
            text-align: center;
            display: block;
            &:deep() {
                svg {
                    width: 50px;
                    height: 50px;
                    margin-bottom: 10px;
                }
            }
            span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
            }
        }
        &__wrapper {
            @apply grid grid-cols-5 gap-[15px] mt-[20px];
        }
        &__add-wrapper {
            @apply flex flex-col gap-[15px];
        }
        &__title {
            font-weight: 600;
            color: var(--color-gray-icon);
        }
        &__title-container {
            font-size: 16px;
            color: var(--color-gray-icon);
        }
        &__content-document {
            position: relative;
            margin-top: 15px;
            &:deep() {
                .ant-empty {
                    text-align: center;
                    svg {
                        width: 100px;
                    }
                }
                .ant-empty-description {
                    font-weight: 600;
                }
            }
        }
    }
</style>
