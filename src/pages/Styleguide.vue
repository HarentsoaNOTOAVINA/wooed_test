<template>
    <div class="content-styleguide">
        <div>
            <div>
                <Title type="h2" label="title" :weight="600" />
                <Title type="h1" label="title h1" :weight="700" />
            </div>
            <div>
                <Title type="h2" label="Button" :weight="600" />
                <div class="flex gap-3">
                    <Button> primary </Button>
                    <Button type-button="secondary"> Secondary </Button>
                </div>
            </div>
            <div>
                <Title type="h2" label="Button menu" :weight="600" />
                <ButtonMenu> Functionnal </ButtonMenu>
            </div>
            <div>
                <Title type="h2" label="Input" :weight="600" />
                <Input label="Input label" placeholder="input" />
            </div>
            <div>
                <Title type="h2" label="Select" :weight="600" />
                <Select name="select" placeholder="select" :options="options" />
            </div>
            <div>
                <Title type="h2" label="Upload image" :weight="600" />
                <UploadImage />
            </div>
            <div>
                <Title type="h2" label="Slider" :weight="600" />
                <Slider />
            </div>
            <div>
                <Title
                    type="h2"
                    label="Select avec auto-completion"
                    :weight="600"
                />
                <SelectAutoComplete
                    @change-select="testSelectWithCompleted"
                    :options="options"
                    placeholder="Selectionner"
                    name="test"
                />
            </div>
            <div>
                <Title type="h2" label="Radio Button" :weight="600" />
                <Radio
                    :element="options"
                    align="horizontal"
                    class="radioElementClass"
                    :radioDefaultCheck="options[0].value"
                    name="radioGroupCheck"
                    @get-radio-input="handleChangeRadio($event)"
                />
            </div>
            <div>
                <Title type="h2" label="Toogle switch" :weight="600" />
                <Switch item-label="Switch label" name="Switch" />
            </div>
            <div>
                <Title type="h2" label="Progress Circle" />
                <ProgressCircle />
            </div>
            <div class="card-map">
                <Title type="h2" label="Carte" :weight="600" />
                <Map />
            </div>
        </div>
        <div class="wrap-icon">
            <div
                class="flex items-center gap-[10px]"
                v-for="(item, index) in allIcon"
                :key="index"
            >
                <component :is="item.icon" />
                <span>{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import SelectAutoComplete from '@/components/Common/SelectAutoComplet/SelectAutoComplet.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Map from '@/components/section/map/index.vue';
    import Slider from '@/components/Display/Slider/Slider.vue';
    import ProgressCircle from '@/components/Common/ProgressCircle/ProgressCircle.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';

    import { ref, shallowRef } from 'vue';

    const components = import.meta.globEager('../components/Icon/*.vue');

    const allIcon = shallowRef<any>([]);

    Object.entries(components).forEach(([path, definition]) => {
        const iconName = (path as any)
            .split('/')
            .pop()
            .replace(/\.\w+$/, '');
        allIcon.value.push({ name: iconName, icon: definition.default });
    });

    console.log(allIcon.value, 'Alll icon');

    interface Option {
        value: string;
        label: string;
    }

    const options = ref<Option[]>([
        {
            value: 'jack',
            label: 'Jack',
        },
        {
            value: 'lucy',
            label: 'Lucy',
        },
        {
            value: 'disabled',
            label: 'Disabled',
        },
        {
            value: 'yiminghe',
            label: 'Yiminghe',
        },
    ]);

    const testSelectWithCompleted = () => {};

    const handleChangeRadio = (e: Event) => {
        let key = (e.target as HTMLInputElement).name;
        let value = (e.target as HTMLInputElement).value;
        console.log(key);
        console.log('Value', value);
    };
</script>

<style scoped>
    .card-map {
        width: 90vw;
        height: 500px;
    }
    .content-styleguide {
        @apply grid grid-cols-2 gap-[30px];
    }
    .wrap-icon {
        @apply grid grid-cols-4 gap-[30px];
    }
</style>
