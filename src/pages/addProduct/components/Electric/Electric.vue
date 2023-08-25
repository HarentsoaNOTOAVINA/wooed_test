<template>
    <div class="electric__container">
        <div
            class="electric__item"
            v-for="(item, index) in dataOfElectric"
            :key="index"
        >
            <div class="" v-if="item.type === 'select'">
                <Select
                    :name="item.name"
                    :label="item.label"
                    :options="item.options"
                    @change-select="handleChange"
                    :default-value="
                        propertyDatas[item.name]
                            ? propertyDatas[item.name]
                            : item.name === 'counterName'
                            ? 'Privatif'
                            : ''
                    "
                />
            </div>
            <div class="" v-if="item.type === 'switch'">
                <Switch
                    :item-label="item.label"
                    :name="item.name"
                    @handle-switch="handleChange"
                    :value="propertyDatas[item.name]"
                />
            </div>
            <div class="electric__conform" v-if="item.subItem">
                <template v-if="params.installationPropre">
                    <div
                        class=""
                        v-for="(subItem, idSubItem) in item.subItem"
                        :key="idSubItem"
                    >
                        <div class="" v-if="subItem.type === 'date'">
                            <InputDate
                                :label="subItem.label"
                                :name="subItem.name"
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
                        <div class="" v-else-if="subItem.type === 'file'">
                            <P class="electric__label">{{ subItem.label }}</P>
                            <UploadImage
                                :name="subItem.name"
                                @upload-single-with-name="handleChange"
                            />
                            <!-- :default-file-list="propertyDatas[subItem.name]" -->
                        </div>
                    </div>
                </template>

                <template v-else>
                    <div
                        class=""
                        v-for="(certItem, certIndex) in planedCertification"
                        :key="certIndex"
                    >
                        <Switch
                            :item-label="certItem.label"
                            :name="certItem.name"
                            @handle-switch="handleChange"
                            :checked-default="params.planedCertification"
                            :value="propertyDatas[certItem.name]"
                        />
                        <div class="" v-if="params.planedCertification">
                            <P class="electric__info">
                                <Icon icon-name="InfoIcon" />
                                <span
                                    >Aller vers travaux pour planifié une
                                    certification</span
                                >
                            </P>
                            <Button type-button="secondary" @click="goToWork"
                                >Aller vers travaux</Button
                            >
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {
        ElectricData,
        licencePlanified,
    } from '@/pages/addProduct/components/Electric/data';
    import { ref, watch } from 'vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { useStore } from 'vuex';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { useRouter } from 'vue-router';
    import moment from 'moment';

    const store = useStore();
    const router = useRouter();
    const dataOfElectric = ref<any>(ElectricData);
    const params = ref<any>({
        counterName: 'Privatif',
        installationPropre: false,
        planedCertification: false,
    });
    const planedCertification = ref<any>(licencePlanified);
    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
            });
            if (value.installationPropre) {
                params.planedCertification = false;
            }
        },
        { immediate: true, deep: true }
    );

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }

    function goToWork() {
        let route = router.resolve({ path: '/travaux' });
        window.open(route.href, '_blank');
    }
</script>

<style lang="scss" scoped>
    .electric {
        &__container {
            @apply flex flex-col gap-[10px];
        }

        &__item {
        }

        &__conform {
            @apply flex flex-col gap-[20px] mt-[20px];
        }

        &__label {
            @apply font-semibold;
        }

        &__info {
            @apply flex gap-[10px] mb-[10px] italic text-blue-400 mt-[30px];
        }
    }
</style>
