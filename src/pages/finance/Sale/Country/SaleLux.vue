<template>
    <div class="sale-content">
        <div
            class="sale-content__choice"
            v-for="(item, index) in regionElt"
            :key="index"
        >
            <Paragraphe class="sale-content__choice__name">
                {{ item.label }}
            </Paragraphe>
            <Select
                :options="item.radioData"
                @change-select="handleChange"
                :name="item.name"
                placeholder="Selectionnez"
            />
            <card-wrapper v-if="param.type && item.name === 'type'">
                <Input
                    v-if="param.type && param.type !== 'Immeuble à construire'"
                    label="Prix d'achat"
                    name-input="purchasePrice"
                    :required="true"
                    placeholder="0.00 €"
                    @input="handleChange"
                />
                <template v-if="param.type === 'Immeuble à construire'">
                    <Input
                        v-for="(inputItem, index) in priceNotSimplePurchase"
                        :key="index"
                        :label="inputItem.label"
                        :name-input="inputItem.name"
                        :required="true"
                        placeholder="0.00 €"
                        @input="handleChange"
                    />
                </template>
            </card-wrapper>
            <card-wrapper
                v-if="
                    param.purchaseReason ===
                        `Immeuble servant à l'habitation principale` &&
                    item.name === 'purchaseReason'
                "
            >
                <Paragraphe class="sale-content--ischild--list__info">
                    <span class="icon">
                        <InfoIcon />
                    </span>
                    Liste des biens acquis au G-D de Luxembourg qui ont été
                    occupées par les acheteurs à <br />
                    titre de résidence principale et qu'ils ont revendus il y a
                    plus de 5 ans</Paragraphe
                >
                <div class="sale-content--ischild">
                    <Input
                        class="w-full"
                        label="Prix"
                        name-input="price"
                        placeholder="0.00 €"
                        @input="handleChildChange"
                        :value="propertyAcquiredItem.price"
                    />
                    <!-- WE JUST NEED REGION SELECT HERE -->
                    <Select
                        class="w-full"
                        :options="regionElt[0].radioData"
                        @change-select="handleChildChange"
                        :name="regionElt[0].name"
                        placeholder="Selectionnez"
                        label="Region"
                        :value="propertyAcquiredItem.region"
                    />
                    <Button @click="addNewAcquiredProperty"
                        ><AddIcon /> AJOUTER</Button
                    >
                </div>

                <div class="sale-content--ischild--list">
                    <transition name="fade-list" mode="out-in">
                        <div
                            class="sale-content--ischild--list__content"
                            v-if="propertyAcquiredList.length"
                        >
                            <transition-group name="fade-list" mode="out-in">
                                <div
                                    class="sale-content--ischild--list__item"
                                    v-for="property in propertyAcquiredList"
                                    :key="property.id"
                                >
                                    <div
                                        class="sale-content--ischild--list__item__child"
                                    >
                                        <Paragraphe
                                            class="sale-content--ischild--list__item__name"
                                            >Region</Paragraphe
                                        >
                                        <Paragraphe
                                            class="sale-content--ischild--list__item__value"
                                            >{{ property.region }}</Paragraphe
                                        >
                                    </div>
                                    <div
                                        class="sale-content--ischild--list__item__child"
                                    >
                                        <Paragraphe
                                            class="sale-content--ischild--list__item__name"
                                            >Prix</Paragraphe
                                        >
                                        <Paragraphe
                                            class="sale-content--ischild--list__item__value"
                                            >{{
                                                separatorHandleFloat(
                                                    (+(property?.price as number))?.toFixed(
                                                        2
                                                    )
                                                )
                                            }}
                                            €</Paragraphe
                                        >
                                    </div>
                                    <DeleteRoudedBG
                                        @click="
                                            deleteNewAcquiredProperty(
                                                property.id as number
                                            )
                                        "
                                    />
                                </div>
                            </transition-group>
                        </div>
                    </transition>
                </div>
            </card-wrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { onMounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import Select from '@/components/Common/Select/Select.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import DeleteRoudedBG from '@/components/Icon/deleteRoudedBG.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    const route = useRoute();
    defineProps<{
        regionElt: any;
    }>();
    const emit = defineEmits<{
        (fn: 'on-params-change', v: any): void;
    }>();

    interface TypesPropertyAcquiredItem {
        id?: number;
        region?: string | null;
        price?: number;
    }
    const propertyAcquiredItem = ref<TypesPropertyAcquiredItem>({
        region: null,
        price: 0,
    });
    const propertyAcquiredList = ref<TypesPropertyAcquiredItem[]>([]);
    const param = ref<any>({
        country: 'Luxembourg',
        theProperty: +route.params.id,
    });
    const priceNotSimplePurchase = ref<
        {
            label: string;
            name: string;
        }[]
    >([
        {
            label: "Prix d'achat du terrain",
            name: 'landPurchasePrice',
        },
        {
            label: "Prix d'achat des constructions existantes",
            name: 'existingConstructionPrice',
        },
        {
            label: "Prix d'achat des constructions à ériger",
            name: 'buildingErectedPrice',
        },
    ]);

    watch(
        () => propertyAcquiredList.value,
        (v) => {
            const removedId = v.map((item) => {
                const { id, ...rest } = item;
                return rest;
            });
            param.value = { ...param.value, luxGoods: [...removedId] };
        },
        { deep: true }
    );

    watch(
        () => param.value,
        (v) => {
            emit('on-params-change', v);
        },
        { deep: true }
    );

    function handleChange(inputValue: any) {
        let name = '';
        let val = null;
        const [k, v] = Object.entries(inputValue)[0] as any;
        name = k;
        val = Number.isNaN(+v) ? v : +v;

        param.value = {
            ...param.value,
            [name]: val,
        };
    }

    function handleChildChange(fieldValue: any) {
        let parseObj = {};
        Object.keys(fieldValue).forEach((key) => {
            parseObj = {
                ...parseObj,
                [key]: Number.isNaN(+fieldValue[key])
                    ? fieldValue[key]
                    : +fieldValue[key],
            };
        });
        propertyAcquiredItem.value = {
            ...propertyAcquiredItem.value,
            ...parseObj,
        };
    }

    function addNewAcquiredProperty() {
        if (
            Object.values(propertyAcquiredItem.value).length > 1 &&
            Object.values(propertyAcquiredItem.value).every(
                (value) => value !== ''
            )
        ) {
            const objToAppend = {
                id: propertyAcquiredList.value.length,
                ...propertyAcquiredItem.value,
            };
            propertyAcquiredList.value.push(objToAppend);
            console.log(propertyAcquiredList.value);
            propertyAcquiredItem.value = { region: null, price: 0 };
            return;
        }
    }

    function deleteNewAcquiredProperty(id: number) {
        const indexOfItem = propertyAcquiredList.value.indexOf(
            propertyAcquiredList.value.filter((item) => item.id === id)[0]
        );
        propertyAcquiredList.value.splice(indexOfItem, 1);
    }
</script>

<style scoped lang="scss">
    .sale {
        .fade-list-enter-active,
        .fade-list-leave-active {
            transition: all 0.3s ease;
        }
        .fade-list-enter-from,
        .fade-list-leave-to {
            transform: translateY(-10px);
            opacity: 0;
        }
        &-content {
            &--ischild {
                @apply md:flex justify-between items-center gap-[10px];
                &:deep() {
                    .custom-input__fields {
                        @apply mb-[18px];
                    }
                    button {
                        @apply w-full flex items-center gap-[10px] justify-center md:mt-[8px];
                    }
                }
                &__btn {
                    @apply flex;
                }
                &--list {
                    &__info {
                        @apply text-justify text-[var(--color-primary)] md:flex gap-[10px] mt-[15px] mb-[10px] items-center;
                        .icon {
                            @apply flex justify-center;
                        }
                        &:deep() {
                            svg {
                                @apply w-[32px] h-[32px];
                            }
                            path:fist-child {
                                @apply fill-[var(--color-primary)];
                            }
                        }
                    }
                    &__item {
                        @apply py-[10px] border-t border-t-[var(--color-primary)] flex gap-[10px] items-center md:flex-row flex-col;
                        &__child {
                            @apply p-[10px] rounded-[4px] bg-gray w-full flex justify-between flex-wrap;
                        }
                        &__value {
                            @apply font-semibold;
                        }
                        &:deep() {
                            svg {
                                @apply flex-grow flex-shrink basis-[10%];
                                &:hover {
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
