<template>
    <div class="equipment">
        <CardWrapper
            class="equipment__container-content place-content-14px"
            v-if="!loading"
        >
            <Title
                type="h3"
                label="Equipement obligatoire minimal de mon logement"
                class="equipment__subtitle"
            />
            <hr class="__hr" />
            <div class="equipment__items place-content-14px">
                <Paragraphe class="equipment__label">
                    Mon logement doit être équipé au minimum de :
                </Paragraphe>
                <div class="equipment__lists-wrap">
                    <ul class="equipment__lists place-content-10px">
                        <template v-for="(item, index) in equipmentData">
                            <EquipmentContent
                                :item-data="item"
                                :index="index"
                                @on-click-remove="removeEquipment"
                            />
                        </template>
                        <li v-if="equipmentData.length == 0">
                            <div class="equipment__lists-content">
                                <span> Aucun équipement ajouter </span>
                            </div>
                        </li>
                    </ul>
                    <Select
                        name="equipment"
                        mode="multiple"
                        :options="options"
                        :default-open="true"
                        @Change-select="handleChange"
                        :value="defaultSelectValue"
                        @update:value="defaultSelectValue = $event"
                    >
                        <template #openSelect>
                            <Icon icon-name="AddFile" />
                        </template>
                    </Select>
                </div>
            </div>
        </CardWrapper>
        <Loader v-if="loading" />
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import EquipmentContent from './EquipmentContent.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const store = useStore();

    let loading = ref<boolean>(true);
    const options: any = [];

    const equipmentData = ref<any[]>([]);
    const defaultSelectValue = ref<any[]>([]);

    onMounted(() => {
        dataValue(defaultSelectValue.value);
        getHousingCode();
    });

    function handleChange(value: any) {
        dataValue(value.equipment);
    }

    async function getHousingCode() {
        try {
            loading.value = true;
            let response = await store.dispatch('RentalModule/listHousingCode');

            response.data.forEach((el: any) => {
                let id = 0;
                options.push({
                    id: id,
                    label: el.choiceCategory.name,
                    value: el.choiceCategory.name,
                    content: JSON.parse(el.content[0]),
                });
                id++;
            });
        } catch (error) {
            console.error(error, 'Error get code ');
        } finally {
            loading.value = false;
        }

        console.log(options, 'OPTIONS');

        // codeHousing.value = JSON.parse(response.data[0].content[0]);
    }

    function dataValue(item: any) {
        const data = options.filter((option: any) =>
            item.includes(option.value)
        );
        equipmentData.value = data;
        console.log(
            equipmentData.value,
            'DDDDDDDDDDDAAAAAAAAAAAAATTTTTTTTTTTTTTTTAAAAAAAAAAAAAAA'
        );
    }

    function removeEquipment(value: string, index: number) {
        equipmentData.value.splice(index, 1);
        const selectedValues = equipmentData.value.map(
            (option) => option.value
        );
        defaultSelectValue.value = selectedValues;
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .equipment {
        @apply relative h-full;
        &__subtitle {
            @apply font-[600] text-[14px] text-primary;
        }
        &__label {
            @apply text-[14px] font-[600];
        }
        &__items {
            &:deep() {
                .custom-select__wrapper {
                    @apply absolute top-0 right-0 max-w-[350px] w-full h-0 overflow-hidden;
                }
                .ant-select-selector {
                    @apply h-0 overflow-hidden;
                }
                .custom-defaultOpen {
                    @apply cursor-pointer w-max;
                    .icon {
                        @apply block;
                    }
                }
            }
        }

        &__lists-wrap {
            @apply flex gap-[14px] relative;
        }
        &__lists {
            @apply w-full;
        }
    }
</style>
