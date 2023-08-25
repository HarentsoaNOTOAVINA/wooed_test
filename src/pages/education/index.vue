<template>
    <div class="container education">
        <SideBarMenu />
        <div class="education__content">
            <component
                :is="activeComponent"
                :insideEducation="insideEducation"
                @goto="goto"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import SideBarMenu from './components/SideBarMenu.vue';
    import ButtonEducation from './components/ButtonEducation.vue';
    import FormEducation from './components/FormEducation.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { educationBtnInside } from './components/educationData';

    const activeComponent = ref<object>(ButtonEducation);
    let insideEducation = ref<boolean>(false);
    const router = useRouter();
    const route = useRoute();

    const goto = (item: any) => {
        switch (item) {
            case 'education':
                insideEducation.value = true;
                console.log('props value:', insideEducation.value);
                // activeComponent.value = activeComponent
                break;
            case 'commitee':
                console.log('commitee');
                break;
            case 'plan':
                activeComponent.value = FormEducation;
                break;
            case 'redirect':
                // console.log('redirect data:', educationBtnInside[1].path);
                // window.open(educationBtnInside[1].path);
                window.location.href = educationBtnInside[1].path;
                break;
            default:
                break;
        }
        console.log('item', item);
    };
</script>

<style lang="scss" scoped>
    .education {
        overflow-y: hidden;
        @apply flex flex-row my-[18px] gap-[10px];

        &__content {
            background-color: #fff;
            height: calc(100vh - 100px);
            // height: fit-content;
            @apply p-[18px] rounded-lg gap-[16px] w-full;
        }
    }
</style>
