<template>
    <div class="work">
        <Loading v-if="loading" />
        <div class="work__listContainer" v-for="(item, index) in expertData">
            <ExpertCard
                :loadingBtn="loadingBtn"
                :expertData="item"
                :expertName="expertName"
                :isShowModalRate="isShowModalRate"
                @cancelRating="onCloseModalRate"
                @validateRate="validateRate"
                @handleChoiceExpert="handleChoiceExpert"
                @showModalRate="showModalRate"
                @onCloseModalRate="onCloseModalRate"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import ExpertCard from '../../Components/ExpertCard/index.vue';
    import Loading from '@/components/Common/Loader/Loader.vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';

    const expertData = ref<Array<any>>([]);
    const store: Store<any> = useStore();
    let list = ref<Array<any>>([]);
    let loading = ref<boolean>(false);
    let isShowModalRate = ref<boolean>(false);
    let expertName = ref<string>('');
    let expertRate = ref<string>('');
    let paramsRating = ref<any>({
        number: '',
        expert: '',
    });
    let loadingBtn = ref<boolean>(false);

    onMounted(() => {
        getListExpert();
    });

    const emit = defineEmits<{
        (event: 'handleChoiceExpert', value: any): void;
    }>();

    const validateRate = async (value: any) => {
        paramsRating.value.number = value;
        try {
            loadingBtn.value = true;
            let req = await store.dispatch(
                'WorksModule/setRating',
                paramsRating.value
            );
            if (req.code === 200) {
                notification['success']({
                    message: 'Votre demande de devis a bien été envoyer',
                });
            } else {
                notification['error']({
                    message: 'Une erreur est survenue',
                    description: 'Veuillez réessayer...',
                });
            }
            loadingBtn.value = false;
            console.log('rating final :', req);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            loadingBtn.value = false;
            isShowModalRate.value = false;
        }
    };

    const onCloseModalRate = () => {
        isShowModalRate.value = false;
    };

    const showModalRate = (expert: any) => {
        expertName.value = expert.office.name;
        expertRate.value = expert.office;
        isShowModalRate.value = true;
        paramsRating.value.expert = expert.id;
        console.log('expert detail to rate:', expert);
    };

    const handleChoiceExpert = (item: any) => {
        Object.values(item).forEach((el) => {
            const index = list.value.indexOf(item);
            if (el === true) {
                if (index === -1) {
                    list.value.push(item);
                }
            } else {
                list.value.splice(index, 1);
            }
        });

        console.log('list item:', list.value);
        emit('handleChoiceExpert', list.value);
    };

    const getListExpert = async () => {
        try {
            loading.value = true;
            await store.dispatch(
                'WorksModule/setListExpert',
                'Bruxelles-Capitale'
            );
            const data = computed(
                () => store.getters['WorksModule/getListExpert']
            );
            expertData.value = data.value.data;
            loading.value = false;
        } catch (error) {}
        console.log('data expert:', expertData.value);
    };
</script>

<style lang="scss" scoped>
    .work {
        @apply flex flex-col justify-center items-center;
        @screen md {
            @apply flex;
        }
        @screen lg {
            @apply grid grid-cols-2 gap-[14px];
        }
        &__listContainer {
        }
    }
</style>
