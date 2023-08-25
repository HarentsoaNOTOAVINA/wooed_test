<template>
    <div class="influancer">
        <Paragraphe class="influancer__label">
            Selectionner un influenceur
        </Paragraphe>
        <a-radio-group
            size="large"
            name="publicityIfluencer"
            :value="params.publicityIfluencer"
            @change="handleChange"
        >
            <a-radio
                class="influancer__wrap"
                v-for="(item, key) in dataInf"
                :key="key"
                :value="item.id"
            >
                <div class="influancer__content">
                    <div class="influancer__image">
                        <Icon icon-name="User" />
                    </div>
                    <div class="influancer__details">
                        <Paragraphe class="influancer__name"
                            >{{ item.name + ' ' + item.firstname }}
                        </Paragraphe>
                        <Paragraphe class="influancer__address">
                            <Icon icon-name="Mail" />
                            {{ item.email }}</Paragraphe
                        >
                        <Paragraphe class="influancer__address">
                            <Icon icon-name="Map" />
                            <span>
                                {{ item.address }}
                            </span>
                        </Paragraphe>
                    </div>
                </div>
            </a-radio>
        </a-radio-group>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { RadioGroup as ARadioGroup, Radio as ARadio } from 'ant-design-vue';
    import { ref, watch } from 'vue';
    import { Store, useStore } from 'vuex';
    
    
    const props = defineProps({
        data: {
            type: Array,
            default: [],
            required: true,
        },
    });
    
    const store: Store<any> = useStore();
    const dataInf = ref<Array<any>>(props.data);
    const params = ref<any>({});

    watch(
        () => props.data,
        (value) => {
            dataInf.value = value;
        }
    );

    const handleChange = function (value: any) {
        params.value = {
            [value.target.name]: value.target.value,
        };
        console.log('>>>>>', params.value);
        store.dispatch('AddProductModule/setPropertyData', {
                data: { ...params.value },
            });
    };
</script>

<style lang="scss" scoped>
    .influancer {
        margin-top: 15px;
        &:deep() {
            .ant-radio-group {
                @apply grid grid-cols-4 w-full;
            }
            .ant-radio {
                position: absolute;
                right: 20px;
                top: 10px;
            }
            .ant-radio-wrapper::after {
                content: none;
            }
            .ant-radio-inner {
                border-radius: 3px;
                border-color: var(--color-primary);
            }
            .ant-radio-inner::after {
                border-radius: 3px;
                background-color: var(--color-primary)
            }
            .ant-radio-checked::after {
                border-color: var(--color-primary)
            }
        }
        &__content {
            @apply w-full;
            border: 1px solid var(--color-primary);
            border-radius: 5px;
            // position: absolute;
            // top: 0;
            // left: 0;
        }
        &__details {
            padding: 10px 15px;
        }
        &__wrap {
            @apply w-full relative mb-[15px];
            &:deep() {
                & > span {
                    &:not(.ant-radio) {
                        width: 100%;
                    }
                }
            }
        }
        &__image {
            height: 60px;
            @apply flex items-center justify-center;
            border-bottom: 1px solid var(--color-primary);
            &:deep() {
                svg {
                    height: 30px;
                    width: 30px;
                }
            }
        }
        &__address {
            @apply flex items-center gap-[5px];
            color: var(--color-gray-icon);
            font-size: 14px;
            span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        &__name {
            font-weight: 600;
            margin-bottom: 10px;
        }
        &__label {
            font-weight: 600;
            margin-bottom: 10px;
        }
    }
</style>
