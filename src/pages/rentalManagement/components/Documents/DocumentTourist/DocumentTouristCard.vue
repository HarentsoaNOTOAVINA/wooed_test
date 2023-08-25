<template>
    <CardWrapperTitle typeTitle="h3" :label="data.title">
        <Select
            :name="data.name"
            label="Année"
            placeholder="Sélectionnez"
            :options="data.selectOption"
            @change-select="handleChange($event, data.name)"
            :defaultValue="data.selectOption[0].label"
        />
        <CardWrapper class="documentTourist__card">
            <Title
                type="h3"
                :label="yearsActive ? yearsActive : data.selectOption[0].label"
                class="documentTourist__label"
            />
            <hr class="__hr" />
            <Collapse
                v-model:activeKey="activeKey"
                expandIconPosition="right"
                accordion
            >
                <CollapsePanel
                    v-for="(subItem, subIndex) in data.periodOccupation"
                    :key="data.name + subIndex"
                    :header="subItem.label"
                >
                    <PeriodOccupation
                        :start-period="subItem.startPeriod"
                        :end-period="subItem.endPeriod"
                        :document-files="subItem.contractFile"
                    />
                </CollapsePanel>
            </Collapse>
        </CardWrapper>
    </CardWrapperTitle>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import CardWrapperTitle from '@/components/Display/CardWrapperTitle/CardWrapperTitle.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { ref } from 'vue';
    import { Collapse, CollapsePanel } from 'ant-design-vue';
    import PeriodOccupation from './PeriodOccupation.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { Data } from './DataDocumentTourist';

    const props = defineProps({
        dataTourist: {
            type: Object as () => Data,
            default: {},
        },
    });

    const data = ref<Data>(props.dataTourist);
    const activeKey = ref([]);
    const yearsActive = ref<number | any>();

    function handleChange(value: any, name: string) {
        yearsActive.value = value[name];
    }

</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .documentTourist {
        &__card {
            @apply place-content-14px;
            &:deep() {
                .ant-collapse {
                    @apply place-content-14px;
                }
                .ant-collapse > .ant-collapse-item {
                    border: 1px solid;
                    @apply border-gray;
                }
                .ant-collapse-header {
                    @apply font-[600] bg-gray text-primary;
                    @include hoverButtonDark;
                    &:hover {
                        @apply text-grayIcon;
                    }
                }
                .ant-collapse-content {
                    @apply border-none;
                }
            }
        }
        &__items {
            @apply place-content-14px;
            label {
                @apply font-[600] text-secondary;
            }
        }
        &__items-container {
            @apply place-content-14px;
        }
        &__items-wrap {
            @apply place-content-14px;
            @screen sm {
                @apply flex-row;
            }
            @screen md {
                @apply flex-col;
            }
            @screen lg {
                @apply flex-row;
            }
        }
        &__label {
            @apply font-[600];
        }
    }
</style>
