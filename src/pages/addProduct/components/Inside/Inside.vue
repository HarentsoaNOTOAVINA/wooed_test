<script lang="ts" setup>
    import {
        menuList,
        details,
        room,
        glassType,
    } from '@/pages/addProduct/components/Inside/data';
    import Input from '@/components/Common/Input/Input.vue';
    import { onMounted, ref, watch } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { Store, useStore } from 'vuex';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Transition from '@/components/Common/Transition/Transition.vue';
    import moment from 'moment';

    const infos = [
        {
            label: 'Salle de bain',
            value: 'Salle de bain',
        },
        {
            label: 'Salle de douche',
            value: 'Salle de douche',
        },
    ];

    const infosChauffage = [
        {
            label: 'Chauffe eau',
            value: 'Chauffe eau',
        },
        //  {
        //     label : "Eau chaude",
        //     value : 'Eau chaude'
        //  },
        {
            label: 'Chauffage centrale',
            value: 'Chauffage centrale',
        },
    ];

    const paramsDetails = ref<any>({
        roomcount: 0,
        bedroomcount: 0,
        bathroomcount: 0,
        surface: 0,
        chambercaracteristics: [
            {
                surface: 0,
                glassType: '',
                lastRenovation: '',
                heatingType: '',
                heating: '',
            },
        ],
        waterRoomCaracteristic: [],
    });
    const store: Store<any> = useStore();
    const needValidationParams = ref<any>({});
    const defaultValue = ref<any>({
        glassType: null,
        heatingType: null,
    });
    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    onMounted(() => {
        // paramsDetails.value.roomcount = 2
        console.log('gggggggggg', paramsDetails.value);
    })


    watch(
        () => paramsDetails.value,
        (first) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...first },
                step: { interior: validation() },
            });
        },
        { immediate: true, deep: true }
    );


    // watch(() => paramsDetails.value.chambercaracteristics[0], (value) => {
    //     if(value.glassType){
    //         defaultValue.value.glassType = value.glassType;
    //     }
    //     if(value.heatingType){
    //         defaultValue.value.heatingType = value.heatingType;
    //     }

    // }, {immediate : true, deep : true});

    watch(
        () => defaultValue.value,
        (value) => {
            defaultValue.value = value;
        },
        { immediate: true, deep: true }
    );

    function handleChange(value: any): void {
        for (let i in value) {
            if (i === 'roomcount') {
                if (value[i] && value[i] > 0) {
                    for (let j = 0; j < value[i]; j++) {
                        paramsDetails.value.chambercaracteristics = [
                            ...paramsDetails.value.chambercaracteristics,
                            {
                                surface: 0,
                                glassType: '',
                                lastRenovation: '',
                                heatingType: '',
                                heating: '',
                            },
                        ];
                    }
                }
                if (
                    value[i] < paramsDetails.value.chambercaracteristics.length
                ) {
                    paramsDetails.value.chambercaracteristics.pop();
                }
            } else if (i === 'bathroomcount') {
                if (value[i]) {
                    for (let j = 0; j < value[i]; j++) {
                        paramsDetails.value.waterRoomCaracteristic = [
                            ...paramsDetails.value.waterRoomCaracteristic,
                            {
                                typeWater: '',
                                surface: 0,
                                glassType: '',
                                heatingType: '',
                            },
                        ];
                    }
                } else {
                    paramsDetails.value.waterRoomCaracteristic = [];
                }
            }
            paramsDetails.value[i] = +value[i];
        }
        validation();
    }

    async function handleChangeSub(value: any, chamber: any) {
        paramsDetails.value.chambercaracteristics[+chamber - 1][
            Object.keys(value)[0]
        ] = Object.values(value)[0];
    }

    function validation() {
        if (
            (paramsDetails.value.roomcount ||
                paramsDetails.value.roomcount === 0) &&
            paramsDetails.value.bathroomcount
        ) {
            return true;
        } else {
            return false;
        }
    }

    function handleChangeWaterRoom(item: any, level: number) {
        if (
            paramsDetails.value.waterRoomCaracteristic.length === 0 ||
            paramsDetails.value.waterRoomCaracteristic.length < level - 1
        ) {
        }
        paramsDetails.value.waterRoomCaracteristic[level - 1] = {
            ...paramsDetails.value.waterRoomCaracteristic[level - 1],
            ...item,
        };
    }
