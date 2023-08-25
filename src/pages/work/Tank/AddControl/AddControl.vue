<template>
    <div class="work">
        <div class="work__form">
            <DatePicker
                :max="true"
                name="controlDate"
                label="Date du controle"
                placeholder="Selectionner la date du controle"
                @handleDateFormatFr="handleDate($event)"
            />
            <UploadImage @uploadFileList="handleUpload" />
            <Input
                @input="handleInput"
                label="Cout du controle"
                nameInput="costControl"
                unity="€"
                placeholder="0"
            />
            <div class="work__btnContainer">
                <Button @on-click="addControl">
                    <LoadingButton size="xs" v-if="btnLoad" /> Ajouter
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import DatePicker from '@/components/Common/InputDate/InputDate.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import { onMounted, ref } from 'vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';

    onMounted(() => {
        console.log('demand data add control:', props.demandData);
        console.log('obli data add control:', props.obliData);
    });

    const emit = defineEmits(['closeModal']);

    const props = defineProps(['demandData', 'obliData']);
    const store: Store<any> = useStore();
    const route = useRoute();
    let dateControl = ref<number | string>();
    let pdfFile = ref<Array<any>>([]);
    let costControl = ref<number>();
    let btnLoad = ref<boolean>(false);

    const addControl = async () => {
        let params: object = {
            thePropertyId: route.params.id,
            typeControls: '',
            dateControls: dateControl.value,
            stateControls: '',
            costControls: costControl.value,
            document: pdfFile.value,
            model: props.obliData.id,
            typeOfWork: props.demandData.thePropertyId,
            subsection: props.demandData.subsection,
            category: props.demandData.category,
        };

        try {
            btnLoad.value = true;
            const data = await store.dispatch(
                'WorksModule/setAddControl',
                params
            );
            if (data.code === 200) {
                notification['success']({
                    message: 'Votre controle a bien été enregistrer',
                });
                emit('closeModal');
            } else {
                notification['error']({
                    message: 'Une erreur est survenue',
                    description: 'Veuillez réessayer...',
                });
            }
            btnLoad.value = false;
            console.log('data control:', data);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        }
    };

    const handleInput = (value: any) => {
        costControl.value = value.costControl;
        console.log('value input:', costControl.value);
    };

    const handleUpload = (value: any) => {
        pdfFile.value = value;
        console.log('up:', pdfFile.value);
    };

    const handleDate = (value: any) => {
        dateControl.value = value.controlDate;
        console.log('date control:', dateControl.value);
    };
</script>

<style lang="scss" scoped>
    .work {
        &__form {
            @apply flex flex-col gap-[18px];
        }

        &__btnContainer {
            @apply w-full flex justify-end;
        }
    }
</style>
