<template>
    <div class="company__container">
        <div class="company__header">
            <div class="company__back" @click="prev">
                <BackButtonVue />
            </div>
            <Paragraphe class="company__title"
                >Liste des entreprises ayant un certificat valable</Paragraphe
            >
        </div>
        <hr class="separator" />
        <div class="company__content-result">
            <CardCompanyMaintains :dataCompany="dataCompany" v-if="!loading" />
            <Loader class="loading" v-if="loading" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref, computed } from 'vue';
    import BackButtonVue from '@/components/Common/BackButton/BackButton.vue';
    import CardCompanyMaintains from '../../Components/CardCompanyMaintains.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { Store, useStore } from 'vuex';

    const emit = defineEmits(['component', 'prev']);

    let store: Store<any> = useStore();
    const windowWidth = ref<any>(window.innerWidth);
    let dataCompany = ref<any>([]);
    let loading = ref<boolean>(false);

    onMounted(() => {
        resize();
        getExpertElevator();
    });

    function prev() {
        emit('prev');
    }

    function resize() {
        window.onresize = () => {
            windowWidth.value = window.innerWidth;
        };
    }

    async function getExpertElevator() {
        try {
            loading.value = true;
            await store.dispatch('WorksModule/setExpertElevator');

            let code = computed(
                () => store.getters['WorksModule/getExpertElevator'].code
            );

            console.log(code.value, 'CODE');

            if (code.value === 200) {
                let data = computed(
                    () => store.getters['WorksModule/getExpertElevator'].data
                );

                dataCompany.value = [...data.value];

                console.log(dataCompany.value, 'Data companaty');
            }
        } catch (error) {
            console.log(error, 'Erreur list Expert');
        } finally {
            loading.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .company {
        &__container {
            @apply bg-white rounded-[8px] p-[18px] flex flex-col min-h-[89vh];
        }
        &__title {
            color: var(--color-gray-icon);
            font-weight: 600;
            @apply text-[16px];
        }
        &__subtitle {
            color: #949fb5;
            font-weight: 400;
        }
        &__subItem {
            @apply flex flex-col gap-[24px];
        }
        &__subItem-content {
            @apply md:grid md:grid-cols-2 gap-[24px];
        }
        &__header {
            @apply flex;
        }
        &__back {
            @apply h-[40px] w-[40px] flex justify-center items-center rounded-[50%];
        }
        &__content-result {
            @apply relative;
        }
    }
    .loading {
        @apply mt-[50px] bg-[#fff] w-full h-[100px] rounded-[8px];
    }
</style>
