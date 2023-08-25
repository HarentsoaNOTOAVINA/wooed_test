<template>
    <div class="boilerReplace__container">
        <div class="boilerReplace__container-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe
                >Trouver une entreprise agréée pour l’installation
            </Paragraphe>
        </div>
        <hr class="separator" />
        <div class="boilerReplace__listContainer">
            <div
                class="boilerReplace__content"
                v-for="(item, index) in expertData"
            >
                <ExpertCard
                    :expertData="item"
                    @handleChoiceExpert="handleChoiceExpert"
                />
            </div>
            <Loading class="loading" v-if="loading" />
        </div>

        <div class="boilerReplace__btn" v-if="listIdExperts.length > 0">
            <Button @on-click="$emit('component', CostReplaceComp)"
                >Calculer le coût</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import Loading from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ExpertCard from '../../Components/ExpertCard/index.vue';
    import CostReplaceComp from './CostReplaceComp.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { ref, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import Button from '@/components/Common/Button/Button.vue';

    const store = useStore();
    const route = useRoute();

    let loading = ref<boolean>(false);
    const expertData = ref<Array<string>>([]);
    let list = ref<Array<any>>([]);
    let listIdExperts = ref<Array<any>>([]);
    let dataToSaveWorkBoiler = ref<any>();

    let boilerReplace = ref<any>({
        region: '',
        speciality: 'Boiler',
    });

    let dataPostSendDevise = ref<any>({
        idTheProperty: route.params.id,
        extProviderId: [],
    });

    onMounted(async () => {
        await getDetailStore();
        await getListExpert();
    });

    function getDetailStore() {
        let data = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        console.log(data.value.length, 'dtatatata');

        if (data.value.length != 0) {
            boilerReplace.value.region = data.value[0].region;
        } else {
            try {
                store.dispatch(
                    'PropertyDetailModule/setPropertyData',
                    route.params.id
                );
                const data = computed(
                    () =>
                        store.getters['PropertyDetailModule/getPropertyDetail']
                );
                boilerReplace.value.region = data.value.data.region;
            } catch (error) {
                console.log('error getting detail detail property:', error);
            } finally {
                loading.value = false;
            }
        }
    }

    async function getListExpert() {
        try {
            loading.value = true;
            await store.dispatch(
                'WorksModule/setListExpertDynam',
                boilerReplace.value
            );
            const data = computed(
                () => store.getters['WorksModule/getListExpertDynam']
            );
            expertData.value = data.value.data;
            loading.value = false;
        } catch (error) {}
        console.log('data expert:', expertData.value);
    }

    const handleChoiceExpert = (item: any) => {
        Object.values(item).forEach((el) => {
            const index = list.value.indexOf(item);
            if (el === true) {
                if (index === -1) {
                    list.value.push(item);
                    listIdExperts.value.push(Object.keys(item));
                }
            } else {
                list.value.splice(index, 1);
                listIdExperts.value.splice(index, 1);
            }
        });

        dataPostSendDevise.value.extProviderId = listIdExperts.value;

        let transformData = listIdExperts.value.map((item) => {
            return parseInt(item[0]);
        });

        dataToSaveWorkBoiler.value = {
            ...dataToSaveWorkBoiler.value,
            ...{ idExpert: transformData },
        };

        store.dispatch(
            'WorksModule/setDataSaveBoiler',
            dataToSaveWorkBoiler.value
        );
    };
</script>

<style scoped lang="scss">
    .boilerReplace {
        &__container {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__container-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
        &__content {
            &:deep() {
                .expertCard {
                    width: auto;
                    height: 100%;
                }
            }
        }

        &__listContainer {
            @apply relative;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            @screen sm {
                grid-template-columns: repeat(2, 1fr);
            }

            @screen md {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        &__btn {
            @apply fixed bottom-0 right-[18px] min-w-[100px] h-[50px];
        }
    }

    .separator {
        @apply my-[15px];
    }

    .loading {
        @apply h-[89vh] bg-[#fff];
    }
</style>