</script>

<template>
    <div class="inside">
        <div class="" v-for="item in menuList" :key="item.id">
            <!-- <Paragraphe class="inside__title">{{ item.title }}</Paragraphe> -->
            <div class="" v-for="(subItem, key) in item.item" :key="key + 'e'">
                <Input
                    :label="subItem.label"
                    :name-input="subItem.name"
                    input-type="number"
                    :required="subItem.required"
                    :min="0"
                    @input="handleChange"
                    :default-value="propertyDatas[subItem.name]"
                />
            </div>
        </div>
        <Transition appear name="fadeHeight" mode="out-in">
            <div v-if="paramsDetails.roomcount" class="inside__bedroom">
                <div
                    class="inside__bedroom-container"
                    v-for="(item, idItem) in paramsDetails.roomcount"
                    :key="idItem"
                >
                    <Paragraphe class="inside__title"
                        >Chambre {{ item }}</Paragraphe
                    >
                    <hr class="__hr" />
                    <div class="inside__room-description">
                        <div
                            class="inside__input-item"
                            v-for="(roomItem, id) in room"
                            :key="id"
                        >
                            <Input
                                v-if="roomItem.type === 'number'"
                                class="w-[100%]"
                                :label="roomItem.label"
                                :name-input="`${roomItem.name}`"
                                :input-type="roomItem.type"
                                @input="handleChangeSub($event, item)"
                                :min="0"
                                :default-value="propertyDatas[roomItem.name]"
                            />
                            <div
                                v-else-if="roomItem.type === 'select'"
                                class="inside__input-content"
                            >
                                <Select
                                    class="w-[100%]"
                                    :label="roomItem.label"
                                    :name="roomItem.name"
                                    :options="roomItem.subOptions"
                                    @change-select="
                                        handleChangeSub($event, item)
                                    "
                                    :default-value="propertyDatas[roomItem.name] ? propertyDatas[roomItem.name] : defaultValue.glassType"
                                />
                                <Input
                                    v-if="
                                        paramsDetails.chambercaracteristics
                                            .length > 0 &&
                                        paramsDetails.chambercaracteristics[
                                            idItem
                                        ][roomItem.name] === 'Autre'
                                    "
                                    :label="`Autre ${roomItem.label.toLowerCase()}`"
                                    :name-input="`other${roomItem.name}`"
                                    input-type="text"
                                    :min="0"
                                    @input="handleChangeSub($event, item)"
                                    :default-value="propertyDatas[`other${roomItem.name}`]"
                                />
                                <div
                                    v-if="
                                        roomItem.otherHeating &&
                                        roomItem.otherHeating.name === 'heating'
                                    "
                                >
                                    <Select
                                        class="w-[100%]"
                                        :label="roomItem.otherHeating.label"
                                        :name="roomItem.otherHeating.name"
                                        :options="
                                            roomItem.otherHeating.subOptions
                                        "
                                        @change-select="
                                            handleChangeSub($event, item)
                                        "
                                        :default-value="propertyDatas[roomItem.otherHeating.name]"
                                        
                                    />
                                    <Input
                                        v-if="
                                            paramsDetails.chambercaracteristics
                                                .length > 0 &&
                                            paramsDetails.chambercaracteristics[
                                                idItem
                                            ][roomItem.otherHeating.name] ===
                                                'Autre'
                                        "
                                        :label="`Autre ${roomItem.otherHeating.label.toLowerCase()}`"
                                        :name-input="`other${roomItem.otherHeating.name}`"
                                        input-type="text"
                                        @input="handleChangeSub($event, item)"
                                        :default-value="propertyDatas[`other${roomItem.otherHeating.name}`]"
                                    />
                                </div>
                            </div>
                            <InputDate
                                v-else
                                class="w-[100%]"
                                :label="roomItem.label"
                                :name="roomItem.name"
                                @handle-date="handleChangeSub($event, item)"
                                :max="true"
                                :value="propertyDatas[roomItem.name] ? moment(propertyDatas[roomItem.name]).format('DD-MM-YYYY') : ''"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <hr class="__hr" />
        <div class="inside__details-container">
            <Input
                v-for="item in details"
                :key="item.id"
                :label="item.label"
                :name-input="item.name"
                class="inside__input"
                :input-type="item.type"
                :required="item.required"
                @input="handleChange"
                :min="0"
                :default-value="propertyDatas[item.name]"
            />
            <Transition appear name="fadeHeight" mode="out-in">
                <div
                    class="inside__water-details-container"
                    v-if="paramsDetails.bathroomcount"
                >
                    <div
                        class="inside__water-details"
                        v-for="nbWaterChamber in +paramsDetails.bathroomcount"
                        :key="nbWaterChamber"
                    >
                        <div class="inside__water-details-header">
                            <Paragraphe class="inside__title"
                                >Salle d'eau {{ nbWaterChamber }}</Paragraphe
                            >
                        </div>
                        <hr class="__hr" />
                        <div class="inside__water-details-body">
                            <Select
                                name="typeWater"
                                :options="infos"
                                :label="'Type de salle d\'eau'"
                                @change-select="
                                    handleChangeWaterRoom(
                                        $event,
                                        nbWaterChamber
                                    )
                                "
                                :default-value="propertyDatas.typeWater"
                            />
                            <Input
                                name-input="surface"
                                :label="'Surface ( en m²)'"
                                input-type="number"
                                @input="
                                    handleChangeWaterRoom(
                                        $event,
                                        nbWaterChamber
                                    )
                                "
                                :default-value="propertyDatas.surface"
                                
                            />
                            <div class="">
                                <Select
                                    :label="
                                        'Vitrage (Salle d\'eau ' +
                                        nbWaterChamber +
                                        ')'
                                    "
                                    name="glassType"
                                    :options="glassType"
                                    @change-select="
                                        handleChangeWaterRoom(
                                            $event,
                                            nbWaterChamber
                                        )
                                    "
                                    :default-value="propertyDatas.glassType"
                                />
                                <Input
                                    v-if="
                                        paramsDetails.bathroomcount &&
                                        paramsDetails.bathroomcount > 0 &&
                                        paramsDetails.waterRoomCaracteristic
                                            .length > 0 &&
                                        paramsDetails.waterRoomCaracteristic[
                                            nbWaterChamber - 1
                                        ].glassType &&
                                        paramsDetails.waterRoomCaracteristic[
                                            nbWaterChamber - 1
                                        ].glassType === 'Autre'
                                    "
                                    name-input="otherGlasstype"
                                    :label="'Autre type de vitrage'"
                                    input-type="text"
                                    @input="
                                        handleChangeWaterRoom(
                                            $event,
                                            nbWaterChamber
                                        )
                                    "
                                    :default-value="propertyDatas.otherGlasstype"
                                />
                            </div>
                            <Select
                                :label="'Type de chauffage sanitaire '"
                                name="heatingType"
                                :options="infosChauffage"
                                @change-select="
                                    handleChangeWaterRoom(
                                        $event,
                                        nbWaterChamber
                                    )
                                "
                                :default-value="propertyDatas.heatingType"
                            />
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .inside {
        @apply flex flex-col gap-[18px];

        &:deep() {
            .custom-select__wrapper {
                @apply mb-0;
            }
        }
        &__title {
            @apply text-[14px];
            color: var(--color-primary);
        }
        &__bedroom {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            @apply flex flex-col gap-[14px] p-[14px] rounded-[8px];
            &-container {
                @apply flex flex-col gap-[14px];
            }
        }
        &__details-container {
            @apply flex flex-col  gap-[24px] flex-wrap;
        }
        &__input {
            @apply flex md:flex-1 w-[100%] flex-col;
        }
        &__divider {
            @apply mb-[18px] text-slate-300 mt-[10px];
        }

        &__room-description {
            @apply grid gap-[14px];
            @screen sm {
                @apply grid-cols-2;
            }
            @screen md {
                @apply grid-cols-1;
            }
            @screen lg {
                @apply grid-cols-2;
            }
        }
        &__input-item {
            @apply flex flex-1;
        }

        &__water-details {
            @apply flex flex-col gap-[14px];
        }

        &__water-details-header {
        }
        &__water-details-container {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            @apply flex flex-col gap-[14px] p-[14px] rounded-[8px];
        }

        &__water-details-body {
            @apply grid gap-[10px];
            @screen md {
                @apply grid-cols-2;
            }
        }

        &__input-content {
            @apply w-full flex flex-col gap-[14px];
        }
    }

    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 800px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
