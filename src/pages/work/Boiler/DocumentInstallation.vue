<template>
    <div class="boilerInstallation__document">
        <div class="boilerInstallation__document-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Documents</Paragraphe>
        </div>
        <hr class="separator" />
        <div class="boilerInstallation__formUpload">
            <AddDocument
                @handle-upload-file="validUploadFile"
                :loading-btn="loadingBtn"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { notification } from 'ant-design-vue';
    import { ref, onMounted, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import AddDocument from './form/AddDocument.vue';

    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    let loadingBtn = ref<boolean>(false);
    let dataPostSaveWorkBoiler = ref<any>({
        idTheProperty: route.params.id,
        idExpert: [],
        idWorkCost: null,
        estimatedCost: null,
        limitDate: null,
    });

    onMounted(() => {
        getDataStoreToSaveBoiler();
    });

    function getDataStoreToSaveBoiler() {
        const dataFromStore = computed(
            () => store.getters['WorksModule/getDataSaveBoiler']
        );

        dataPostSaveWorkBoiler.value = {
            ...dataPostSaveWorkBoiler.value,
            ...dataFromStore.value,
        };

        dataPostSaveWorkBoiler.value.idExpert = Object.values(
            dataFromStore.value.idExpert
        );

        console.log(dataPostSaveWorkBoiler.value);
    }

    async function validUploadFile(docs: any) {
        dataPostSaveWorkBoiler.value.document = docs;
        console.log(dataPostSaveWorkBoiler.value, 'DATATATATATATATT');

        try {
            loadingBtn.value = true;
            let resultaNext = await store.dispatch(
                'WorksModule/saveBoilerWork',
                dataPostSaveWorkBoiler.value
            );

            if (resultaNext.data.code == 200 && resultaNext.data.success) {
                notification['success']({
                    message: 'Ajout travaux',
                    description:
                        "Travaux d'installation enregistrer avec success",
                });

                router.push({ name: 'work-boiler' });
            }
        } catch (error) {
        } finally {
            loadingBtn.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .boilerInstallation {
        &__document {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__document-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
    }

    .separator {
        @apply my-[15px];
    }
</style>
