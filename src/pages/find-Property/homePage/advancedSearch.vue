<template>
    <MainContainer class="advanced-criteria">
        <MainCard
            class="advanced-criteria__container"
            title="plus de critère"
            :dataBreadcrumbs="breadcrumbListsData"
            :button="true"
        >
            <div class="advanced-criteria__form">
                <div class="advanced-criteria-title-container">
                    <Title type="h4" class="advanced-criteria-title"
                        >Type de transaction</Title
                    >
                    <hr class="__hr" />
                </div>
                <!-- <div>
                    <Radio
                        label="type de vente"
                        
                        :name="'operationType'"
                        :element="OPERATION_TYPE"
                        @handle-change-radio="handleOperationType"
                    />
                </div> -->
                <div
                    v-if="
                        TRANSACTION_TYPE.length &&
                        currentOperationType === 'sale'
                    "
                >
                    <Radio
                        label="type de vente"
                        :name="'trasactionType'"
                        :element="TRANSACTION_TYPE"
                        @handle-change-radio="payloadHandler"
                    />
                </div>
                <div
                    v-if="
                        LOCATION_TYPE.length && currentOperationType === 'lease'
                    "
                >
                    <Radio
                        label="Type de location"
                        :name="'trasactionType'"
                        :element="LOCATION_TYPE"
                        @handle-change-radio="payloadHandler"
                    />
                </div>
            </div>
            <!-- <div class="advanced-criteria__form">
                <div class="advanced-criteria-title-container">
                    <Title type="h4" class="advanced-criteria-title"
                        >Adresse
                    </Title>
                    <hr class="__hr" />
                </div>
                <div>
                    <Input
                        :icon-field="true"
                        icon-name="MapMarkerLine"
                        id="address"
                        type="text"
                        :placeholder="'Adresse'"
                        :name-input="'adresse'"
                        :value="defaultAddress"
                    />
                </div>
            </div> -->
            <!-- <div class="advanced-criteria__form">
                <div class="advanced-criteria-title-container">
                    <Title type="h4" class="advanced-criteria-title">Type de bien </Title> 
                    <hr class="__hr">
                </div>
                <Select
                    name="propertyType"
                    :options="PROPERTY_TYPE"
                />
            </div> -->
            <!-- <div class="advanced-criteria__form">
                <div class="advanced-criteria-title-container">
                    <Title type="h4" class="advanced-criteria-title">Prix</Title> 
                    <hr class="__hr">
                </div>
                <div>
            le label est  "" pour elever le label par défaut voir le code source du composant 
                    <MinMax
                        label="" 
                        :names="{
                            min : 'minPrice',
                            max : 'maxPrice'
                        }"
                        @change="payloadHandler"
                    />
                </div>
            </div> -->
            <div class="advanced-criteria__form">
                <div class="advanced-criteria-title-container">
                    <Title type="h4" class="advanced-criteria-title"
                        >Options</Title
                    >
                    <hr class="__hr" />
                </div>
                <div>
                    <MinMax
                        label="Nombre de chambres"
                        unity=""
                        :names="{
                            min: 'roomCountMin',
                            max: 'roomCountMax',
                        }"
                        @change="payloadHandler"
                    />
                </div>
                <div>
                    <MinMax
                        label="Surface du bien"
                        unity="m²"
                        :names="{
                            min: 'areaMin',
                            max: 'areaMax',
                        }"
                        @change="payloadHandler"
                    />
                </div>
                <div>
                    <div class="advanced-criteria-subtitle">
                        <label>Options</label>
                    </div>
                    <div>
                        <PropertyInteriorOptions @change="payloadHandler" />
                    </div>
                </div>
                <div>
                    <MinMax
                        label="place de parking"
                        unity=""
                        :names="{
                            min: 'numberOfParkingMin',
                            max: 'numberOfParkingMax',
                        }"
                        @change="payloadHandler"
                    />
                </div>
            </div>
            <div class="advanced-criteria__form">
                <div class="advanced-criteria-title-container">
                    <Title type="h4" class="advanced-criteria-title"
                        >Etat du bien</Title
                    >
                    <hr class="__hr" />
                </div>
                <div>
                    <div class="advanced-criteria-subtitle">
                        <label>Dernière renovation </label>
                    </div>
                    <div>
                        <RangePicker
                            format="DD/MM/YYYY"
                            :placeholder="['date début', 'date fin']"
                            @change="handleLastRenovationDate"
                        />
                    </div>
                </div>
            </div>
            <div class="advanced-criteria__form">
                <div class="advanced-criteria-title-container">
                    <Title type="h4" class="advanced-criteria-title"
                        >Classe énergétique</Title
                    >
                    <hr class="__hr" />
                </div>
                <div class="advanced-criteria-checkbox-group">
                    <CheckBox
                        v-for="(elt, key) in ENERGETIC_CLASS"
                        :key="key"
                        :label="elt.toString()"
                        :name="elt.toString()"
                        :value="elt.toString()"
                        :return-boolean="true"
                        @clickWithValue="handleCheckBoxChange"
                    />
                </div>
            </div>

            <template #buttonFooter>
                <Button @click="triggerSearch">Rechercher</Button>
            </template>
        </MainCard>
    </MainContainer>
