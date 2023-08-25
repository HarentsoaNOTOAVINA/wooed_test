<template>
    <div class="myConnectionSupplier__container">
        <div class="myConnectionSupplier__items">
            <div class="myConnectionSupplier__form">
                <Title
                    type="h3"
                    weight="400"
                    label="Fournisseur"
                    class="myConnectionSupplier__subtitle"
                />
                <hr class="__hr" />
                <Switch
                    item-label="Actuellement un autre fournisseur d’énergie ?"
                    name="otherEnergySupplier"
                />
            </div>
            <div class="myConnectionSupplier__form">
                <Title
                    type="h3"
                    weight="400"
                    label="Code postale"
                    class="myConnectionSupplier__subtitle"
                />
                <hr class="__hr" />
                <Input
                    label="Quelle est votre code postale ?"
                    placeholder="Input type text"
                    name-input="postalCode"
                />
            </div>
            <div class="myConnectionSupplier__form">
                <Title
                    type="h3"
                    weight="400"
                    label="Energie"
                    class="myConnectionSupplier__subtitle"
                />
                <hr class="__hr" />
                <Input
                    label="Combien d’énergie consommez-vous par an ?"
                    placeholder="m3/kwh"
                    name-input="energyConsume"
                />
            </div>
            <div class="myConnectionSupplier__form">
                <Title
                    type="h3"
                    weight="400"
                    label="Panneaux solaire"
                    class="myConnectionSupplier__subtitle"
                />
                <hr class="__hr" />
                <Switch
                    item-label="Avez-vous des panneaux solaire ?"
                    name="solarPanel"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
</script>

<style lang="scss" scoped>
    .myConnectionSupplier {
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
        }
        &__items {
            @apply flex flex-col gap-[18px];
        }
        &__subtitle {
            @apply text-secondary text-[14px];
        }
        &__form {
            @apply flex flex-col gap-[18px];
            &:deep() {
                .custom-input__fields,
                .custom-select__wrapper {
                    @apply mb-0;
                }
                .date__space {
                    gap: 0 !important;
                }
                .date__label {
                    @apply mb-[10px];
                }
                label {
                    @apply font-[600];
                }
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
