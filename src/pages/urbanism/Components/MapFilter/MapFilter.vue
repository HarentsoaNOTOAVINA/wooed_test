<template>
    <div class="mapFilter">
        <div class="mapFilter__checkContainer">
            <CheckBox
                :return-boolean="true"
                :label="allProjects"
                :isChecked="showAllProjectMarker"
                @click="handleFilter"
            />
            <GreenIcon />
        </div>
        <div>
            <div class="mapFilter__checkContainer">
                <CheckBox
                    :return-boolean="true"
                    :label="allProjectsByType"
                    :isChecked="showAllProjectMarkerByType"
                    @click="handleFilterByType"
                />
                <BlueIcon />
            </div>
            <div
                v-if="showAllProjectMarkerByType"
                class="mapFilter__checkboxGroupByType"
            >
                <a-checkbox-group
                    v-model:value="value1"
                    name="checkboxgroup"
                    :options="projectTypeTitle"
                    @change="checkboxGroup"
                />
            </div>
            <div class="mapFilter__checkContainer">
                <CheckBox
                    :return-boolean="true"
                    :label="allProjectByCategory"
                    :isChecked="showAllCategoryMarkerByType"
                    @click="handleFilterByCategory"
                />
                <YellowIcon />
            </div>
            <div
                v-if="showAllCategoryMarkerByType"
                class="mapFilter__checkboxGroupByType"
            >
                <a-checkbox-group
                    v-model:value="value1"
                    name="checkboxgroup"
                    :options="categoryTypeTitle"
                    @change="checkboxGroupCategory"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import { CheckboxGroup as ACheckboxGroup } from 'ant-design-vue';
    import GreenIcon from '@/components/Icon/green.vue';
    import BlueIcon from '@/components/Icon/blue.vue';
    import YellowIcon from '@/components/Icon/Yellow.vue';
    import { emitWarning } from 'process';
    import { ref } from 'vue';

    const props = defineProps([
        'showAllProjectMarker', //bool
        'showAllProjectMarkerByType',
        'showAllCategoryMarkerByType',
        'categoryTypeTitle',
        'projectTypeTitle',
    ]);

    const emit = defineEmits<{
        (event: 'changeSelect', value: any): void;
        (event: 'changeSelectByType', value: any): void;
        (event: 'changeSelectByTypeFiltered', value: any): void;
        (event: 'changeSelectByCategory', value: any): void;
        (event: 'changeSelectByCategoryFiltered', value: any): void;
    }>();

    //refs
    const allProjects = ref<string>('Tous les nouveaux projets immobilier');
    const allProjectsByType = ref<string>('Tous les types de projets');
    const allProjectByCategory = ref<string>(
        'Toutes les categories de travaux'
    );
    let value1 = ref<any>([]);

    const checkboxGroup = (item: any) => {
        emit('changeSelectByTypeFiltered', item);
        // console.log('item group:', item);
    };

    const handleFilter = (item: any, label: any) => {
        item = !item;
        emit('changeSelect', item);
    };

    const handleFilterByType = (item: any) => {
        console.log('item value:', item);
        emit('changeSelectByType', item);
    };

    const handleFilterByCategory = (item: any) => {
        // console.log('item category check:', item);
        emit('changeSelectByCategory', item);
    };

    const checkboxGroupCategory = (item: any) => {
        // console.log('item category group check:', item);
        emit('changeSelectByCategoryFiltered', item);
    };
</script>

<style lang="scss" scoped>
    .mapFilter {
        @apply mt-[10px];

        &__checkContainer {
            @apply flex items-center;
        }
        &__checkboxGroupByType {
            @apply ml-[20px];
        }
    }
</style>
