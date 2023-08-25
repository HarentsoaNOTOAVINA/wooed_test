<template>
    <MobilityCard
        label-title="Défectuosité"
        :disableSubmitButton="false"
        label-button="Valider"
        :dataBreadcrumbs="breadcrumbListsData"
        class="defect__section"
    >
        <div class="defect__container">
          <div class="defect__choice">
            <Paragraphe type="bold">Il s’agit d’une autoroute ou d’une route régionale</Paragraphe>
            <Paragraphe >Appelez le 1718</Paragraphe>
          </div>
          
          <div class="">
              <Paragraphe type="bold">Il s’agit d’une rue ou d’une route communale</Paragraphe>
                <div class="defect__map--container">
                    <Input
                        placeholder="Adresse"
                        name-input="address"
                        label="Entrer l'adresse"
                        id="address"
                        @input="handleChange"
                    />
                </div>
                <div class="defect__form-item-wrap">
                    <Select
                        name="types"
                        placeholder="type"
                        label="Type d'incident"
                        :options="options"
                        class="defect__form-item"
                        mode="multiple"
                        @change-select="handleChange"
                    />
                </div>
                <div class="defect__form-item-wrap">
                    <TextArea
                        label="Commentaire"
                        placeholder="Commentaire..."
                        nameInput="remark"
                        @handleChange="handleChange"
                    />
                </div>
                <Button
                    type-button="secondary"
                    class="btn-foot"
                    :disabled="loading"
                    @click="handleValide"
                >
                    <span>
                        <LoadingButton size="xs" v-if="loading" />
                        Valider
                    </span>
                </Button>
            </div>
        </div>
    </MobilityCard>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import MobilityCard from '@/pages/mobility/components/MobilityCard.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    import { MobilityService } from '@/services/mobilityService';
    import { ref, watch } from 'vue';
    import { notification } from 'ant-design-vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

    const { autocompleteResult } = useAutoComptetion('address');

    const breadcrumbListsData = [
        {
            url: '/mobilite',
            label: 'Mobilité',
        },
        {
            label: 'Défectuosité',
        },
    ];

    interface Option {
        value: string;
        label: string;
    }

    const options = ref<Option[]>([
        {
            value: 'Voirie',
            label: 'Voirie',
        },
        {
            value: 'Propreté publique ',
            label: 'Propreté publique ',
        },
        {
            value: 'Plantation',
            label: 'Plantation',
        },
        {
            value: 'Signalisation',
            label: 'Signalisation',
        },
        {
            value: 'Eclairage',
            label: 'Eclairage',
        },
        {
            value: 'Mobilier urbain',
            label: 'Mobilier urbain',
        },
        {
            value: 'Monument',
            label: 'Monument',
        },
        {
            value: 'Véhicule abandonné ',
            label: 'Véhicule abandonné ',
        },
    ]);
    const params = ref<object>({});
    const loading = ref<boolean>(false);

    watch(
        () => autocompleteResult,
        (value) => {
            params.value = {
                ...params.value,
                address: value.value?.address,
            };
        },
        { immediate: true, deep: true }
    );

    const handleChange = function (e: any) {
        params.value = {
            ...params.value,
            ...e,
        };
        console.log(params.value);
    };

    const handleValide = async function () {
        try {
            loading.value = true;
            await MobilityService.setDefectuosity(params.value);
            notification['success']({
                message: 'Succès',
                description: 'Declaration de Défectuosité a été effectué',
            });
        } catch (error) {
            console.log(error);
            notification['error']({
                message: 'Erreur',
                description:
                    "Une erreur s'est produit, veuillez réessayer ou contacter l'admin",
            });
        } finally {
            loading.value = false;
        }
    };
</script>

<style lang="scss" scoped>
    .defect {
        &__form-item-wrap {
            @apply mb-[25px];
            label {
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                @apply text-black flex items-center mb-[10px] gap-x-[12px];
            }
            &:deep() {
                .custom-input__label-icon {
                    @apply hidden;
                }
            }
        }
        &__form-item {
            @apply mb-0;
        }
        &__map--item {
            max-height: 300px;
            @apply h-[300px] w-full mb-[10px];
            @screen md {
                max-height: calc(100vh - 275px);
                @apply h-[400px];
            }
            @screen lg {
                @apply h-[500px];
            }
            @screen xl {
                @apply h-[628px];
            }
        }
        &__choice {
          margin-bottom: 15px
        }
    }
    .btn-foot {
        @apply flex justify-end;
    }
</style>
