<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="general__container">
            <div class="general__master-container">
                <div class="general__daily-needed-container" v-if="showDaily">
                    <Select
                        :label="dailyNeededTitle"
                        name="dailyNeedeed"
                        mode="multiple"
                        :options="dailyNeeded"
                        @change-select="handleChangeDaily"
                        :default-value="propertyDatas.dailyNeedeed"
                    />
                </div>
                <div class="general__features">
                    <div
                        class="general__features-body"
                        v-for="(levelItem, idLevelItem) in niveau"
                        :key="idLevelItem"
                    >
                        <div class="general__title-container">
                            <div class=""></div>
                            <Paragraphe
                                class="general__title"
                                @click="handleSelectLevel(idLevelItem)"
                                >{{ levelName[idLevelItem] }}</Paragraphe
                            >
                            <Delete
                                class="general__delete"
                                @click="handleDeleteLevel(levelItem)"
                            />
                        </div>
                        <div class="general__features-content">
                            <!-- Contenu Intérieur -->
                            <div class="inside__details-container">
                                <div
                                    class=""
                                    v-for="item in menuList"
                                    :key="item.id"
                                >
                                    <template
                                        v-if="
                                            getLabelPropertyType() !==
                                            'Entrepôt'
                                        "
                                    >
                                        <div
                                            class=""
                                            v-for="(subItem, key) in item.item"
                                            :key="key + 'e'"
                                        >
                                            <Input
                                                :label="subItem.label"
                                                v-if="
                                                    subItem.name !==
                                                    'spaceCount'
                                                "
                                                :name-input="subItem.name"
                                                input-type="number"
                                                :required="subItem.required"
                                                :min="0"
                                                @input="handleChangeInside"
                                                :default-value="
                                                    propertyDatas[subItem.name]
                                                "
                                            />
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div
                                            class=""
                                            v-for="(subItem, key) in item.item"
                                            :key="key + 'e'"
                                        >
                                            <Input
                                                :label="subItem.label"
                                                v-if="
                                                    subItem.name ===
                                                    'spaceCount'
                                                "
                                                :name-input="subItem.name"
                                                input-type="number"
                                                :required="subItem.required"
                                                :min="0"
                                                @input="handleChangeInside"
                                                :default-value="
                                                    propertyDatas[subItem.name]
                                                "
                                            />
                                        </div>
                                    </template>
                                </div>
                                <Transition
                                    appear
                                    name="fadeHeight"
                                    mode="out-in"
                                >
                                    <div
                                        v-if="paramsDetails.roomcount"
                                        class="inside__bedroom"
                                    >
                                        <div
                                            class=""
                                            v-for="(
                                                item, idItem
                                            ) in paramsDetails.roomcount"
                                            :key="idItem"
                                        >
                                            <Paragraphe class="inside__title"
                                                >Chambre {{ item }}</Paragraphe
                                            >
                                            <hr class="inside__divider" />
                                            <div
                                                class="inside__room-description"
                                            >
                                                <div
                                                    class="inside__input-item"
                                                    v-for="(
                                                        roomItem, id
                                                    ) in room"
                                                    :key="id"
                                                >
                                                    <Input
                                                        v-if="
                                                            roomItem.type ===
                                                            'number'
                                                        "
                                                        class="w-[100%]"
                                                        :label="roomItem.label"
                                                        :name-input="`${roomItem.name}`"
                                                        :input-type="
                                                            roomItem.type
                                                        "
                                                        @input="
                                                            handleChangeSub(
                                                                $event,
                                                                item
                                                            )
                                                        "
                                                        :min="0"
                                                        placeholder="0"
                                                        :unity="
                                                            roomItem.name ==
                                                            'surface'
                                                                ? 'm²'
                                                                : ''
                                                        "
                                                        :default-value="
                                                            propertyDatas[
                                                                roomItem.name
                                                            ]
                                                        "
                                                    />
                                                    <div
                                                        v-else-if="
                                                            roomItem.type ===
                                                            'select'
                                                        "
                                                        class="inside__input-content place-content-14px"
                                                    >
                                                        <Select
                                                            class="w-[100%]"
                                                            :label="
                                                                roomItem.label
                                                            "
                                                            :name="
                                                                roomItem.name
                                                            "
                                                            :options="
                                                                roomItem.subOptions
                                                            "
                                                            @change-select="
                                                                handleChangeSub(
                                                                    $event,
                                                                    item
                                                                )
                                                            "
                                                            :default-value="
                                                                propertyDatas[
                                                                    roomItem
                                                                        .name
                                                                ]
                                                                    ? propertyDatas[
                                                                          roomItem
                                                                              .name
                                                                      ]
                                                                    : defaultValue.glassType
                                                            "
                                                        />
                                                        <Input
                                                            v-if="
                                                                paramsDetails
                                                                    .chambercaracteristics
                                                                    .length >
                                                                    0 &&
                                                                paramsDetails
                                                                    .chambercaracteristics[
                                                                    idItem
                                                                ][
                                                                    roomItem
                                                                        .name
                                                                ] === 'Autre'
                                                            "
                                                            :label="`Autre ${roomItem.label.toLowerCase()}`"
                                                            :name-input="`other${roomItem.name}`"
                                                            input-type="text"
                                                            :min="0"
                                                            @input="
                                                                handleChangeSub(
                                                                    $event,
                                                                    item
                                                                )
                                                            "
                                                            :default-value="
                                                                propertyDatas[
                                                                    `other${roomItem.name}`
                                                                ]
                                                            "
                                                        />
                                                        <div
                                                            v-if="
                                                                roomItem.otherHeating &&
                                                                roomItem
                                                                    .otherHeating
                                                                    .name ===
                                                                    'heating'
                                                            "
                                                            class="place-content-14px"
                                                        >
                                                            <Select
                                                                class="w-[100%]"
                                                                :label="
                                                                    roomItem
                                                                        .otherHeating
                                                                        .label
                                                                "
                                                                :name="
                                                                    roomItem
                                                                        .otherHeating
                                                                        .name
                                                                "
                                                                :options="
                                                                    roomItem
                                                                        .otherHeating
                                                                        .subOptions
                                                                "
                                                                @change-select="
                                                                    handleChangeSub(
                                                                        $event,
                                                                        item
                                                                    )
                                                                "
                                                                :default-value="
                                                                    propertyDatas[
                                                                        roomItem
                                                                            .otherHeating
                                                                            .name
                                                                    ]
                                                                "
                                                            />
                                                            <Input
                                                                v-if="
                                                                    paramsDetails
                                                                        .chambercaracteristics
                                                                        .length >
                                                                        0 &&
                                                                    paramsDetails
                                                                        .chambercaracteristics[
                                                                        idItem
                                                                    ][
                                                                        roomItem
                                                                            .otherHeating
                                                                            .name
                                                                    ] ===
                                                                        'Autre'
                                                                "
                                                                :label="`Autre ${roomItem.otherHeating.label.toLowerCase()}`"
                                                                :name-input="`other${roomItem.otherHeating.name}`"
                                                                input-type="text"
                                                                @input="
                                                                    handleChangeSub(
                                                                        $event,
                                                                        item
                                                                    )
                                                                "
                                                                :default-value="
                                                                    propertyDatas[
                                                                        `other${roomItem.otherHeating.name}`
                                                                    ]
                                                                "
                                                            />
                                                        </div>
                                                    </div>
                                                    <InputDate
                                                        v-else
                                                        class="w-[100%]"
                                                        :label="roomItem.label"
                                                        :name="roomItem.name"
                                                        @handle-date="
                                                            handleChangeSub(
                                                                $event,
                                                                item
                                                            )
                                                        "
                                                        :max="true"
                                                        :value="
                                                            propertyDatas[
                                                                roomItem.name
                                                            ]
                                                                ? moment(
                                                                      propertyDatas[
                                                                          roomItem
                                                                              .name
                                                                      ]
                                                                  ).format(
                                                                      'DD-MM-YYYY'
                                                                  )
                                                                : ''
                                                        "
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Transition>

                                <!-- Insertion de nombre de Salle d'eau -->
                                <div class="inside__details-container">
                                    <template
                                        v-if="
                                            getLabelPropertyType() !==
                                            'Entrepôt'
                                        "
                                    >
                                        <div
                                            v-for="item in details"
                                            :key="item.id"
                                        >
                                            <Input
                                                :label="item.label"
                                                v-if="
                                                    item.name !==
                                                    'numberSanitary'
                                                "
                                                :name-input="item.name"
                                                class="inside__input"
                                                :input-type="item.type"
                                                :required="item.required"
                                                @input="handleChangeInside"
                                                :min="0"
                                                :default-value="
                                                    propertyDatas[item.name]
                                                "
                                            />
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div
                                            v-for="item in details"
                                            :key="item.id"
                                        >
                                            <Input
                                                :label="item.label"
                                                v-if="
                                                    item.name ===
                                                    'numberSanitary'
                                                "
                                                :name-input="item.name"
                                                class="inside__input"
                                                :input-type="item.type"
                                                :required="item.required"
                                                @input="handleChangeInside"
                                                :min="0"
                                                :default-value="
                                                    propertyDatas[item.name]
                                                "
                                            />
                                        </div>
                                    </template>

                                    <Transition
                                        appear
                                        name="fadeHeight"
                                        mode="out-in"
                                    >
                                        <div
                                            class="inside__water-details-container"
                                            v-if="paramsDetails.bathroomcount"
                                        >
                                            <div
                                                class="inside__water-details"
                                                v-for="nbWaterChamber in +paramsDetails.bathroomcount"
                                                :key="nbWaterChamber"
                                            >
                                                <div
                                                    class="inside__water-details-header"
                                                >
                                                    <Paragraphe
                                                        class="inside__title"
                                                        >Salle d'eau
                                                        {{
                                                            nbWaterChamber
                                                        }}</Paragraphe
                                                    >
                                                    <hr
                                                        class="inside__divider"
                                                    />
                                                </div>
                                                <div
                                                    class="inside__water-details-body"
                                                >
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
                                                        :default-value="
                                                            propertyDatas.typeWater
                                                        "
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
                                                        placeholder="0"
                                                        unity="m²"
                                                        :default-value="
                                                            propertyDatas.surface
                                                        "
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
                                                            :default-value="
                                                                propertyDatas.glassType
                                                            "
                                                        />
                                                        <Input
                                                            v-if="
                                                                paramsDetails.bathroomcount &&
                                                                paramsDetails.bathroomcount >
                                                                    0 &&
                                                                paramsDetails
                                                                    .waterRoomCaracteristic
                                                                    .length >
                                                                    0 &&
                                                                paramsDetails
                                                                    .waterRoomCaracteristic[
                                                                    nbWaterChamber -
                                                                        1
                                                                ].glassType &&
                                                                paramsDetails
                                                                    .waterRoomCaracteristic[
                                                                    nbWaterChamber -
                                                                        1
                                                                ].glassType ===
                                                                    'Autre'
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
                                                            :default-value="
                                                                propertyDatas.otherGlasstype
                                                            "
                                                        />
                                                    </div>
                                                    <Select
                                                        :label="'Type de chauffage sanitaire '"
                                                        name="heatingType"
                                                        :options="
                                                            infosChauffage
                                                        "
                                                        @change-select="
                                                            handleChangeWaterRoom(
                                                                $event,
                                                                nbWaterChamber
                                                            )
                                                        "
                                                        :default-value="
                                                            propertyDatas.heatingType
                                                        "
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Paragraphe
                    class="general__add-container"
                    @click="incrementLevel"
                >
                    <span>Ajouter un autre niveau</span>
                    <span class="general__add"> + </span>
                </Paragraphe>

                <Modal
                    :is-show-modal="isShow"
                    @on-back="onOpenModal"
                    :title="'Autre pièce (' + levelName[indexItem - 1] + ').'"
                >
                    <template #content>
                        <div
                            class=""
                            v-for="(item, idItem) in modalItemFeature"
                            :key="item.id"
                        >
                            <Input
                                :name-input="item.name"
                                :label="item.label"
                                :input-type="item.type"
                                @input="
                                    handleChangeModalValue($event, +indexItem)
                                "
                            />
                        </div>
                        <div class="general__modal-footer">
                            <Button @click="handleAddFeature"> Valider </Button>
                        </div>
                    </template>
                </Modal>
                <Modal
                    :is-show-modal="isShowAddOptions"
                    @on-back="onOpenModalOptions"
                    title="Autres options"
                >
                    <template #content>
                        <div class="flex flex-col gap-4">
                            <div
                                class=""
                                v-for="(item, idItem) in modalItemOption"
                                :key="item.id"
                            >
                                <Input
                                    :name-input="item.name"
                                    :label="item.label"
                                    :input-type="item.type"
                                    @input="
                                        handleChangeModalOptions($event, idItem)
                                    "
                                />
                            </div>
                            <div class="general__modal-footer">
                                <Button @click="handleAddOptions">
                                    Valider
                                </Button>
                            </div>
                        </div>
                    </template>
                </Modal>

                <!-- Autre option -->

                <div class="general__title-item-container">
                    <Paragraphe class="general__title-item"
                        >Autres options</Paragraphe
                    >
                    <hr class="__hr" />
                </div>
                <div class="general__other">
                    <div class="general__other-container">
                        <div
                            class="general__other-container-card"
                            v-if="loadingOtherOption"
                        >
                            <LoadingButton size="xs" theme="dark" />
                        </div>
                        <div
                            class="general__other-container-card"
                            v-for="item in other"
                            :key="item.id"
                            :class="[
                                checked.some((i: any) => i.optionId === item.id)
                                    ? 'general__checked'
                                    : '',
                            ]"
                            @click="checkItem(item.id, item)"
                        >
                            <div class="general__other-container-item">
                                <i
                                    :class="[
                                        checked.some(
                                            (i: any) => i.optionId === item.id
                                        )
                                            ? `general__selected-other ${item.icon}`
                                            : item.icon,
                                    ]"
                                />
                                <Paragraphe
                                    :class="[
                                        checked.some(
                                            (i: any) => i.optionId === item.id
                                        )
                                            ? 'general__selected-other'
                                            : '',
                                    ]"
                                >
                                    {{ item.name }}
                                </Paragraphe>
                            </div>
                        </div>
                        <div
                            class="general__other-container-card general__checked"
                            v-for="item in params.otherOptions"
                        >
                            <div class="general__item-deletable">
                                <div class="general__deletable-container">
                                    <Delete
                                        class="general__delete-item general__deletable"
                                        @click="handleDeleteOptions(item)"
                                    />
                                </div>
                                <div class="general__other-container-item">
                                    <i
                                        :class="item.icon"
                                        class="general__selected-other"
                                    />
                                    <Paragraphe class="general__selected-other">
                                        {{ item.name }}
                                    </Paragraphe>
                                </div>
                            </div>
                        </div>

                        <div class="general__other-container-card">
                            <div
                                class="general__other-container-item"
                                @click="onOpenModalOptions"
                            >
                                <Add />
                                <Paragraphe> Autres </Paragraphe>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="">
                    <!-- Contenu Jardin -->
                    <div
                        class=""
                        v-if="
                            checked.some(
                                (elt: any) => elt.name.toLowerCase() === 'jardin'
                            )
                        "
                    >
                        <div
                            class="general__options-input-container"
                            v-for="item in gardenOptions"
                            :key="item.id"
                        >
                            <div
                                class=""
                                v-for="subItem in item.subOptions"
                                :key="subItem.id"
                            >
                                <Switch
                                    v-if="subItem.type === 'switch'"
                                    :name="subItem.name"
                                    :item-label="subItem.label"
                                    @switchValue="handleCallGardenSwitch"
                                />
                                <Select
                                    v-else-if="subItem.type === 'select'"
                                    :name="subItem.name"
                                    :label="subItem.label"
                                    @change-select="handleChange"
                                    :options="subItem.options"
                                />
                                <Input
                                    v-else
                                    :input-type="subItem.type"
                                    :label="subItem.label"
                                    :name-input="subItem.name"
                                    @input="handleCallGardenInput"
                                    :placeholder="subItem.placeholder"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Contenu Garage -->
                    <div
                        class=""
                        v-if="
                            checked.some(
                                (elt: any) => elt.name.toLowerCase() === 'garage'
                            )
                        "
                    >
                        <div
                            class=""
                            v-for="item in garageOptions"
                            :key="item.id"
                        >
                            <div
                                class=""
                                v-for="(subItem, id) in item.subOptions"
                                :key="id"
                            >
                                <Input
                                    :name-input="subItem.name"
                                    :input-type="subItem.type"
                                    :label="subItem.label"
                                    @input="handlePlaceNumberInput"
                                    :placeholder="subItem.placeholder"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                :is-show-modal="isChanceName"
                :title="'Renommer le niveau : ' + levelName[levelToChange]"
                @on-back="changeNameHandler"
            >
                <template #content>
                    <div class="general__container">
                        <Input
                            :name-input="levelName[levelToChange]"
                            label="Nouveau nom"
                            @input="
                                handleChangeLevelName($event, levelToChange)
                            "
                        />
                        <Button
                            type-button="secondary"
                            @click="handleSaveNameLevel"
                            >Valider</Button
                        >
                    </div>
                </template>
            </Modal>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import {
        input,
        otherLevel,
        gardenOptions,
        garageOptions,
        modalItemOption,
        modalItemFeature,
    } from '@/pages/addProduct/components/General/data';
    import {
        ref,
        shallowRef,
        toRaw,
        watch,
        onMounted,
        computed,
        onUpdated,
    } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    // import {FontAwesomePromise} from "@/composables/useFontAwesome";
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Add from '@/components/Icon/AddOptions.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import DragAndDrop from '@/pages/addProduct/components/DradAndDrop/DragAndDrop.vue';
    import Delete from '@/components/Icon/deleteRoudedBG.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';

    import { useStore, Store } from 'vuex';

    /**
     * Import of inside
     */

    import { menuList, details, room, glassType } from './data';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import moment from 'moment';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    /**End import inside */

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

    interface dropedelement {
        id: number;
        level: number;
    }

    interface selectedFeatureElementType {
        item: number;
        level: number;
    }

    let level = ref<number>(1);
    let other = shallowRef<any>();
    let isShow = ref<boolean>(false);
    const isShowAddOptions = ref<boolean>(false);
    const indexItem = ref<any>(null);
    const store = useStore();

    const faReady = ref<boolean>(false);
    const optionsReady = ref<boolean>(false);
    const featuresready = ref<boolean>(false);
    const checkFeaure = ref<Array<any>>([]);

    const checked = ref<Array<any>>([]);
    const dailyNeeded = ref<Array<any>>([]);
    const dailyNeededTitle = ref<string>('Bésoins quotidien');
    const showDaily = ref<boolean>(false);
    const niveau = ref<Array<any>>([
        {
            title: 'Niveau',
            level: 0,
            item: store.state.AddProductModule.features.data,
        },
    ]);
    const niveauEntity = ref<any>({
        title: 'Niveau',
        level: 0,
        item: [],
    });
    const paramsItem = ref<any>({
        id: 0,
        label: '',
        item: {
            name: '',
            icon: 'fab fa-hotjar',
        },
    });
    const params = ref<any>({
        thepropertyFeatures: [],
        otherOptions: [],
    });

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    const allPropertyType = ref<any>(
        store.getters['AddProductModule/getPropertyType'].sort(order)
    );

    function getLabelPropertyType() {
        const selectedProperty = allPropertyType.value.find(
            (elem: any) => elem.id === propertyDatas.value.propertyType
        );
        return selectedProperty.name;
    }
    // const allParamsStore = ref<any>();

    // watch(
    //     () => store.getters['AddProductModule/getAddPropertyDatas'],
    //     (value) => {
    //         allParamsStore.value = value;
    //     },
    //     { immediate: true }
    // );

    // const featuresSelected = ref<any[]>(propertyDatas && propertyDatas.thepropertyFeatures);
    const featuresSelected = ref<any[]>([{ features: [] }]);
    let newParamsItem = Object.assign({}, paramsItem.value);
    let levelToAdd = ref<any>(null);
    let newFeaturesValue = ref<any>();
    const levelName = ref<string[]>(['RDC']);
    const isChanceName = ref<boolean>(false);
    const levelToChange = ref<any>(null);
    const levelNewValue = ref<any>({
        value: '',
        level: 0,
    });
    const content = ref<string>(props.titleLabel);
    const data = ref<any>(props.data);
    const loadingOption = ref<boolean>(false);
    const loadingOtherOption = ref<boolean>(false);
    const allKitchenElt = ref<any>(
        store.getters['AddProductModule/getKitchenElt'].sort(order)
    );
    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    const showRoom = ref<any>([
        {
            showLevel: false,
        },
    ]);
    const showKitchen = ref<any>([
        {
            showLevel: false,
        },
    ]);

    onMounted(() => {
        getKitchenElt();
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

    // à changer pour kitchen après
    async function getKitchenElt() {
        if (allKitchenElt.value.length === 0) {
            const data = await store.dispatch(
                'AddProductModule/getProperyType',
                'lease'
            );
            allKitchenElt.value = data;
        }
    }

    function handleSelectKitchenElt(value: any) {
        console.log('select kitchen element : ', value);
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        emit('onClickNext');
    }

    function finished() {
        emit('onClickFinished');
    }
    /**
     * Initial data of inside
     */
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
    const needValidationParams = ref<any>({});
    const defaultValue = ref<any>({
        glassType: null,
        heatingType: null,
    });

    onMounted(() => {
        getDailyNeeded();
        if (store.state.AddProductModule.features.data) {
            niveauEntity.value.item =
                store.state.AddProductModule.features.data;
            featuresready.value = true;
            niveauEntity.value.item =
                store.state.AddProductModule.features.data;
        } else {
            niveauEntity.value.item = fetchApi(
                store.dispatch('AddProductModule/getFeatures'),
                'loadingOption'
            );
        }
        if (store.state.AddProductModule.options.data) {
            other.value = store.state.AddProductModule.options.data;
            optionsReady.value = true;
            other.value = store.state.AddProductModule.options.data;
        } else {
            other.value = fetchApi(
                store.dispatch('AddProductModule/getOptions'),
                'loadingOption'
            );
        }
        // FontAwesomePromise.then((state : any) =>{
        //       console.log(state);
        //       faReady.value = true;
        // })
    });

    async function fetchApi(setStore: any, loading: string) {
        loading === 'loadingOption'
            ? (loadingOption.value = true)
            : (loadingOtherOption.value = true);
        let dataOption: any = [];
        try {
            const { data } = await setStore;
            dataOption = data;
        } catch (error) {
            console.error(error);
        } finally {
            loading === 'loadingOption'
                ? (loadingOption.value = false)
                : (loadingOtherOption.value = false);
        }
        return dataOption;
    }

    watch(
        () => store.state.AddProductModule.features.data,
        (data) => {
            niveau.value[0].item = data;
        },
        { immediate: true, deep: true }
    );

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

    watch(
        () => defaultValue.value,
        (value) => {
            defaultValue.value = value;
        },
        { immediate: true, deep: true }
    );

    /***End initial data of inside */

    watch(
        featuresSelected.value,
        (data) => {
            data.forEach((element, index) => {
                element.features.forEach((item: any) => {
                    if (
                        getDetails(
                            item.feature,
                            store.state.AddProductModule.features.data
                        ).toLowerCase() === 'chambre'.toLowerCase()
                    ) {
                        showRoom.value[index].showLevel = true;
                    } else if (
                        getDetails(
                            item.feature,
                            store.state.AddProductModule.features.data
                        ).toLowerCase() === 'cuisine'.toLowerCase()
                    ) {
                        showKitchen.value[index].showLevel = true;
                    }
                });
            });

            store.dispatch('AddProductModule/setPropertyData', {
                data,
                step: { general: true },
            });
        },
        { immediate: true, deep: true }
    );

    const getDetails = function (id: number, data: Array<any>) {
        return data.find((item) => item.id === id)['name'];
    };

    // onMounted(() => incrementLevel());

    function incrementLevel(): void {
        showRoom.value.push({
            showLevel: false,
        });
        showKitchen.value.push({
            showLevel: false,
        });

        const _ = JSON.stringify({
            ...niveauEntity.value,
        });
        niveau.value.push(JSON.parse(_));

        featuresSelected.value.push({ features: [] });
        levelName.value = [
            ...levelName.value,
            `Etage ${niveau.value.length - 1}`,
        ];
    }

    function getDropedList(list: dropedelement) {
        let isExist: boolean = featuresSelected.value[list.level].features.some(
            (i: any) => i.feature === list.id
        );

        if (!isExist) {
            featuresSelected.value[list.level].features.push({
                feature: +list.id,
            });
            const data = { thepropertyFeatures: [...featuresSelected.value] };
            store.dispatch('AddProductModule/setPropertyData', {
                data,
                step: { general: true },
            });
        } else {
            if (
                getDetails(
                    list.id,
                    store.state.AddProductModule.features.data
                ).toLowerCase() === 'chambre'.toLowerCase()
            ) {
                showRoom.value[list.level].showLevel = false;
            } else if (
                getDetails(
                    list.id,
                    store.state.AddProductModule.features.data
                ).toLowerCase() === 'cuisine'.toLowerCase()
            ) {
                showKitchen.value[list.level].showLevel = false;
            }
            let indexExist = null;
            featuresSelected.value[list.level].features.forEach(
                (item: any, idItem: number) => {
                    if (item.feature === list.id) {
                        indexExist = idItem;
                    }
                }
            );
            if (indexExist || indexExist === 0) {
                featuresSelected.value[list.level].features.splice(
                    indexExist,
                    1
                );
                store.dispatch('AddProductModule/setPropertyData', {
                    data: { thepropertyFeatures: [...featuresSelected.value] },
                    step: { general: true },
                });
            }
        }
    }

    function deleteDropedFeature(selected: selectedFeatureElementType) {
        let selectedLevel = featuresSelected.value[selected.level].features;
        const idx = selectedLevel.indexOf(selected.item);
        featuresSelected.value[selected.level].features = selectedLevel.filter(
            (item: any) => selectedLevel.indexOf(item) !== idx
        );
        const data = { thepropertyFeatures: [...featuresSelected.value] };
        store.dispatch('AddProductModule/setPropertyData', {
            data,
            step: { general: true },
        });
    }

    function checkItem(item: any, allItem: any) {
        let content = checked.value.some((e) => e.optionId === +item);
        if (!content) {
            checked.value.push({
                optionId: +item,
                name: allItem.name,
                callGarden: false,
                costGarden: 0,
                garageNumberPlace: 0,
            });
        } else {
            checked.value = checked.value.filter(
                (i: any) => i.optionId !== +item
            );
        }
        const data = { options: [...checked.value] };

        store.dispatch('AddProductModule/setPropertyData', {
            data,
            step: { general: true },
        });
    }

    function handleCallGardenSwitch(value: any) {
        checked.value.map((item) => {
            if (item.optionId === 2) {
                item.callGarden = value;
            }
        });
    }

    function handleCallGardenInput(event: any) {
        const value = Object.values(event)[0];
        checked.value.map((item) => {
            if (item.optionId === 2) {
                item.costGarden = value;
            }
        });
    }

    function handlePlaceNumberInput(event: any) {
        const value = Object.values(event)[0];
        checked.value.map((item) => {
            if (item.optionId === 4) {
                item.garageNumberPlace = value;
            }
        });
    }

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }

    watch(
        () => store.state.AddProductModule.features.data,
        function (newVal) {
            niveauEntity.value.item = newVal;
            if (store.state.AddProductModule.features.data) {
                featuresready.value = true;
            }
            return newVal;
        }
    );
    watch(
        () => store.state.AddProductModule.options.data,
        function (newVal) {
            other.value = newVal;
            if (store.state.AddProductModule.options.data) {
                optionsReady.value = true;
            }
            return newVal;
        }
    );

    watch(
        () => niveau.value,
        (newVal) => {
            niveau.value = newVal;
            return newVal;
        },
        { immediate: true }
    );

    watch(
        () => params.value,
        (first) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...first },
                step: { general: true },
            });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => indexItem.value,
        (first) => {
            indexItem.value = first;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => isShow.value,
        (first) => {
            isShow.value = first;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            for (let i in store.getters[
                'AddProductModule/getAddPropertyDatas'
            ]) {
                if (i === 'locationType') {
                    if (value[i].split(' ').includes('Hebergement')) {
                        showDaily.value = true;
                    } else {
                        showDaily.value = false;
                    }
                }
            }
        },
        { immediate: true, deep: true }
    );

    const handleDeleteLevel = (levelItem: any) => {
        const idx = niveau.value.indexOf(levelItem);
        niveau.value = niveau.value.filter(
            (item) => niveau.value.indexOf(item) !== idx
        );
        featuresSelected.value = featuresSelected.value.filter(
            (item) => featuresSelected.value.indexOf(item) !== idx
        );
    };

    function onOpenModal(key: number) {
        isShow.value = !isShow.value;
        indexItem.value = key + 1;
    }

    function onOpenModalOptions() {
        isShowAddOptions.value = !isShowAddOptions.value;
    }

    function handleChangeModalValue(value: any, level: number) {
        // newFeaturesValue.value = {value, level};
        for (let i in value) {
            newParamsItem.item.name = value[i];
            newParamsItem.label = i;
            newParamsItem.id = level;
        }
    }

    function handleChangeModalOptions(value: any, id: any) {
        for (let i in value) {
            newParamsItem.item.name = value[i];
            newParamsItem.label = i;
            newParamsItem.id = id;
        }
    }

    async function handleAddFeature() {
        let a = JSON.stringify(newParamsItem);
        let b = JSON.parse(a);
        if (params.value.thepropertyFeatures.length < +b.id) {
            params.value.thepropertyFeatures = [
                ...params.value.thepropertyFeatures,
                {
                    features: [
                        {
                            feature: b.item,
                        },
                    ],
                },
            ];
        } else {
            params.value.thepropertyFeatures[+b.id - 1].features = [
                ...params.value.thepropertyFeatures[+b.id - 1].features,
                {
                    feature: b.item,
                },
            ];
        }
        isShow.value = false;
    }

    function handleAddOptions() {
        let a = JSON.stringify(newParamsItem);

        let b = JSON.parse(a);

        params.value[newParamsItem.label] = [
            ...params.value[newParamsItem.label],
            b.item,
        ];
        isShowAddOptions.value = false;
    }

    function getDailyNeeded() {
        dailyNeeded.value = store.getters['AddProductModule/getDailyNeeded'];
    }

    function handleChangeDaily(item: any) {}

    function getLocationType() {
        const data = store.getters['AddProductModule/getAddPropertyDatas'];
        if (data['locationType']?.split(' ').includes('Hebergement')) {
            showDaily.value = true;
        } else {
            showDaily.value = false;
        }

        // watch(() => store.getters['AddProductModule/getAddPropertyDatas'], (value) => {
        //       for(let i in store.getters['AddProductModule/getAddPropertyDatas']){
        //             if(i === 'locationType'){
        //                   if(value[i].split(' ').includes('Hebergement')){
        //                         showDaily.value = true;
        //                   }else{
        //                         showDaily.value = false;
        //                   }
        //             }
        //       }

        // })
    }

    function handleDeleteOptions(item: any) {
        let indexToDelete = null;
        params.value.otherOptions.forEach((elem: any, idElem: number) => {
            if (elem.name === item.name) {
                indexToDelete = idElem;
            }
        });
        params.value.otherOptions.splice(indexToDelete, 1);
    }
    function handleDeleteFeature(item: any, level: number) {
        let indexToDelete = null;
        params.value.thepropertyFeatures[level].features.forEach(
            (elem: any, idElem: number) => {
                if (elem.feature.name === item.feature.name) {
                    indexToDelete = idElem;
                }
            }
        );
        params.value.thepropertyFeatures[level].features.splice(
            indexToDelete,
            1
        );
    }

    /***
     * Commente eto
     */
    function handleSelectLevel(level: number) {
        console.log('Ito ilay level\n', level);
        levelToChange.value = level;
        changeNameHandler();
    }

    function changeNameHandler() {
        isChanceName.value = !isChanceName.value;
    }

    function handleChangeLevelName(value: any, level: number) {
        levelNewValue.value = {
            ...levelNewValue.value,
            level,
            value: Object.values(value)[0],
        };
    }

    function handleSaveNameLevel() {
        console.log('Ito eeeeee\n', levelNewValue.value);
        levelName.value[levelNewValue.value.level] = levelNewValue.value.value;
        changeNameHandler();
    }

    /**
     * Function of inside
     */
    function handleChangeInside(value: any): void {
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
    /**End function of inside */
</script>

<style lang="scss" scoped>
    .general {
        &__container {
            &:deep() {
                .button__secondary {
                    @apply w-full;
                }
            }
        }
        &__title {
            @apply cursor-pointer;
        }
        &__add-container {
            @apply flex cursor-pointer gap-[14px];
        }
        &__add {
            @apply h-[22px] w-[22px] flex justify-center items-center rounded-[50%];
            background-color: var(--color-gray);
        }
        &__level-container {
            @apply px-[14px] py-[10px] rounded-[4px];
            border: 0.5px solid var(--color-stroke-gray);
        }
        &__subitem-container {
            @apply flex flex-wrap  gap-[35px];
        }
        &__subitem-item {
            @apply flex flex-col items-center cursor-grab;
        }
        &__icon {
            @apply w-[35px] h-[35px] bg-slate-800 rounded-[50%];
        }
        &__title {
            @apply leading-[17px] text-[14px] text-[#8F8F8F];
        }
        &__level-container-item {
            @apply flex flex-col gap-[14px];
        }
        &__dragged {
            @apply rounded-[4px] min-h-[97px];
            border: 0.5px solid #606060;
        }
        &__master-container {
            @apply flex flex-col gap-[18px];
        }
        &__other-container {
            @apply flex gap-[10px] flex-wrap;
        }
        &__other-container-card {
            @apply rounded-[4px] h-[72px] w-[110px] flex justify-center items-center  cursor-pointer;
            border: 0.5px solid #14223c;
        }
        &__other-container-item {
            @apply flex flex-col items-center justify-center;
        }
        &__checked {
            @apply border-none;
            background-color: var(--color-primary);
        }
        &__options-input-container {
            @apply flex flex-col gap-[10px];
        }
        &__selected-other {
            @apply text-[white];
        }
        &__modal-footer {
            @apply flex justify-end;
        }
        &__other {
            @apply flex  gap-[20px];
        }
        &__add-other {
            border: 0.5px solid #d6d6d6;
            @apply w-[82px] h-[60px] rounded-[8px] flex flex-col justify-center items-center;
        }
        &__daily-needed-container {
            // @apply flex gap-[10px] flex-wrap;
        }
        &__daily-needed {
            // border: 0.5px solid var(--color-stroke-gray);
            // @apply bg-white p-[10px] rounded-[8px] cursor-pointer w-fit flex;
        }

        &__title-item-container {
            @apply flex flex-col gap-[10px];
        }

        &__title-item {
            color: var(--color-gray-icon);
            @apply font-semibold;
        }

        &__item-deletable {
            @apply flex flex-col w-full;
        }

        &__deletable {
        }

        &__deletable-container {
            @apply w-full flex justify-end;
        }

        //Features
        &__features {
            @apply flex flex-col gap-[18px];
        }
        &__features-body {
            @apply flex flex-col gap-[18px];
        }
        &__features-item {
            @apply rounded-[4px] h-[72px] w-[110px] flex justify-center items-center  cursor-pointer;
            border: 0.5px solid #14223c;
        }

        &__features-container {
            @apply w-full flex flex-wrap gap-[10px];
        }

        &__features-item {
            @apply flex flex-col;
        }

        &__title-container {
            background-color: var(--color-gray);
            @apply p-[5px] rounded-[4px] flex justify-between items-center;
        }

        &__delete {
            @apply cursor-pointer;
        }

        &__delete-item {
            @apply -mt-[20px] -mr-[10px];
        }
        &__features-content {
            @apply flex flex-col gap-[20px];
        }
        //End features
    }

    /**CSS of Inside */
    .inside {
        &__title {
            @apply my-[10px] text-[14px] font-[600];
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
            &:deep() {
                label {
                    @apply font-[600];
                }
            }
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
            @apply flex-1;
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
