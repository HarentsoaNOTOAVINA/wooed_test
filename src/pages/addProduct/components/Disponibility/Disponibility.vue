<template>
    <div class="dispo__container">
        <div class="" v-for="(item, index) in disponibilityInput" :key="index">
            <div class="" v-if="item.type === 'select'">
                <Select
                    :name="item.name"
                    :label="item.label"
                    :placeholder="item.placeholder"
                    :options="item.options"
                    @change-select="handleChange"
                    :default-value="propertyDatas[item.name]"
                />
            </div>
            <div class="dispo__sub-item" v-if="item.subOptions">
                <div
                    class=""
                    v-for="(subItem, subIndex) in item.subOptions"
                    :key="subIndex"
                >
                    <div
                        class=""
                        v-if="(params.disponibility === PossibilityValue.apartir)"
                    >
                        <InputDate
                            v-if="subItem.name === 'disponibilityTime'"
                            :name="subItem.name"
                            :label="subItem.label"
                            @handle-date-eng="handleChange"
                            :value="
                                propertyDatas[subItem.name]
                                    ? moment(
                                          propertyDatas[subItem.name]
                                      ).format('DD-MM-YYYY')
                                    : ''
                            "
                        />
                    </div>
                    <div
                        v-else-if="
                            params.disponibility ===
                            PossibilityValue.bailEnCours
                        "
                    >
                        <!-- <Select 
                            v-if="subItem.name !== 'disponibilityTime'"
                            :options="subItem.options"
                            :name="subItem.name"
                            :label="subItem.label"
                            @change-select="handleChange"
                        /> -->

                        <InputDate
                            v-if="subItem.type === 'date'"
                            :name="subItem.name"
                            :label="subItem.label"
                            @handle-date-eng="handleChange"
                            :value="
                                propertyDatas[subItem.name]
                                    ? moment(
                                          propertyDatas[subItem.name]
                                      ).format('DD-MM-YYYY')
                                    : ''
                            "
                        />
                        <InputDate
                            v-else-if="subItem.type === 'year'"
                            :name="subItem.name"
                            :label="subItem.label"
                            @handle-date-eng="handleChange"
                            :min="true"
                            :value="
                                    propertyDatas[subItem.name]
                                        ? moment(
                                              propertyDatas[subItem.name]
                                          ).format('DD-MM-YYYY')
                                        : ''
                                "
                        />
                        <Switch
                            v-else-if="subItem.type === 'switch'"
                            :name="subItem.name"
                            :item-label="subItem.label"
                            @handle-switch="handleChange"
                            :value="propertyDatas[subItem.name]"
                        />
                        <Input
                            v-else
                            :name-input="subItem.name"
                            :label="subItem.label"
                            @input="handleChange"
                            :input-type="subItem.type"
                            :placeholder="subItem.placeholder"
                            :default-value="propertyDatas[subItem.name]"
                        />
                        <template class="" v-if="subItem.subOptions">
                            <div
                                class=""
                                v-for="(opt, idOpt) in subItem.subOptions"
                                :key="idOpt"
                            >
                                <Input
                                    v-if="params.locationWarranty"
                                    :name-input="opt.name"
                                    :label="opt.label"
                                    @input="handleChange"
                                    :input-type="opt.type"
                                    :default-value="propertyDatas[opt.name]"
                                />
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <div class="" v-if="item.type === 'number'">
                <Input
                    v-if="
                        params?.currentLease &&
                        params?.currentLease ===
                            PossibilityValue.amountRentalGarantee
                    "
                    :input-type="item.type"
                    :label="item.label"
                    :placeholder="item.placeholder"
                    :name-input="item.name"
                    @input="handleChange"
                    :default-value="propertyDatas[item.name]"
                />
            </div>
        </div>
        <div class="dispo__file" v-for="(item, index) in bailCopy" :key="index">
            <div
                class=""
                v-if="params.disponibility === PossibilityValue.bailEnCours"
            >
                <Paragraphe class="dispo__label">{{ item.label }}</Paragraphe>
                <Upload
                    :name="item.name"
                    @upload-single-with-name="handleChange"
                />
                <!-- :default-file-list="propertyDatas[item.name]" -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {
        dataDisponibility,
        bailCopy,
    } from '@/pages/addProduct/components/Disponibility/data';
    import { ref, watch, onMounted } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import { useStore } from 'vuex';
    import Upload from '@/components/Display/UploadImage/UploadImage.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import moment from 'moment';

    enum PossibilityValue {
        apartir = 'A partir de',
        immediat = 'Immédiatement',
        signatureActe = "A la signature de l'acte",
        definir = 'A définir',
        receptionProvisoire = 'Lors de la réception provisoire du bien',
        bailEnCours = 'Au terme du bail en cours',
        amountRentalGarantee = 'Garantie locative',
    }

    const store = useStore();
    const disponibilityInput = ref<any>(dataDisponibility);
    const params = ref<any>({
        disponibility: '',
        locationWarranty: false,
    });
    const addresse = ref<any>(null);

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    // watch(
    //     () => store.getters['AddProductModule/getAddPropertyDatas'],
    //     (value) => {
    //         propertyDatas.value = value
    //     },
    //     { immediate: true, deep: true }
    // );

    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
            });
        },
        { immediate: true, deep: true }
    );

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
        console.log('Log\n', params.value);
    }
</script>

<style lang="scss" scoped>
    .dispo {
        &__container {
        }

        &__sub-item {
            @apply flex flex-col gap-[10px];
        }

        &__file {
            @apply mt-[10px];
        }

        &__label {
            @apply font-semibold mb-[5px];
        }
    }
</style>
