<script lang="ts" setup>
    import CommunityCard from '@/pages/community/components/CommunityCard.vue';
    import { ref } from 'vue';
    // import SideBarMenu from './components/SideBarMenu.vue';
    import ButtonEducation from '@/pages/education/components/ButtonEducation.vue';
    import FormEducation from '@/pages/education/components/FormEducation.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { educationBtnInside } from '@/pages/education/components/educationData';

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

<template>
    <CommunityCard label-title="Education" class="education__section">
        <div>
            <component
                :is="activeComponent"
                :insideEducation="insideEducation"
                @goto="goto"
            />
        </div>
    </CommunityCard>
</template>
<style lang="scss" scoped></style>
