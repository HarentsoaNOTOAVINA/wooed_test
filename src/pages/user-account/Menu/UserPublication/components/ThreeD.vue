<template>
    <div class="file__container">
        <div class="flex gap-[18px]">
            <BackButton @click="emit('back')" />
            <Title label="Figuration 3D" type="h4" class="title" />
        </div>
        <div class="" v-for="(item3d, id3dItem) in figure3D" :key="id3dItem">
            <div class="file__link-container" v-if="item3d.type === 'link'">
                <Icon icon-name="Link" />
                <a class="file__link" :href="item3d.link">{{ item3d.label }}</a>
            </div>
            <div class="" v-else>
                <Paragraphe class="file__title">{{ item3d.label }}</Paragraphe>
                <div
                    class="file__upload-container"
                    v-for="(itemFile, idItemFile) in item3d.subItem"
                    :key="idItemFile"
                >
                    <div class="file__upload-item">
                        <label for="file__label">{{ itemFile.label }}</label>
                        <UploadImage
                            :name="itemFile.name"
                            @upload-single-with-name="handleUpload3D"
                        />
                    </div>
                </div>
                <!-- <Button type-button="border">{{ item3d.label }}</Button> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    const figure3D = [
        {
            label: 'Introduire la présentation 3D (appli Apple)',
            name: '3Dpresentation',
            type: '',
            subItem: [
                {
                    label: 'Lidard',
                    name: 'lidardFile',
                    type: 'file',
                },
                {
                    label: 'Materporte',
                    name: 'materporte',
                    type: 'file',
                },
                {
                    label: 'Autres',
                    name: 'otherFile',
                    type: 'file',
                },
            ],
        },
        {
            label: 'Etablir la figuration 3D via l’outil de mesure',
            name: 'mesuringTools',
            type: 'link',
            link: '',
        },
        {
            label: 'Demander à l’appli de procéder automatiquement à la figuration 3D',
            name: 'perform3DAutomaticly',
            type: 'link',
            link: '',
        },
        // {
        //       label : "Les conseils d’un influenceur",
        //       name : "influencerHelp",
        //       type : "link",
        //       link : ""
        // },
    ];

    const emit = defineEmits<{
        (event: 'back'): void;
    }>();

    function handleUpload3D(value: any) {
        console.log('3D >>>>>>>>>>>>', value);

        // params.value.figure3D = [
        //     ...params.value.figure3D,
        //     {
        //         name: Object.keys(value)[0],
        //         file: Object.values(value)[0],
        //     },
        // ];
    }
</script>
<style lang="scss" scoped>
    .file {
        &__upload {
            &:deep() {
                .ant-upload-list-picture-card-container {
                    display: none;
                }
            }
        }

        &__btn {
            @apply my-[10px];
        }

        &__link-container {
            @apply flex gap-[10px];
        }

        &__link {
            @apply text-blue-600 cursor-pointer;
        }

        &__container {
            @apply flex flex-col gap-[20px];

            &:deep() {
                .button__border {
                    @apply w-full;
                }
            }
        }

        &__title {
            @apply font-semibold text-slate-400;
        }

        &__upload-container {
            @apply flex gap-[10px] flex-wrap;
        }

        &__label {
            @apply font-semibold;
        }

        &__upload-item {
            @apply flex flex-col gap-[10px];
        }
    }
    .title {
        @apply text-[var(--color-primary)] text-[14px] font-[600];
    }
</style>
