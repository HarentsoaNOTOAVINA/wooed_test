import InputDate from '@/components/Common/InputDate/InputDate.vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import Select from '@/components/Common/Select/Select.vue';
import Switch from '@/components/Common/Switch/Switch.vue';
import RoundLink from '@/components/Icon/RoundLink.vue';
import InfoIcon from '@/components/Icon/InfoIcon.vue';
import FinanceCard from '../../components/FinanceCard/FinanceCard.vue';
import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
import { onMounted, ref, watch, watchEffect } from 'vue';
import Transition from '@/components/Common/Transition/Transition.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Loader from '@/components/Common/Loader/Loader.vue';
import { modesteHouse } from '@/pages/finance/property-tax/data';
import Input from '@/components/Common/Input/Input.vue';
import InfoModal from '../InfoModal.vue/InfoModal.vue';

export default function () {
    const efficientBuildingOptions = ref<
        {
            value: number | string;
            label: string;
            id: string;
            child?:
                | null
                | {
                      id: number;
                      max_1: string;
                      max_2: string;
                      reduction: string;
                      duration: string;
                      value: number;
                  }[];
        }[]
    >([
        {
            value: -1,
            label: 'N/A',
            id: 'efficientBuilding_option_na',
            child: null,
        },
        {
            child: [
                {
                    id: 1,
                    max_1: 'Woningen E60',
                    max_2: 'N/A',
                    reduction: '20%',
                    duration: '10 ans',
                    value: 20,
                },
                {
                    id: 2,
                    max_1: 'Andere gebouwen: E70',
                    max_2: 'N/A',
                    reduction: '20%',
                    duration: '10 ans',
                    value: 20,
                },
                {
                    id: 2,
                    max_1: 'E-40',
                    max_2: 'N/A',
                    reduction: '40%',
                    duration: '10 ans',
                    value: 40,
                },
            ],
            id: 'efficientBuilding_option_0',
            value: 0,
            label: 'de stedenbouwkundige vergunning is aangevraagd voor 1/1/2013',
        },
        {
            child: [
                {
                    id: 1,
                    max_1: 'E 50',
                    max_2: 'N/A',
                    reduction: '50%',
                    duration: '5 ans',
                    value: 50,
                },
                {
                    id: 2,
                    max_1: 'E 30',
                    max_2: 'N/A',
                    reduction: '100%',
                    duration: '5 ans',
                    value: 100,
                },
            ],
            id: 'efficientBuilding_option_1',
            value: 1,
            label: 'de stedenbouwkundige vergunning is aangevraagd vanaf 1/1/13 tot en met',
        },
        {
            child: [
                {
                    id: 1,
                    max_1: 'E 40',
                    max_2: 'N/A',
                    reduction: '50%',
                    duration: '5 ans',
                    value: 50,
                },
                {
                    id: 2,
                    max_1: 'E 30',
                    max_2: 'N/A',
                    reduction: '100%',
                    duration: '5 ans',
                    value: 100,
                },
            ],
            id: 'efficientBuilding_option_2',
            value: 2,
            label: 'de stedenbouwkundige vergunning is aangevraagd vanaf 1-1-2014 tot en met 31-12-2015',
        },
        {
            child: [
                {
                    id: 1,
                    max_1: 'E 30',
                    max_2: 'N/A',
                    reduction: '50%',
                    duration: '5 ans',
                    value: 50,
                },
                {
                    id: 2,
                    max_1: 'E 20',
                    max_2: 'N/A',
                    reduction: '100%',
                    duration: '5 ans',
                    value: 100,
                },
            ],
            id: 'efficientBuilding_option_3',
            value: 3,
            label: 'de stedenbouwkundige vergunning is aanevraagd vanaf 1/1/16 tot en met',
        },
        {
            child: [
                {
                    id: 1,
                    max_1: 'E 30',
                    max_2: 'N/A',
                    reduction: '50%',
                    duration: '5 ans',
                    value: 50,
                },
                {
                    id: 2,
                    max_1: 'E 20',
                    max_2: 'E 60',
                    reduction: '100%',
                    duration: '5 ans',
                    value: 100,
                },
            ],
            id: 'efficientBuilding_option_4',
            value: 4,
            label: 'de stedenbouwkundige vergunning is aangevraagd vanaf 1-10-2016',
        },
    ]);
    const isShowA = ref(false);
    const isShowB = ref(false);
    const route = useRoute();
    const store = useStore();
    const dataPrecount = ref<any>(null);
    const modesteHouseOptions = ref<any>(modesteHouse);
    const childAllocatedFamily = ref<boolean>(false);
    const unproductivityDuration = ref<boolean>(false);
    const showHandicapInput = ref<boolean>(false);
    const isShowEfficientBuilding = ref<boolean>(false);
    const currentEfficientBuildingOption = ref<number>(-1);
    const params = ref<any>({
        theProperty: route.params.id,
    });
    const finalDataForm = ref<any>(null);
    const valueAmount = ref<any>(null);
    const isShowModal = ref<boolean>(false);
    const modalType = ref<string>('');
    const isShowDependentChildren = ref<boolean>(false);
    const isShowDisabledChildrenCondition = ref<boolean>(false);
    const isShowOtherDependentOfYourFamilyNb = ref<boolean>(false);

    onMounted(() => {
        getPropertyDetails();
    });

    watchEffect(() => {
        finalDataForm.value = {
            params: params.value || null,
            idPrecount: dataPrecount.value?.id || null,
        };
    });

    watch(
        () => params.value,
        (value) => {
            console.log('Prams', value);
        },
        { immediate: true, deep: true }
    );

    watch(
        () => valueAmount.value,
        (value) => {
            valueAmount.value = value;
        },
        { immediate: true, deep: true }
    );

    function precountAmountHandler(value: number) {
        valueAmount.value = value;
    }

    function modalHandler(type: string, evt?: any) {
        isShowModal.value = true;
        modalType.value = type;
        evt && evt.stopPropagation();
    }

    async function getPropertyDetails() {
        const data = await store.dispatch(
            'PrecompteModule/getAllTheProperty',
            route.params.id
        );
        console.log(data, 'DATA');
        if (data.precount) {
            dataPrecount.value = data.precount;
        } else {
            const precompteResponse = await store.dispatch(
                'PrecompteModule/postPrecount',
                { theProperty: route.params.id }
            );
            const { data } = precompteResponse;
            dataPrecount.value = data;
        }
        console.log(dataPrecount.value, 'dataPrecount.value');
    }

    function handleChange(value: any) {
        for (let i in value) {
            switch (i) {
                case 'dependentChildrenCondition':
                    console.log(i, value[i]);
                    if (value[i] === -1) {
                        const {
                            switchChild,
                            dependentChildrenCondition,
                            dependentChildrenNb,
                            ...rest
                        } = params.value;
                        params.value = {
                            ...rest,
                        };
                    } else {
                        params.value = {
                            ...params.value,
                            ...value,
                        };
                    }
                    break;
                case 'disabledChildrenCondition':
                    console.log(i, value[i]);
                    if (value[i] === -1) {
                        const {
                            switchChild,
                            disabledChildrenCondition,
                            disabledChildrenConditionNb,
                            ...rest
                        } = params.value;
                        params.value = {
                            ...rest,
                        };
                    } else {
                        params.value = {
                            ...params.value,
                            ...value,
                        };
                    }
                    break;
                case 'switchChild':
                    childAllocatedFamily.value = value[i];
                    isShowDependentChildren.value = value[i];
                    /**
                     * remove these attrs if switch off
                     */
                    if (value[i] === false) {
                        const {
                            switchChild,
                            dependentChildrenCondition,
                            dependentChildrenNb,
                            ...rest
                        } = params.value;
                        params.value = {
                            ...rest,
                        };
                    } else {
                        const { switchChild, ...rest } = params.value;
                        params.value = {
                            ...rest,
                        };
                    }
                    break;
                case 'handicapOrInvalid':
                    showHandicapInput.value = value[i];
                    /**
                     * remove these attrs if switch off
                     */
                    if (value[i] === false) {
                        const {
                            handicapOrInvalid,
                            disabledPersonDependent,
                            ...rest
                        } = params.value;
                        params.value = {
                            ...rest,
                        };
                    } else {
                        const { handicapOrInvalid, ...rest } = params.value;
                        params.value = {
                            ...rest,
                        };
                    }
                    break;

                case 'childrenEligibleForFamilyAllowanceNb':
                    childAllocatedFamily.value = value[i];
                    params.value = {
                        ...params.value,
                        [i]: +value[i],
                    };
                    break;
                case 'modestHouse':
                    if (value[i] === -1) {
                        if (params.value.hasOwnProperty('modestHouse')) {
                            console.log('HERE');
                            const { modestHouse, ...rest } = params.value;
                            params.value = {
                                ...rest,
                            };
                        } else break;
                        break;
                    }
                    params.value = {
                        ...params.value,
                        ...value,
                    };
                    break;
                case 'efficientBuilding':
                    isShowEfficientBuilding.value = value[i];
                    break;
                case 'efficientBuilding_option':
                    currentEfficientBuildingOption.value = value[i];
                    break;
                case 'unproductivityDuration':
                    params.value = {
                        ...params.value,
                        [i]: +value[i],
                    };
                    break;
                case 'isUnproductivityDuration':
                    unproductivityDuration.value = value[i];
                    break;
                case 'isDisabledChildrenCondition':
                    isShowDisabledChildrenCondition.value = value[i];
                    /**
                     * remove these attrs if switch off
                     */
                    if (value[i] === false) {
                        const {
                            disabledChildrenCondition,
                            isDisabledChildrenCondition,
                            disabledChildrenNb,
                            ...rest
                        } = params.value;
                        params.value = {
                            ...rest,
                        };
                    } else {
                        const {
                            isDisabledChildrenCondition,
                            ...rest
                        } = params.value;
                        params.value = {
                            ...rest,
                        };
                    }
                    break;
                case 'isOtherDependentOfYourFamilyNb':
                    isShowOtherDependentOfYourFamilyNb.value = value[i];
                    /**
                     * remove these attrs if switch off
                     */
                    if (value[i] === false) {
                        const {
                            isOtherDependentOfYourFamilyNb,
                            otherDependentOfYourFamilyNb,
                            ...rest
                        } = params.value;
                        params.value = {
                            ...rest,
                        };
                    } else {
                        const { isOtherDependentOfYourFamilyNb, ...rest } =
                            params.value;
                        params.value = {
                            ...rest,
                        };
                    }
                    break;
                default:
                    console.log('default');
                    params.value = {
                        ...params.value,
                        ...value,
                    };
                    break;
            }
        }
        console.log(params.value, 'params.value');
    }

    async function handleCalculate() {
        const data = {
            idPrecount: dataPrecount.value.id,
            params: params.value,
        };

        const response = await store.dispatch(
            'PrecompteModule/putPrecount',
            data
        );
        valueAmount.value = response.data.data.precountAmount;
    }

    return {
        InputDate,
        Paragraphe,
        Select,
        Switch,
        RoundLink,
        InfoIcon,
        FinanceCard,
        CheckBox,
        Transition,
        Loader,
        Input,
        InfoModal,
        isShowA,
        isShowB,
        modesteHouseOptions,
        precountAmountHandler,
        modalHandler,
        handleChange,
        handleCalculate,
        modalType,
        isShowModal,
        finalDataForm,
        dataPrecount,
        modesteHouse,
        showHandicapInput,
        childAllocatedFamily,
        valueAmount,
        isShowEfficientBuilding,
        efficientBuildingOptions,
        params,
        unproductivityDuration,
        isShowDependentChildren,
        isShowDisabledChildrenCondition,
        isShowOtherDependentOfYourFamilyNb,
    };
}
