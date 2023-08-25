<script lang="ts" setup>
    import {
        itemList,
        autoriseCoproprio,
        coproprioInfo,
    } from '@/pages/addProduct/components/Description/data';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import { reactive, computed, onMounted, ref, watch } from 'vue';
    import { useStore, Store } from 'vuex';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import SelectAutoComplete from '@/components/Common/SelectAutoComplet/SelectAutoComplet.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    const params = ref<any>({
        details: '',
        syndicName: '',
        syndicsResponse: null,
        minutes: [],
        amountOfCharge: 0,
        notary: -1,
    });
    const requiredParams = ref<any>({
        // cadastralArea: 0,
        livingArea: 0,
    });
    const text = reactive({
        publicSale: 'Vente public volontaire',
    });
    const store: Store<any> = useStore();
    const autoriseCopro = ref<any>(autoriseCoproprio);
    const infoCopro = ref<any>(coproprioInfo);
    const showCode = ref<boolean>(false);
    const hebergement = ref<boolean>(false);
    const locationType = computed(
        () =>
            store.getters['AddProductModule/getAddPropertyDatas'][
                'locationType'
            ]
    );
    const options = ref<any>();
    const notaryList = ref<any[]>([]);
    const transactionType = computed(
        () => store.getters['AddProductModule/getTransactionType']
    );
    watch(
        () => store.getters['AddProductModule/getNotaryList'],
        (newVal) => {
            if (Array.isArray(newVal) && newVal.length) {
                newVal.forEach((item) => {
                    notaryList.value.push({
                        label: item.name,
                        value: item.id,
                    });
                });
            }
        }
    );
    watch(
        () => params.value,
        (first) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...first },
                step: { adDesc: paramsValidation() },
            });
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        const notaryData = computed(
            () => store.getters['AddProductModule/getNotaryList']
        );
        if (Array.isArray(notaryData.value) && notaryData.value.length) {
            notaryData.value.forEach((item) => {
                notaryList.value.push({
                    label: item.name,
                    value: item.id,
                });
            });
        }
        checkIfHebergement();
    });

    function paramsValidation() {
        // if (
        //     requiredParams.value.livingArea &&
        //     requiredParams.value.cadastralArea
        // ) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    }

    function handleChange(item: any) {
        for (let i in item) {
            if (i === 'autoriseCopro') {
                showCode.value = item[i];
            } else {
                params.value[i] = item[i];
            }
        }
        requiredParams.value = {
            ...requiredParams.value,
            ...item,
        };
    }

    function checkIfHebergement() {
        if (
            locationType.value?.toLowerCase().split(' ').includes('hebergement')
        ) {
            hebergement.value = true;
            getListOfSyndic();
        } else {
            hebergement.value = false;
        }
    }

    function getListOfSyndic() {
        options.value = store.getters['AddProductModule/getListOfSyndic'];
    }

    function handleUploadSyndic(value: any) {
        for (let i in value) {
            params.value[i] = value[i];
        }
    }

    function handleUploadMinutes(value: Array<any>) {
        params.value.minutes = [
            ...params.value.minutes,
            {
                file: value,
            },
        ];
    }

    function handleSelectNotary(value: any, name: string) {
        params.value.notary = value;
    }
</script>

<template>
    <div class="description__container">
        <div class="" v-for="item in itemList" :key="item.id">
            <TextArea
                v-if="item.type === 'textArea'"
                :label="item.label"
                :name-input="item.name"
                @handle-change="handleChange"
                class="md:flex-col"
            />
            <SelectAutoComplete
                v-else-if="
                    item.type === 'select' &&
                    transactionType === text.publicSale
                "
                :name="item.name"
                :options="notaryList"
                :style="'width: 100%'"
                :subTitle="item.label"
                class="desc__select"
                @change-select="handleSelectNotary($event, item.name)"
            />
            <Input
                v-else-if="item.type === 'text'"
                :name-input="item.name"
                :label="item.label"
                :input-type="item.type"
                :placeholder="item.placeholder"
                @input="handleChange"
            />
            <Input
                v-else-if="item.type === 'number'"
                :name-input="item.name"
                :label="item.label"
                :input-type="item.type"
                :placeholder="item.placeholder"
                @input="handleChange"
                :required="item.required"
            />

            <a
                v-else-if="item.type === 'link'"
                href="#"
                class="description__link-container"
            >
                <Icon icon-name="Link" />
                <span class="description__link">{{ item.label }}</span>
            </a>
        </div>

        <div class="" v-if="hebergement">
            <div class="">
                <Switch
                    :item-label="autoriseCopro.label"
                    :name="autoriseCopro.name"
                    @handle-switch="handleChange"
                />
            </div>
            <div class="" v-if="showCode">
                <div class="" v-for="(item, index) in infoCopro" :key="index">
                    <Paragraphe
                        v-if="item.type === 'file'"
                        class="description__text"
                    >
                        {{ item.label }}
                    </Paragraphe>
                    <Select
                        v-if="item.type === 'select'"
                        :name="item.name"
                        :label="item.label"
                        :options="options"
                        @change-select="handleChange"
                    />
                    <Input
                        v-if="item.type === 'number'"
                        :name-input="item.name"
                        :label="item.label"
                        :input-type="item.type"
                        :placeholder="item.placeholder"
                        @input="handleChange"
                    />
                    <Input
                        v-if="item.type === 'text'"
                        :name-input="item.name"
                        :label="item.label"
                        :input-type="item.type"
                        @input="handleChange"
                    />
                    <UploadImage
                        v-if="
                            item.type === 'file' &&
                            item.name === 'syndicsResponse'
                        "
                        :need-base64="false"
                        :name="item.name"
                        @upload-single-with-name="handleUploadSyndic"
                    />
                    <UploadImage
                        v-if="item.type === 'file' && item.name === 'minutes'"
                        :need-base64="false"
                        @upload-single-with-name="handleUploadMinutes"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .description {
        &__container {
            @apply flex gap-[10px] flex-col;
        }
        &__text {
            color: var(--color-gray-icon);
            @apply text-[14px] font-semibold my-[10px];
        }

        &__link-container {
            @apply flex gap-[10px];
        }

        &__link {
            @apply text-blue-300;
        }
    }
    .desc__select:deep(.select-autocomplete) {
        @apply w-full flex flex-col;
    }
</style>