</template>

<script setup lang="ts">
    import MainContainer from '@/pages/supplier/components/MainContainer.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MinMax from '../components/MinMax.vue';
    import PropertyInteriorOptions from '../components/PropertyInteriorOptions.vue';

    import { RangePicker } from 'ant-design-vue';
    import { OPERATION_TYPE, ENERGETIC_CLASS } from './data';
    import useAutoComplete, {
        ExtractAdressComponents,
    } from '@/composables/useAutoComplete';
    import { onBeforeMount, onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const props = defineProps({
        defaultAddress: {
            type: String,
            default: '',
        },
    });

    const emit = defineEmits<{
        (e: 'updatePayload', payload: any): void;
        (e: 'change-address', payload: any): void;
        (e: 'triggerSearch'): void;
    }>();

    const router = useRouter();
    const { fullLocationResult } = useAutoComplete('address');
    const store = useStore();
    const dateRangeValue = ref<any>(null);
    const PROPERTY_TYPE = ref<any[]>([]);
    const TRANSACTION_TYPE = ref<any[]>([]);
    const LOCATION_TYPE = ref<any[]>([]);
    const currentOperationType = ref<string>(OPERATION_TYPE[0].value);
    const defaultAddress = ref<string>('');
    const breadcrumbListsData = [
        {
            label: 'Trouver un bien',
            url: `/`,
        },
        {
            label: 'plus de critère',
        },
    ];
    let payload = {
        operationType: OPERATION_TYPE[0].value,
        classeEnergy: [],
    };

    //============ Lifecycle =================
    onBeforeMount(() => {
        // store.dispatch('FindPropertyModule/fetchPropertyTypes');
        store.dispatch('FindPropertyModule/fetchTransactionTypes');
        store.dispatch('FindPropertyModule/fetchLocationTypes');
    });

    onMounted(() => {
        defaultAddress.value = props.defaultAddress;
    });
    //=======================================

    function payloadHandler($event: any) {
        payload = {
            ...payload,
            ...$event,
        };
        emit('updatePayload', payload);
    }
    function handleOperationType($event: any) {
        currentOperationType.value = Object.values($event)[0] as never;
        payloadHandler($event);
    }

    function handleLastRenovationDate($event: any) {
        let result = {};
        ['lastRenovationMin', 'lastRenovationMAX'].forEach(
            (elt: string, idx: number) => {
                const _d = ($event as any[])[idx];
                result = {
                    ...result,
                    [elt]: `${_d.$D}/${_d.$M}/${_d.$y}`,
                };
            }
        );
        payload = {
            ...payload,
            ...result,
        };

        emit('updatePayload', payload);
    }

    function handleCheckBoxChange($event: { [key: string]: boolean }) {
        const __key = Object.keys($event)[0];
        const __condition = Object.values($event)[0];

        if (__condition) {
            payload.classeEnergy.push(__key as never);
        } else {
            const index = payload.classeEnergy.indexOf(__key as never);
            payload.classeEnergy.splice(index, 1);
        }
        emit('updatePayload', payload);
    }

    function triggerSearch() {
        emit('triggerSearch');
    }

    watch(
        () => store.getters['FindPropertyModule/getPropertyTypes'],
        (value) => {
            PROPERTY_TYPE.value = value;
        },
        { immediate: true, deep: true }
    );
    watch(
        () => store.getters['FindPropertyModule/getTransactionTypes'],
        (value) => {
            TRANSACTION_TYPE.value = value;
        },
        { immediate: true, deep: true }
    );
    watch(
        () => store.getters['FindPropertyModule/getLocationTypes'],
        (value) => {
            LOCATION_TYPE.value = value;
        },
        { immediate: true, deep: true }
    );
    watch(
        () => fullLocationResult.value,
        (value) => {
            if (!!value) {
                emit('change-address', value.address_components);
            }
        },
        { immediate: true, deep: true }
    );
</script>

<style lang="scss" scoped>
    #address {
        width: 100%;
        border: 1px solid var(--color-stroke-gray);
        padding: 10px;
        border-radius: 4px;
    }
    .advanced-criteria {
        &__container {
            max-width: 100%;
        }
        &__form {
            @apply pb-5 flex flex-col;
            :deep() {
                .ant-radio-group {
                    display: flex;
                }
            }
        }
        &-title {
            &-container {
                @apply mb-5;
            }
            @apply mb-2;

            color: var(--color-primary);
        }
        &-subtitle {
            @apply py-2 font-semibold;
            color: var(--color-gray-icon);
        }
        &-checkbox-group {
            @apply w-[50%] flex flex-row flex-wrap justify-between;
            :deep() {
                .checkbox__container {
                    @apply py-5 w-[50%];
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
        @screen md {
            @apply w-[50%];
        }
    }
</style>
