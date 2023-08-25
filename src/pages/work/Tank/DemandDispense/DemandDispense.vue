<template>
    <div class="work">
        <div
            class="work__coords"
            v-for="(mainItem, mainIndex) in dispenseFormData"
            :key="mainIndex"
            v-if="step === 0"
        >
            <Title type="h3">{{ mainItem.title }}</Title>
            <div v-for="(item, index) in mainItem.item">
                <Input
                    v-if="item.type !== 'date'"
                    :label="item.label"
                    :nameInput="item.name"
                    :inputType="item.type"
                    @input="handleInput"
                />
                <InputDate
                    v-else
                    :label="item.label"
                    :name="item.name"
                    :format="item.placeholder"
                    :placeholder="item.placeholder"
                    @handleDateFormatFr="handleDate($event)"
                />
            </div>
        </div>

        <div v-for="item in radioData" v-if="step === 1">
            <Title type="h4" class="work__formTitle">{{ item.title }}</Title>
            <Radio
                :element="item.item"
                @get-radio-input="handleChangeRadio0($event)"
            />
        </div>
        <div v-if="step === 2">
            <div v-for="item in radioData1">
                <Title type="h4" class="work__formTitle">{{
                    item.title
                }}</Title>
                <Radio
                    :element="item.item"
                    @get-radio-input="handleChangeRadio1($event)"
                />
            </div>
            <div v-for="item in radioSubData1" v-if="radioDataValue1 === '§2'">
                <span>{{ item.title }}</span>
                <Radio
                    :element="item.item"
                    @get-radio-input="handleChangeRadio2($event)"
                />
            </div>
            <div v-for="item in radioSubData2" v-if="radioDataValue1 === '§3'">
                <span>{{ item.title }}</span>
                <Radio
                    :element="item.item"
                    @get-radio-input="handleChangeRadio3($event)"
                />
            </div>
            <div v-if="radioSubDataValue2 === 'forageImpossible'">
                <Paragraph
                    >Une dispense liée à une impossibilité technique a déjà été
                    accordée au paravant par Bruxelles Environnement, et je
                    déclare que le motif d’impossibilité technique persiste
                    toujours.
                </Paragraph>
                <CheckBox
                    label="Cas d'impossibilité technique continue "
                    name="checkImpossible"
                    @handleCheck="handleCheckBox"
                />
            </div>
        </div>
        <div v-if="radioDataValue1 === '§3' && step === 2">
            <UploadImage @uploadFileList="handleUpload" />
        </div>
        <div v-if="step === 3">
            <CheckBox
                label="Je déclare que toutes les informations de ce formulaire sont exactes et complètes."
                name="declaration"
                @handleCheck="handleCheckBox"
            />
        </div>
        <div class="work__btnContainer">
            <Button v-if="step > 0" @on-click="previousStep">Précedent</Button>
            <Button v-if="step < 3" @on-click="nextStep">Suivant</Button>
            <Button
                :disabled="declared"
                v-if="step === 3"
                @on-click="sendDispense"
                ><LoadingButton size="xs" v-if="btnLoad" /> Envoyer</Button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import {
        dispenseFormData,
        radioData,
        radioData1,
        radioSubData1,
        radioSubData2,
    } from './data';
    import { onMounted, ref } from 'vue';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { Store, useStore } from 'vuex';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { createFormData } from '@/utils/formdata/formData';

    const props = defineProps(['demandData', 'obliData']);

    const emit = defineEmits(['closeModalDispense']);

    let params = ref<any>({
        coordinateNameOrSociety: '',
        coordinateAdress: '',
        phone: '',
        email: '',
        siteDemandAdress: '',
        firstReferenceCadastral: '',
        secondReferenceCadastral: '',
        thirdReferenceCadastral: '',
        groundReference: '',
        declarationDate: '',
        currentGeneratorFact: '',
        dispenseType: '',
        plot: '',
        raison: '',
        declaration: '',
        theProperty: '',
        typeOfWork: '',
        choiceCategory: '',
        model: '',
        subSection: '',
        casTechnic: '',
    });
    let radioDataValue = ref<string>('');
    let radioDataValue1 = ref<string>('');
    let radioSubDataValue2 = ref<string>();
    let step = ref<number>(0);
    let declared = ref<boolean>(true);
    let btnLoad = ref<boolean>(false);
    const store: Store<any> = useStore();

    onMounted(() => {
        console.log('props needed 1:', props.demandData);
        console.log('props needed 2:', props.obliData);
    });

    const sendDispense = async () => {
        btnLoad.value = true;
        let param = createFormData(params.value);
        
        try {
            let res = await store.dispatch('WorksModule/setAddDispense', param);
            if (res.code === 200) {
                notification['success']({
                    message: 'Votre demande de dispense a bien été envoyer',
                });
            } else {
                notification['error']({
                    message: 'Une erreur est survenue',
                    description: 'Veuillez réessayer...',
                });
            }
            btnLoad.value = false;
            console.log('res send dispense:', res);
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoad.value = false;
        }
        emit('closeModalDispense');
    };

    const nextStep = () => {
        step.value += 1;
    };

    const previousStep = () => {
        step.value -= 1;
    };

    const handleUpload = (value: any) => {
        params.value.annexeVichFile = value[0];
        console.log('up:', value);
    };

    const handleCheckBox = (value: any) => {
        if (value.declaration) {
            declared.value = false;
            params.value.declaration = value.declaration;
            console.log('check:', params.value);
        } else if (value.checkImpossible) {
            console.log('checkImpossible:', value.checkImpossible);
            params.value.casTechnic = value.checkImpossible;
        }
        // console.log('value checkbox:', params.value);
    };

    const handleChangeRadio0 = (value: any) => {
        radioDataValue.value = value.target.value;
        params.value.currentGeneratorFact =
            value.nativeEvent.target.labels[0].innerText;
        console.log('handleChangeRadio0:', params.value);
    };

    const handleChangeRadio1 = (value: any) => {
        radioDataValue1.value = value.target.value;
        if (radioDataValue1.value === '§2') {
            radioSubDataValue2.value = '';
        }
        params.value.dispenseType =
            value.nativeEvent.target.labels[0].innerText;
        console.log('radioDataValue1.value:', params.value);
    };
    const handleChangeRadio2 = (value: any) => {
        params.value.plot = value.nativeEvent.target.labels[0].innerText;
        console.log('value:', params.value);
    };
    const handleChangeRadio3 = (value: any) => {
        radioSubDataValue2.value = value.target.value;
        params.value.raison = value.nativeEvent.target.labels[0].innerText;
        console.log('radioSubDataValue2:', params.value);
    };

    const handleInput = (item: any) => {
        if (item.societyName) {
            params.value.coordinateNameOrSociety = item.societyName;
        } else if (item.adress) {
            params.value.coordinateAdress = item.adress;
        } else if (item.phon) {
            params.value.phone = item.phon;
        } else if (item.mail) {
            params.value.email = item.mail;
        } else if (item.propertyAdress) {
            params.value.siteDemandAdress = item.propertyAdress;
        } else if (item.firstReferenceCadastral) {
            params.value.firstReferenceCadastral = item.firstReferenceCadastral;
        } else if (item.secondReferenceCadastral) {
            params.value.secondReferenceCadastral =
                item.secondReferenceCadastral;
        } else if (item.thirdReferenceCadastral) {
            params.value.thirdReferenceCadastral = item.thirdReferenceCadastral;
        } else if (item.groundReference) {
            params.value.groundReference = item.groundReference;
        }
        console.log('input:', params.value);
    };

    const handleDate = (value: any) => {
        params.value.declarationDate = value.dateDeclaration;
    };
</script>

<style lang="scss" scoped>
    .work {
        &__formTitle {
            @apply text-[var(--color-primary)] mb-[14px];
        }

        &__btnContainer {
            @apply flex flex-row justify-end gap-[8px] mt-[14px];
        }
    }
</style>
