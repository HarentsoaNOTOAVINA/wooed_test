<template>
    <div class="costComp__container">
        <div class="costComp__header" v-if="showHeader">
            <div class="costComp__back" @click="prev">
                <BackButtonVue />
            </div>
            <Paragraphe class="costComp__title">Calculer le coût</Paragraphe>
        </div>
        <hr class="separator" v-if="showHeader" />
        <div class="costComp__result">
            <Paragraphe class="para" v-if="!loading"
                >{{ paraTitle }}
            </Paragraphe>
            <div class="costComp__cost" v-if="!loading">
                <Paragraphe>Montant : </Paragraphe>
                <Paragraphe>{{ separatorMillier(cost) }} €</Paragraphe>
            </div>
            <Loader class="loading" v-if="loading" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref, computed, watch } from 'vue';
    import BackButtonVue from '@/components/Common/BackButton/BackButton.vue';
    import { Store, useStore } from 'vuex';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import { notification, Alert as AAlert } from 'ant-design-vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { useRoute, useRouter } from 'vue-router';

    const props = defineProps({
        paraTitle: {
            type: String,
            default: "D'après le calcule le coût de votre travaux est de : ",
        },
        loading: {
            type: Boolean,
            default: false,
        },
        cost: {
            type: Number,
            default: 0,
        },
        showHeader: {
            type: Boolean,
            default: true,
        },
    });
    const emit = defineEmits(['component', 'prev']);
    const windowWidth = ref<any>(window.innerWidth);
    const store: Store<any> = useStore();
    const route = useRoute();
    const router = useRouter();

    let dataTest = ref<any>({
        idTypeOfWork: null,
        idSubSection: null,
        idCategory: null,
        idModel: null,
        idSubModel: null,
    });

    let dataRegister = ref<any>({
        idExpert: null,
        idTheProperty: route.params.id,
        idWorkCost: null,
        estimatedCost: null,
    });

    onMounted(() => {
        resize();
        // getTypeOfWordElevator().then(() => {
        //     postCost();
        // });
    });

    function prev() {
        emit('prev');
    }

    function resize() {
        window.onresize = () => {
            windowWidth.value = window.innerWidth;
        };
    }

    // async function getTypeOfWordElevator() {
    //     let data = await store.dispatch('WorksModule/setMaintainsMenu');
    //     data.forEach((item: any) => {
    //         switch (item.name) {
    //             case 'Ascenseurs':
    //                 dataTest.value.idTypeOfWork = item.id;
    //                 console.log(dataTest.value, 'TEST');

    //                 break;

    //             default:
    //                 break;
    //         }
    //     });
    // }

    // async function postCost() {
    //     try {
    //         loading.value = true;
    //         console.log(dataTest.value, 'DATA TEST');

    //         await store.dispatch('WorksModule/setCostElevator', dataTest.value);
    //         let { status, data } = store.getters['WorksModule/getCostElevator'];
    //         console.log(data, 'DATA');

    //         if (status === 200) {
    //             cost.value = data.data;
    //             dataRegister.value.idWorkCost = data.workCost.id;
    //             dataRegister.value.estimatedCost = data.data;

    //         }
    //     } catch (error) {
    //         console.log(error, 'Erreur getCost');
    //     } finally {
    //         loading.value = false;
    //     }
    // }
</script>

<style lang="scss" scoped>
    .costComp {
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

    .elevatorMaintains {
        &__register {
            @apply text-right mt-[10px];
        }
    }

    .para {
        @apply italic;
    }
    .loading {
        @apply mt-[50px] bg-[#fff] w-full h-[100px] rounded-[8px];
    }
</style>
