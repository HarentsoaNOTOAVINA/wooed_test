<template>
    <div class="flex flex-col gap-[18px]">
        <div class="back" @click="$emit('backToSimulation')">
            <BackButton />
            Retour au formulaire
        </div>
        <div>
            <Title
                class="font-semibold leading-tight text-primary"
                type="h4"
                label="Choisissez votre formule et vos options"
            />
            <hr class="divider" />
        </div>
        <div class="flex gap-[10px]">
            <div
                class="rounded-lg border border-gray bg-white p-6 w-full flex flex-col gap-[18px]"
            >
                <p class="text-lg text-gray-800 font-semibold">Formule 2</p>
                <div class="flex flex-row gap-2 place-items-end">
                    <p class="text-2xl font-bold">{{ priceForumaTwo }} €</p>
                    <p class="text-sm font-light items-bottom pb-1">/mois</p>
                </div>
                <Button
                    typeButton="gray"
                    html-type="button"
                    class="w-[100%] sm:w-auto"
                >
                    Choisir
                </Button>
            </div>
            <div
                class="rounded-lg border border-gray bg-white p-6 w-full flex flex-col gap-[18px]"
            >
                <p class="text-lg text-gray-800 font-semibold">Formule 3</p>

                <div class="flex flex-row gap-2 place-items-end">
                    <p class="text-2xl font-bold">{{ priceForumaThree }} €</p>
                    <p class="text-sm font-light items-bottom pb-1">/mois</p>
                </div>
                <Button
                    typeButton="gray"
                    html-type="button"
                    class="w-[100%] sm:w-auto"
                >
                    Choisir
                </Button>
            </div>
        </div>
        <div>
            <!-- desktop -->
            <table class="comparaison__desktop w-full">
                <thead>
                    <tr>
                        <th class="care-title__text text-start">Franchise</th>
                        <th class="care-title__text text-center">Formule 2</th>
                        <th class="care-title__text text-center">Formule 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="care-description comparaison__company">
                            Choix de la franchise (somme restant à votre charge
                            en cas de sinistre)
                        </td>
                        <td class="care-description text-center bg-gray">
                            <Radio
                                name="forumaTwo"
                                :element="dataRadio"
                                align="vertical"
                                @handle-change-radio="handleChange"
                            />
                        </td>
                        <td class="care-description text-center bg-gray">
                            <Radio
                                name="forumaThree"
                                :element="dataRadio"
                                align="vertical"
                                @handle-change-radio="handleChange"
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th class="care-title__text text-start">Options</th>
                        <th class="care-title__text text-center">Formule 2</th>
                        <th class="care-title__text text-center">Formule 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in dataMaifCare.option"
                        :key="index"
                    >
                        <td class="care-description comparaison__company">
                            {{ item.title }} <br />
                            <span class="italic text-grayIcon">{{
                                item.description
                            }}</span>
                        </td>
                        <td class="care-description text-center bg-gray">
                            <span
                                v-if="
                                    typeof optionForumaTwo[index].value ===
                                    'object'
                                "
                                ><Radio
                                    name="forumaTwo"
                                    :element="
                                        transformDataRadio(
                                            optionForumaTwo[index].value
                                        )
                                    "
                                    align="vertical"
                                    @handle-change-radio="handleCancelTrip"
                            /></span>
                            <Paragraphe v-else>
                                <span
                                    v-if="
                                        optionForumaTwo[index].value !== 'OUI'
                                    "
                                    ><CheckBox
                                        :label="
                                            String(optionForumaTwo[index].value)
                                        "
                                        name="forumaTwo"
                                        @handleCheck="
                                            handleCheck(
                                                $event,
                                                optionForumaTwo[index].value
                                            )
                                        "
                                /></span>
                                <span v-else>{{
                                    optionForumaTwo[index].value
                                }}</span>
                            </Paragraphe>
                        </td>
                        <td class="care-description text-center bg-gray">
                            <span
                                v-if="
                                    typeof optionForumaThree[index].value ===
                                    'object'
                                "
                            >
                                <Radio
                                    name="forumaThree"
                                    :element="
                                        transformDataRadio(
                                            optionForumaThree[index].value
                                        )
                                    "
                                    align="vertical"
                                    @handle-change-radio="handleCancelTrip"
                            /></span>
                            <Paragraphe v-else>
                                <span
                                    v-if="
                                        optionForumaThree[index].value !== 'OUI'
                                    "
                                    ><CheckBox
                                        :label="
                                            String(
                                                optionForumaThree[index].value
                                            )
                                        "
                                        name="forumaThree"
                                        @handleCheck="
                                            handleCheck(
                                                $event,
                                                optionForumaThree[index].value
                                            )
                                        "
                                /></span>
                                <span v-else>{{
                                    optionForumaThree[index].value
                                }}</span>
                            </Paragraphe>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- mobile -->
            <table class="comparaison__mobile w-full">
                <thead>
                    <tr class="care-title">
                        <th colspan="2" class="care-title__text">Franchise</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            colspan="2"
                            class="care-description comparaison__company"
                        >
                            Choix de la franchise (somme restant à votre charge
                            en cas de sinistre)
                        </td>
                    </tr>
                    <tr>
                        <td class="care-description text-center bg-gray">
                            <Radio
                                name="forumaTwo"
                                :element="dataRadio"
                                align="vertical"
                                @handle-change-radio="handleChange"
                            />
                        </td>
                        <td class="care-description text-center bg-gray">
                            <Radio
                                name="forumaThree"
                                :element="dataRadio"
                                align="vertical"
                                @handle-change-radio="handleChange"
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr class="care-title">
                        <th colspan="2" class="care-title__text">Options</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(item, index) in dataMaifCare.option"
                    :key="index"
                >
                    <tr>
                        <td
                            colspan="2"
                            class="care-description comparaison__company"
                        >
                            {{ item.title }} <br />
                            <span class="italic text-grayIcon">{{
                                item.description
                            }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="care-description text-center bg-gray">
                            <span
                                v-if="
                                    typeof optionForumaTwo[index].value ===
                                    'object'
                                "
                                ><Radio
                                    name="forumaTwo"
                                    :element="
                                        transformDataRadio(
                                            optionForumaTwo[index].value
                                        )
                                    "
                                    align="vertical"
                                    @handle-change-radio="handleCancelTrip"
                            /></span>
                            <Paragraphe v-else>
                                <span
                                    v-if="
                                        optionForumaTwo[index].value !== 'OUI'
                                    "
                                    ><CheckBox
                                        :label="
                                            String(optionForumaTwo[index].value)
                                        "
                                        name="forumaTwo"
                                        @handleCheck="
                                            handleCheck(
                                                $event,
                                                optionForumaTwo[index].value
                                            )
                                        "
                                /></span>
                                <span v-else>{{
                                    optionForumaTwo[index].value
                                }}</span>
                            </Paragraphe>
                        </td>
                        <td class="care-description text-center bg-gray">
                            <span
                                v-if="
                                    typeof optionForumaThree[index].value ===
                                    'object'
                                "
                            >
                                <Radio
                                    name="forumaThree"
                                    :element="
                                        transformDataRadio(
                                            optionForumaThree[index].value
                                        )
                                    "
                                    align="vertical"
                                    @handle-change-radio="handleCancelTrip"
                            /></span>
                            <Paragraphe v-else>
                                <span
                                    v-if="
                                        optionForumaThree[index].value !== 'OUI'
                                    "
                                    ><CheckBox
                                        :label="
                                            String(
                                                optionForumaThree[index].value
                                            )
                                        "
                                        name="forumaThree"
                                        @handleCheck="
                                            handleCheck(
                                                $event,
                                                optionForumaThree[index].value
                                            )
                                        "
                                /></span>
                                <span v-else>{{
                                    optionForumaThree[index].value
                                }}</span>
                            </Paragraphe>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import { dataMaifCare } from './data';
    import Button from '@/components/Common/Button/Button.vue';
    import { computed, ref } from 'vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';

    const priceForumaTwo = ref<number>(dataMaifCare.forumaTwo[0].price);
    const priceForumaThree = ref<number>(dataMaifCare.forumaThree[0].price);

    const optionForumaTwo = ref<any>(dataMaifCare.forumaTwo[0].option);
    const optionForumaThree = ref<any>(dataMaifCare.forumaThree[0].option);

    let dataRadio = ref<any>([
        {
            label: '80,00 €',
            value: '80',
        },
        {
            label: '125,00 €',
            value: '125',
        },
    ]);
    const emit = defineEmits(['backToSimulation']);

    const transformDataRadio = (radio: any) => {
        return radio.map((item: any) => {
            return {
                label: item.title,
                value: item.value,
            };
        });
    };

    function handleChange(value: any) {
        const { forumaTwo, forumaThree } = value;

        switch (forumaTwo) {
            case '80':
                priceForumaTwo.value = dataMaifCare.forumaTwo[0].price;
                optionForumaTwo.value = dataMaifCare.forumaTwo[0].option;
                break;
            case '125':
                priceForumaTwo.value = dataMaifCare.forumaTwo[1].price;
                optionForumaTwo.value = dataMaifCare.forumaTwo[1].option;
                break;
            default:
                break;
        }

        switch (forumaThree) {
            case '80':
                priceForumaThree.value = dataMaifCare.forumaThree[0].price;
                optionForumaThree.value = dataMaifCare.forumaThree[0].option;
                break;
            case '125':
                priceForumaThree.value = dataMaifCare.forumaThree[1].price;
                optionForumaThree.value = dataMaifCare.forumaThree[1].option;
                break;
            default:
                break;
        }
    }

    function handleCancelTrip(value: any) {
        for (const key in value) {
            const newPrice = Number(value[key]);
            let totalPrice =
                key === 'forumaTwo'
                    ? Number(priceForumaTwo.value)
                    : Number(priceForumaThree.value);
            totalPrice += newPrice;
            if (key === 'forumaTwo') {
                priceForumaTwo.value = +totalPrice.toFixed(2);
            } else if (key === 'forumaThree') {
                priceForumaThree.value = +totalPrice.toFixed(2);
            }
        }
    }

    function handleCheck(value: any, price: any) {
        const newPrice = Number(price);

        for (const key in value) {
            let totalPrice =
                key === 'forumaTwo'
                    ? Number(priceForumaTwo.value)
                    : Number(priceForumaThree.value);
            if (value[key]) {
                totalPrice += newPrice;
            } else {
                totalPrice -= newPrice;
            }
            if (key === 'forumaTwo') {
                priceForumaTwo.value = +totalPrice.toFixed(2);
            } else if (key === 'forumaThree') {
                priceForumaThree.value = +totalPrice.toFixed(2);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .divider {
        @apply text-gray mt-2;
    }
    .comparaison {
        display: flex;
        flex-direction: column;
        gap: 25px;
        &__company {
            text-align: start;
        }
        &__value {
            width: 25%;
            font-weight: 400;
            font-style: italic;
        }
        &__value-yes {
            color: var(--color-green);
        }
        &__value-no {
            color: var(--color-red);
        }
        &__desktop {
            @apply max-[767px]:hidden;
        }
        &__mobile {
            @apply md:hidden;
        }
    }
    .care-title {
        border: none;
        &__text {
            border: 0.5px solid var(--color-stroke-gray);
            @apply text-white bg-primary p-[8px] font-[18px];
        }
    }
    .care-description {
        // white-space: nowrap;
        padding: 18px;
        overflow: hidden;
        text-overflow: clip;
        font-size: 14px;
        color: var(--color-gray-secondary);
        &__detail {
            font-weight: 300;
            font-size: 14px;
            font-style: italic;
            color: var(--color-gray-icon);
        }
    }
    table {
        td {
            border: 1px solid var(--color-stroke-gray);
        }
    }
    .back {
        @apply flex gap-[18px];
    }
</style>
