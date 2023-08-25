<template>
    <Modal title="Confimation" :isShowModal="isShow" @on-back="$emit('onBack')">
        <template #content>
            <div class="flex flex-col justify-center gap-[18px]">
                <Alert type="warning"
                    >Votre abonnement est en mode
                    <span class="font-[800]">{{
                        pricingStatement
                    }}</span></Alert
                >

                <Paragraphe
                    >Pour pouvoir publier votre annonce vous devriez mettre à
                    jour votre abonnement.</Paragraphe
                >
                <div class="wrap-button-confirmation">
                    <div class="flex gap-[12px] justify-between">
                        <Button
                            typeButton="primary-cancel"
                            @on-click="$emit('onBack')"
                        >
                            Quitter
                        </Button>
                        <Button
                            type="primary"
                            v-if="isInProductCard"
                            @on-click="handleSaveAndPricing('gotoPricing')"
                            class="w-[100%]"
                        >
                            <LoadingButton size="xs" v-if="isLoad" />Mettre à
                            jour l'abonnement
                        </Button>
                        <Button
                            type="primary"
                            v-else
                            @on-click="
                                handleSaveAndPricing('saveAndGotoPricing')
                            "
                        >
                            <LoadingButton size="xs" v-if="isLoad" />Enregistrer
                            l'annonce et mettre à jour l'abonnement
                        </Button>
                    </div>
                    <div
                        @click="handleSaveAndPricing('saveOnly')"
                        class="text-center text-primary cursor-pointer"
                        v-if="!isInProductCard"
                    >
                        <LoadingButton size="xs" v-if="isLoad" />
                        Enregistrer l'annonce et mettre à jour l'abonnement plus
                        tard
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { notification } from 'ant-design-vue';
    import { useRouter } from 'vue-router';
    import { useSlug } from '@/composables/user/useUsernameSlug';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import SubscriptionModal from '@/pages/subscription/subscriptionModal.vue';

    const props = defineProps({
        pricingStatement: {
            type: String,
        },
        showModal: {
            type: Boolean,
        },
        isInProductCard: {
            type: Boolean,
            default: false,
        },
    });
    const store = useStore();
    const router = useRouter();
    const slug = useSlug();
    const isShow = ref<boolean>(props.showModal);
    const isLoad = ref<boolean>(false);

    watch(
        () => props.showModal,
        (bool) => {
            isShow.value = bool;
        },
        { immediate: true }
    );

    async function handleSaveAndPricing(action: string) {
        isLoad.value = true;
        store.dispatch('AddProductModule/setPropertyData', {
            data: { skipAcl: true },
        });
        switch (action) {
            case 'gotoPricing':
                router.push('/abonnements');
                break;
            case 'saveOnly':
                try {
                    const { data, status } = await store.dispatch(
                        'AddProductModule/createProduct'
                    );
                    if (status == '201' || status == '200') {
                        notification['success']({
                            message: 'Succès',
                            description: 'Votre bien a été enregistré',
                        });
                        store.dispatch('AddProductModule/resetDataAction');
                        store.dispatch(
                            'AccountMenuSelectedModule/setSelectedMenu',
                            'Mes annonces'
                        );
                        router.push(slug.value);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    isLoad.value = false;
                }
                break;
            case 'saveAndGotoPricing':
                try {
                    const { status } = await store.dispatch(
                        'AddProductModule/createProduct'
                    );
                    if (status == '201' || status == '200') {
                        store.dispatch('AddProductModule/resetDataAction');
                        router.push('/abonnements');
                        notification['success']({
                            message: 'Succès',
                            description: 'Votre bien a été enregistré',
                        });
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    isLoad.value = false;
                }
                break;
        }
    }
</script>

<style lang="scss" scoped>
    .wrap-button-confirmation {
        @apply flex flex-col gap-[18px];
    }
</style>
