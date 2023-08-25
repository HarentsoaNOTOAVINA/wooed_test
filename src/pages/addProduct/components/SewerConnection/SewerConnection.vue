<template>
    <div class="sewer__container">
        <div
            class="sewer__item"
            v-for="(item, index) in sewerInfo"
            :key="index"
        >
            <div class="" v-if="item.type === 'switch'">
                <Switch
                    :name="item.name"
                    :item-label="item.label"
                    @handle-switch="handleChange"
                    :value="propertyDatas[item.name]"
                />
            </div>
        </div>

        <div class="sewer__not-item" v-if="!params.connectToSewer">
            <div class="" v-for="(item, index) in notSewerInfo" :key="index">
                <div class="" v-if="item.type === 'select'">
                    <Select
                        :name="item.name"
                        :label="item.label"
                        @change-select="handleChange"
                        :options="item.options"
                        :default-value="propertyDatas[item.name]"
                    />
                </div>

                <div class="" v-if="item.type === 'date'">
                    <InputDate
                        :name="item.name"
                        :label="item.label"
                        @handle-date-eng="handleChange"
                        :value="
                            propertyDatas[item.name]
                                ? moment(propertyDatas[item.name]).format(
                                      'DD-MM-YYYY'
                                  )
                                : ''
                        "
                    />
                </div>

                <div class="" v-if="item.type === 'file'">
                    <P class="sewer__file-label">{{ item.label }}</P>
                    <Upload
                        :name="item.name"
                        @upload-single-with-name="handleChange"
                    />
                    <!-- :default-file-list="propertyDatas[item.name]" -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {
        sewerData,
        notSewerData,
    } from '@/pages/addProduct/components/SewerConnection/data';
    import { ref, watch } from 'vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Upload from '@/components/Display/UploadImage/UploadImage.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { useStore } from 'vuex';
    import moment from 'moment';

    const store = useStore();
    const sewerInfo = ref<any>(sewerData);
    const notSewerInfo = ref<any>(notSewerData);
    const params = ref<any>({
        connectToSewer: false,
    });
    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

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
    }
</script>

<style lang="scss" scoped>
    .sewer {
        &__container {
        }

        &__file-label {
            @apply font-semibold my-[10px];
        }

        &__not-item {
            @apply flex flex-col gap-[20px] mt-[20px];
        }
    }
</style>
