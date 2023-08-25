<template>
    <div class="boilerCost__container">
        <div class="boilerCost__header">
            <div class="boilerCost__back" @click="prev">
                <BackButtonVue />
            </div>
            <Paragraphe class="boilerCost__title">Calculer le coût</Paragraphe>
        </div>
        <hr class="separator" />
        <div class="boilerCost__result">
            <Paragraphe class="para" v-if="!loading"
                >Le coût de l'entretien de votre chaudière est de :
            </Paragraphe>
            <div class="boilerCost__cost" v-if="!loading">
                <Paragraphe>Montant : </Paragraphe>
                <Paragraphe
                    >{{
                        cost
                            ? separatorMillier(cost) + '€'
                            : "Pas d'information"
                    }}
                </Paragraphe>
            </div>

            <Loader class="loading" v-if="loading" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref } from 'vue';
    import BackButtonVue from '@/components/Common/BackButton/BackButton.vue';
    import { Store, useStore } from 'vuex';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const emit = defineEmits(['component', 'prev']);
    const windowWidth = ref<any>(window.innerWidth);
    const store: Store<any> = useStore();

    let cost = ref<number>(0);

    let dataPostToGetCost = ref<any>({
        idTypeOfWork: null,
        idSubSection: null,
        idCategory: null,
        idModel: null,
        idSubModel: null,
    });

    let loading = ref<boolean>(false);

    onMounted(() => {
        resize();
        loading.value = true;
        getTypeOfWordElevator().then(() => {
            postCost();
        });
    });

    function prev() {
        emit('prev');
    }

    function resize() {
        window.onresize = () => {
            windowWidth.value = window.innerWidth;
        };
    }

    async function getTypeOfWordElevator() {
        let data = await store.dispatch('WorksModule/setMaintainsMenu');
        data.forEach((item: any) => {
            switch (item.name) {
                case 'Chaudière':
                    dataPostToGetCost.value.idTypeOfWork = item.id;

                    break;

                default:
                    break;
            }
        });
    }

    async function postCost() {
        try {
            loading.value = true;
            console.log(dataPostToGetCost.value, 'DATA TEST');

            let { data } = await store.dispatch(
                'WorksModule/calculCostMaintainsTank',
                dataPostToGetCost.value
            );
            if (data.success && data.code == 200) {
                cost.value = data.data;
            }
        } catch (error) {
            console.log(error, 'Erreur getCost');
        } finally {
            loading.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .boilerCost {
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
        &__result {
            @apply relative;
        }
        &__header {
            @apply flex items-center;
        }
        &__back {
            @apply h-[40px] w-[40px] flex justify-center items-center rounded-[50%];
        }
        &__cost {
            @apply flex justify-between items-center bg-[var(--color-gray)] p-[20px] rounded-[8px] text-[var(--color-gray-icon)] font-bold;
        }
    }

    .para {
        @apply italic;
    }
    .loading {
        @apply mt-[50px] bg-[#fff] w-full h-[100px] rounded-[8px];
    }
</style>
