<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import SelectInput from '@/components/Common/Select/Select.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import AddIconVue from '@/components/Icon/AddIcon.vue';
    import { dates, days } from './data';
    import AddFile from '@/components/Icon/AddFile.vue';
    import { ref, watch } from 'vue';
    import { Store, storeKey, useStore } from 'vuex';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';

    const store: Store<any> = useStore();
    const numberInstance = ref<number>(1);
    const showDate = ref<boolean>(false);
    const params = ref<any>({
        disponibility: '',
        visitingHours: [
            {
                availabilityDate: '',
                startTime: '',
                endTime: '',
            },
        ],
    });

    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
            });
        },
        { immediate: true, deep: true }
    );

    const increment = () => {
        numberInstance.value += 1;
    };

    const handleChange = (e: any, nb: number) => {
        for (let i in e) {
            if (i === 'disponibility') {
                params.value[i] = e[i];
                if (e[i] === 'Apartir de') {
                    showDate.value = true;
                } else {
                    showDate.value = false;
                }
            } else {
                if (params.value.visitingHours.length <= nb - 1) {
                    params.value.visitingHours = [
                        ...params.value.visitingHours,
                        {
                            availabilityDay: '',
                            startTime: '',
                            endTime: '',
                        },
                    ];
                }
                params.value.visitingHours[+nb - 1][i] = e[i];
            }
        }
    };
</script>

<template>
    <div class="container">
        <AddFile class="container__add-icon" @click="increment" />
        <div v-for="nb in numberInstance" :key="nb" class="container__card">
            <div v-for="(item, key) in dates" :key="key" :class="item.class">
                <Input
                    v-if="item.type === 'number'"
                    :label="item.label"
                    :name-input="item.name"
                    placeholder="0"
                    :input-type="item.type"
                    @input="handleChange($event, nb)"
                />
                <div v-else-if="item.type === 'date'" class="date-container">
                    <TimePicker
                        v-for="(sub, idSub) in item.subItem"
                        :label="sub.label"
                        :name="sub.name"
                        @change="handleChange($event, nb)"
                    />
                </div>
                <div
                    :class="[item.subItem ? 'disponibility__sub' : '']"
                    v-else-if="item.type === 'select'"
                >
                    <SelectInput
                        class="disponibility__sub-item"
                        :label="item.label"
                        :name="item.name"
                        :options="item.options"
                        @change-select="handleChange($event, nb)"
                    />

                    <div
                        class="disponibility__sub-item"
                        v-for="(subs, idSub) in item.subItem"
                        :key="idSub"
                    >
                        <InputDate
                            name="availabilityDate"
                            :label="subs.label"
                            @handle-date="handleChange($event, nb)"
                            :min="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        @apply flex w-full flex-col gap-[10px];

        &__card {
            @apply border rounded-[8px] p-[10px];
        }
        &__add-icon {
            @apply cursor-pointer absolute top-[65px] right-[10px] md:top-[15px] md:right-[24px];
        }
    }
    .content-50 {
        @apply w-[50%];
    }
    .date {
        &-container {
            @apply flex flex-row w-full justify-between;
            color: var(--color-gray-icon);
        }
        &-item {
            @apply w-[50%] p-5;
            border-radius: 8px;
        }
    }
    .content-100 {
        @apply w-[100%];
    }

    .disponibility {
        &__sub {
            @apply flex gap-[10px];
        }
        &__sub-item {
            @apply w-[100%] flex-1;
        }
    }
</style>
