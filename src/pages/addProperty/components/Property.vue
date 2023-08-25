<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="property__container">
            <div class="property__form place-content-14px">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="property__form-item place-content-14px"
                >
                    <template v-if="item.type === 'select'">
                        <Select
                            :name="item.name"
                            :label="item.label"
                            :required="item.required ? item.required : false"
                            :options="allPropertyType"
                            :disabled="!allPropertyType.length"
                            :loading="!allPropertyType.length"
                            :placeholder="
                                item.placeholder
                                    ? item.placeholder
                                    : 'Sélectionnez'
                            "
                            :has-error="{
                                status:
                                    error[`${item.name}`] === '' ||
                                    error[`${item.name}`] === -1,
                                errorMsg: 'Ce champ est obligatoire',
                            }"
                            :default-value="
                                getLabelPropertyType(
                                    params[item.name],
                                    allPropertyType
                                )
                            "
                            @change-select="handleChange($event, item.name)"
                        />
                        <template
                            v-if="
                                params[item.name] &&
                                item.subItem &&
                                item.subItem.length > 0
                            "
                        >
                            <template
                                v-for="(sub, keys) in item.subItem"
                                :key="keys"
                            >
                                <Select
                                    v-if="sub.type === 'select'"
                                    :name="sub.name"
                                    :label="sub.label"
                                    :required="
                                        sub.required ? sub.required : false
                                    "
                                    :options="sub.options"
                                    :placeholder="
                                        sub.placeholder
                                            ? sub.placeholder
                                            : 'Sélectionnez'
                                    "
                                    @change-select="handleChange"
                                    :default-value="params[sub.name]"
                                />
                                <Switch
                                    v-if="sub.type === 'switch'"
                                    :item-label="sub.label"
                                    :name="sub.name"
                                    @handle-switch="handleChange"
                                    :value="params[sub.name]"
                                />
                                <template
                                    v-if="params[sub.name] && sub.subItem"
                                >
                                    <Switch
                                        v-for="(s, key) in sub.subItem"
                                        :key="key"
                                        :item-label="s.label"
                                        :name="s.name"
                                        @handle-switch="handleChange"
                                        :value="params[s.name]"
                                    />
                                </template>
                            </template>
                        </template>
                    </template>
                    <template
                        v-if="
                            item.type === 'select' &&
                            stylesToKeep.includes(propertyTypeSelected)
                        "
                    >
                        <Select
                            name="architecturalStyles"
                            :label="
                                'Style de ' + propertyTypeSelected.toLowerCase()
                            "
                            :options="stylesOptions"
                            placeholder="Sélectionnez"
                            @change-select="
                                handleChange($event, 'architecturalStyles')
                            "
                            :default-value="
                                styleDefaultValue
                                    ? listStyleValue.includes(styleDefaultValue)
                                        ? styleDefaultValue
                                        : 'Autre'
                                    : ''
                            "
                        />
                        <Input
                            v-if="
                                styleDefaultValue === 'Autre' ||
                                (!listStyleValue.includes(styleDefaultValue) &&
                                    styleDefaultValue)
                            "
                            name-input="otherArchitecturalStyles"
                            :label="
                                'Autre style de ' +
                                propertyTypeSelected.toLowerCase()
                            "
                            input-type="text"
                            @input="
                                handleChange($event, 'otherArchitecturalStyles')
                            "
                            :vmodel="
                                styleDefaultValue !== 'Autre'
                                    ? styleDefaultValue
                                    : ''
                            "
                        />
                    </template>
                    <template
                        v-if="
                            item.type === 'select' &&
                            stylesToKeepRoof.includes(propertyTypeSelected)
                        "
                    >
                        <Select
                            name="roofType"
                            label="Type de toiture"
                            :options="roofTypeOption"
                            placeholder="Sélectionnez"
                            @change-select="handleChange($event, 'roofType')"
                            :default-value="allParamsStore.roofType"
                        />
                    </template>
                    <template v-if="item.type === 'textArea'">
                        <TextArea
                            :autoSize="{ minRows: 4, maxRows: 8 }"
                            :name-input="item.name"
                            :label="item.label"
                            :defaultValue="params[item.name]"
                            @handle-change="handleChange"
                        />
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import { computed, onMounted, ref, watch, inject } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { Store, useStore } from 'vuex';
    import { requiredControl } from '@/utils/validation/form_validation';
    import { valueParams } from '../utils/default-value';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Input from '@/components/Common/Input/Input.vue';

    enum LocationName {
        tourism = 'Hébergement touristique',
        minute = 'Mettre en location « minute »',
    }

    interface StyleOptions {
        label: string;
        value: string;
    }

    const error = ref<any>({});
    const store: Store<any> = useStore();
    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
        data: {
            type: Array as any,
        },
    });

    const data = ref<any>(props.data);
    const params = ref<any>({});
    const allParamsStore = ref<any>({});
    const allPropertyType = ref<any>(
        store.getters['AddProductModule/getPropertyType'].sort(order)
    );
    const operationType = ref<any>(inject('operationType'));
    const propertyTypeSelected = ref<any>('');
    const styleDefaultValue = ref<string>('');
    const stylesToKeep = ['Maison', 'Villa', 'Bungalow'];
    const stylesToKeepRoof = [
        'Maison',
        'Villa',
        'Bungalow',
        'Immeuble à appartements',
        'Appartement',
    ];
    const architecturalStyleValue = ref<string>('');
    const listStyleValue = ref<string[]>([]);
    const stylesOptions: StyleOptions[] = [
        {
            label: 'Rustique',
            value: 'Rustique',
        },
        {
            label: 'Moderne',
            value: 'Moderne',
        },
        {
            label: 'Contemporaire',
            value: 'Contemporaire',
        },
        {
            label: 'Classique',
            value: 'Classique',
        },
        {
            label: 'Neo-classique',
            value: 'Neo-classique',
        },
        {
            label: 'Provenciale',
            value: 'Provenciale',
        },
        {
            label: 'Victorien oriental',
            value: 'Victorien oriental',
        },
        {
            label: 'Autre',
            value: 'Autre',
        },
    ];
    const roofTypeOption: StyleOptions[] = [
        {
            label: 'Toiture à 2 pans',
            value: 'Toiture à 2 pans',
        },
        {
            label: 'Toiture à 4 pans',
            value: 'Toiture à 4 pans',
        },
        {
            label: 'Toiture à demi-croupe',
            value: 'Toiture à demi-croupe',
        },
        {
            label: 'Toiture à demi-croupe et brisis',
            value: 'Toiture à demi-croupe et brisis',
        },
        {
            label: 'Toit terrasse',
            value: 'Toit terrasse',
        },
        {
            label: 'Toit monopente',
            value: 'Toit monopente',
        },
        {
            label: 'Toiture papillon',
            value: 'Toiture papillon',
        },
        {
            label: 'Toiture à la Mansart',
            value: 'Toiture à la Mansart',
        },
        {
            label: 'Comble aménagé avec lucarnes',
            value: 'Comble aménagé avec lucarnes',
        },
        {
            label: 'Toiture en dents de scie',
            value: 'Toiture en dents de scie',
        },
    ];

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
    }>();

    onMounted(() => {
        getPropertyType();
        params.value = valueParams(data.value);
        if (params.value['propertyType']) {
            const typeSelected = getLabelPropertyType(
                params.value['propertyType'],
                allPropertyType.value
            );
            if (typeSelected) {
                propertyTypeSelected.value = typeSelected.name;
            }
        }
        if (allParamsStore.value.architecturalStyles) {
            architecturalStyleValue.value =
                allParamsStore.value.architecturalStyles;
        }
        stylesOptions.forEach((element) => {
            listStyleValue.value.push(element.value);
        });
    });

    function order(a: any, b: any) {
        if (a.label < b.label) {
            return -1;
        }
        if (a.label > b.label) {
            return 1;
        }

        return 0;
    }

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            allParamsStore.value = value;
            params.value = valueParams(data.value);
            styleDefaultValue.value = value.architecturalStyles;
        },
        { immediate: true }
    );

    watch(
        () => props.data,
        (value) => {
            data.value = value;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => propertyTypeSelected.value,
        (value) => {
            propertyTypeSelected.value = value;
        },
        { immediate: true, deep: true }
    );

    function getLabelPropertyType(idPorperty: number, data: Array<any>) {
        return data.find((elem) => elem.id === idPorperty);
    }

    async function getPropertyType() {
        if (allPropertyType.value.length === 0) {
            const dataType = await store.dispatch(
                'AddProductModule/getProperyType',
                operationType.value
            );
            if (operationType.value !== 'lease') {
                allPropertyType.value = dataType;
            }
            if (dataType && dataType.length > 0) setValueTypeLocation(dataType);
        } else {
            setValueTypeLocation(allPropertyType.value);
        }
    }

    function setValueTypeLocation(dataType: any) {
        let response: any = [];
        const locationType = allParamsStore.value.locationType;
        if (locationType && typeof locationType === 'string') {
            switch (locationType.toLowerCase().trim()) {
                case LocationName.tourism.toLowerCase().trim():
                    response = dataType.filter(
                        (value: any) => value.forTourism
                    );
                    allPropertyType.value = response.sort(order);
                    break;

                case LocationName.minute.toLowerCase().trim():
                    response = dataType.filter((value: any) => value.forMinute);
                    allPropertyType.value = response.sort(order);
                    break;

                default:
                    allPropertyType.value = dataType.sort(order);
                    break;
            }
        }
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        error.value = requiredControl(data.value, params.value);

        if (Object.values(error.value).every((v) => v !== '')) {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...params.value },
            });
            emit('onClickNext');
        }
    }

    function handleChange(value: any, name?: any) {
        params.value = {
            ...params.value,
            ...value,
        };
        if (name == 'propertyType') {
            propertyTypeSelected.value = getLabelPropertyType(
                value[name],
                allPropertyType.value
            ).label;
            if (!stylesToKeep.includes(value[name])) {
                delete allParamsStore.value.architecturalStyles;
                // allParamsStore.value.architecturalStyles = ''; // Vider la valeur de la clé
            }
        }
        // Si le select architecturalStyles est "Autre", mettre à jour la valeur dans otherArchitecturalStyles
        if (name === 'otherArchitecturalStyles') {
            allParamsStore.value.architecturalStyles = value[name];
            delete allParamsStore.value.otherArchitecturalStyles,
                allParamsStore.value.roofType;
        }

        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
    }
</script>

<style lang="scss" scoped></style>
