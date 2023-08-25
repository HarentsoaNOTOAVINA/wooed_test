<template>
    <div class="work">
        <Title type="h4"
            >Envoyer une demande de solicitation de dispense à votre
            notaire</Title
        >
        <label for="" class="label-select">Notaire</label>
        <a-select
            style="width: 100%"
            show-search
            placeholder="Selectionner un notaire"
            :options="notaryList"
            @change="selectNotary"
        ></a-select>
        <Button @on-click="sendToNotary">
            <LoadingButton size="xs" v-if="loadBtn" /> Envoyer la demande
        </Button>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { computed, onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import ASelect, {
        DefaultOptionType,
        SelectValue,
    } from 'ant-design-vue/lib/select';
    import { useRoute } from 'vue-router';
    import { Empty as AEmpty, notification } from 'ant-design-vue';

    onMounted(() => {
        getNotary();
        console.log('ppppp:', props.demandData);
    });

    const route = useRoute();
    const props = defineProps(['demandData']);
    const store: Store<any> = useStore();
    let notaryList = ref<Array<any>>([]);
    let notarySelected = ref<string>('');
    let loadBtn = ref<boolean>(false);

    const emit = defineEmits(['closeModalDispense']);

    const sendToNotary = async () => {
        try {
            loadBtn.value = true;
            let res = await store.dispatch(
                'WorksModule/setDemandDispenseNotry',
                {
                    idTypeofWork: props.demandData.typeOfWorkId,
                    idTheProperty: route.params.id,
                    notary_mail: notarySelected.value,
                }
            );
            if (res.code === 200) {
                notification['success']({
                    message: 'La demande a été envoyer avec succes',
                });
            } else {
                notification['error']({
                    message: 'Une erreur est survenue',
                    description: 'Veuillez réessayer...',
                });
            }
            loadBtn.value = false;
            console.log('res', res);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            loadBtn.value = false;
            emit('closeModalDispense');
        }
    };

    const selectNotary = (item: any) => {
        let selected: Array<any> = notaryList.value.filter(
            (obj: any) => obj.value === item
        );
        notarySelected.value = selected[0].email;
        console.log('item:', notarySelected.value);
    };

    const getNotary = async () => {
        try {
            await store.dispatch('MakeOfferModule/setNotaryList');
            const res = computed(
                () => store.getters['MakeOfferModule/getNotaryList']
            );
            notaryList.value = res.value.map(
                ({ firstname, email, name, id }: any) => ({
                    value: firstname,
                    label: name,
                    key: id,
                    email,
                })
            );
            console.log('res notary:', notaryList.value);
        } catch (error) {}
    };
</script>

<style lang="scss" scoped>
    .work {
        @apply flex flex-col gap-[18px];
    }
</style>
