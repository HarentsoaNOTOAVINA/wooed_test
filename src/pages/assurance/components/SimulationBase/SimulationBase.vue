<template>
    <div class="content-container">
        <Title
            type="h4"
            label="A quoi ressemble votre habitation ?"
            weight="bold"
        />
        <div class="habitation-container">
            <div v-for="(item, index) in habitation" :key="index">
                <div
                    class="facade-icon"
                    @click="handleChooseFacade(item.type, index)"
                    :class="{ 'facade-icon--active': activeIdx === index }"
                >
                    <Facade :facade="item.icon" />
                </div>
                <Paragraphe>{{ item.label }}</Paragraphe>
            </div>
        </div>
        <div>
            <Input
                label="Prix"
                placeholder="Prix"
                :model="params.value"
                name-input="price"
                input-type="number"
                :required="true"
                @input="handleInput"
            />
        </div>
        <Paragraphe class="info">{{ errorMsg }}</Paragraphe>
        <Button
            typeButton="border"
            html-type="button"
            @click="handleShowResult"
            v-if="isOk && !result"
            :disabled="loadingBtn"
        >
            <LoadingButton size="sm" v-if="loadingBtn" />
            <span v-else>Lancer ma simulation de prix</span>
        </Button>
        <Result v-if="result" :data="dataComp" />
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Facade from '@/components/Icon/Facade.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { AssuranceService } from '@/services/assuranceService';
    import store from '@/store';
    import { Input } from 'ant-design-vue';
    import { ref } from 'vue';
    import Result from '../Result.vue';
    import { useRoute } from 'vue-router';

    const router = useRoute();

    //ref
    let isOk = ref<boolean>(false);
    const showErrorMsg = ref<boolean>(false);
    const loadingBtn = ref<boolean>(false);
    const activeIdx = ref<number>(-1);
    const errorMsg = ref<string>('');
    const habitation: typeHabitation[] = [
        {
            label: 'Appartement',
            icon: 'one',
            type: 'appartement',
        },
        {
            label: 'Maison à 2 façades',
            icon: 'two',
            type: '2',
        },
        {
            label: 'Maison à 3 façades',
            icon: 'three',
            type: '3',
        },
        {
            label: 'Maison à 4 façades',
            icon: 'four',
            type: '4',
        },
    ];

    const result = ref<boolean>(false);
    const dataComp = ref<any>();
    let params = ref<typeParams>({
        value: 0,
        propertyType: '',
    });

    // interface

    interface typeHabitation {
        label: string;
        icon: string;
        type: string;
    }
    interface typeParams {
        value: number;
        propertyType: string;
    }

    // props & emit
    const emit = defineEmits(['result']);

    //fn
    const handleChooseFacade = (facade: string, index: number) => {
        activeIdx.value = index;
        params.value.propertyType = facade;
        notNullError();
    };

    const handleInput = (e: any) => {
        if (e.target.value != '') {
            params.value.value = e.target.value;
        } else {
            params.value.value = 0;
        }
        notNullError();
    };

    const notNullError = () => {
        if (params.value.value != 0 && params.value.propertyType != '') {
            isOk.value = true;
            errorMsg.value = '';
        } else if (params.value.propertyType === '') {
            errorMsg.value = 'Veuillez completer le nombre de façade';
            isOk.value = false;
        } else if (params.value.value === 0) {
            errorMsg.value = 'Veuillez completer le prix de votre assurance';
            isOk.value = false;
        } else {
            showErrorMsg.value = true;
            isOk.value = false;
        }
    };

    const handleShowResult = async () => {
        loadingBtn.value = true;
        const form = params.value;
        console.log('router params >>>>', );

        // const idProperty = store.getters['PropertyDetailModule/getPropertyDetail'].data.id;
        try {
            const data = await AssuranceService.postSimulation({
                theProperty: parseInt(router.params.id as any),
                value: form.value,
                propertyType: form.propertyType,
            });
            const baseSimulationData = {
                theProperty: router.params.id,
                value: form.value,
                propertyType: form.propertyType,
            };
            dataComp.value = data.data.data;
            loadingBtn.value = false;
            result.value = true;
            store.dispatch('AssuranceModule/setAssurance', baseSimulationData);
            store.dispatch('AssuranceModule/setDataAssurance', data.data);
        } catch (error) {}
    };
</script>
<style lang="scss" scoped>
    .content-container {
        background-color: #fafafa;
        padding: 20px;
        display: flex;
        gap: 18px;
        flex-direction: column;
        align-items: center;
    }
    .habitation-container {
        display: flex;
        flex-wrap: wrap;
        width: 60%;
        justify-content: center;
        gap: 25px;
    }
    .facade-icon {
        :hover {
            border-radius: 100px;
            -webkit-box-shadow: inset 0px 0px 0px 2px var(--color-primary);
            -moz-box-shadow: inset 0px 0px 0px 2px var(--color-primary);
            box-shadow: inset 0px 0px 0px 2px var(--color-primary);
        }
        &--active {
            border-radius: 100px;
            -webkit-box-shadow: inset 0px 0px 0px 2px var(--color-primary);
            -moz-box-shadow: inset 0px 0px 0px 2px var(--color-primary);
            box-shadow: inset 0px 0px 0px 4px var(--color-primary);
        }
    }
    .info {
        font-weight: 300;
        font-size: 14px;
        font-style: italic;
        color: var(--color-gray-icon);
    }
</style>
