<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            class="collectiveGarden"
            :borderBottom="true"
        >
            <div class="collectiveGarden__container">
                <RouterLink to="attribution" class="shortcut__container">
                    <div class="shortcut__main-content">
                        <Icon icon-name="Parcels" class="shortcut__icon" />
                        <span class="shortcut__title"
                            >Attribution des parcelles biologiques</span
                        >
                    </div>
                    <Icon iconName="ArrowNext" />
                </RouterLink>
                <div class="shortcut__container" @click="handleClick">
                    <div class="shortcut__main-content">
                        <Icon icon-name="NewGarden" class="shortcut__icon" />
                        <span class="shortcut__title"
                            >Créer un nouveau jardin collectif</span
                        >
                    </div>
                    <Icon iconName="ArrowNext" />
                </div>
                <RouterLink to="joindre-jardin-existant" class="shortcut__container">
                    <div class="shortcut__main-content">
                        <Icon icon-name="JoinGarden" class="shortcut__icon" />
                        <span class="shortcut__title"
                            >Joindre un jardin collectif existant</span
                        >
                    </div>
                    <Icon iconName="ArrowNext" />
                </RouterLink>
                <RouterLink to="mes-jardins-collectifs" class="shortcut__container">
                    <div class="shortcut__main-content">
                        <Icon
                            icon-name="CollectiveGarden"
                            class="shortcut__icon"
                        />
                        <span class="shortcut__title"
                            >Mes jardins collectifs</span
                        >
                    </div>
                    <Icon iconName="ArrowNext" />
                </RouterLink>
            </div>
        </MainCard>
        <Modal
            title="Créer un nouveau projet"
            :isShowModal="isShowModal"
            @onBack="isShowModal = false"
        >
            <template #content>
                <form method="post" class="collectiveGarden__form">
                    <Input
                        label="Entrer le nom de votre projet :"
                        name-input="name"
                        @input="($event)=>{collectiveGardenName  = $event}"
                    />
                    <div method="post" class="collectiveGarden__button">
                        <Button class="collectiveGarden__button-cancel" @click="isShowModal = false">
                            Annuler
                        </Button>
                        <Button @click="handleCreateCollectiveGarden"> Envoyer </Button>
                    </div>
                </form>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { computed, ref } from 'vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import {  useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    const router = useRouter()
    const store  = useStore()
    const breadcrumbListsData = [
        {
            label: 'Jardin collectif',
        },
    ];
    const owner  = computed(()=>store.getters["UserModule/getUserDetails"])
    const isShowModal = ref<boolean>(false);
    const collectiveGardenName = ref<object>(); 
    const handleClick = (value: object) => {
        isShowModal.value = true;
    };
    function handleCreateCollectiveGarden(){
        const payload = {
                            ...collectiveGardenName.value,
                            step : 0,
                            ownerId : owner.value.id
                        }
        store.dispatch('CollectiveGardenModule/postCollectiveGardenData',payload)
        isShowModal.value = false;
        router.push('nouveau-jardin');
    }
</script>

<style lang="scss" scoped>
    .collectiveGarden {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        .shortcut {
            &__container {
                @apply flex items-center justify-between w-full py-3 px-5 rounded-lg border;
                border-color: var(--color-stroke-gray);
                @screen md {
                    &:hover {
                        @apply cursor-pointer;
                        color: var(--color-primary);
                    }
                }
            }

            &__main-content {
                @apply flex items-center duration-300;
            }

            &__title {
                @apply font-[600] text-grayIcon;
            }

            &__icon {
                @apply h-5 w-5 mr-4;
            }
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
                    @apply font-[600] text-black;
                }
            }
        }
        &__button {
            @apply flex items-center justify-end gap-[14px];
            &-cancel {
                &:deep() {
                    button {
                        @apply bg-gray text-primary;
                    }
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
