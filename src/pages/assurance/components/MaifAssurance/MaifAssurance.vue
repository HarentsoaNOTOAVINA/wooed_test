<template>
    <div class="container" v-if="!showResult">
        <Title type="h4" label="Assurance habitation MAIF" weight="bold" />
        <!-- eto ny choix type de bien -->
        <PropertyDetailDisplay :property="property" />
        <div>
            <Title
                class="font-semibold leading-tight text-primary"
                type="h4"
                label="Valeurs des biens"
            />
            <hr class="divider" />
        </div>
        <Input
            label="Quelle est la valeur de vos biens usuels ?"
            :placeholder="params.price ? params.price : 'Quelle est la valeur de vos biens usuels ?'"
            name-input="price"
            input-type="number"
            :has-error="{
                status: errors.price !== '',
                errorMsg: errors.price as string,
            }"
            :required="true"
            @input="handleInput"
        />
        <Input
            label="Quelle est la valeur de vos objets précieux ?"
            :placeholder="params.valueableObject ? params.valueableObject : 'Quelle est la valeur de vos objets précieux ?'"
            name-input="valueableObject"
            input-type="number"
            :has-error="{
                status: errors.valueableObject !== '',
                errorMsg: errors.valueableObject as string,
            }"
            :required="true"
            @input="handleInput"
        />
        <div class="flex sm:justify-end justify-center w-full">
            <Button
                typeButton="border"
                html-type="button"
                @click="handleShowResult"
                class="w-[100%] sm:w-auto"
            >
                <LoadingButton size="sm" theme="dark" v-if="loadingBtn" />
                Calculer mon tarif
            </Button>
        </div>
    </div>
    <TarifResult v-if="showResult" @back-to-simulation="backToSimulation"/>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { AssuranceService } from '@/services/assuranceService';
    import { reactive, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import PropertyDetailDisplay from './PropertyDetailDisplay.vue';
    import TarifResult from './TarifResult.vue';

    const route = useRoute();

    const activeError = ref<boolean>(false);

    let errors = reactive<any>({
        price: '',
        valueableObject: '',
    });

    const tmpErrors: any = {
        price: 'Ce champ est obligatoire',
        valueableObject: 'Ce champ est obligatoire',
    };

    const loadingBtn = ref<boolean>(false);
    const showResult = ref<boolean>(false);

    const props = defineProps({
        property: {
            type: Object,
        },
    });

    let params = ref<any>({
        theProperty: props.property && props.property.id,
        price: '',
        propertyType: props.property && props.property.propertyType.name,
        valueableObject: '',
    });

    const handleInput = (value: any) => {
        params.value = {
            ...params.value,
            ...value,
        };
    };

    async function handleShowResult() {
        params.value.theProperty = 6;
        const notEmptyValues = generateNotNullValue(params.value);
        console.log(params.value, '');

        if (notEmptyValues.length === Object.keys(params.value).length) {
            loadingBtn.value = true;
            try {
                const data = await AssuranceService.postMaifSimulation(
                    params.value
                );
                console.log(data);
                if (data) {
                    showResult.value = true;
                } else {
                    showResult.value = true;
                }
            } catch (error) {
                console.log(error);
            } finally {
                loadingBtn.value = false;
            }
        }
    }
    
    function backToSimulation() {
        showResult.value = false;
    }

    function generateNotNullValue(value: any) {
        const notEmptyValues = [];
        for (const key in value) {
            if (value.hasOwnProperty(key) && value[key]) {
                notEmptyValues.push(key);
                (errors as any)[key] = '';
            } else {
                activeError.value = true;
                (errors as any)[key] = (tmpErrors as any)[key];
            }
        }
        return notEmptyValues;
    }
</script>
<style lang="scss" scoped>
    .container {
        @apply w-full flex flex-col gap-[20px];
    }
    .divider {
        @apply text-gray mt-2;
    }
</style>
