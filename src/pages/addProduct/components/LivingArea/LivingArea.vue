<template>
    <div class="living__container">
        <div
            class="living__content"
            v-for="(item, index) in itemList"
            :key="index"
        >
            <div class="" v-if="item.name === 'cadastralArea'">
                <Paragraphe v-if="cadastralArea">
                    <span class="living__label"
                        >{{ item.label.split('(')[0] }} :
                    </span>
                    <span class="living__value"
                        >{{
                            separatorHandleFloat(Math.ceil(cadastralArea))
                        }}
                        m²</span
                    >
                </Paragraphe>
                <Input
                    v-else
                    :name-input="item.name"
                    :label="item.label"
                    :input-type="item.type"
                    :required="item.required"
                    @input="handleChange"
                    :type="item.type"
                    :min="item.min"
                    :default-value="propertyDatas[item.name]"
                    unity="m²"
                    placeholder="0"
                />
            </div>
            <div class="" v-else-if="item.name === 'livingArea'">
                <Input
                    :name-input="item.name"
                    :label="item.label"
                    :input-type="item.type"
                    :required="item.required"
                    @input="handleChange"
                    :type="item.type"
                    :max="maxValue"
                    :min="item.min"
                    :default-value="propertyDatas[item.name]"
                    unity="m²"
                    placeholder="0"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { itemList } from '@/pages/addProduct/components/LivingArea/data';
    import Input from '@/components/Common/Input/Input.vue';
    import { ref, watch, computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    const store = useStore();
    const params = ref<any>({
        livingArea: 0,
    });
    const maxValue = ref<any>(10);
    const cadastralArea = ref<number>();
    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
                step: { livingArea: validation(value) },
            });
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        getCadastralArea();
    });

    function getCadastralArea() {
        cadastralArea.value =
            +store.getters['AddProductModule/getAddPropertyData'][
                'cadastralArea'
            ];
        console.log('fafafafafa\n', cadastralArea.value);

        if (!cadastralArea.value) {
            params.value = {
                ...params.value,
                cadastralArea: null,
            };
        }
    }

    function handleChange(v: Object) {
        console.log(Object.keys(v)[0]);
        if (Object.keys(v)[0] === 'cadastralArea') {
            maxValue.value === +Object.values(v)[0];
        }

        params.value = {
            ...params.value,
            [Object.keys(v)[0]]: parseInt(Object.values(v)[0]),
        };
    }

    function validation(value: any) {
        return Object.values(value).every((v) => v !== 0);
    }
</script>

<style lang="scss" scoped>
    .living {
        &__container {
            @apply bg-white rounded-[8px] p-[10px] flex flex-col gap-[20px];
        }

        &__label {
            @apply italic font-semibold;
        }
        &__value {
            @apply font-semibold;
        }
        &__content {
            @apply flex flex-col gap-[20px];
        }
    }
</style>
