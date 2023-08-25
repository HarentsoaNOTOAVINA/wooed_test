<template>
    <div class="document">
        <div class="flex gap-[18px]">
            <BackButton @click="emit('back')" />
            <Title label="Ajouter des documents" type="h4" class="title" />
        </div>
        <div v-for="(item, index) in dataDoc" :key="index">
            <template v-if="item.type === 'switch'">
                <div class="switch">
                    <Switch
                        :item-label="item.label"
                        :name="item.name"
                        @handle-switch="handleChange"
                    />
                </div>
                <template v-if="item.subItem">
                    <div v-for="(sub, key) in item.subItem" :key="key">
                        <div v-if="params.planedCertification">
                            <div v-if="item.name === 'planedCertification'">
                                <Paragraphe class="info">
                                    <Icon icon-name="InfoIcon" />
                                    <span>{{ sub.subtitle }}</span>
                                </Paragraphe>
                                <Button type-button="secondary"
                                    >Aller vers travaux</Button
                                >
                            </div>
                        </div>
                    </div>
                </template>
            </template>
            <template v-if="item.type === 'link'">
                <Title :label="item.label" type="h4" class="title" />
                <div>
                    <Paragraphe class="info">
                        <Icon icon-name="InfoIcon" />
                        <span>{{ item.subtitle }}</span>
                    </Paragraphe>
                    <Button type-button="secondary">Aller vers travaux</Button>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { ref, watch, computed, onMounted } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';

    const params = ref<any>({});
    const dataDoc = [
        {
            label: 'Certification planifié',
            name: 'planedCertification',
            type: 'switch',
            subItem: [
                {
                    label: 'Date de fin de validité',
                    name: '',
                    type: 'link',
                    uri: '',
                    subtitle:
                        'Aller vers travaux pour planifié une certification',
                },
            ],
        },
        {
            label: 'Trouver un certificateur Agréé',
            name: '',
            type: 'link',
            uri: '',
            subtitle: 'Aller vers travaux pour planifié une certification',
            // subItem: [
            //     {
            //         label: 'Date de fin de validité',
            //         name: '',
            //         type: 'link',
            //         uri: '',
            //         subtitle:
            //             'Aller vers travaux pour planifié une certification',
            //     },
            // ],
        },
    ];

    const emit = defineEmits<{
        (event: 'back'): void;
    }>();

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }
</script>
<style lang="scss" scoped>
    .document {
        @apply flex flex-col gap-[18px];
    }
    .title {
        @apply text-[var(--color-primary)] text-[14px] font-[600];
    }
    .info {
        @apply flex gap-[10px] mb-[10px] italic text-blue-400 mt-[30px];
    }
</style>
