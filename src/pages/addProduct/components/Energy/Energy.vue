<script lang="ts" setup>
    import {
        menuList,
        PEBValue,
        hebergementData,
        UploadFile,
        filesCaracteristiqueUpload,
        data,
        boilerType,
        boilerConforme,
        dataHousingHeatRequirement,
        dataHeatingInstallation,
        dataHotWaterInstallation,
        dataVentilationSystem,
        dataEnergyRenewable,
    } from '@/pages/addProduct/components/Energy/data';
    import Input from '@/components/Common/Input/Input.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { computed, onMounted, ref, watch } from 'vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Upload from '@/components/Display/UploadImage/UploadImage.vue';
    import { Store, useStore } from 'vuex';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import moment from 'moment';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { useRouter } from 'vue-router';
    import RadioGroup from '@/components/Common/RadioGroup/RadioGroup.vue';

    const router = useRouter();
    const store: Store<any> = useStore();
    const active = ref<number>(PEBValue.length - 1);
    let region = ref<string>('');
    let country = ref<string>('');
    const pebResult = ref<number>(511);
    const params = ref<any>({
        boilerType: '',
        boilerInstallationTime: '',
        certnumber: null,
        annualenergy: undefined,
        primaryenergy: null,
    });
    let showUploadFilePeb = ref<boolean>(false);
    const saleData = ref<Array<any>>(menuList);
    const locationData = ref<Array<any>>(hebergementData);
    // const region = ref<string>();
    const housingHeatRequirementSelected = ref<string>('');
    const heatingInstallationSelected = ref<string>('');

    const paramsData = ref<any>({
        isAppIntegrateCaracteristicPeb: false,
        integratePEB: {},
    });

    const isHebergement: boolean = computed(
        () =>
            store.getters['AddProductModule/getAddPropertyDatas'][
                'locationType'
            ]
    )
        .value?.toLowerCase()
        .split(' ')
        .includes('hebergement');

    onMounted(() => {
        getCountry();
    });
    const defaultFileList = ref<any>([]);

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    watch(
        () => pebResult.value,
        (first: any) => {
            for (let i = 0; i < PEBValue.length; i++) {
                if (first <= PEBValue[i].max && first > PEBValue[i].min) {
                    active.value === PEBValue[i].id;
                }
            }
        }
    );

    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
                step: { energyCharacteristic: validation(value) },
            });
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        // checkIfHebergement();
        getLocalization();
    });

    function getLocalization() {
        country.value =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ]['country'];
        region.value =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ]['region'];

        console.log(country.value, region.value, 'Country andd region');

        for (let i = 0; i < filesCaracteristiqueUpload.length; i++) {
            const file = filesCaracteristiqueUpload[i];

            if (file.country && file.country.includes('Belgique')) {
                if (file.region && file.region.includes(region.value)) {
                    console.log(
                        `Fichier avec le label '${file.label}' correspond à la règion '${region.value}'`
                    );
                    file.visible = true;
                }
            } else if (file.country && file.country.includes(country.value)) {
                console.log(
                    `Fichier avec le label '${file.label}' correspond au pays '${country.value}'`
                );

                file.visible = true;
            }
        }
    }

    function handleChange(value: any) {
        if (Object.keys(value)[0] === 'primaryenergy') {
            pebResult.value = +value.primaryenergy;
        }

        for (let i in value) {
            params.value[i] = value[i];
        }
        console.log('zazaza\n', params.value);
    }

    function handleUpload(value: any) {
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...value },
        });
        // ``;
    }

    function validation(params: Object) {
        if (region.value !== 'Fladres' && region.value !== 'Flandre') {
            return Object.values(params).every(
                (i) => i !== null && i !== undefined
            );
        } else {
            return Object.values(params).every((i) => i !== null);
        }
    }

    function getCountry() {
        region.value =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ]['region'];
    }

    // function checkIfHebergement(){
    //     const isHebergement : boolean = computed(() => store.getters['AddProductModule/getAddPropertyDatas']['locationType']).value.toLowerCase().split(' ').includes('hebergement');
    //     if(isHebergement){
    //         saleData.value = hebergementData;
    //     }else{
    //         saleData.value = menuList;
    //     }
    // }

    function handleSwitchCaraPeb() {
        showUploadFilePeb.value = !showUploadFilePeb.value;
    }

    function handleChangeCaracterisic(value: any) {
        paramsData.value = {
            ...paramsData.value,
            ...value,
        };
        console.log(paramsData.value);
    }

    const housingHeatRequirement = ref<any>();
    const heatingInstallation = ref<any>();
    const hotWaterInstallation = ref<any>();
    const ventilationSystem = ref<any>();
    const energyRenewable = ref<any>();

    function handleChangeIntegrate(value: any, type: any) {
        paramsData.value.integratePEB = {
            ...paramsData.value.integratePEB,
            ...value,
        };
        const dataSelect = type.data.filter((itemValue: any) => {
            return itemValue.value === value[type.name];
        });

        if (dataSelect.length) {
            if ('housingHeatRequirement' == type.name) {
                housingHeatRequirement.value = dataSelect[0];
            } else if ('heatingInstallation' == type.name) {
                heatingInstallation.value = dataSelect[0];
            } else if ('hotWaterInstallation' == type.name) {
                hotWaterInstallation.value = dataSelect[0];
            } else if ('ventilationSystem' == type.name) {
                ventilationSystem.value = dataSelect[0];
            } else if ('energyRenewable' == type.name) {
                energyRenewable.value = dataSelect[0];
            }
        }
    }

    function goToWork() {
        let route = router.resolve({ path: '/travaux' });
        window.open(route.href, '_blank');
    }

