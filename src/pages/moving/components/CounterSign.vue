<template>
    <div class="moving-container">
        <Title
            label="Plate-forme commune entre acquéreur et vendeur"
            type="h4"
            class="title"
        />
        <MyAccount class="my-account" energy-name="Eau" />

        <Signature
            @signature="saveSignature"
            @supp="deleteSignature"
            :hasTitle="true"
            title="Signature"
        />
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MyAccount from '@/pages/supplier/components/Gas/MyAccount.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import Signature from '@/components/Display/signatureCard/SignatureCard.vue';

    const store = useStore();
    let signature = ref<string>('');
    let dataParams = ref({});

    onMounted(() => {
        store.dispatch('SupplierModule/updateEnergyType', 'water');
    });

    const saveSignature = (imgSignature: string) => {
        signature.value = imgSignature;
        dataParams.value = {
            ...dataParams.value,
            ...{ clientSign: signature.value },
        };
    };

    const deleteSignature = (imgSignature: string) => {
        signature.value = imgSignature;
    };
</script>
<style lang="scss" scoped>
    .title {
        @apply text-primary font-[500] mb-[18px];
    }
    .my-account {
        width: 100%;
        &:deep() {
            .myAccount {
                &__title,
                .__hr {
                    display: none;
                }
            }
            .mainCard {
                height: auto;
                max-width: 100%;
                &__items-wrap-btn {
                    margin: 0;
                    padding: 0;
                    height: auto;
                }
                &__container {
                    padding: 0;
                    height: auto;
                }
                &__head-items {
                    display: none;
                }
            }
        }
    }
</style>
