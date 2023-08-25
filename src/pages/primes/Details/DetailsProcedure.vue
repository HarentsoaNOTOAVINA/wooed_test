<template>
    <div class="details__container">
        <CardWrapper class="details__wrap">
            <Loader v-if="loading" />
            <div v-else class="details__wrap-content">
                <div class="details__header">
                    <BackButton @click="onClickBack" />
                    <P class="details__title">Details procedure</P>
                </div>
                <Divider class="divider" />
                <div class="details__name-container">
                    <Title type="h2" weight="bold">{{
                        detailsProcedure?.prime?.name
                    }}</Title>
                    <Icon icon-name="InfoIcon" class="details__icon-info" @click="handleShowModal"/>
                </div>

                <router-link to="" class="form-demand">
                    Remplir le fomulaire de demande</router-link
                >
                <div class="details__content">
                    <Steps
                        :is-title="widthScreen > 1023 ? true: false"
                        :data="detailsProcedure?.procedures"
                    />
                </div>
            </div>
        </CardWrapper>

        <Modal 
            :is-visible="showModal"
            @back="handleShowModal"
            :data="detailsProcedure"
            title="Détails de la prime"
        />
    </div>
</template>

<script lang="ts" setup>
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Steps from '../components/Steps.vue';
    import Modal from '@/pages/primes/components/Modal/Modal.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';

    import { useRouter, useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import { onMounted } from 'vue';
    import { ref, watch, nextTick } from 'vue';
    import { Divider } from 'ant-design-vue';

    const router = useRouter();
    const routes = useRoute();
    const store = useStore();
    const detailsProcedure = ref<any>(null);
    const loading = ref<boolean>(false);
    const widthScreen = ref<number>((window as any).screen.width);
    const showModal = ref<boolean>(false);

    onMounted(() => {
        getProcedure();
        nextTick(() => {
            window.addEventListener('resize', srceenWidth);
        });
    });

    watch(() => detailsProcedure.value, (value) => {
        detailsProcedure.value = value;
    }, {immediate : true, deep : true});

    const srceenWidth = function() {
        widthScreen.value = (window as any).screen.width
    }

    async function getProcedure() {
        loading.value = true;
        detailsProcedure.value = await store.dispatch(
            'PrimesModule/getDetailsProcedure',
            routes.params.id
        );
        console.log(detailsProcedure.value);

        loading.value = false;
    }

    function onClickBack() {
        router.back();
    }

    function handleShowModal(){
        showModal.value = !showModal.value;
    }
</script>

<style lang="scss" scoped>
    .details {
        &__container {
            @apply container mt-[10px] lg:mt-[20px];
        }
        &__wrap {
            display: flex;
            min-height: calc(100vh - 80px);
        }
        &__header {
            @apply flex gap-[10px];
        }

        &__title {
            @apply font-semibold;
        }
        &__wrap-content {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        &__content {
            height: 100%;
        }

        &__name-container{
            @apply flex gap-[20px];
        }

        &__icon-info{
            @apply cursor-pointer;
        }
    }
    .divider {
        margin: 10px 0 15px;
    }
    .form-demand {
        font-size: 14px;
        font-size: 400;
        color: #2f70e9;
        display: block;
        margin-bottom: 15px;
    }
</style>
