<template>
    <Modal
        :is-show-modal="isShow"
        @on-back="hideModal"
        :width="screenType >= 1024 ? '716' : '520'"
        title="Demander à l’administration"
    >
        <template #content>
            <RadioCollapse
                :options="radioOptions"
                @select-option="handleReasonChange"
                @upload-annexe="handleFileUpload"
            />
            <span class="annexe">Annexe</span>
            <hr class="__hr" />

            <div class="upload__container">
                <label>
                    <span> {{ annexeLabel }} </span>
                </label>
                <UploadImage
                    :needBase64="false"
                    @upload-single="handleFileUpload"
                />
            </div>
        </template>
    </Modal>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import RadioCollapse from '@/pages/finance/components/RadioCollapse/RadioCollapse.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';

    const screenType = ref<number>(screen.width);

    const emit = defineEmits([
        'close-modal',
        'upload-file',
        'set-reason-value',
    ]);

    const reason = ref<string>('');

    const annexeLabel = 'Copie de l’acte de vente';

    const radioOptions = ref<object>([
        {
            value: 1,
            label: 'Je me suis séparé de mon partenaire et',
            subOptions: [
                {
                    value: 1,
                    label: 'que j’ai dû louer un autre bien afin d’y établir ma résidence principale; quant à mon partenaire, il a établi sa résidence principale dans le bien acquisa',
                },
                {
                    value: 2,
                    label: 'que nous avons dû revendre le bien acquis',
                },
            ],
            annexeTitle: 'Preuves de ma séparation avec mon partenaire',
        },
        {
            value: 2,
            label: 'J’ai eu des problèmes de santé et',
            subOptions: [
                {
                    value: 1,
                    label: 'que j’ai dû résider dans une maison médicale spécialisée',
                },
                {
                    value: 2,
                    label: 'que je me suis vu contraint de résider chez un proche/mes parents',
                },
            ],
            annexeTitle: 'Attestation médicale',
        },
        {
            value: 3,
            label: 'J’ai perdu mon travail et ai trouvé un nouveau poste dans une autre région du pays/à l’étranger',
            annexeName: 'Nouveau contrat de travail',
        },
        {
            value: 4,
            label: 'J’ai été muté dans une autre région/à l’étranger par mon employeur',
            annexeName: 'Nouveau contrat de travail',
        },
    ]);

    const props = defineProps({
        isShow: {
            type: Boolean,
            default: false,
        },
    });

    function hideModal() {
        emit('close-modal', false);
        emit('set-reason-value', reason.value);
    }

    function handleFileUpload(payload: any) {
        let data: object;
        const hasLabelInKeys = payload.hasOwnProperty('label');
        hasLabelInKeys
            ? (data = payload)
            : (data = { label: annexeLabel, file: payload });
        emit('upload-file', data);
    }

    function handleReasonChange(payload: any) {
        reason.value = payload.value.value;
    }
</script>
<style lang="scss" scoped>
    .financial-help-modal {
        &__select-list {
            &__item {
                @apply px-[22px] py-1 my-2;
                background-color: var(--color-gray);
            }
        }
    }

    .upload__container {
        label {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            @apply text-black mb-[10px] flex items-center gap-x-[12px];
        }
    }

    .annexe {
        font-weight: 300;
        @apply text-primary;
    }

    .__hr {
        @apply text-gray my-[10px];
    }
</style>
