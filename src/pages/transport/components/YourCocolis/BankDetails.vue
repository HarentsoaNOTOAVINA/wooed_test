<template>
    <MainCard
        :dataBreadcrumbs="breadcrumbListsData"
        class="bank__section"
        :button="true"
        label-button="Enregistrer"
    >
        <div class="bank__container">
            <div class="bank__content">
                <Paragraphe>
                    Les informations du compte bancaire doivent être au même nom
                    que votre compte Cocolis
                </Paragraphe>
            </div>
            <div class="bank__form">
                <Input label="Adresse" placeholder="Input type text" />
                <Input
                    label="Complément d’adresse"
                    placeholder="Input type text"
                />
                <div class="bank__field-wrap">
                    <Input label="Code postal" placeholder="00" />
                    <Input label="Ville" placeholder="Input type text" />
                </div>
                <Input
                    label="Titulaire du compte"
                    placeholder="Input type text"
                />
                <Input
                    input-type="number"
                    label="IBAN"
                    placeholder="XX00 0000 0000 0000 0000 0000 000"
                />
            </div>
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        link: {
            type: String,
            default: '#',
        },
    });

    const breadcrumbListsData = [
        {
            label: 'Coordonnées bancaires',
        },
    ];
</script>
<style lang="scss" scoped>
    .bank {
        &__container {
            @apply flex flex-col gap-y-[18px];
        }
        &__form {
            @apply flex flex-col gap-[18px];
            &:deep() {
                .custom-input__fields {
                    @apply mb-0;
                }
                label {
                    @apply font-[600] text-black;
                }
            }
        }
        &__field-wrap {
            @apply grid grid-cols-1 gap-[18px];
            @screen sm {
                @apply grid-cols-2;
            }
            @screen md {
                @apply grid-cols-1;
            }
            @screen lg {
                @apply grid-cols-2;
            }
        }
    }
</style>