</script>

<template>
    <div class="energy__container">
        <div class="energy__sale" v-if="!isHebergement">
            <div class="carac__card">
                <div class="caracteristic__title-container">
                    <Paragraphe class="caracteristic__title"
                        >Type de chauffage</Paragraphe
                    >
                </div>
                <div class="caracteristic__subitem-content">
                    <Select
                        label="Type de chauffage"
                        name="boilerType"
                        :options="boilerType"
                        @change-select="handleChange"
                    />
                    <InputDate
                        label="Année d’installation"
                        name="boilerInstallationTime"
                        :max="true"
                        picker="year"
                        placeholder="Selectionner l'année"
                        format="YYYY"
                        @handle-change="handleChange"
                    />
                </div>
            </div>

            <div class="carac__card">
                <div class="caracteristic__title-container">
                    <Paragraphe class="caracteristic__title"
                        >Chaudière</Paragraphe
                    >
                </div>

                <div>
                    <Radio
                        label="Mentionner ici si la chaudière est conforme"
                        name="isBoilerConforme"
                        :element="boilerConforme"
                    />

                    <div class="flex flex-col gap-[14px]">
                        <label for="" class="carac__label"
                            >Insérer ici le dernier certificat de contrôle de la
                            chaudière</label
                        >
                        <Upload
                            name="lastControlBoiler"
                            @upload-single-with-name="handleChange"
                        />
                        <Input
                            input-type="number"
                            label="Coût annuel du contrôle"
                            name="boilerCost"
                            @input="handleChange"
                        />
                    </div>
                </div>
            </div>

            <div class="carac__card">
                <div class="caracteristic__title-container">
                    <Paragraphe class="caracteristic__title"
                        >Performance énergetique</Paragraphe
                    >
                </div>
                <div class="" v-for="item in saleData" :key="item.id">
                    <div
                        v-if="item.type === 'select'"
                        class="flex flex-col gap-[14px]"
                    >
                        <Select
                            :label="item.label"
                            :name="item.name"
                            :options="item.options ?? item.options"
                            @change-select="handleChange"
                            :default-value="propertyDatas[item.name]"
                        />
                        <Input
                            v-if="params.boilerType === 'Autre'"
                            input-type="text"
                            @input="handleChange"
                            :placeholder="`Autre ${item.label}`"
                            :name-input="`other${item.name}`"
                            class="energy__peb-container-item-input"
                            :default-value="propertyDatas[`other${item.name}`]"
                        />
                    </div>
                    <InputDate
                        v-else-if="item.type === 'date'"
                        :label="item.label"
                        :name="item.name"
                        :max="true"
                        picker="year"
                        placeholder="Selectionner l'année"
                        format="YYYY"
                        :value="
                            propertyDatas[item.name]
                                ? moment(propertyDatas[item.name]).format(
                                      'YYYY'
                                  )
                                : ''
                        "
                    />

                    <div class="" v-else>
                        <Paragraphe class="energy__title">
                            <span class="energy__required">*</span>
                            {{ item.label }}
                        </Paragraphe>
                        <div class="energy__peb-container">
                            <div
                                class="energy__peb-container-item"
                                v-for="subItem in item.subItem"
                                :key="subItem.id"
                            >
                                <template
                                    class="energy__annual-energy"
                                    v-if="subItem.name === 'annualenergy'"
                                >
                                    <Input
                                        v-if="
                                            region !== 'Flandre' &&
                                            region !== 'Flandres'
                                        "
                                        :input-type="subItem.type"
                                        @input="handleChange"
                                        :placeholder="subItem.label"
                                        :name-input="subItem.name"
                                        class="energy__peb-container-item-input"
                                        :required="subItem.required"
                                        :default-value="
                                            propertyDatas[subItem.name]
                                        "
                                    />
                                </template>
                                <Input
                                    v-else
                                    :input-type="subItem.type"
                                    @input="handleChange"
                                    :placeholder="subItem.label"
                                    :name-input="subItem.name"
                                    class="energy__peb-container-item-input"
                                    :required="subItem.required"
                                    :default-value="propertyDatas[subItem.name]"
                                    :unity="subItem.unity"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="energy__valuePEB-container">
                    <div
                        v-for="item in PEBValue"
                        :key="item.id"
                        :class="[
                            pebResult <= item.max && pebResult >= item.min
                                ? 'energy__active'
                                : '',
                        ]"
                        class="energy__valuePEB"
                    >
                        <Paragraphe :style="{ background: item.color }">{{
                            item.label
                        }}</Paragraphe>
                    </div>
                </div>

                <div class="carac__link-container">
                    <Paragraphe class="carac__label"
                        >Trouver un certificateur Agréé</Paragraphe
                    >
                    <div class="carac__link">
                        <Icon icon-name="Link" />
                        <span>Aller vers travaux</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="energy__location" v-if="isHebergement">
            <div class="" v-for="(item, index) in locationData" :key="index">
                <Select
                    v-if="item.type === 'select'"
                    :name="item.name"
                    :label="item.label"
                    :options="item.options"
                    @change-select="handleChange"
                    :default-value="propertyDatas[item.name]"
                />
                <Input
                    v-if="item.type === 'text'"
                    :name-input="item.name"
                    :label="item.label"
                    :input-type="item.type"
                    @input="handleChange"
                    :default-value="propertyDatas[item.name]"
                />
                <Input
                    v-if="item.type === 'number'"
                    :name-input="item.name"
                    :label="item.label"
                    :input-type="item.type"
                    @input="handleChange"
                    :default-value="propertyDatas[item.name]"
                />

                <InputDate
                    v-if="item.type === 'date'"
                    :name="item.name"
                    :label="item.label"
                    @handle-date="handleChange"
                    :default-value="propertyDatas[item.name]"
                />

                <Upload
                    v-if="item.type === 'file'"
                    :name="item.name"
                    :default-file-list="propertyDatas[item.name]"
                />
            </div>
        </div>

        <div class="caracteristic carac__card">
            <div class="caracteristic__content">
                <div class="caracteristic__first">
                    <div class="caracteristic__title-container">
                        <Paragraphe class="caracteristic__title"
                            >Intégrer les caractéristiques du PEB dans votre
                            annoncer</Paragraphe
                        >
                    </div>
                    <div class="caracteristic__item-container">
                        <div class="caracteristic__item-content">
                            <Select
                                name="housingHeatRequirement"
                                label="Besoin en chaleur du logement"
                                :options="data['housingHeatRequirement']"
                                placeholder="Selectionner"
                                @change-select="
                                    handleChangeIntegrate($event, {
                                        name: 'housingHeatRequirement',
                                        data: dataHousingHeatRequirement,
                                    })
                                "
                            />
                            <div
                                class="caracteristic__subitem"
                                v-if="
                                    paramsData.integratePEB[
                                        'housingHeatRequirement'
                                    ]
                                "
                            >
                                <div class="caracteristic__subitem-container">
                                    <Transition
                                        appear
                                        name="fadeHeight"
                                        mode="out-in"
                                    >
                                        <div class="caracteristic__subitem-content">
                                            <div
                                                v-for="(
                                                    item, index
                                                ) in housingHeatRequirement.subData"
                                                :key="index"
                                            >
                                                <RadioGroup
                                                    v-if="item.type == 'radio'"
                                                    :name="item.name"
                                                    :items="
                                                        housingHeatRequirement.selectData
                                                    "
                                                    :label="item.title"
                                                />
                                                <Switch
                                                    v-if="item.type == 'switch'"
                                                    :item-label="item.title"
                                                    :name="item.name"
                                                />
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                        <div class="caracteristic__item-content">
                            <Select
                                name="heatingInstallation"
                                label="Performance des installations de chauffage"
                                :options="data['heatingInstallation']"
                                placeholder="Selectionner"
                                @change-select="
                                    handleChangeIntegrate($event, {
                                        name: 'heatingInstallation',
                                        data: dataHeatingInstallation,
                                    })
                                "
                            />
                            <div
                                class="caracteristic__subitem"
                                v-if="
                                    paramsData.integratePEB['heatingInstallation']
                                "
                            >
                                <Transition appear name="fadeHeight" mode="out-in">
                                    <div class="caracteristic__subitem-content">
                                        <div
                                            v-for="(
                                                item, index
                                            ) in heatingInstallation.subData"
                                            :key="index"
                                        >
                                            <Switch
                                                v-if="item.type == 'switch'"
                                                :item-label="item.title"
                                                :name="item.name"
                                            />
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                        <div class="caracteristic__item-content">
                            <Select
                                name="hotWaterInstallation"
                                label="Performance des installations d’eau chaude sanitaire"
                                :options="data['hotWaterInstallation']"
                                placeholder="Selectionner"
                                @change-select="
                                    handleChangeIntegrate($event, {
                                        name: 'hotWaterInstallation',
                                        data: dataHotWaterInstallation,
                                    })
                                "
                            />
                            <div
                                class="caracteristic__subitem"
                                v-if="
                                    paramsData.integratePEB['hotWaterInstallation']
                                "
                            >
                                <Transition appear name="fadeHeight" mode="out-in">
                                    <div class="caracteristic__subitem-content">
                                        <div
                                            v-for="(
                                                item, index
                                            ) in hotWaterInstallation.subData"
                                            :key="index"
                                        >
                                            <Switch
                                                v-if="item.type == 'switch'"
                                                :item-label="item.title"
                                                :name="item.name"
                                            />
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                        <div class="caracteristic__item-content">
                            <Select
                                name="ventilationSystem"
                                label="Systeme de ventilation"
                                :options="data['ventilationSystem']"
                                placeholder="Selectionner"
                                @change-select="
                                    handleChangeIntegrate($event, {
                                        name: 'ventilationSystem',
                                        data: dataVentilationSystem,
                                    })
                                "
                            />
                            <div
                                class="caracteristic__subitem"
                                v-if="
                                    paramsData.integratePEB['ventilationSystem'] &&
                                    ventilationSystem.subData.length
                                "
                            >
                                <Transition appear name="fadeHeight" mode="out-in">
                                    <div class="caracteristic__subitem-content">
                                        <div
                                            v-for="(
                                                item, index
                                            ) in ventilationSystem.subData"
                                            :key="index"
                                        >
                                            <Switch
                                                v-if="item.type == 'switch'"
                                                :item-label="item.title"
                                                :name="item.name"
                                            />
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                        <div class="caracteristic__item-content">
                            <Select
                                name="energyRenewable"
                                label="Energies renouvelables"
                                :options="data['energyRenewable']"
                                placeholder="Selectionner"
                                @change-select="
                                    handleChangeIntegrate($event, {
                                        name: 'energyRenewable',
                                        data: dataEnergyRenewable,
                                    })
                                "
                            />
                            <div
                                class="caracteristic__subitem"
                                v-if="paramsData.integratePEB['energyRenewable']"
                            >
                                <Transition appear name="fadeHeight" mode="out-in">
                                    <div class="caracteristic__subitem-content">
                                        <div
                                            v-for="(
                                                item, index
                                            ) in energyRenewable.subData"
                                            :key="index"
                                        >
                                            <Input
                                                v-if="item.type == 'input'"
                                                :label="item.title"
                                                :name-input="item.name"
                                                :input-type="item.inputType"
                                            />
                                            <Switch
                                                v-if="item.type == 'switch'"
                                                :item-label="item.title"
                                                :name="item.name"
                                            />
                                            <Select
                                                v-if="item.type == 'select'"
                                                :name="item.name"
                                                :label="item.title"
                                                :options="item.subSelectData"
                                                placeholder="Selectionner"
                                            />
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="caracteristic__divider" />
                <div class="caracteristic__second">
                    <Switch
                        :item-label="
                            'Demander à l’appli d’intégrer les caractéristiques du PEB dans l’annonce : ' +
                            29 +
                            ' €'
                        "
                        name="isAppIntegrateCaracteristicPeb"
                        @handle-switch="handleChangeCaracterisic"
                    />
                    <!-- <Input 
                        v-if="paramsData.isAppIntegrateCaracteristicPeb"
                        label="Prix"
                        name-input="priceIntegrationPebCaracterisique"
                    /> -->
                </div>
            </div>
        </div>

        <div class="energy__files">
            <div
                class="energy__items"
                v-for="(item, index) in UploadFile"
                :key="index"
            >
                <Paragraphe class="energy__files-label">{{
                    item.label
                }}</Paragraphe>
                <Upload
                    :name="item.name"
                    @upload-single-with-name="handleUpload"
                    :default-file-list="propertyDatas[item.name]"
                />
            </div>
        </div>
        <div class="energy__caracteristicPEB">
            <Switch
                name="caracteristicPEB"
                item-label="Voulez-vous intégrer les caractéristiques du PEB dans votre annonce ?"
                @switch-value="handleSwitchCaraPeb"
                :value="propertyDatas.caracteristicPEB"
            />

            <!-- <div class="energy__caracteristicFile" v-if="showUploadFilePeb">
                <div
                    class="energy__caracteristic-content"
                    v-for="(item, i) in filesCaracteristiqueUpload"
                >
                    <div
                        class="energy__caracteristicUpload"
                        v-if="item.visible"
                    >
                        <Paragraphe class="energy__files-label">{{
                            item.label
                        }}</Paragraphe>
                        <Upload
                            :name="item.nameLabel"
                            @upload-single-with-name="handleUpload"
                        />
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .energy {
        &__container {
        }
        &__input-container {
        }
        &__sale {
            @apply flex flex-col gap-[14px];
            &:deep() {
                .custom-select__wrapper {
                    @apply mb-0;
                }
            }
        }
        &__title {
            font-weight: 600;
            color: var(--color-gray-icon);
            @apply mb-[8px];
        }
        &__valuePEB-container {
            @apply flex w-[100%] gap-[20px] flex-wrap mt-[20px];
        }
        &__valuePEB {
            p {
                @apply text-[white] w-[33px] h-[33px] rounded-[50%] flex justify-center items-center flex-wrap;
            }
        }
        &__active {
            position: relative;
            z-index: 9;
            &::after {
                content: '';
                width: 115%;
                height: 115%;
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                background-color: var(--color-primary);
                z-index: -1;
            }
        }
        &__peb-container {
            @apply grid gap-[14px];
            @screen sm {
                @apply grid-cols-2;
            }
            @screen md {
                @apply grid-cols-1;
            }
            @screen lg {
                @apply grid-cols-3;
            }
        }
        &__peb-container-item {
            @apply flex flex-1 w-[100%];
        }
        &__peb-container-item-input {
            @apply w-[100%];
        }

        &__files {
            @apply mt-[20px];
        }

        &__files-label {
            @apply font-semibold mb-[10px];
        }

        &__required {
            @apply text-red;
        }

        &__annual-energy {
            @apply flex-1;
        }
    }

    .caracteristic {
        @apply p-[10px] my-[20px];
        &__first {
            @apply flex flex-col gap-[14px];
        }
        &__item-content {
            @apply border border-slate-200 rounded-[8px] p-[10px];
        }

        &__title-container {
            @apply flex justify-center items-center pb-[10px] border-b border-slate-200;
        }

        &__title {
            @apply font-semibold text-slate-400;
        }

        // &__content {
        //     @apply my-[10px];
        // }

        &__item {
            @apply my-[10px];
        }
        &__item-container {
            @apply flex flex-col gap-[18px];
        }
        &__item-content {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            &:deep() {
                & > .custom-select__wrapper {
                    .custom-select__content {
                        @screen xl {
                            @apply w-[50%];
                        }
                    }
                    label {
                        @apply text-secondary;
                    }
                }
                .label,
                .custom-select__wrapper label, .switch label, .app-radio-group label, .custom-input__fields label {
                    @apply font-[600];
                }
            }
        }
        &__subitem-content {
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
            &:deep() {
                .ant-radio-group {
                    @apply pl-[14px];
                }
            }
        }
        &__divider {
            @apply text-slate-200 my-[20px];
        }

        &__item-check {
            @apply flex flex-col gap-[10px];
        }
    }

    .carac {
        &__card {
            @apply flex flex-col gap-[14px] border border-slate-200 rounded-[8px] p-[10px];
            &:deep() {
                .app-radio-group label {
                    @apply font-[600];
                }
            }
        }

        &__label {
            @apply font-semibold;
        }

        &__required {
            @apply text-rose-600;
        }

        &__items-energy {
            @apply flex flex-wrap gap-[10px] mt-[5px];
        }

        &__items-energy-item {
            @apply flex-1;
        }

        &__link {
            @apply flex gap-[5px] text-blue-500 cursor-pointer;
        }

        &__link-container {
            @apply my-[10px];
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
