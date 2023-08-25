<template>
    <AddContainer
        :titleLabel="titleLabel"
        :controlButton="controlButton"
        @onNext="next"
    >
        <div :class="error ? 'error-radio' : 'btn-menu'">
            <div>
                <a-radio-group
                    v-model:value="params.locationType"
                    @change="onChange"
                    button-style="solid"
                >
                    <a-radio-button
                        v-for="(d, index) in data"
                        :key="index"
                        :value="d.label"
                        >{{ d.label }}</a-radio-button
                    >
                </a-radio-group>
            </div>
            <small v-if="error" class="text-[#fa8072]">
                Veuillez sélectionner une option !
            </small>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';

    import { ref, watch, onMounted, onBeforeMount } from 'vue';
    import {
        RadioButton as ARadioButton,
        RadioGroup as ARadioGroup,
    } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const store: Store<any> = useStore();
    const router = useRouter();

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

    const error = ref<boolean>(false);

    const emit = defineEmits<{
        (event: 'onClickNext'): void;
    }>();

    const params = ref<any>({
        locationType: '',
    });

    onMounted(() => {
        let data = store.getters['AddProductModule/getAddPropertyDatas'];
        if (data && data.locationType) {
            params.value = data;
        } else {
            console.log(params.value, 'PARAMS');
        }
    });

    const data = ref<any>(props.data);

    function onChange() {
        error.value = false;
    }

    function next() {
        if (params.value.locationType === '') {
            error.value = true;
        } else {
            error.value = false;
            store.dispatch('AddProductModule/setPropertyData', {
                data: { 
                    operationType: 'lease',
                    ...params.value
                 },
            });
            emit('onClickNext');
        }
    }
</script>

<style lang="scss" scoped>
    .btn-menu {
        @apply flex flex-col gap-[12px];
        &:deep() {
            .ant-radio-group {
                @apply md:grid grid-cols-2 gap-[15px];
            }
            .ant-radio-button-wrapper {
                height: 54px;
                border-radius: 4px;
                border: 1px solid var(--color-primary);
                @apply flex justify-center items-center;
            }
            .ant-radio-button-wrapper:not(:first-child)::before {
                content: none;
            }
            .ant-radio-button-wrapper-checked:not(
                    [class*=' ant-radio-button-wrapper-disabled']
                ).ant-radio-button-wrapper {
                background-color: var(--color-primary);
            }
            .ant-radio-button-wrapper:hover {
                color: var(--color-secondary);
            }
        }
    }
    .error-radio {
        @apply flex flex-col gap-[12px];
        &:deep() {
            .ant-radio-group {
                @apply md:grid grid-cols-2 gap-[15px];
            }
            .ant-radio-button-wrapper {
                height: 54px;
                border-radius: 4px;
                border: 1px solid #fa8072;
                @apply flex justify-center items-center;
            }
            .ant-radio-button-wrapper:not(:first-child)::before {
                content: none;
            }
            .ant-radio-button-wrapper-checked:not(
                    [class*=' ant-radio-button-wrapper-disabled']
                ).ant-radio-button-wrapper {
                background-color: var(--color-primary);
            }
            .ant-radio-button-wrapper:hover {
                color: var(--color-secondary);
            }
        }
    }
</style>