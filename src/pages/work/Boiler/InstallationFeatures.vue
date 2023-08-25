<template>
    <div class="boilerFeature__regulation">
        <div class="boilerFeature__regulation-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Caractéristiques de l’installation</Paragraphe>
        </div>
        <hr class="separator" />
        <div class="boilerFeature__form">
            <InstallationFeaturesForm
                @handle-valid="validCaracteristic"
                :loadingBtn="loadingBtnValid"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { notification } from 'ant-design-vue';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import InstallationFeaturesForm from './form/InstallationFeaturesForm.vue';

    const route = useRoute();
    const store = useStore();

    const emit = defineEmits<{
        (e: 'prev'): void;
    }>();

    let loadingBtnValid = ref<boolean>(false);
    let dataToAddCaracteristicInstallation = ref<any>({
        theProperty: route.params.id,
    });

    async function validCaracteristic(dataFromForm: any) {
        dataToAddCaracteristicInstallation.value = {
            ...dataToAddCaracteristicInstallation.value,
            ...dataFromForm,
        };

        try {
            loadingBtnValid.value = true;
            let response = await store.dispatch(
                'WorksModule/addCaracteristicInstallation',
                dataToAddCaracteristicInstallation.value
            );

            if (response.data.success && response.data.code == 200) {
                notification['success']({
                    message: 'Caracteristique chaudière ',
                    description: 'Caracteristique de la chaudière ajoutée .',
                });
                emit('prev');
            } else {
                notification['warning']({
                    message: 'Caracteristique chaudière ',
                    description:
                        "Erreur lors de l'ajout de la caracteristique.",
                });
            }
            console.log(response, 'Data reponse valid');
        } catch (error) {
            console.log(error, "Erreur ajout d'installation");
        } finally {
            loadingBtnValid.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .boilerFeature {
        &__regulation {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__regulation-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
    }

    .separator {
        @apply my-[15px];
    }
</style>
