<template>
    <div class="doucuments">
        <div class="documents__title">Installation</div>
        <div class="documents__form-upload">
            <div class="documents__reporting">
                <Paragraphe class="documents__titleUpload"
                    >Rapport de mise en service et paramètres de mise en
                    service</Paragraphe
                >
                <!--    <a-upload
                    accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document "
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    directory
                >
                    <a-button class="btn-upload-mob">
                        <UploadIcon />
                        Choisir un fichier/(s)
                    </a-button>
                </a-upload>
            -->
                <UploadImage @uploadFileList="handleUploadReport" />
            </div>

            <div class="documents__reporting">
                <Paragraphe class="documents__titleUpload"
                    >Note de dimensionnement</Paragraphe
                >
                <UploadImage @uploadFileList="handleUploadNote" />
            </div>

            <div class="documents__reporting">
                <Paragraphe class="documents__titleUpload"
                    >Fiche technique</Paragraphe
                >
                <UploadImage @uploadFileList="handleUploadDataSheet" />
            </div>

            <div class="documents__reporting">
                <Paragraphe class="documents__titleUpload"
                    >Notice d’utilisation</Paragraphe
                >
                <UploadImage @uploadFileList="handleUploadManual" />
            </div>

            <div class="documents__reporting">
                <Paragraphe class="documents__titleUpload"
                    >Notice de montage</Paragraphe
                >
                <UploadImage @uploadFileList="handleUploadMontage" />
            </div>

            <div class="documents__reporting">
                <Paragraphe class="documents__titleUpload"
                    >Notice de fonctionnement</Paragraphe
                >
                <UploadImage @uploadFileList="handleUploadOperation" />
            </div>

            <div class="documents__reporting" v-if="showRecPeb">
                <Paragraphe class="documents__titleUpload"
                    >Facture de l’installation</Paragraphe
                >
                <UploadImage @uploadFileList="handleUploadInvoice" />
            </div>

            <div class="documents__title mt-[22px]" v-if="props.showRecPeb">
                Réception PEB
            </div>
            <div class="documents__reporting">
                <Paragraphe class="documents__titleUpload"
                    >{{ document[7].category }}
                </Paragraphe>
                <UploadImage @uploadFileList="handleUploadProof" />
            </div>
        </div>
        <div class="documents__button">
            <Button
                type-button="secondary"
                @on-click="handleAddDoc"
                v-if="props.showRecPeb"
                ><LoadingButton size="xs" v-if="loadingBtn" /> Ajouter
                document</Button
            >
            <div class="documents__nextPrev-btn" v-else>
                <Button
                    type-button="gray"
                    @on-click="$emit('prevent')"
                    v-if="!loadingBtn"
                    >Précédent</Button
                >

                <Button type-button="secondary" @on-click="handleAddDoc"
                    ><LoadingButton
                        size="xs"
                        v-if="loadingBtn"
                    />Enregistrer</Button
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { onMounted, ref } from 'vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const props = defineProps({
        loadingBtn: {
            type: Boolean,
            default: false,
        },
        showRecPeb: {
            type: Boolean,
            default: true,
        },
    });

    const emit = defineEmits<{
        (e: 'handleUploadFile', v: any): void;
    }>();

    interface IFilesUpload {
        category: string;
        files: Array<any>;
    }

    let document = ref<Array<any>>([
        {
            category:
                'Rapport de mise en service et paramètres de mise en service',
            files: [],
        },
        {
            category: 'Note de dimensionnement',
            files: [],
        },
        {
            category: 'Fiche technique',
            files: [],
        },
        {
            category: 'Notice d’utilisation',
            files: [],
        },
        {
            category: 'Notice de montage',
            files: [],
        },
        {
            category: 'Notice de fonctionnement',
            files: [],
        },
        {
            category: 'Facture de l’installation',
            files: [],
        },
        {
            category:
                'Attestation de réception PEB (LIEN AUTOMATIQUE AVEC CARNET  DE BORD)',
            files: [],
        },
    ]);

    onMounted(() => {
        if (props.showRecPeb) {
            document.value[7].category =
                'Attestation de réception PEB (LIEN AUTOMATIQUE AVEC CARNET  DE BORD)';
        } else {
            document.value[7].category =
                "Autorisation de l'accord de l'autorité compétente";
        }
    });

    function handleAddDoc() {
        // console.log(document.value, 'File Doc uploaded');
        emit('handleUploadFile', document.value);
    }

    function handleUploadReport(files: any) {
        document.value[0].files = files;
    }

    function handleUploadNote(files: any) {
        document.value[1].files = files;
    }

    function handleUploadDataSheet(files: any) {
        document.value[2].files = files;
    }

    function handleUploadManual(files: any) {
        document.value[3].files = files;
    }

    function handleUploadMontage(files: any) {
        document.value[4].files = files;
    }
    function handleUploadOperation(files: any) {
        document.value[5].files = files;
    }
    function handleUploadInvoice(files: any) {
        document.value[6].files = files;
    }
    function handleUploadProof(files: any) {
        document.value[7].files = files;
    }
</script>

<style scoped lang="scss">
    .documents {
        &__title {
            @apply font-bold mb-[12px];
        }
        &__titleUpload {
            @apply font-semibold;
        }
        &__reporting {
            @apply mb-[12px];
        }
        &__form-upload {
            &:deep() {
                .ant-upload.ant-upload-drag {
                    @apply w-[140px] py-[20px] px-[15px] rounded-[8px];
                }
            }
        }
        &__nextPrev-btn {
            @apply flex justify-end gap-[5px];
        }

        &__button {
            @apply fixed bottom-[10px] w-[90%];

            @screen md {
                @apply right-[10%] w-auto;
            }

            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
    }

    .btn-upload-mob {
        @apply flex items-center gap-[5px] px-[12px] py-[20px] rounded-[4px];
    }
</style>
